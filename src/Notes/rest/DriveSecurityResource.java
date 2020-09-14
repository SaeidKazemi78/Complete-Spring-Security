package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.DriveSecurityService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.DriveSecurityDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DriveSecurity.
 */
@RestController
@RequestMapping("/api")
public class DriveSecurityResource {

    private final Logger log = LoggerFactory.getLogger(DriveSecurityResource.class);

    private static final String ENTITY_NAME = "driveSecurity";

    private final DriveSecurityService driveSecurityService;

    public DriveSecurityResource(DriveSecurityService driveSecurityService) {
        this.driveSecurityService = driveSecurityService;
    }

    /**
     * POST  /drive-securities : Create a new driveSecurity.
     *
     * @param driveSecurityDTO the driveSecurityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new driveSecurityDTO, or with status 400 (Bad Request) if the driveSecurity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/drive-securities")
    @Timed
    public ResponseEntity<DriveSecurityDTO> createDriveSecurity(@Valid @RequestBody DriveSecurityDTO driveSecurityDTO) throws URISyntaxException {
        log.debug("REST request to save DriveSecurity : {}", driveSecurityDTO);
        if (driveSecurityDTO.getId() != null) {
            throw new BadRequestAlertException("A new driveSecurity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DriveSecurityDTO result = driveSecurityService.save(driveSecurityDTO);
        return ResponseEntity.created(new URI("/api/drive-securities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /drive-securities : Updates an existing driveSecurity.
     *
     * @param driveSecurityDTO the driveSecurityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated driveSecurityDTO,
     * or with status 400 (Bad Request) if the driveSecurityDTO is not valid,
     * or with status 500 (Internal Server Error) if the driveSecurityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/drive-securities")
    @Timed
    public ResponseEntity<DriveSecurityDTO> updateDriveSecurity(@Valid @RequestBody DriveSecurityDTO driveSecurityDTO) throws URISyntaxException {
        log.debug("REST request to update DriveSecurity : {}", driveSecurityDTO);
        if (driveSecurityDTO.getId() == null) {
            return createDriveSecurity(driveSecurityDTO);
        }
        DriveSecurityDTO result = driveSecurityService.save(driveSecurityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, driveSecurityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /drive-securities : get all the driveSecurities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of driveSecurities in body
     */
    @GetMapping("/drive-securities")
    @Timed
    public ResponseEntity<List<DriveSecurityDTO>> getAllDriveSecurities(Pageable pageable) {
        log.debug("REST request to get a page of DriveSecurities");
        Page<DriveSecurityDTO> page = driveSecurityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/drive-securities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /drive-securities/:id : get the "id" driveSecurity.
     *
     * @param id the id of the driveSecurityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the driveSecurityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/drive-securities/{id}")
    @Timed
    public ResponseEntity<DriveSecurityDTO> getDriveSecurity(@PathVariable Long id) {
        log.debug("REST request to get DriveSecurity : {}", id);
        DriveSecurityDTO driveSecurityDTO = driveSecurityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(driveSecurityDTO));
    }

    /**
     * DELETE  /drive-securities/:id : delete the "id" driveSecurity.
     *
     * @param id the id of the driveSecurityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/drive-securities/{id}")
    @Timed
    public ResponseEntity<Void> deleteDriveSecurity(@PathVariable Long id) {
        log.debug("REST request to delete DriveSecurity : {}", id);
        driveSecurityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
