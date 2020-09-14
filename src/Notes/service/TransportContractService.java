package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.TransportContract;
import ir.donyapardaz.niopdc.base.repository.TransportContractRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.TransportContractDTO;
import ir.donyapardaz.niopdc.base.service.mapper.TransportContractMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing TransportContract.
 */
@Service
@Transactional
public class TransportContractService {

    private final Logger log = LoggerFactory.getLogger(TransportContractService.class);
    private final CustomerService customerService;
    private final TransportContractRepository transportContractRepository;

    private final TransportContractMapper transportContractMapper;

    public TransportContractService(CustomerService customerService, TransportContractRepository transportContractRepository, TransportContractMapper transportContractMapper) {
        this.customerService = customerService;
        this.transportContractRepository = transportContractRepository;
        this.transportContractMapper = transportContractMapper;
    }

    /**
     * Save a transportContract.
     *
     * @param transportContractDTO the entity to save
     * @return the persisted entity
     */
    public TransportContractDTO save(TransportContractDTO transportContractDTO) {
        log.debug("Request to save TransportContract : {}", transportContractDTO);
        Boolean result = customerService.customerHasFare(transportContractDTO.getCustomerId());
        if (result)
            throw new CustomParameterizedException("error.transport.contract.not.transport.fare");
        TransportContract transportContract = transportContractMapper.toEntity(transportContractDTO);
        transportContract = transportContractRepository.save(transportContract);
        return transportContractMapper.toDto(transportContract);
    }

    /**
     * Get all the transportContracts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TransportContractDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all TransportContracts");

        Page<TransportContract> result;
        if (query != null)
            result = transportContractRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(TransportContract.class, "transportContract"), null), pageable);
        else
            result = transportContractRepository.findAll(pageable);
        return result
            .map(transportContractMapper::toDto);
    }

    /**
     * Get one transportContract by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public TransportContractDTO findOne(Long id) {
        log.debug("Request to get TransportContract : {}", id);
        TransportContract transportContract = transportContractRepository.findOne(id);
        return transportContractMapper.toDto(transportContract);
    }

    /**
     * Delete the transportContract by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TransportContract : {}", id);
        transportContractRepository.delete(id);
    }

    public void confirm(Long id) {
        log.debug("Request to confirm TransportContract : {}", id);
        TransportContract transportContract = transportContractRepository.findOne(id);
        if (transportContract != null) {
            if (transportContract.getConfirm() == null) {
                transportContract.setConfirm(true);
            } else {
                transportContract.setConfirm(!transportContract.getConfirm());
            }
            transportContractRepository.save(transportContract);
        }
    }

    public void revertConfirm(Long id) {
        confirm(id);
    }
}
