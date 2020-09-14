package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.repository.CustomerCreditRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractCustomerRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractProductRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductFullDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.CostRateFilterDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.OrderProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.ProductRateDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.RateServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerCreditMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractProductMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static ir.donyapardaz.niopdc.base.domain.enumeration.ContractType.EXPORT;


/**
 * Service Implementation for managing SellContractProduct.
 */
@Service
@Transactional
public class SellContractProductService {

    private final Logger log = LoggerFactory.getLogger(SellContractProductService.class);

    private final SellContractProductRepository sellContractProductRepository;

    private final SellContractProductMapper sellContractProductMapper;
    private final CustomerCreditRepository customerCreditRepository;
    private final CustomerCreditMapper customerCreditMapper;
    private SellContractCustomerRepository sellContractCustomerRepository;
    private SellContractRepository sellContractRepository;
    private RateServiceClient rateServiceClient;

    public SellContractProductService(SellContractProductRepository sellContractProductRepository, SellContractProductMapper sellContractProductMapper, CustomerCreditRepository customerCreditRepository, CustomerCreditMapper customerCreditMapper, SellContractCustomerRepository sellContractCustomerRepository, SellContractRepository sellContractRepository, RateServiceClient rateServiceClient) {
        this.sellContractProductRepository = sellContractProductRepository;
        this.sellContractProductMapper = sellContractProductMapper;
        this.customerCreditRepository = customerCreditRepository;
        this.customerCreditMapper = customerCreditMapper;
        this.sellContractCustomerRepository = sellContractCustomerRepository;
        this.sellContractRepository = sellContractRepository;
        this.rateServiceClient = rateServiceClient;
    }

    /**
     * Save a sellContractProduct.
     *
     * @param sellContractProductFullDTO the entity to save
     * @return the persisted entity
     */
    public SellContractProductFullDTO save(SellContractProductFullDTO sellContractProductFullDTO) {
        log.debug("Request to save SellContractProduct : {}", sellContractProductFullDTO);

        SellContract sellContract = sellContractRepository.findOne(sellContractProductFullDTO.getSellContractId());

        boolean activeSellContract = (sellContract.isActive() != null && sellContract.isActive()) || (sellContract.getArchive() != null && sellContract.getArchive());
        if ((sellContractProductFullDTO.getAdjustment() == null || !sellContractProductFullDTO.getAdjustment()) && activeSellContract)
            throw new CustomParameterizedException("error.500");

        List<SellContractProduct> sellContractProducts = new ArrayList<>();

        boolean haveCustomer = sellContract.getContractType() != EXPORT;

        if (!haveCustomer) {
            sellContractProductFullDTO.setSellContractCustomerIds(new HashSet<Long>() {{
                add(null);
            }});

            ProductRateDTO productRateDTO = new ProductRateDTO();
            productRateDTO.setId(sellContractProductFullDTO.getProductRateId());
            productRateDTO.setAdjustment(sellContractProductFullDTO.getAdjustment());
            productRateDTO.setConfirm(true);
            productRateDTO.setCurrencyId(sellContractProductFullDTO.getProductRateCurrencyId());
            productRateDTO.setSrc(sellContractProductFullDTO.getProductRateSrc());
            productRateDTO.setPrice(sellContractProductFullDTO.getProductRatePrice());
            productRateDTO.setStartDate(sellContractProductFullDTO.getStartDate());
            productRateDTO.setFinishDate(sellContractProductFullDTO.getFinishDate());
            productRateDTO.setProductId(sellContractProductFullDTO.getProductId());
            productRateDTO.setType(sellContract.getContractType());
            productRateDTO.setBankAccountTypeId(sellContractProductFullDTO.getNiopdcBankAccountTypeId());
            productRateDTO.setNiopdcBankAccountTypeTitle(sellContractProductFullDTO.getNiopdcBankAccountTypeTitle());

            productRateDTO = rateServiceClient.saveProductRate(productRateDTO);
            sellContractProductFullDTO.setRateGroupId(productRateDTO.getRateGroupId());
            sellContractProductFullDTO.setProductRateId(productRateDTO.getId());
        }

        if (activeSellContract) {
            SellContractProduct sellContractProduct = sellContractProductRepository.findOne(sellContractProductFullDTO.getId());
            sellContractProduct.setProductRateId(sellContractProductFullDTO.getProductRateId());
            sellContractProducts.add(sellContractProduct);
        } else {
            for (Long sellContractCustomerId : sellContractProductFullDTO.getSellContractCustomerIds()) {
                SellContractProductFullDTO clone = new SellContractProductFullDTO();
                BeanUtils.copyProperties(sellContractProductFullDTO, clone);
                clone.setSellContractCustomerId(sellContractCustomerId);
                SellContractProduct sellContractProduct = sellContractProductMapper.toEntity(clone);

                sellContractProducts.add(sellContractProduct);
            }
        }

        sellContractProducts = sellContractProductRepository.save(sellContractProducts);
        return sellContractProductMapper.toFullDto(sellContractProducts.get(0));
    }

    /**
     * Get all the sellContractProducts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SellContractProductDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SellContractProducts");
        return sellContractProductRepository.findAll(pageable)
            .map(sellContractProductMapper::toDto);
    }

    /**
     * Get one sellContractProduct by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SellContractProductFullDTO findOne(Long id) {
        log.debug("Request to get SellContractProduct : {}", id);
        SellContractProduct sellContractProduct = sellContractProductRepository.findOneWithEagerRelationships(id);
        SellContractProductFullDTO sellContractProductFullDTO = sellContractProductMapper.toFullDto(sellContractProduct);

        if (sellContractProduct != null && sellContractProduct.getProductRateId() != null) {
            ProductRateDTO productRate = rateServiceClient.findOneProductRate(sellContractProduct.getProductRateId());
            sellContractProductFullDTO.setProductRateSrc(productRate.getSrc());
            sellContractProductFullDTO.setProductRatePrice(productRate.getPrice());
            sellContractProductFullDTO.setProductRateCurrencyId(productRate.getCurrencyId());
            sellContractProductFullDTO.setNiopdcBankAccountTypeId(productRate.getBankAccountTypeId());
        }

        return sellContractProductFullDTO;
    }

    /**
     * Delete the sellContractProduct by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SellContractProduct : {}", id);

        SellContract sellContract = sellContractProductRepository.findOne(id).getSellContract();
        if ((sellContract.isActive() != null && sellContract.isActive()) || (sellContract.getArchive() != null && sellContract.getArchive()))
            throw new CustomParameterizedException("error.500");

        sellContractProductRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public CostRateFilterDTO findOrderProductByFilter(CostRateFilterDTO costRateFilter) {

        SellContractProduct sellContractProduct = sellContractProductRepository.findOne(costRateFilter.getSellProductAmount().getSellContractProductId());

        if (sellContractProduct == null)
            throw new CustomParameterizedException("not.found.sellContractProduct");

        costRateFilter.getSellProductAmount().setOrderProduct(new OrderProductDTO());
        costRateFilter.getSellProductAmount().getOrderProduct().setCostGroupId(new ArrayList<>(sellContractProduct.getCostGroupIds()));
        costRateFilter.getSellProductAmount().getOrderProduct().setProductId(sellContractProduct.getProduct().getId());
        costRateFilter.getSellProductAmount().getOrderProduct().setRateGroupId(sellContractProduct.getRateGroupId());
        costRateFilter.getSellProductAmount().getOrderProduct().setCurrencyRateGroupId(sellContractProduct.getCurrencyRateGroupId());
        if (sellContractProduct.getSellContractCustomer() != null) {
            if (sellContractProduct.getSellContractCustomer().getCustomer().getRegion() != null)
                costRateFilter.getSellProductAmount().getOrderProduct().setRegionId(
                    sellContractProduct.getSellContractCustomer().getCustomer().getRegion().getId()
                );
            costRateFilter.getSellProductAmount().getOrderProduct().setCustomerTypeId(sellContractProduct.getSellContractCustomer().getCustomer().getType().getId());
        }
        costRateFilter.setCurrencyRateGroupId(sellContractProduct.getCurrencyRateGroupId());
        costRateFilter.setContractType(sellContractProduct.getSellContract().getContractType());

        return costRateFilter;
    }

    @Transactional(readOnly = true)
    public List<SellContractProductDTO> findAllSellContractProductByCustomerId(Long customerId) {
        log.debug("Request to get all SellContracts");
        List<SellContractProduct> result = sellContractProductRepository.findAllByCustomerId(customerId, ZonedDateTime.now());
        return sellContractProductMapper.toDto(result);
    }

    public Page<CustomerCreditDTO> findAllCustomerCredits(Long sellContractProductId, Pageable pageable) {
        Page<CustomerCredit> result;
        result = customerCreditRepository.findAllByProductIdAndParentBuyType_BuyGroupIn(sellContractProductId, BuyGroup.getBuyGroups(true), pageable);
        return result.map(customerCreditMapper::toDto);
    }

    public Boolean isUsedBySellContractProduct(Long rateGroupId, Long currencyRateGroupId) {
        if (rateGroupId != null)
            return sellContractProductRepository.existsByRateGroupIdAndSellContract_ActiveTrue(rateGroupId);
        else
            return sellContractProductRepository.existsByCurrencyRateGroupIdAndSellContract_ActiveTrue(currencyRateGroupId);
    }

    public Long findSellContractCustomerIdBySellContractProduct(Long id) {
        return sellContractProductRepository.findSellContractCustomerIdBySellContractProduct(id);
    }

    public List<SellContractProductDTO> findAllSellContractProductByPersonId(Long personId) {
        log.debug("Request to get all SellContracts");
        List<SellContractProduct> result = sellContractProductRepository.findAllByPersonId(personId, ZonedDateTime.now());
        return sellContractProductMapper.toDto(result);

    }

    public List<SellContractProductDTO> getForTransferQuota(Long fromSellContractProductId) {
        List<SellContractProduct> forTransferQuota = sellContractProductRepository.getForTransferQuota(fromSellContractProductId);
        return sellContractProductMapper.toDto(forTransferQuota);
    }

    public List<SellContractProductDTO> getAllByHaveQuotaCredit(Long id) {
        List<SellContractProduct> sellContractProducts = sellContractProductRepository.findAllByHaveQuotaCredit(id);
        return sellContractProductMapper.toDto(sellContractProducts);
    }

    public Set<Long> findAllRateGroupIdsForAirplane() {
        List<SellContractProduct> allSellContractProductForAirplane = sellContractProductRepository.findAllSellContractProductForAirplane();
        Set<Long> collect = allSellContractProductForAirplane.stream().map(sellContractProduct -> sellContractProduct.getRateGroupId()).distinct().collect(Collectors.toSet());

        return collect;
    }
}
