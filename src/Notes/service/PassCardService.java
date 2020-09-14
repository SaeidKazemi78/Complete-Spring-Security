package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.PassCard;
import ir.donyapardaz.niopdc.base.repository.PassCardRepository;
import ir.donyapardaz.niopdc.base.service.dto.PassCardDTO;
import ir.donyapardaz.niopdc.base.service.mapper.PassCardMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PassCard.
 */
@Service
@Transactional
public class PassCardService {

    private final Logger log = LoggerFactory.getLogger(PassCardService.class);

    private final PassCardRepository passCardRepository;

    private final PassCardMapper passCardMapper;

    public PassCardService(PassCardRepository passCardRepository, PassCardMapper passCardMapper) {
        this.passCardRepository = passCardRepository;
        this.passCardMapper = passCardMapper;
    }

    /**
     * Save a passCard.
     *
     * @param passCardDTO the entity to save
     * @return the persisted entity
     */
    public PassCardDTO save(PassCardDTO passCardDTO) {
        log.debug("Request to save PassCard : {}", passCardDTO);
        PassCard passCard = passCardMapper.toEntity(passCardDTO);
        passCard = passCardRepository.save(passCard);
        return passCardMapper.toDto(passCard);
    }

    /**
     * Get all the passCards.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PassCardDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PassCards");
        return passCardRepository.findAll(pageable)
            .map(passCardMapper::toDto);
    }

    /**
     * Get one passCard by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PassCardDTO findOne(Long id) {
        log.debug("Request to get PassCard : {}", id);
        PassCard passCard = passCardRepository.findOne(id);
        return passCardMapper.toDto(passCard);
    }

    /**
     * Delete the passCard by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PassCard : {}", id);
        passCardRepository.delete(id);
    }
}
