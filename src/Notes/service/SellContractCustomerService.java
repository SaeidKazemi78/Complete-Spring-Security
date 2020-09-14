package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.SellContractCustomer;
import ir.donyapardaz.niopdc.base.repository.DepotRepository;
import ir.donyapardaz.niopdc.base.repository.SellContractCustomerRepository;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerDTO;
import ir.donyapardaz.niopdc.base.service.mapper.DepotMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractCustomerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SellContractCustomer.
 */
@Service
@Transactional
public class SellContractCustomerService {

    private final Logger log = LoggerFactory.getLogger(SellContractCustomerService.class);

    private final SellContractCustomerRepository sellContractCustomerRepository;

    private final SellContractCustomerMapper sellContractCustomerMapper;

    public SellContractCustomerService(SellContractCustomerRepository sellContractCustomerRepository, SellContractCustomerMapper sellContractCustomerMapper) {
        this.sellContractCustomerRepository = sellContractCustomerRepository;
        this.sellContractCustomerMapper = sellContractCustomerMapper;
    }

    /**
     * Save a sellContractCustomer.
     *
     * @param sellContractCustomerDTO the entity to save
     * @return the persisted entity
     */
    public SellContractCustomerDTO save(SellContractCustomerDTO sellContractCustomerDTO) {
        log.debug("Request to save SellContractCustomer : {}", sellContractCustomerDTO);
        SellContractCustomer sellContractCustomer = sellContractCustomerMapper.toEntity(sellContractCustomerDTO);
        sellContractCustomer = sellContractCustomerRepository.save(sellContractCustomer);
        return sellContractCustomerMapper.toDto(sellContractCustomer);
    }

    /**
     * Get all the sellContractCustomers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SellContractCustomerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SellContractCustomers");
        return sellContractCustomerRepository.findAll(pageable)
            .map(sellContractCustomerMapper::toDto);
    }

    /**
     * Get one sellContractCustomer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SellContractCustomerDTO findOne(Long id) {
        log.debug("Request to get SellContractCustomer : {}", id);
        SellContractCustomer sellContractCustomer = sellContractCustomerRepository.findOne(id);
        return sellContractCustomerMapper.toDto(sellContractCustomer);
    }

    /**
     * Delete the sellContractCustomer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SellContractCustomer : {}", id);
        sellContractCustomerRepository.delete(id);
    }

}
