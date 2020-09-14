package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.CostMethod;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.AssignCustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.ProductAmountRequestDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.ProductAmountResponseDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.RateServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.CeilingQuotaMapper;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerCreditMapper;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerCreditTaMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractProductMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static ir.donyapardaz.niopdc.base.web.rest.util.DateUtil.convertToGeorgian;


/**
 * Service Implementation for managing CustomerCredit.
 */
@Service
@Transactional
public class CustomerCreditService {

    private final Logger log = LoggerFactory.getLogger(CustomerCreditService.class);

    private final CustomerCreditRepository customerCreditRepository;
    private final CustomerRepository customerRepository;

    private final CustomerCreditMapper customerCreditMapper;

    private final CustomerCreditAllowedDayRepository customerCreditAllowedDayRepository;

    private final CeilingQuotaRepository ceilingQuotaRepository;
    private final CeilingQuotaMapper ceilingQuotaMapper;
    private final OrderServiceClient orderServiceClient;
    private final BuyTypeRepository buyTypeRepository;
    private SellContractRepository sellContractRepository;
    private SellContractProductRepository sellContractProductRepository;
    private CustomerCreditProductTaRepository customerCreditProductTaRepository;
    private CustomerCreditTaMapper customerCreditTaMapper;
    private CustomerCreditTaRepository customerCreditTaRepository;
    private ProductGroupRepository productGroupRepository;
    private RateServiceClient rateServiceClient;
    private SellContractProductMapper sellContractProductMapper;

    public CustomerCreditService(CustomerCreditRepository customerCreditRepository, CustomerRepository customerRepository, CustomerCreditMapper customerCreditMapper, CustomerCreditAllowedDayRepository customerCreditAllowedDayRepository, CeilingQuotaRepository ceilingQuotaRepository, CeilingQuotaMapper ceilingQuotaMapper, SellContractRepository sellContractRepository, SellContractProductRepository sellContractProductRepository, CustomerCreditProductTaRepository customerCreditProductTaRepository, CustomerCreditTaMapper customerCreditTaMapper, CustomerCreditTaRepository customerCreditTaRepository, ProductGroupRepository productGroupRepository, RateServiceClient rateServiceClient, SellContractProductMapper sellContractProductMapper, OrderServiceClient orderServiceClient, BuyTypeRepository buyTypeRepository) {
        this.customerCreditRepository = customerCreditRepository;
        this.customerRepository = customerRepository;
        this.customerCreditMapper = customerCreditMapper;
        this.customerCreditAllowedDayRepository = customerCreditAllowedDayRepository;
        this.ceilingQuotaRepository = ceilingQuotaRepository;
        this.ceilingQuotaMapper = ceilingQuotaMapper;
        this.sellContractRepository = sellContractRepository;
        this.sellContractProductRepository = sellContractProductRepository;
        this.customerCreditProductTaRepository = customerCreditProductTaRepository;
        this.customerCreditTaMapper = customerCreditTaMapper;
        this.customerCreditTaRepository = customerCreditTaRepository;
        this.productGroupRepository = productGroupRepository;
        this.rateServiceClient = rateServiceClient;
        this.sellContractProductMapper = sellContractProductMapper;
        this.orderServiceClient = orderServiceClient;
        this.buyTypeRepository = buyTypeRepository;
    }

    /**
     * Save a customerCredit.
     *
     * @param customerCreditDTO the entity to save
     * @return the persisted entity
     */
    public CustomerCreditDTO save(CustomerCreditDTO customerCreditDTO) throws Exception {
        log.debug("Request to save CustomerCredit : {}", customerCreditDTO);

        CustomerCredit customerCredit = null;

        if (customerCreditDTO.getHasAllowedDays() != null && customerCreditDTO.getHasAllowedDays() == true) {
            customerCreditDTO.setStartDate(null);
            customerCreditDTO.setFinishDate(null);
        }

        if (customerCreditDTO.getParentBuyGroup() == BuyGroup.QUOTA) {
            customerCreditDTO.setCurrencyRateGroupId(null);
            customerCreditDTO.setCurrencyId(null);
        }

        if (customerCreditDTO.getId() == null) {
            Integer maxCreditNumber = this.customerCreditRepository.findMaxCreditNumber();

            if (maxCreditNumber == null)
                maxCreditNumber = 100000000;
            customerCreditDTO.setCreditNumber(maxCreditNumber + 1);
            customerCreditDTO.setCurrentAmount(customerCreditDTO.getAmount());
            customerCreditDTO.setCurrentCredit(customerCreditDTO.getCredit());
            customerCredit = customerCreditMapper.toEntity(customerCreditDTO);
            customerCredit.setExportationDate(ZonedDateTime.now());

            if (customerCredit.getHasAllowedDays() != null && customerCredit.getHasAllowedDays()) {

                for (CustomerCreditAllowedDay customerCreditAllowedDay : customerCredit.getCustomerCreditAllowedDays()) {
                    ZonedDateTime day = customerCreditAllowedDay.getDay();
                    day.minusSeconds(day.getSecond());
                    day.minusHours(day.getHour());
                    day.minusMinutes(day.getMinute());
                    day.minusNanos(day.getNano());
                    customerCreditAllowedDay.setDay(day);
                    customerCreditAllowedDay.setCustomerCredit(customerCredit);
                }

            }


        } else {

            // just can add  AllowedDays
            customerCredit = customerCreditRepository.findOne(customerCreditDTO.getId());
            if (customerCreditDTO.getHasAllowedDays() != null && customerCreditDTO.getHasAllowedDays() && customerCreditDTO.getCustomerCreditAllowedDays() != null) {
                Set<CustomerCreditAllowedDay> newDayList = new HashSet<>();
                boolean hasDate = false;
                for (CustomerCreditAllowedDayDTO dayDTO : customerCreditDTO.getCustomerCreditAllowedDays()) {

                    for (CustomerCreditAllowedDay day : customerCredit.getCustomerCreditAllowedDays()) {
                        if (day.getDay().isEqual(dayDTO.getDay())) {
                            hasDate = true;
                            break;
                        }
                    }

                    if (!hasDate) {
                        CustomerCreditAllowedDay allowedDay = new CustomerCreditAllowedDay();

                        allowedDay.setCustomerCredit(customerCredit);
                        allowedDay.setDay(dayDTO.getDay());
                        allowedDay.setDescription(dayDTO.getDescription());
                        newDayList.add(allowedDay);
                    }

                    hasDate = false;
                }

                customerCredit.getCustomerCreditAllowedDays().addAll(newDayList);
            } else {
                if (customerCreditDTO.getFinishDate().isBefore(customerCredit.getFinishDate()))
                    throw new CustomParameterizedException("error.finish.date.cannot.be.low.from.previous.value");
                customerCredit.setFinishDate(customerCreditDTO.getFinishDate());
            }
            BuyType buyType = customerCredit.getParentBuyType();

            switch (buyType.getBuyGroup()) {

                case QUOTA: {
                    Double usedAmount = customerCredit.getAmount() - customerCredit.getCurrentAmount();
                    if (customerCreditDTO.getAmount() < usedAmount) {
                        throw new CustomParameterizedException("error.amount.is.low");
                    }

                    customerCredit.setAmount(customerCreditDTO.getAmount());
                    customerCredit.setCurrentAmount((customerCreditDTO.getAmount() - usedAmount));


                }
                break;


                case CREDIT: {
                    Double usedCredit = customerCredit.getCredit() - customerCredit.getCurrentCredit();
                    if (customerCreditDTO.getCredit() < usedCredit) {
                        throw new CustomParameterizedException("error.credit.is.low");
                    }

                    customerCredit.setCredit(customerCreditDTO.getCredit());
                    customerCredit.setCurrentCredit((customerCreditDTO.getCredit() - usedCredit));

                    if (buyType.getTypeEffect().equals(TypeEffect.BOTH)) {
                        Double usedAmount = customerCredit.getAmount() - customerCredit.getCurrentAmount();
                        if (customerCreditDTO.getAmount() < usedAmount) {
                            throw new CustomParameterizedException("error.amount.is.low");
                        }

                        customerCredit.setAmount(customerCreditDTO.getAmount());
                        customerCredit.setCurrentAmount((customerCreditDTO.getAmount() - usedAmount));
                    }

                }
                break;
            }


        }


        customerCredit = customerCreditRepository.save(customerCredit);

        return customerCreditMapper.toDto(customerCredit);

    }

    /**
     * Get all the customerCredits.
     *
     * @param ids the ids
     * @return the list of entities
     */
    public List<CustomerCreditDTO> findAll(List<Long> ids) {
        log.debug("Request to get all CustomerCredits");
        return customerCreditMapper.toDto(customerCreditRepository.findByIds(ids));
    }

    /**
     * Get one customerCredit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerCreditDTO findOne(Long id) {
        log.debug("Request to get CustomerCredit : {}", id);
        CustomerCredit customerCredit = customerCreditRepository.findOne(id);
        return customerCreditMapper.toDto(customerCredit);
    }

    /**
     * Delete the customerCredit by id.
     *
     * @param id the id of the entity
     */
    public CustomerCreditDTO delete(Long id) {
        log.debug("Request to delete CustomerCredit : {}", id);

        Boolean isUseCustomerCredit = orderServiceClient.isUseCustomerCredit(id);
        if (isUseCustomerCredit) {
            throw new CustomParameterizedException("error.use.customer.credit");
        }

        CustomerCredit customerCredit = customerCreditRepository.findOne(id);
        customerCreditRepository.delete(id);
        return customerCreditMapper.toDto(customerCredit);
    }

    public List<CustomerCreditDTO> findAllCustomerCreditsByFilter(BuyGroup buyGroup, Long customerId, Long personId, Long currencyRateGroupId, List<Long> productIds, Long currencyId, Long locationId) {
        productIds = productIds.isEmpty() ? null : productIds;
        Boolean nationalCurrency = customerRepository.findCurrencyById(currencyId).getNationalCurrency();
        List<BuyGroup> buyGroups = new ArrayList<>();
        buyGroups.add(buyGroup);

        ZonedDateTime startDate = ZonedDateTime.now();
        ZonedDateTime endDate = ZonedDateTime.now();

        startDate = startDate.with(LocalTime.of(0, 0, 0, 0));
        endDate = endDate.with(LocalTime.of(23, 59, 59, 0));

        List<CustomerCredit> result = customerCreditRepository
            .findAllByFilter(
                customerId,
                personId,
                currencyRateGroupId,
                nationalCurrency,
                productIds,
                currencyId,
                locationId,
                ZonedDateTime.now(),
                buyGroups,
                startDate,
                endDate,
                true
            );
        return customerCreditMapper.toDto(result);
    }

    public CustomerCreditDTO findAllCustomerCreditsByFilter(Long customerId, Long productId) {
        List<BuyGroup> buyGroups = new ArrayList<>();
        buyGroups.add(BuyGroup.QUOTA);

        ZonedDateTime startDate = ZonedDateTime.now();
        ZonedDateTime endDate = ZonedDateTime.now();

        startDate = startDate.with(LocalTime.of(0, 0, 0, 0));
        endDate = endDate.with(LocalTime.of(23, 59, 59, 0));
        CustomerCredit result = customerCreditRepository
            .findAllByFilter(
                customerId,
                productId,
                ZonedDateTime.now(),
                buyGroups,
                startDate,
                endDate,
                true
            );
        result = result == null ? new CustomerCredit() : result;
        return customerCreditMapper.toDto(result);
    }


    public List<CustomerCreditDTO> save(CustomerCreditAbbasDTO customerCredits) {
        return customerCreditMapper
            .toDto(
                customerCreditRepository.save(
                    customerCreditMapper.toEntity(customerCredits.getCustomerCredits())
                )
            );
    }

    public Page<CeilingQuotaDTO> findAllCeilingQuota(Long id, String query, Pageable pageable) {
        Page<CeilingQuota> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CeilingQuota.class, "ceilingQuota"), null);
            BooleanExpression customerExpression = QCeilingQuota.ceilingQuota.customerCredit.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = ceilingQuotaRepository.findAll(booleanExpression, pageable);
        } else {
            result = ceilingQuotaRepository.findByCustomerCredit_Id(id, pageable);

        }
        return result.map(ceilingQuotaMapper::toDto);
    }

    public void save(CustomerCreditTaDTO customerCreditTaDTO) {

        if (customerCreditTaDTO.getType() == null || !customerCreditTaDTO.getType().matches("^[01]$"))
            throw new CustomParameterizedException("error.typeIsInvalid", customerCreditTaDTO.getType());

        if (customerCreditTaDTO.getCustomerCode() == null || !customerCreditTaDTO.getCustomerCode().matches("[0-9]+"))
            throw new CustomParameterizedException("error.customerCodeIsInvalid");
        Customer customer = customerRepository.findOneByIdentifyCode(customerCreditTaDTO.getCustomerCode());
        if (customer == null)
            throw new CustomParameterizedException("error.customerNotFind");

        if (customerCreditTaDTO.getIsNew() == null || !customerCreditTaDTO.getIsNew().matches("^[01]$"))
            throw new CustomParameterizedException("error.isNewIsInvalid", customerCreditTaDTO.getIsNew());

        if (customer.getType().getOldCode() == null || !customer.getType().getOldCode().equals(customerCreditTaDTO.getCustomerType()))
            throw new CustomParameterizedException("error.customerCodeIsNotCustomer", customerCreditTaDTO.getCustomerType());

        String code = (customerCreditTaDTO.getNationalCode() == null || customerCreditTaDTO.getNationalCode().isEmpty()) ? customerCreditTaDTO.getEconomicCode() : customerCreditTaDTO.getNationalCode();

        boolean havePerson = customerCreditTaDTO.getType().equals("0");
        if (havePerson && (code == null || !code.matches("[0-9]+")))
            throw new CustomParameterizedException("error.personCodeIsInvalid");
        else code = null;


        SellContract sellContract = sellContractRepository.findOneByCustomerCodeAndPersonCode(customerCreditTaDTO.getCustomerCode(), code, ZonedDateTime.now());
        if (sellContract == null) {
            if (havePerson)
                throw new CustomParameterizedException("error.sellContractForCustomerAndPersonNotFind");
            else
                throw new CustomParameterizedException("error.sellContractForCustomerNotFind");
        }

        List<CustomerCreditProductTaDTO> products = customerCreditTaDTO.getProducts();
        if (products == null || products.isEmpty())
            throw new CustomParameterizedException("error.productsIsEmpty");

        List<CustomerCredit> customerCredits = new ArrayList<>();
        CustomerCreditTa customerCreditTa = customerCreditTaMapper.toEntity(customerCreditTaDTO);

        products.forEach(product -> {
            if (product.getRequestNumber() == null)
                throw new CustomParameterizedException("error.requestNumberIsInvalid", product.getRequestNumber());

            if (customerCreditProductTaRepository.findOneByRequestNumberAndCustomerCreditTa_IsNew(product.getRequestNumber(), customerCreditTaDTO.getIsNew()) != null) {
                throw new CustomParameterizedException("error.requestNumberIsDuplicated", product.getRequestNumber());
            }

            if (product.getProductCode() == null)
                throw new CustomParameterizedException("error.productCodeIsInvalid", product.getProductCode());

            if (productGroupRepository.findOneByCode(product.getProductCode()) == null)
                throw new CustomParameterizedException("error.productGroupNotFind", product.getProductCode());

            product.getProductRates().forEach(productRate -> {

                if (productRate.getFromDate() == null || !productRate.getFromDate().matches("[0-9]{4}/[0-9]{2}/[0-9]{2}"))
                    throw new CustomParameterizedException("error.fromDateIsInvalid", productRate.getFromDate());

                if (productRate.getToDate() == null || !productRate.getToDate().matches("[0-9]{4}/[0-9]{2}/[0-9]{2}"))
                    throw new CustomParameterizedException("error.toDateIsInvalid", productRate.getToDate());

                String[] fromDate = productRate.getFromDate().split("/");
                YearMonthDay yearMonthDay2 = new YearMonthDay(fromDate[0], fromDate[1], fromDate[2]);
                ZonedDateTime startDate = convertToGeorgian(yearMonthDay2);

                String[] toDate = productRate.getToDate().split("/");
                YearMonthDay yearMonthDay = new YearMonthDay(toDate[0], toDate[1], toDate[2]);
                ZonedDateTime finishDate = convertToGeorgian(yearMonthDay);

                if (finishDate.isBefore(startDate))
                    throw new CustomParameterizedException("error.toDateIsBeforeFromDate", productRate.getFromDate(), productRate.getToDate());

                if (productRate.getProductRateType() == null || !productRate.getProductRateType().matches("^[12]$"))
                    throw new CustomParameterizedException("error.productRateTypeIsInvalid", productRate.getProductRateType());

                if (productRate.getUseTypeCode() == null)
                    throw new CustomParameterizedException("error.useTypeCodeIsInvalid", productRate.getUseTypeCode());

                String rateGroupsType = productRate.getProductRateType().equals("1") ? "SUBSIDY" // یازانه ای SUBSIDY
                    : "NON_SUBSIDY";

                Long product1 = sellContractProductRepository
                    .findProductByProductGroupAndRateTypeAndConsumption(sellContract.getId(), customer.getId(),
                        product.getProductCode(), rateGroupsType, productRate.getUseTypeCode()).longValue();
                SellContractProduct sellContractProduct = sellContractProductRepository.findOne(product1);
                if (sellContractProduct == null)
                    throw new CustomParameterizedException("error.sellContractProductNotFind");
                List<BuyType> buyTypeList = buyTypeRepository.findByBuyGroup(BuyGroup.QUOTA);

                if (buyTypeList == null || !buyTypeList.iterator().hasNext())
                    throw new CustomParameterizedException("error.buyType.notFound");

                CustomerCredit customerCredit1 = new CustomerCredit();
                customerCredit1.setStartDate(startDate);
                customerCredit1.setFinishDate(finishDate);
                customerCredit1.setAmount(productRate.getAmount());
                customerCredit1.setMinAmount(100D);
                customerCredit1.setCurrentAmount(productRate.getAmount());
                customerCredit1.setExportationDate(ZonedDateTime.now());
                customerCredit1.setParentBuyType(buyTypeList.iterator().next());
                customerCredit1.setCustomer(customer);
                customerCredit1.setActive(true);
                Integer maxCreditNumber = this.customerCreditRepository.findMaxCreditNumber();
                if (maxCreditNumber == null)
                    maxCreditNumber = 100000000;
                customerCredit1.setCreditNumber(maxCreditNumber + 1);

                customerCredit1.setProduct(sellContractProduct);

                customerCredits.add(customerCredit1);

                for (int i = 0; i < customerCreditTa.getProducts().size(); i++) {
                    CustomerCreditProductTa customerCreditProductTa = customerCreditTa.getProducts().get(i);
                    if (customerCreditProductTa.getRequestNumber().equals(product.getRequestNumber())) {
                        for (int ii = 0; ii < customerCreditTa.getProducts().size(); ii++) {
                            CustomerCreditProductRateTa customerCreditProductRateTa = customerCreditProductTa.getProductRates().get(ii);
                            if (customerCreditProductRateTa.getProductRateType().equals(productRate.getProductRateType()))
                                customerCreditProductRateTa.setProduct(sellContractProduct);
                        }
                    }
                }
            });


        });

        customerCreditRepository.save(customerCredits);
        customerCreditTaRepository.save(customerCreditTa);
    }

    public List<CustomerCreditDTO> reservePersonCredit(Long sellContractId,
                                                       Long personId,
                                                       Long customerId,
                                                       Long depotId,
                                                       Long currencyId,
                                                       BuyGroup buyGroup,
                                                       ZonedDateTime registerDate) {


        Customer customer = customerRepository.findOneWithEagerRelationships(customerId);

        Map<Long, Long> productCapacity = new HashMap<>();
        customer.getVehicleModel().getVehicleCapacities()
            .forEach(vehicleCapacity -> productCapacity.put(vehicleCapacity.getProduct().getId(), vehicleCapacity.getCapacity()));

        List<SellContractProduct> sellContractProducts =
            sellContractProductRepository.findAllByCustomerIdAndProductId(sellContractId, customerId, depotId, buyGroup, productCapacity.keySet(), registerDate);

        if (sellContractProducts.size() == 0)
            throw new CustomParameterizedException("error.customerProductNotInSellContractProduct");

        List<ProductAmountRequestDTO> productAmountRequestDTOS = new ArrayList<>();
        for (SellContractProduct sellContractProduct : sellContractProducts) {
            Product product = sellContractProduct.getProduct();
            productAmountRequestDTOS.add(
                new ProductAmountRequestDTO(
                    customerId,
                    product.getId(),
                    product.isHasContainer(),
                    product.isCalculateContainerPrice(),
                    product.isHasContainer() ? product.getContainer().getId() : null,
                    product.isHasContainer() ? product.getContainer().getCapacity() : null,
                    sellContractProduct.getRateGroupId(),
                    currencyId,
                    sellContractProduct.getCurrencyRateGroupId(),
                    productCapacity.get(product.getId()),
                    CostMethod.NORMAL_SALES,
                    sellContractProduct.getCostGroupIds(),
                    registerDate));
        }

        List<ProductAmountResponseDTO> productRates = rateServiceClient.getAllProductRateByProductAndAmount(productAmountRequestDTOS);
        AssignCustomerCreditDTO assignCustomerCreditDTO = new AssignCustomerCreditDTO()
            .personId(personId)
            .currencyId(currencyId)
            .registerDate(registerDate)
            .buyGroups(new ArrayList<BuyGroup>() {{
                add(buyGroup);
            }})
            .productRates(productRates)
            .reserve(true);
        return assignCustomerCredit(assignCustomerCreditDTO);
    }

    @SuppressWarnings("Duplicates")
    public List<CustomerCreditDTO> assignCustomerCredit(AssignCustomerCreditDTO assignCustomerCreditDTO) {
        List<CustomerCreditDTO> credits = new ArrayList<>();
        List<CustomerCredit> customerCredits = new ArrayList<>();

        if (assignCustomerCreditDTO.getReverts() != null && assignCustomerCreditDTO.getReverts().size() > 0) {
            this.revertCustomerCredit(assignCustomerCreditDTO.getReverts());
        }

        for (BuyGroup buyGroup : assignCustomerCreditDTO.getBuyGroups()) {
            if (buyGroup == BuyGroup.CASH) continue;

            for (ProductAmountResponseDTO productRate : assignCustomerCreditDTO.getProductRates()) {
                double sumAmount = productRate.getAmount();
                double sumProductCredit = productRate.getProductTotalPrice();
                double sumCostCredit = productRate.getSumCostPrice();

                List<CustomerCredit> customerCreditList = customerCreditRepository
                    .findAllByActiveAndPersonIdAndCurrencyIdAndDate(
                        assignCustomerCreditDTO.getPersonId(),
                        assignCustomerCreditDTO.getCustomerId(),
                        productRate.getSellContractProductId(),
                        assignCustomerCreditDTO.getCurrencyId(),
                        buyGroup,
                        assignCustomerCreditDTO.getRegisterDate());

                for (CustomerCredit customerCredit : customerCreditList) {
                    CustomerCreditDTO customerCredit1 = null;
                    Double currencyRate = rateServiceClient.getCurrencyRateByCurrencyIdAndCurrencyRateGroupId(customerCredit.getCurrencyId(), customerCredit.getCurrencyRateGroupId());
                    double dCredit = 0;
                    double dAmount = 0;
                    switch (customerCredit.getParentBuyType().getBuyTypeUsage()) {
                        case BOTH: {
                            if (customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.BOTH ||
                                customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.CREDIT) {

                                if (customerCredit.getCurrentCredit() > sumProductCredit + sumCostCredit) {
                                    dCredit = (sumProductCredit + sumCostCredit) / currencyRate;
                                    customerCredit.setCurrentCredit(customerCredit.getCurrentCredit() - dCredit);
                                    sumProductCredit = 0;
                                    sumCostCredit = 0;
                                } else {
                                    dCredit = customerCredit.getCurrentCredit();
                                    customerCredit.setCurrentCredit(0D);

                                    if (sumProductCredit >= dCredit) {
                                        sumProductCredit -= dCredit;
                                    } else {
                                        sumCostCredit -= (dCredit - sumProductCredit);
                                        sumProductCredit = 0;
                                    }
                                }
                            }

                            if (customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.BOTH ||
                                customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.AMOUNT) {
                                if (customerCredit.getCurrentAmount() > sumAmount) {
                                    dAmount = sumAmount;
                                    customerCredit.setCurrentAmount(customerCredit.getCurrentAmount() - dAmount);
                                    sumAmount = 0;
                                } else {
                                    dAmount = customerCredit.getCurrentAmount();
                                    customerCredit.setCurrentAmount(0D);
                                    sumAmount -= customerCredit.getCurrentAmount();
                                }
                            }
                        }
                        break;
                        case PRODUCT: {
                            if (customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.BOTH ||
                                customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.CREDIT) {
                                if (customerCredit.getCurrentCredit() > sumProductCredit) {
                                    dCredit = sumProductCredit / currencyRate;
                                    customerCredit.setCurrentCredit(customerCredit.getCurrentCredit() - dCredit);
                                    sumProductCredit = 0;
                                } else {
                                    dCredit = customerCredit.getCurrentCredit();
                                    customerCredit.setCurrentCredit(0D);
                                    sumProductCredit -= dCredit;
                                }
                            }

                            if (customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.BOTH ||
                                customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.AMOUNT) {
                                if (customerCredit.getCurrentAmount() > sumAmount) {
                                    dAmount = sumAmount;
                                    customerCredit.setCurrentAmount(customerCredit.getCurrentAmount() - dAmount);
                                    sumAmount = 0;
                                } else {
                                    dAmount = customerCredit.getCurrentAmount();
                                    customerCredit.setCurrentAmount(0D);
                                    sumAmount -= customerCredit.getCurrentAmount();
                                }
                            }
                        }
                        break;
                        case COST: {
                            if (customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.BOTH ||
                                customerCredit.getParentBuyType().getTypeEffect() == TypeEffect.CREDIT) {
                                if (customerCredit.getCurrentCredit() > sumCostCredit) {
                                    dCredit = sumCostCredit / currencyRate;
                                    customerCredit.setCurrentCredit(customerCredit.getCurrentCredit() - dCredit);
                                    sumCostCredit = 0;
                                } else {
                                    dCredit = customerCredit.getCurrentCredit();
                                    customerCredit.setCurrentCredit(0D);
                                    sumCostCredit -= dCredit;
                                }
                            }
                        }
                        break;
                    }

                    customerCredit1 = getCustomerCredit(customerCredit, dCredit, dAmount);
                    credits.add(customerCredit1);

                }

                // todo اینجا مشکل داره باید نوع خرید مشخص شده باشد که مقداریا اعتبار کدام بررسی شود
                if (customerCreditList.size() <= 0 ||
                    (sumAmount > 0 && buyGroup == BuyGroup.QUOTA) ||
                    ((sumProductCredit > 0 || sumCostCredit > 0) && (buyGroup == BuyGroup.CREDIT || buyGroup == BuyGroup.FINANCIAL_LICENSE)))
                    if (assignCustomerCreditDTO.isReserve())
                        throw new CustomParameterizedException("error.not.enough.credit");
                    else
                        throw new CustomParameterizedException("error.not.enough.customerCredit." + buyGroup);

                customerCredits.addAll(customerCreditList);

            }
        }

        customerCreditRepository.save(customerCredits);
        return credits;
    }


    public void revertCustomerCredit(List<CustomerCreditDTO> customerCreditDTOS) {
        List<CustomerCredit> customerCredits = customerCreditRepository.findAllByIdIn(customerCreditDTOS
            .stream().map(CustomerCreditDTO::getId).collect(Collectors.toSet()));

        for (CustomerCredit customerCredit : customerCredits) {
            customerCreditDTOS.stream()
                .filter(customerCreditDTO -> customerCreditDTO.getId().equals(customerCredit.getId()))
                .forEach(customerCreditDTO -> {
                    Double credit = customerCreditDTO.getCurrentCredit();
                    Double amount = customerCreditDTO.getCurrentAmount();
                    if (customerCredit.getCurrentCredit() == null) {
                        customerCredit.setCurrentCredit(0d);
                    }
                    if (customerCredit.getCurrentAmount() == null) {
                        customerCredit.setCurrentAmount(0d);
                    }
                    if (credit != null && credit > 0)
                        customerCredit.setCurrentCredit(customerCredit.getCurrentCredit() + credit);
                    if (amount != null && amount > 0)
                        customerCredit.setCurrentAmount(customerCredit.getCurrentAmount() + amount);

                });
        }

        customerCreditRepository.save(customerCredits);
    }

    private CustomerCreditDTO getCustomerCredit(CustomerCredit customerCredit, Double credit, Double amount) {
        CustomerCreditDTO customerCreditDTO = new CustomerCreditDTO();
        customerCreditDTO.setCurrentCredit(credit);
        customerCreditDTO.setCurrentAmount(amount);
        customerCreditDTO.setId(customerCredit.getId());
        customerCreditDTO.setCreditNumber(customerCredit.getCreditNumber());
        customerCreditDTO.setParentBuyGroup(customerCredit.getParentBuyType().getBuyGroup());
        customerCreditDTO.setParentBuyTypeUsage(customerCredit.getParentBuyType().getBuyTypeUsage());
        if (customerCredit.getProduct() != null)
            customerCreditDTO.setProductId(customerCredit.getProduct().getId());
        return customerCreditDTO;
    }

    public List<CreditBuyTypeRemainedDTO> findAllRemainedByCustomer(Long customerId) {
        return customerCreditRepository.getRemainedCredits(customerId);
    }

    public List<CreditBuyTypeRemainedDTO> findAllRemainedByPerson(Long personId) {
        return customerCreditRepository.getRemainedCreditsByPerson(personId);
    }
}
