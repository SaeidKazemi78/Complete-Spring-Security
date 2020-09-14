package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CarRfId;
import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.CarRfIdDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CarRfIdMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;


/**
 * Service Implementation for managing CarRfId.
 */
@Service
@Transactional
public class CarRfIdService {

    private final Logger log = LoggerFactory.getLogger(CarRfIdService.class);

    private final CarRfIdRepository carRfIdRepository;

    private final CarRfIdMapper carRfIdMapper;

    private final BoundaryTagRepository boundaryTagRepository;
    private final TagRateRepository tagRateRepository;

    private final CustomerRepository customerRepository;
    private final LocationRepository locationRepository;

    public CarRfIdService(CarRfIdRepository carRfIdRepository, CarRfIdMapper carRfIdMapper, BoundaryTagRepository boundaryTagRepository, TagRateRepository tagRateRepository, CustomerRepository customerRepository, LocationRepository locationRepository) {
        this.carRfIdRepository = carRfIdRepository;
        this.carRfIdMapper = carRfIdMapper;
        this.boundaryTagRepository = boundaryTagRepository;
        this.tagRateRepository = tagRateRepository;
        this.customerRepository = customerRepository;
        this.locationRepository = locationRepository;
    }

    /**
     * Save a carRfId.
     *
     * @param carRfIdDTO the entity to save
     * @return the persisted entity
     */
    public CarRfIdDTO save(CarRfIdDTO carRfIdDTO) {
        log.debug("Request to save CarRfId : {}", carRfIdDTO);
        CarRfId carRfId = carRfIdMapper.toEntity(carRfIdDTO);


        if (carRfId.getId() != null) {
            CarRfId one = carRfIdRepository.findOne(carRfId.getId());
            if (one.isActive() && !carRfId.isActive())
                throw new CustomParameterizedException("error.400");
        }

        if (carRfId.isActive()) {
            carRfIdRepository.disableAllPreviousStatus(carRfIdDTO.getCustomerId());
            Customer customer = customerRepository.findOne(carRfIdDTO.getCustomerId());
            customer.setCarRfId(carRfIdDTO.getCode().toUpperCase());
            customerRepository.save(customer);
        } else if (!carRfId.isActive() && carRfId.getId() != null && carRfIdDTO.getCustomerId() != null) {
            Customer customer = customerRepository.findOne(carRfIdDTO.getCustomerId());
            if (customer.getCarRfId().equals(carRfId.getCode().toUpperCase())) {
                customer.setCarRfId(null);
                carRfIdRepository.disableAllPreviousStatus(carRfIdDTO.getCustomerId());
                customerRepository.save(customer);
            }

        }

        carRfId = carRfIdRepository.save(carRfId);
        return carRfIdMapper.toDto(carRfId);
    }

    /**
     * Get all the carRfIds.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CarRfIdDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CarRfIds");
        return carRfIdRepository.findAll(pageable)
            .map(carRfIdMapper::toDto);
    }

    /**
     * Get one carRfId by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CarRfIdDTO findOne(Long id) {
        log.debug("Request to get CarRfId : {}", id);
        CarRfId carRfId = carRfIdRepository.findOne(id);
        return carRfIdMapper.toDto(carRfId);
    }

    /**
     * Delete the carRfId by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CarRfId : {}", id);
        CarRfId carRfId = carRfIdRepository.findOne(id);
        if (carRfId.isActive()) {
            carRfId.getCustomer().setCarRfId(null);
            customerRepository.saveAndFlush(carRfId.getCustomer());
        }

        carRfIdRepository.delete(id);
    }

    public Long getCountRfIdForCustomer(Long customerId) {
        return carRfIdRepository.countAllByCustomer_Id(customerId);
    }
}
