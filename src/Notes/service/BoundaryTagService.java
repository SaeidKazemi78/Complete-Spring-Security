package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.BoundaryTag;
import ir.donyapardaz.niopdc.base.repository.BoundaryTagRepository;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryTagDTO;
import ir.donyapardaz.niopdc.base.service.mapper.BoundaryTagMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BoundaryTag.
 */
@Service
@Transactional
public class BoundaryTagService {

    private final Logger log = LoggerFactory.getLogger(BoundaryTagService.class);

    private final BoundaryTagRepository boundaryTagRepository;

    private final BoundaryTagMapper boundaryTagMapper;

    public BoundaryTagService(BoundaryTagRepository boundaryTagRepository, BoundaryTagMapper boundaryTagMapper) {
        this.boundaryTagRepository = boundaryTagRepository;
        this.boundaryTagMapper = boundaryTagMapper;
    }

    /**
     * Save a boundaryTag.
     *
     * @param boundaryTagDTO the entity to save
     * @return the persisted entity
     */
    public BoundaryTagDTO save(BoundaryTagDTO boundaryTagDTO) {
        log.debug("Request to save BoundaryTag : {}", boundaryTagDTO);
        BoundaryTag boundaryTag = boundaryTagMapper.toEntity(boundaryTagDTO);
        boundaryTag = boundaryTagRepository.save(boundaryTag);
        return boundaryTagMapper.toDto(boundaryTag);
    }

    /**
     * Get all the boundaryTags.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BoundaryTagDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BoundaryTags");
        return boundaryTagRepository.findAll(pageable)
            .map(boundaryTagMapper::toDto);
    }

    /**
     * Get one boundaryTag by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BoundaryTagDTO findOne(Long id) {
        log.debug("Request to get BoundaryTag : {}", id);
        BoundaryTag boundaryTag = boundaryTagRepository.findOne(id);
        return boundaryTagMapper.toDto(boundaryTag);
    }

    /**
     * Delete the boundaryTag by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BoundaryTag : {}", id);
        boundaryTagRepository.delete(id);
    }
}
