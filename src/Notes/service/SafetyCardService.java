package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.SafetyCard;
import ir.donyapardaz.niopdc.base.repository.SafetyCardRepository;
import ir.donyapardaz.niopdc.base.service.dto.SafetyCardDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SafetyCardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SafetyCard.
 */
@Service
@Transactional
public class SafetyCardService {

    private final Logger log = LoggerFactory.getLogger(SafetyCardService.class);

    private final SafetyCardRepository safetyCardRepository;

    private final SafetyCardMapper safetyCardMapper;

    public SafetyCardService(SafetyCardRepository safetyCardRepository, SafetyCardMapper safetyCardMapper) {
        this.safetyCardRepository = safetyCardRepository;
        this.safetyCardMapper = safetyCardMapper;
    }

    /**
     * Save a safetyCard.
     *
     * @param safetyCardDTO the entity to save
     * @return the persisted entity
     */
    public SafetyCardDTO save(SafetyCardDTO safetyCardDTO) {
        log.debug("Request to save SafetyCard : {}", safetyCardDTO);
        SafetyCard safetyCard = safetyCardMapper.toEntity(safetyCardDTO);
        safetyCard = safetyCardRepository.save(safetyCard);
        return safetyCardMapper.toDto(safetyCard);
    }

    /**
     * Get all the safetyCards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SafetyCardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SafetyCards");
        return safetyCardRepository.findAll(pageable)
            .map(safetyCardMapper::toDto);
    }

    /**
     * Get one safetyCard by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SafetyCardDTO findOne(Long id) {
        log.debug("Request to get SafetyCard : {}", id);
        SafetyCard safetyCard = safetyCardRepository.findOne(id);
        return safetyCardMapper.toDto(safetyCard);
    }

    /**
     * Delete the safetyCard by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SafetyCard : {}", id);
        safetyCardRepository.delete(id);
    }
}
