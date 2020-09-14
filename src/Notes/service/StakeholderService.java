package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Stakeholder;
import ir.donyapardaz.niopdc.base.repository.StakeholderRepository;
import ir.donyapardaz.niopdc.base.service.dto.StakeholderDTO;
import ir.donyapardaz.niopdc.base.service.mapper.StakeholderMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Stakeholder.
 */
@Service
@Transactional
public class StakeholderService {

    private final Logger log = LoggerFactory.getLogger(StakeholderService.class);

    private final StakeholderRepository stakeholderRepository;

    private final StakeholderMapper stakeholderMapper;

    public StakeholderService(StakeholderRepository stakeholderRepository, StakeholderMapper stakeholderMapper) {
        this.stakeholderRepository = stakeholderRepository;
        this.stakeholderMapper = stakeholderMapper;
    }

    /**
     * Save a stakeholder.
     *
     * @param stakeholderDTO the entity to save
     * @return the persisted entity
     */
    public StakeholderDTO save(StakeholderDTO stakeholderDTO) {
        log.debug("Request to save Stakeholder : {}", stakeholderDTO);
        Stakeholder stakeholder = stakeholderMapper.toEntity(stakeholderDTO);
        stakeholder = stakeholderRepository.save(stakeholder);
        return stakeholderMapper.toDto(stakeholder);
    }

    /**
     * Get all the stakeholders.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<StakeholderDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Stakeholders");
        return stakeholderRepository.findAll(pageable)
            .map(stakeholderMapper::toDto);
    }

    /**
     * Get one stakeholder by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public StakeholderDTO findOne(Long id) {
        log.debug("Request to get Stakeholder : {}", id);
        Stakeholder stakeholder = stakeholderRepository.findOne(id);
        return stakeholderMapper.toDto(stakeholder);
    }

    /**
     * Delete the stakeholder by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Stakeholder : {}", id);
        stakeholderRepository.delete(id);
    }
}
