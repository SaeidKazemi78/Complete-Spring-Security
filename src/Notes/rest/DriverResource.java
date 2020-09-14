package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.DriverService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Driver.
 */
@RestController
@RequestMapping("/api")
public class DriverResource {

    private static final String ENTITY_NAME = "driver";
    private final Logger log = LoggerFactory.getLogger(DriverResource.class);
    private final DriverService driverService;

    public DriverResource(DriverService driverService) {
        this.driverService = driverService;
    }

    /**
     * POST  /drivers : Create a new driver.
     *
     * @param driverDTO the driverDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new driverDTO, or with status 400 (Bad Request) if the driver has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/drivers")
    @Timed
    public ResponseEntity<DriverDTO> createDriver(@RequestBody DriverDTO driverDTO) throws URISyntaxException {
        log.debug("REST request to save Driver : {}", driverDTO);
        if (driverDTO.getId() != null) {
            throw new BadRequestAlertException("A new driver cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DriverDTO result = driverService.save(driverDTO);
        return ResponseEntity.created(new URI("/api/drivers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /drivers : Updates an existing driver.
     *
     * @param driverDTO the driverDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated driverDTO,
     * or with status 400 (Bad Request) if the driverDTO is not valid,
     * or with status 500 (Internal Server Error) if the driverDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/drivers")
    @Timed
    public ResponseEntity<DriverDTO> updateDriver(@RequestBody DriverDTO driverDTO) throws URISyntaxException {
        log.debug("REST request to update Driver : {}", driverDTO);
        if (driverDTO.getId() == null) {
            return createDriver(driverDTO);
        }
        DriverDTO result = driverService.save(driverDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, driverDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /drivers : get all the drivers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of drivers in body
     */
    @GetMapping("/drivers")
    @Timed
    public ResponseEntity<List<DriverDTO>> getAllDrivers(Pageable pageable) {
        log.debug("REST request to get a page of Drivers");
        Page<DriverDTO> page = driverService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/drivers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /drivers/:id : get the "id" driver.
     *
     * @param id the id of the driverDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the driverDTO, or with status 404 (Not Found)
     */
    @GetMapping("/drivers/{id}")
    @Timed
    public ResponseEntity<DriverDTO> getDriver(@PathVariable Long id) {
        log.debug("REST request to get Driver : {}", id);
        DriverDTO driverDTO = driverService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(driverDTO));
    }

    /**
     * DELETE  /drivers/:id : delete the "id" driver.
     *
     * @param id the id of the driverDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/drivers/{id}")
    @Timed
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        log.debug("REST request to delete Driver : {}", id);
        driverService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/drivers/{id}/dangerous-certificates")
    @Timed
    public ResponseEntity<List<DangerousCertificateDTO>> getDangerousCertificate(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<DangerousCertificateDTO> allCarRfId = driverService.findAllDangerousCertificate(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/drivers/{id}/drive-securities")
    @Timed
    public ResponseEntity<DriveSecurityDTO> getDriverSecurity(@PathVariable Long id) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        DriveSecurityDTO allCarRfId = driverService.findDriveSecurity(id);
        return new ResponseEntity<>(allCarRfId, HttpStatus.OK);
    }

    @GetMapping("/drivers/{id}/pass-cards")
    @Timed
    public ResponseEntity<List<PassCardDTO>> getAllPassCards(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<PassCardDTO> allCarRfId = driverService.findAllPassCards(id,query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/drivers/{id}/safety-cards")
    @Timed
    public ResponseEntity<List<SafetyCardDTO>> getAllSafetyCards(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<SafetyCardDTO> allCarRfId = driverService.findAllSafetyCards(id,query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/drivers/license-number/{license}")
    @Timed
    public ResponseEntity<DriverDTO> getDriver(@PathVariable String license) {
        log.debug("REST request to get Driver : {}", license);
        DriverDTO driverDTO = driverService.findOneByLicense(license);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(driverDTO));
    }
}
