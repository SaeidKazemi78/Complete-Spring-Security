package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Driver.
 */
@Service
@Transactional
public class DriverService {

    private final Logger log = LoggerFactory.getLogger(DriverService.class);

    private final DriverRepository driverRepository;

    private final DriverMapper driverMapper;

    private final DangerousCertificateRepository dangerousCertificateRepository;
    private final DangerousCertificateMapper dangerousCertificateMapper;

    private final DriveSecurityRepository driveSecurityRepository;
    private final DriveSecurityMapper driveSecurityMapper;

    private final SafetyCardRepository safetyCardRepository;
    private final SafetyCardMapper safetyCardMapper;

    private final PassCardRepository passCardRepository;
    private final PassCardMapper passCardMapper;

    public DriverService(DriverRepository driverRepository, DriverMapper driverMapper, DangerousCertificateRepository dangerousCertificateRepository, DangerousCertificateMapper dangerousCertificateMapper, DriveSecurityRepository driveSecurityRepository, DriveSecurityMapper driveSecurityMapper, SafetyCardRepository safetyCardRepository, SafetyCardMapper safetyCardMapper, PassCardRepository passCardRepository, PassCardMapper passCardMapper) {
        this.driverRepository = driverRepository;
        this.driverMapper = driverMapper;
        this.dangerousCertificateRepository = dangerousCertificateRepository;
        this.dangerousCertificateMapper = dangerousCertificateMapper;
        this.driveSecurityRepository = driveSecurityRepository;
        this.driveSecurityMapper = driveSecurityMapper;
        this.safetyCardRepository = safetyCardRepository;
        this.safetyCardMapper = safetyCardMapper;
        this.passCardRepository = passCardRepository;
        this.passCardMapper = passCardMapper;
    }

    /**
     * Save a driver.
     *
     * @param driverDTO the entity to save
     * @return the persisted entity
     */
    public DriverDTO save(DriverDTO driverDTO) {
        log.debug("Request to save Driver : {}", driverDTO);
        Driver driver = driverMapper.toEntity(driverDTO);
        driver = driverRepository.save(driver);
        return driverMapper.toDto(driver);
    }

    /**
     * Get all the drivers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DriverDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Drivers");
        return driverRepository.findAll(pageable)
            .map(driverMapper::toDto);
    }

    /**
     * Get one driver by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DriverDTO findOne(Long id) {
        log.debug("Request to get Driver : {}", id);
        Driver driver = driverRepository.findOne(id);
        return driverMapper.toDto(driver);
    }

    /**
     * Delete the driver by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Driver : {}", id);
        driverRepository.delete(id);
    }

    public Page<DangerousCertificateDTO> findAllDangerousCertificate(Long id, String query, Pageable pageable) {
        Page<DangerousCertificate> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(DangerousCertificate.class, "dangerousCertificate"), null);
            BooleanExpression customerExpression = QDangerousCertificate.dangerousCertificate.driver.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = dangerousCertificateRepository.findAll(booleanExpression, pageable);
        } else {
            result = dangerousCertificateRepository.findByDriver_Id(id, pageable);

        }
        return result.map(dangerousCertificateMapper::toDto);
    }

    public DriveSecurityDTO findDriveSecurity(Long id) {
        return driveSecurityMapper.toDto(driveSecurityRepository.findFirstByDriver_Id(id));
    }

    public Page<PassCardDTO> findAllPassCards(Long id, String query, Pageable pageable) {
        Page<PassCard> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(PassCard.class, "passCard"), null);
            BooleanExpression customerExpression = QPassCard.passCard.driver.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = passCardRepository.findAll(booleanExpression, pageable);
        } else {
            result = passCardRepository.findByDriver_Id(id, pageable);

        }
        return result.map(passCardMapper::toDto);
    }

    public Page<SafetyCardDTO> findAllSafetyCards(Long id, String query, Pageable pageable) {
        Page<SafetyCard> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(SafetyCard.class, "safetyCard"), null);
            BooleanExpression customerExpression = QSafetyCard.safetyCard.driver.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = safetyCardRepository.findAll(booleanExpression, pageable);
        } else {
            result = safetyCardRepository.findByDriver_Id(id, pageable);

        }
        return result.map(safetyCardMapper::toDto);
    }

    public DriverDTO findOneByLicense(String license) {
        Driver firstByDrivingLicenseNumber = driverRepository.findFirstByDrivingLicenseNumber(license);
        return driverMapper.toDto(firstByDrivingLicenseNumber);
    }
}
