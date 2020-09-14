package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.SellContractPerson;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.repository.SellContractPersonRepository;
import ir.donyapardaz.niopdc.base.service.dto.SellContractPersonDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractPersonMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;


/**
 * Service Implementation for managing SellContractPerson.
 */
@Service
@Transactional
public class SellContractPersonService {

    private final Logger log = LoggerFactory.getLogger(SellContractPersonService.class);

    private final SellContractPersonRepository sellContractPersonRepository;

    private final SellContractPersonMapper sellContractPersonMapper;

    public SellContractPersonService(SellContractPersonRepository sellContractPersonRepository, SellContractPersonMapper sellContractPersonMapper) {
        this.sellContractPersonRepository = sellContractPersonRepository;
        this.sellContractPersonMapper = sellContractPersonMapper;
    }

    /**
     * Save a sellContractPerson.
     *
     * @param sellContractPersonDTO the entity to save
     * @return the persisted entity
     */
    public SellContractPersonDTO save(SellContractPersonDTO sellContractPersonDTO) {
        log.debug("Request to save SellContractPerson : {}", sellContractPersonDTO);
        SellContractPerson sellContractPerson = sellContractPersonMapper.toEntity(sellContractPersonDTO);
        sellContractPerson = sellContractPersonRepository.save(sellContractPerson);
        return sellContractPersonMapper.toDto(sellContractPerson);
    }

    /**
     * Get all the sellContractPeople.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SellContractPersonDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SellContractPeople");
        return sellContractPersonRepository.findAll(pageable)
            .map(sellContractPersonMapper::toDto);
    }

    /**
     * Get one sellContractPerson by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SellContractPersonDTO findOne(Long id) {
        log.debug("Request to get SellContractPerson : {}", id);
        SellContractPerson sellContractPerson = sellContractPersonRepository.findOne(id);
        return sellContractPersonMapper.toDto(sellContractPerson);
    }

    /**
     * Delete the sellContractPerson by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SellContractPerson : {}", id);
        sellContractPersonRepository.delete(id);
    }

    public List<SellContractPersonDTO> findAllByDateAndActive(Instant startDate, Instant endDate) {

        return sellContractPersonMapper
            .toDto(sellContractPersonRepository
                .findAllSellContractByActiveSellContractAndTime(startDate, endDate));
    }

    public List<SellContractPersonDTO> findAllByContractType(ContractType contractType) {
        return sellContractPersonMapper.toDto(sellContractPersonRepository.findAllBySellContract_ContractType(contractType));
    }
}
