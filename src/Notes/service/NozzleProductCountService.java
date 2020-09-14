package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.NozzleProductCount;
import ir.donyapardaz.niopdc.base.repository.NozzleProductCountRepository;
import ir.donyapardaz.niopdc.base.service.dto.NozzleProductCountDTO;
import ir.donyapardaz.niopdc.base.service.mapper.NozzleProductCountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing NozzleProductCount.
 */
@Service
@Transactional
public class NozzleProductCountService {

    private final Logger log = LoggerFactory.getLogger(NozzleProductCountService.class);

    private final NozzleProductCountRepository nozzleProductCountRepository;

    private final NozzleProductCountMapper nozzleProductCountMapper;

    public NozzleProductCountService(NozzleProductCountRepository nozzleProductCountRepository, NozzleProductCountMapper nozzleProductCountMapper) {
        this.nozzleProductCountRepository = nozzleProductCountRepository;
        this.nozzleProductCountMapper = nozzleProductCountMapper;
    }

    /**
     * Save a nozzleProductCount.
     *
     * @param nozzleProductCountDTO the entity to save
     * @return the persisted entity
     */
    public NozzleProductCountDTO save(NozzleProductCountDTO nozzleProductCountDTO) {
        log.debug("Request to save NozzleProductCount : {}", nozzleProductCountDTO);
        NozzleProductCount nozzleProductCount = nozzleProductCountMapper.toEntity(nozzleProductCountDTO);
        nozzleProductCount = nozzleProductCountRepository.save(nozzleProductCount);
        return nozzleProductCountMapper.toDto(nozzleProductCount);
    }

    /**
     * Get all the nozzleProductCounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<NozzleProductCountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all NozzleProductCounts");
        return nozzleProductCountRepository.findAll(pageable)
            .map(nozzleProductCountMapper::toDto);
    }

    /**
     * Get one nozzleProductCount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public NozzleProductCountDTO findOne(Long id) {
        log.debug("Request to get NozzleProductCount : {}", id);
        NozzleProductCount nozzleProductCount = nozzleProductCountRepository.findOne(id);
        return nozzleProductCountMapper.toDto(nozzleProductCount);
    }

    /**
     * Delete the nozzleProductCount by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete NozzleProductCount : {}", id);
        nozzleProductCountRepository.delete(id);
    }
}
