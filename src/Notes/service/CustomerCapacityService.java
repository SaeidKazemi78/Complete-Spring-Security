package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerCapacity;
import ir.donyapardaz.niopdc.base.repository.CustomerCapacityRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCapacityDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerCapacityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerCapacity.
 */
@Service
@Transactional
public class CustomerCapacityService {

    private final Logger log = LoggerFactory.getLogger(CustomerCapacityService.class);

    private final CustomerCapacityRepository customerCapacityRepository;

    private final CustomerCapacityMapper customerCapacityMapper;

    public CustomerCapacityService(CustomerCapacityRepository customerCapacityRepository, CustomerCapacityMapper customerCapacityMapper) {
        this.customerCapacityRepository = customerCapacityRepository;
        this.customerCapacityMapper = customerCapacityMapper;
    }

    /**
     * Save a customerCapacity.
     *
     * @param customerCapacityDTO the entity to save
     * @return the persisted entity
     */
    public CustomerCapacityDTO save(CustomerCapacityDTO customerCapacityDTO) {
        log.debug("Request to save CustomerCapacity : {}", customerCapacityDTO);
        CustomerCapacity customerCapacity = customerCapacityMapper.toEntity(customerCapacityDTO);
        customerCapacity = customerCapacityRepository.save(customerCapacity);
        return customerCapacityMapper.toDto(customerCapacity);
    }

    /**
     * Get all the customerCapacities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerCapacityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerCapacities");
        return customerCapacityRepository.findAll(pageable)
            .map(customerCapacityMapper::toDto);
    }

    /**
     * Get one customerCapacity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerCapacityDTO findOne(Long id) {
        log.debug("Request to get CustomerCapacity : {}", id);
        CustomerCapacity customerCapacity = customerCapacityRepository.findOne(id);
        return customerCapacityMapper.toDto(customerCapacity);
    }

    /**
     * Delete the customerCapacity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerCapacity : {}", id);
        customerCapacityRepository.delete(id);
    }
}
