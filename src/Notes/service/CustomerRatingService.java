package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerRating;
import ir.donyapardaz.niopdc.base.repository.CustomerRatingRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerRatingDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerRatingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerRating.
 */
@Service
@Transactional
public class CustomerRatingService {

    private final Logger log = LoggerFactory.getLogger(CustomerRatingService.class);

    private final CustomerRatingRepository customerRatingRepository;

    private final CustomerRatingMapper customerRatingMapper;


    public CustomerRatingService(CustomerRatingRepository customerRatingRepository, CustomerRatingMapper customerRatingMapper) {
        this.customerRatingRepository = customerRatingRepository;
        this.customerRatingMapper = customerRatingMapper;
    }

    /**
     * Save a customerRating.
     *
     * @param customerRatingDTO the entity to save
     * @return the persisted entity
     */
    public CustomerRatingDTO save(CustomerRatingDTO customerRatingDTO) {
        log.debug("Request to save CustomerRating : {}", customerRatingDTO);
        CustomerRating customerRating = customerRatingMapper.toEntity(customerRatingDTO);
        customerRating = customerRatingRepository.save(customerRating);
        return customerRatingMapper.toDto(customerRating);
    }

    /**
     * Get all the customerRatings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerRatingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerRatings");
        return customerRatingRepository.findAll(pageable)
            .map(customerRatingMapper::toDto);
    }

    /**
     * Get one customerRating by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerRatingDTO findOne(Long id) {
        log.debug("Request to get CustomerRating : {}", id);
        CustomerRating customerRating = customerRatingRepository.findOneWithEagerRelationships(id);
        return customerRatingMapper.toDto(customerRating);
    }

    /**
     * Delete the customerRating by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerRating : {}", id);
        customerRatingRepository.delete(id);
    }
}
