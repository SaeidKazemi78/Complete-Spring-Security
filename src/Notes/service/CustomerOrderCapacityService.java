package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerOrderCapacity;
import ir.donyapardaz.niopdc.base.repository.CustomerOrderCapacityRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerOrderCapacityDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerOrderCapacityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerOrderCapacity.
 */
@Service
@Transactional
public class CustomerOrderCapacityService {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderCapacityService.class);

    private final CustomerOrderCapacityRepository customerOrderCapacityRepository;

    private final CustomerOrderCapacityMapper customerOrderCapacityMapper;

    public CustomerOrderCapacityService(CustomerOrderCapacityRepository customerOrderCapacityRepository, CustomerOrderCapacityMapper customerOrderCapacityMapper) {
        this.customerOrderCapacityRepository = customerOrderCapacityRepository;
        this.customerOrderCapacityMapper = customerOrderCapacityMapper;
    }

    /**
     * Get one customerOrderCapacity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerOrderCapacityDTO findOne(Long id) {
        log.debug("Request to get CustomerOrderCapacity : {}", id);
        CustomerOrderCapacity customerOrderCapacity = customerOrderCapacityRepository.findOne(id);
        return customerOrderCapacityMapper.toDto(customerOrderCapacity);
    }

    /**
     * Delete the customerOrderCapacity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerOrderCapacity : {}", id);
        customerOrderCapacityRepository.delete(id);
    }

    public void active(Long id) {
        log.debug("Request to active CustomerOrderCapacity : {}", id);
        CustomerOrderCapacity customerOrderCapacity = customerOrderCapacityRepository.findOne(id);
        customerOrderCapacity.setActive(true);
        customerOrderCapacityRepository.save(customerOrderCapacity);
    }

    public void deActive(Long id) {
        log.debug("Request to deActive CustomerOrderCapacity : {}", id);
        CustomerOrderCapacity customerOrderCapacity = customerOrderCapacityRepository.findOne(id);
        customerOrderCapacity.setActive(false);
        customerOrderCapacityRepository.save(customerOrderCapacity);
    }
}
