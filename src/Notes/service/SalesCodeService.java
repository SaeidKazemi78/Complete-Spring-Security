package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.SalesCode;
import ir.donyapardaz.niopdc.base.repository.SalesCodeRepository;
import ir.donyapardaz.niopdc.base.service.dto.SalesCodeDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SalesCodeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing SalesCode.
 */
@Service
@Transactional
public class SalesCodeService {

    private final Logger log = LoggerFactory.getLogger(SalesCodeService.class);

    private final SalesCodeRepository salesCodeRepository;

    private final SalesCodeMapper salesCodeMapper;

    public SalesCodeService(SalesCodeRepository salesCodeRepository, SalesCodeMapper salesCodeMapper) {
        this.salesCodeRepository = salesCodeRepository;
        this.salesCodeMapper = salesCodeMapper;
    }

    /**
     * Save a salesCode.
     *
     * @param salesCodeDTO the entity to save
     * @return the persisted entity
     */
    public SalesCodeDTO save(SalesCodeDTO salesCodeDTO) {
        log.debug("Request to save SalesCode : {}", salesCodeDTO);
        SalesCode salesCode = salesCodeMapper.toEntity(salesCodeDTO);
        salesCode = salesCodeRepository.save(salesCode);
        return salesCodeMapper.toDto(salesCode);
    }

    /**
     * Get all the salesCodes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<SalesCodeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SalesCodes");
        return salesCodeRepository.findAll(pageable)
            .map(salesCodeMapper::toDto);
    }

    /**
     * Get one salesCode by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SalesCodeDTO findOne(Long id) {
        log.debug("Request to get SalesCode : {}", id);
        SalesCode salesCode = salesCodeRepository.findOne(id);
        return salesCodeMapper.toDto(salesCode);
    }

    /**
     * Delete the salesCode by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SalesCode : {}", id);
        salesCodeRepository.delete(id);
    }
}
