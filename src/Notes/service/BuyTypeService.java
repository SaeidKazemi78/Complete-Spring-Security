package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.BuyType;
import ir.donyapardaz.niopdc.base.domain.QBuyType;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import ir.donyapardaz.niopdc.base.repository.BuyTypeRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.BuyTypeDTO;
import ir.donyapardaz.niopdc.base.service.mapper.BuyTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing BuyType.
 */
@Service
@Transactional
public class BuyTypeService {

    private final Logger log = LoggerFactory.getLogger(BuyTypeService.class);

    private final BuyTypeRepository buyTypeRepository;

    private final BuyTypeMapper buyTypeMapper;

    public BuyTypeService(BuyTypeRepository buyTypeRepository, BuyTypeMapper buyTypeMapper) {
        this.buyTypeRepository = buyTypeRepository;
        this.buyTypeMapper = buyTypeMapper;
    }

    /**
     * Save a buyType.
     *
     * @param buyTypeDTO the entity to save
     * @return the persisted entity
     */
    public BuyTypeDTO save(BuyTypeDTO buyTypeDTO) {
        log.debug("Request to save BuyType : {}", buyTypeDTO);
        BuyType buyType = buyTypeMapper.toEntity(buyTypeDTO);

        if (buyType.getBuyGroup() == BuyGroup.CASH || buyType.getBuyGroup() == BuyGroup.QUOTA) {
            if (buyType.getBuyGroup() == BuyGroup.QUOTA) {
                buyType.setTypeEffect(TypeEffect.AMOUNT);
                buyType.setBuyTypeUsage(BuyTypeUsage.PRODUCT);
            } else {
                buyType.setTypeEffect(TypeEffect.CREDIT);
                buyType.setBuyTypeUsage(BuyTypeUsage.BOTH);
            }
            buyType.setSellLimit(false);
            buyType.setEffectDate(null);
        }

        buyType = buyTypeRepository.save(buyType);
        return buyTypeMapper.toDto(buyType);
    }

    /**
     * Get all the buyTypes.
     *
     * @param query
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BuyTypeDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all BuyTypes");
        List<BuyGroup> buyGroups = BuyGroup.getBuyGroups(false);
        //buyGroups.add(BuyGroup.CASH);
        Page<BuyType> result;
        if (query != null) {
            BooleanExpression where = new PredicatesBuilder().build(query, new PathBuilder<>(BuyType.class, "buyType"), null);
            where = where.and(QBuyType.buyType.buyGroup.in(buyGroups));
            result = buyTypeRepository.findAll(where, pageable);
        } else {
            result = buyTypeRepository.findAll(pageable);
        }
        return result.map(buyTypeMapper::toDto);
    }

    /**
     * Get all the buyTypes.
     *
     * @param customerId
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<BuyTypeDTO> findAllForCustomerCredit(Long customerId, Boolean isCredit) {
        log.debug("Request to get all BuyTypes");
        List<BuyGroup> buyGroups = BuyGroup.getBuyGroups(true);
        if (isCredit != null && isCredit) {
            buyGroups = buyGroups.stream().filter(c -> c.equals(BuyGroup.CREDIT)).collect(Collectors.toList());
        } else {
            buyGroups = buyGroups.stream().filter(c -> c.equals(BuyGroup.QUOTA) || c.equals(BuyGroup.FINANCIAL_LICENSE)).collect(Collectors.toList());
        }
        return buyTypeMapper.toDto(buyTypeRepository.findAllByBuyGroupInAndBuyGroup(customerId,
            buyGroups.size() > 0 ? buyGroups : null,
            new ArrayList<BuyGroup>() {{
                add(BuyGroup.CASH);
            }}));
    }

    /**
     * Get all the buyTypes.
     *
     * @param customerId
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<BuyTypeDTO> findAllForSellContractProduct(Long customerId) {
        log.debug("Request to get all BuyTypes");
        List<BuyGroup> buyGroups = BuyGroup.getBuyGroups(true);
        buyGroups.add(BuyGroup.CASH);
        List<BuyType> buyTypes = customerId == null ?
            buyTypeRepository.findByBuyGroup(BuyGroup.CASH) :
            buyTypeRepository.findAllByBuyGroupInAndBuyGroup(customerId, buyGroups,
                new ArrayList<BuyGroup>() {{
                    add(BuyGroup.QUOTA);
                }}
            );
        return buyTypeMapper.toDto(buyTypes);
    }

    /**
     * Get one buyType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BuyTypeDTO findOne(Long id) {
        log.debug("Request to get BuyType : {}", id);
        BuyType buyType = buyTypeRepository.findOne(id);
        return buyTypeMapper.toDto(buyType);
    }

    @Transactional(readOnly = true)
    public BuyTypeDTO getQuota() {
        List<BuyType> list = buyTypeRepository.findByBuyGroup(BuyGroup.QUOTA);
        if (list != null && list.size() > 0)
            return buyTypeMapper.toDto(list.get(0));

        return null;
    }

    /**
     * Delete the buyType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BuyType : {}", id);
        buyTypeRepository.delete(id);
    }
}
