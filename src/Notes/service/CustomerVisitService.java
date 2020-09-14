package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerVisit;
import ir.donyapardaz.niopdc.base.repository.CustomerVisitRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerVisitDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerVisitMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerVisit.
 */
@Service
@Transactional
public class CustomerVisitService {

    private final Logger log = LoggerFactory.getLogger(CustomerVisitService.class);

    private final CustomerVisitRepository customerVisitRepository;

    private final CustomerVisitMapper customerVisitMapper;

    public CustomerVisitService(CustomerVisitRepository customerVisitRepository, CustomerVisitMapper customerVisitMapper) {
        this.customerVisitRepository = customerVisitRepository;
        this.customerVisitMapper = customerVisitMapper;
    }

    /**
     * Save a customerVisit.
     *
     * @param customerVisitDTO the entity to save
     * @return the persisted entity
     */
    public CustomerVisitDTO save(CustomerVisitDTO customerVisitDTO) {
        log.debug("Request to save CustomerVisit : {}", customerVisitDTO);
        CustomerVisit customerVisit = customerVisitMapper.toEntity(customerVisitDTO);
        customerVisit = customerVisitRepository.save(customerVisit);
        return customerVisitMapper.toDto(customerVisit);
    }

    /**
     * Get all the customerVisits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerVisitDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerVisits");
        return customerVisitRepository.findAll(pageable)
            .map(customerVisitMapper::toDto);
    }

    /**
     * Get one customerVisit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerVisitDTO findOne(Long id) {
        log.debug("Request to get CustomerVisit : {}", id);
        CustomerVisit customerVisit = customerVisitRepository.findOne(id);
        return customerVisitMapper.toDto(customerVisit);
    }

    /**
     * Delete the customerVisit by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerVisit : {}", id);
        customerVisitRepository.delete(id);
    }
}
