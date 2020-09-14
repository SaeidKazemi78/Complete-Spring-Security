package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.TagRate;
import ir.donyapardaz.niopdc.base.repository.TagRateRepository;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.TagRateDTO;
import ir.donyapardaz.niopdc.base.service.mapper.TagRateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing TagRate.
 */
@Service
@Transactional
public class TagRateService {

    private final Logger log = LoggerFactory.getLogger(TagRateService.class);

    private final TagRateRepository tagRateRepository;

    private final TagRateMapper tagRateMapper;

    public TagRateService(TagRateRepository tagRateRepository, TagRateMapper tagRateMapper) {
        this.tagRateRepository = tagRateRepository;
        this.tagRateMapper = tagRateMapper;
    }

    /**
     * Save a tagRate.
     *
     * @param tagRateDTO the entity to save
     * @return the persisted entity
     */
    public TagRateDTO save(TagRateDTO tagRateDTO) {
        log.debug("Request to save TagRate : {}", tagRateDTO);
        TagRate tagRate = tagRateMapper.toEntity(tagRateDTO);
        tagRate = tagRateRepository.save(tagRate);
        return tagRateMapper.toDto(tagRate);
    }

    /**
     * Get all the tagRates.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TagRateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all TagRates");
        return tagRateRepository.findAll(pageable)
            .map(tagRateMapper::toDto);
    }

    /**
     * Get one tagRate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public TagRateDTO findOne(Long id) {
        log.debug("Request to get TagRate : {}", id);
        TagRate tagRate = tagRateRepository.findOne(id);
        return tagRateMapper.toDto(tagRate);
    }

    /**
     * Delete the tagRate by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete TagRate : {}", id);
        tagRateRepository.delete(id);
    }

    public List<TagRateDTO> findAllByLocationAccess() {
        return tagRateMapper.toDto(tagRateRepository.findAllByLocationAccess(SecurityUtils.getCurrentUserLogin().get()));
    }
}
