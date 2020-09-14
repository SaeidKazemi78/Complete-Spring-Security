package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import ir.donyapardaz.niopdc.base.repository.CustomerDeactiveRuleRepository;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.CustomerDeactiveRuleDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.BillDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerDeactiveRuleMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
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
 * Service Implementation for managing CustomerDeactiveRule.
 */
@Service
@Transactional
public class CustomerDeactiveRuleService {

    private final Logger log = LoggerFactory.getLogger(CustomerDeactiveRuleService.class);

    private final CustomerDeactiveRuleRepository customerDeactiveRuleRepository;

    private final CustomerDeactiveRuleMapper customerDeactiveRuleMapper;

    public CustomerDeactiveRuleService(CustomerDeactiveRuleRepository customerDeactiveRuleRepository, CustomerDeactiveRuleMapper customerDeactiveRuleMapper) {
        this.customerDeactiveRuleRepository = customerDeactiveRuleRepository;
        this.customerDeactiveRuleMapper = customerDeactiveRuleMapper;
    }

    /**
     * Save a customerDeactiveRule.
     *
     * @param customerDeactiveRuleDTO the entity to save
     * @return the persisted entity
     */
    public CustomerDeactiveRuleDTO save(CustomerDeactiveRuleDTO customerDeactiveRuleDTO) {
        log.debug("Request to save CustomerDeactiveRule : {}", customerDeactiveRuleDTO);
        if ((customerDeactiveRuleDTO.getPeriodic() != null && customerDeactiveRuleDTO.getPeriodic()) &&
            (customerDeactiveRuleDTO.getStartPeriodDay() == null
                || customerDeactiveRuleDTO.getEndPeriodDay() == null
                || customerDeactiveRuleDTO.getEndPeriodDay() < customerDeactiveRuleDTO.getStartPeriodDay())) {
            throw new CustomParameterizedException("error.periodic.data.invalid");
        }
        CustomerDeactiveRule customerDeactiveRule = customerDeactiveRuleMapper.toEntity(customerDeactiveRuleDTO);
        customerDeactiveRule = customerDeactiveRuleRepository.save(customerDeactiveRule);
        return customerDeactiveRuleMapper.toDto(customerDeactiveRule);
    }

    /**
     * Get all the customerDeactiveRules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerDeactiveRuleDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all CustomerDeactiveRules");
        Page<CustomerDeactiveRule> result = customerDeactiveRuleRepository.findAll(query, pageable);

        return result.map(customerDeactiveRuleMapper::toDto);
    }

    /**
     * Get one customerDeactiveRule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerDeactiveRuleDTO findOne(Long id) {
        log.debug("Request to get CustomerDeactiveRule : {}", id);
        CustomerDeactiveRule customerDeactiveRule = customerDeactiveRuleRepository.findOneWithEagerRelationships(id);
        return customerDeactiveRuleMapper.toDto(customerDeactiveRule);
    }

    /**
     * Delete the customerDeactiveRule by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerDeactiveRule : {}", id);
        customerDeactiveRuleRepository.delete(id);
    }

   /* @Transactional(readOnly = true)
    public boolean checkDeactiveRule(ZonedDateTime startDate, ZonedDateTime finishDate, Long locationID, String sellContractCode, String customerCode, Long customerTypesId) {
        log.debug("Request to get CustomerDeactiveRule for : {}", startDate, finishDate, locationID, sellContractCode, customerCode, customerTypesId);
        if (startDate == null)
            startDate = ZonedDateTime.now();
        if (finishDate == null)
            finishDate = ZonedDateTime.now();
        List<CustomerDeactiveRule> customerDeactiveRule = customerDeactiveRuleRepository.findAllWithAllParam(startDate, finishDate, locationID, sellContractCode, customerCode, customerTypesId);
        if (customerDeactiveRule.size() != 0)
            return false;
        else
            return true;
    }*/


    public Boolean checkActive(BillDTO bill) {

        return customerDeactiveRuleRepository.checkActive(
            bill.getLocationId(),
            bill.getSellContractId(),
            bill.getCustomerId(),
            bill.getStartDate(),
            bill.getFinishDate())
            .equals(0);
    }

    public List<CustomerDeactiveRuleDTO> checkCustomerDeactive(Long customerId, Long customerTypeId, Long locationId) {
        List<CustomerDeactiveRule> rules = customerDeactiveRuleRepository.checkActive(customerId, SecurityUtils.getCurrentUserLogin().get());
        if (rules == null || rules.size() <= 0)
            return new ArrayList<>();

        return rules.stream().map(customerDeactiveRuleMapper::toDto).collect(Collectors.toList());
    }
}
