package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.DriveSecurity;
import ir.donyapardaz.niopdc.base.repository.DriveSecurityRepository;
import ir.donyapardaz.niopdc.base.service.dto.DriveSecurityDTO;
import ir.donyapardaz.niopdc.base.service.mapper.DriveSecurityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing DriveSecurity.
 */
@Service
@Transactional
public class DriveSecurityService {

    private final Logger log = LoggerFactory.getLogger(DriveSecurityService.class);

    private final DriveSecurityRepository driveSecurityRepository;

    private final DriveSecurityMapper driveSecurityMapper;

    public DriveSecurityService(DriveSecurityRepository driveSecurityRepository, DriveSecurityMapper driveSecurityMapper) {
        this.driveSecurityRepository = driveSecurityRepository;
        this.driveSecurityMapper = driveSecurityMapper;
    }

    /**
     * Save a driveSecurity.
     *
     * @param driveSecurityDTO the entity to save
     * @return the persisted entity
     */
    public DriveSecurityDTO save(DriveSecurityDTO driveSecurityDTO) {
        log.debug("Request to save DriveSecurity : {}", driveSecurityDTO);
        DriveSecurity driveSecurity = driveSecurityMapper.toEntity(driveSecurityDTO);
        driveSecurity = driveSecurityRepository.save(driveSecurity);
        return driveSecurityMapper.toDto(driveSecurity);
    }

    /**
     * Get all the driveSecurities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DriveSecurityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DriveSecurities");
        return driveSecurityRepository.findAll(pageable)
            .map(driveSecurityMapper::toDto);
    }

    /**
     * Get one driveSecurity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DriveSecurityDTO findOne(Long id) {
        log.debug("Request to get DriveSecurity : {}", id);
        DriveSecurity driveSecurity = driveSecurityRepository.findOne(id);
        return driveSecurityMapper.toDto(driveSecurity);
    }

    /**
     * Delete the driveSecurity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete DriveSecurity : {}", id);
        driveSecurityRepository.delete(id);
    }
}
