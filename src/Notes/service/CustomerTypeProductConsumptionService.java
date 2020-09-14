package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Consumption;
import ir.donyapardaz.niopdc.base.domain.CustomerTypeProductConsumption;
import ir.donyapardaz.niopdc.base.repository.CustomerTypeProductConsumptionRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeProductConsumptionDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerTypeProductConsumptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing CustomerTypeProductConsumption.
 */
@Service
@Transactional
public class CustomerTypeProductConsumptionService {

    private final Logger log = LoggerFactory.getLogger(CustomerTypeProductConsumptionService.class);

    private final CustomerTypeProductConsumptionRepository customerTypeProductConsumptionRepository;

    private final CustomerTypeProductConsumptionMapper customerTypeProductConsumptionMapper;

    public CustomerTypeProductConsumptionService(CustomerTypeProductConsumptionRepository customerTypeProductConsumptionRepository, CustomerTypeProductConsumptionMapper customerTypeProductConsumptionMapper) {
        this.customerTypeProductConsumptionRepository = customerTypeProductConsumptionRepository;
        this.customerTypeProductConsumptionMapper = customerTypeProductConsumptionMapper;
    }

    /**
     * Save a customerTypeProductConsumption.
     *
     * @param customerTypeProductConsumptionDTO the entity to save
     * @return the persisted entity
     */
    public CustomerTypeProductConsumptionDTO save(CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO) {
        log.debug("Request to save CustomerTypeProductConsumption : {}", customerTypeProductConsumptionDTO);
        CustomerTypeProductConsumption customerTypeProductConsumption = customerTypeProductConsumptionMapper.toEntity(customerTypeProductConsumptionDTO);
        customerTypeProductConsumption = customerTypeProductConsumptionRepository.save(customerTypeProductConsumption);
        return customerTypeProductConsumptionMapper.toDto(customerTypeProductConsumption);
    }

    /**
     * Get all the customerTypeProductConsumptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerTypeProductConsumptionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerTypeProductConsumptions");
        return customerTypeProductConsumptionRepository.findAll(pageable)
            .map(customerTypeProductConsumptionMapper::toDto);
    }

    /**
     * Get one customerTypeProductConsumption by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerTypeProductConsumptionDTO findOne(Long id) {
        log.debug("Request to get CustomerTypeProductConsumption : {}", id);
        CustomerTypeProductConsumption customerTypeProductConsumption = customerTypeProductConsumptionRepository.findOne(id);
        return customerTypeProductConsumptionMapper.toDto(customerTypeProductConsumption);
    }

    /**
     * Delete the customerTypeProductConsumption by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerTypeProductConsumption : {}", id);
        customerTypeProductConsumptionRepository.delete(id);
    }

    public List<Consumption> findAllByProductIdAndCustomerId(Long productId, Long customerId) {
        return customerTypeProductConsumptionRepository.findAllConsumptionByProductAndCustomer(customerId);
    }
}
