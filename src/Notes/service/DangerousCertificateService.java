package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.DangerousCertificate;
import ir.donyapardaz.niopdc.base.repository.DangerousCertificateRepository;
import ir.donyapardaz.niopdc.base.service.dto.DangerousCertificateDTO;
import ir.donyapardaz.niopdc.base.service.mapper.DangerousCertificateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing DangerousCertificate.
 */
@Service
@Transactional
public class DangerousCertificateService {

    private final Logger log = LoggerFactory.getLogger(DangerousCertificateService.class);

    private final DangerousCertificateRepository dangerousCertificateRepository;

    private final DangerousCertificateMapper dangerousCertificateMapper;

    public DangerousCertificateService(DangerousCertificateRepository dangerousCertificateRepository, DangerousCertificateMapper dangerousCertificateMapper) {
        this.dangerousCertificateRepository = dangerousCertificateRepository;
        this.dangerousCertificateMapper = dangerousCertificateMapper;
    }

    /**
     * Save a dangerousCertificate.
     *
     * @param dangerousCertificateDTO the entity to save
     * @return the persisted entity
     */
    public DangerousCertificateDTO save(DangerousCertificateDTO dangerousCertificateDTO) {
        log.debug("Request to save DangerousCertificate : {}", dangerousCertificateDTO);
        DangerousCertificate dangerousCertificate = dangerousCertificateMapper.toEntity(dangerousCertificateDTO);
        dangerousCertificate = dangerousCertificateRepository.save(dangerousCertificate);
        return dangerousCertificateMapper.toDto(dangerousCertificate);
    }

    /**
     * Get all the dangerousCertificates.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DangerousCertificateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DangerousCertificates");
        return dangerousCertificateRepository.findAll(pageable)
            .map(dangerousCertificateMapper::toDto);
    }

    /**
     * Get one dangerousCertificate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DangerousCertificateDTO findOne(Long id) {
        log.debug("Request to get DangerousCertificate : {}", id);
        DangerousCertificate dangerousCertificate = dangerousCertificateRepository.findOne(id);
        return dangerousCertificateMapper.toDto(dangerousCertificate);
    }

    /**
     * Delete the dangerousCertificate by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DangerousCertificate : {}", id);
        dangerousCertificateRepository.delete(id);
    }
}
