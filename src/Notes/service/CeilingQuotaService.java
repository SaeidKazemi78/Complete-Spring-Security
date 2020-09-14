package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CeilingQuota;
import ir.donyapardaz.niopdc.base.repository.CeilingQuotaRepository;
import ir.donyapardaz.niopdc.base.service.dto.CeilingQuotaDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CeilingQuotaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CeilingQuota.
 */
@Service
@Transactional
public class CeilingQuotaService {

    private final Logger log = LoggerFactory.getLogger(CeilingQuotaService.class);

    private final CeilingQuotaRepository ceilingQuotaRepository;

    private final CeilingQuotaMapper ceilingQuotaMapper;

    public CeilingQuotaService(CeilingQuotaRepository ceilingQuotaRepository, CeilingQuotaMapper ceilingQuotaMapper) {
        this.ceilingQuotaRepository = ceilingQuotaRepository;
        this.ceilingQuotaMapper = ceilingQuotaMapper;
    }

    /**
     * Save a ceilingQuota.
     *
     * @param ceilingQuotaDTO the entity to save
     * @return the persisted entity
     */
    public CeilingQuotaDTO save(CeilingQuotaDTO ceilingQuotaDTO) {
        log.debug("Request to save CeilingQuota : {}", ceilingQuotaDTO);
        CeilingQuota ceilingQuota = ceilingQuotaMapper.toEntity(ceilingQuotaDTO);
        ceilingQuota = ceilingQuotaRepository.save(ceilingQuota);
        return ceilingQuotaMapper.toDto(ceilingQuota);
    }

    /**
     * Get all the ceilingQuotas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CeilingQuotaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CeilingQuotas");
        return ceilingQuotaRepository.findAll(pageable)
            .map(ceilingQuotaMapper::toDto);
    }

    /**
     * Get one ceilingQuota by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CeilingQuotaDTO findOne(Long id) {
        log.debug("Request to get CeilingQuota : {}", id);
        CeilingQuota ceilingQuota = ceilingQuotaRepository.findOne(id);
        return ceilingQuotaMapper.toDto(ceilingQuota);
    }

    /**
     * Delete the ceilingQuota by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CeilingQuota : {}", id);
        ceilingQuotaRepository.delete(id);
    }
}
