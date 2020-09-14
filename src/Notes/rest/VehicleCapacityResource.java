package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.VehicleCapacityService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.VehicleCapacityDTO;
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
 * REST controller for managing VehicleCapacity.
 */
@RestController
@RequestMapping("/api")
public class VehicleCapacityResource {

    private final Logger log = LoggerFactory.getLogger(VehicleCapacityResource.class);

    private static final String ENTITY_NAME = "vehicleCapacity";

    private final VehicleCapacityService vehicleCapacityService;

    public VehicleCapacityResource(VehicleCapacityService vehicleCapacityService) {
        this.vehicleCapacityService = vehicleCapacityService;
    }

    /**
     * POST  /vehicle-capacities : Create a new vehicleCapacity.
     *
     * @param vehicleCapacityDTO the vehicleCapacityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehicleCapacityDTO, or with status 400 (Bad Request) if the vehicleCapacity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicle-capacities")
    @Timed
    public ResponseEntity<VehicleCapacityDTO> createVehicleCapacity(@Valid @RequestBody VehicleCapacityDTO vehicleCapacityDTO) throws URISyntaxException {
        log.debug("REST request to save VehicleCapacity : {}", vehicleCapacityDTO);
        if (vehicleCapacityDTO.getId() != null) {
            throw new BadRequestAlertException("A new vehicleCapacity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleCapacityDTO result = vehicleCapacityService.save(vehicleCapacityDTO);
        return ResponseEntity.created(new URI("/api/vehicle-capacities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-capacities : Updates an existing vehicleCapacity.
     *
     * @param vehicleCapacityDTO the vehicleCapacityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleCapacityDTO,
     * or with status 400 (Bad Request) if the vehicleCapacityDTO is not valid,
     * or with status 500 (Internal Server Error) if the vehicleCapacityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-capacities")
    @Timed
    public ResponseEntity<VehicleCapacityDTO> updateVehicleCapacity(@Valid @RequestBody VehicleCapacityDTO vehicleCapacityDTO) throws URISyntaxException {
        log.debug("REST request to update VehicleCapacity : {}", vehicleCapacityDTO);
        if (vehicleCapacityDTO.getId() == null) {
            return createVehicleCapacity(vehicleCapacityDTO);
        }
        VehicleCapacityDTO result = vehicleCapacityService.save(vehicleCapacityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicleCapacityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vehicle-capacities : get all the vehicleCapacities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleCapacities in body
     */
    @GetMapping("/vehicle-capacities")
    @Timed
    public ResponseEntity<List<VehicleCapacityDTO>> getAllVehicleCapacities(Pageable pageable) {
        log.debug("REST request to get a page of VehicleCapacities");
        Page<VehicleCapacityDTO> page = vehicleCapacityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-capacities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-capacities/:id : get the "id" vehicleCapacity.
     *
     * @param id the id of the vehicleCapacityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicleCapacityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vehicle-capacities/{id}")
    @Timed
    public ResponseEntity<VehicleCapacityDTO> getVehicleCapacity(@PathVariable Long id) {
        log.debug("REST request to get VehicleCapacity : {}", id);
        VehicleCapacityDTO vehicleCapacityDTO = vehicleCapacityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleCapacityDTO));
    }

    /**
     * DELETE  /vehicle-capacities/:id : delete the "id" vehicleCapacity.
     *
     * @param id the id of the vehicleCapacityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicle-capacities/{id}")
    @Timed
    public ResponseEntity<Void> deleteVehicleCapacity(@PathVariable Long id) {
        log.debug("REST request to delete VehicleCapacity : {}", id);
        vehicleCapacityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
