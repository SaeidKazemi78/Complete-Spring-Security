package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerScore;
import ir.donyapardaz.niopdc.base.repository.CustomerScoreRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerScoreDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerScoreMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerScore.
 */
@Service
@Transactional
public class CustomerScoreService {

    private final Logger log = LoggerFactory.getLogger(CustomerScoreService.class);

    private final CustomerScoreRepository customerScoreRepository;

    private final CustomerScoreMapper customerScoreMapper;

    public CustomerScoreService(CustomerScoreRepository customerScoreRepository, CustomerScoreMapper customerScoreMapper) {
        this.customerScoreRepository = customerScoreRepository;
        this.customerScoreMapper = customerScoreMapper;
    }

    /**
     * Save a customerScore.
     *
     * @param customerScoreDTO the entity to save
     * @return the persisted entity
     */
    public CustomerScoreDTO save(CustomerScoreDTO customerScoreDTO) {
        log.debug("Request to save CustomerScore : {}", customerScoreDTO);
        CustomerScore customerScore = customerScoreMapper.toEntity(customerScoreDTO);
        customerScore = customerScoreRepository.save(customerScore);
        return customerScoreMapper.toDto(customerScore);
    }

    /**
     * Get all the customerScores.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerScoreDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerScores");
        return customerScoreRepository.findAll(pageable)
            .map(customerScoreMapper::toDto);
    }

    /**
     * Get one customerScore by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerScoreDTO findOne(Long id) {
        log.debug("Request to get CustomerScore : {}", id);
        CustomerScore customerScore = customerScoreRepository.findOne(id);
        return customerScoreMapper.toDto(customerScore);
    }

    /**
     * Delete the customerScore by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerScore : {}", id);
        customerScoreRepository.delete(id);
    }
}
