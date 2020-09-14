package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.VehicleModelService;
import ir.donyapardaz.niopdc.base.service.dto.VehicleCapacityDTO;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing VehicleModel.
 */
@RestController
@RequestMapping("/api")
public class VehicleModelResource {

    private static final String ENTITY_NAME = "vehicleModel";
    private final Logger log = LoggerFactory.getLogger(VehicleModelResource.class);
    private final VehicleModelService vehicleModelService;

    public VehicleModelResource(VehicleModelService vehicleModelService) {
        this.vehicleModelService = vehicleModelService;
    }

    /**
     * POST  /vehicle-models : Create a new vehicleModel.
     *
     * @param vehicleModelDTO the vehicleModelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vehicleModelDTO, or with status 400 (Bad Request) if the vehicleModel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vehicle-models")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_VEHICLE_MODEL})
    public ResponseEntity<VehicleModelDTO> createVehicleModel(@Valid @RequestBody VehicleModelDTO vehicleModelDTO) throws URISyntaxException {
        log.debug("REST request to save VehicleModel : {}", vehicleModelDTO);
        if (vehicleModelDTO.getId() != null) {
            throw new BadRequestAlertException("A new vehicleModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VehicleModelDTO result = vehicleModelService.save(vehicleModelDTO);
        return ResponseEntity.created(new URI("/api/vehicle-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vehicle-models : Updates an existing vehicleModel.
     *
     * @param vehicleModelDTO the vehicleModelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vehicleModelDTO,
     * or with status 400 (Bad Request) if the vehicleModelDTO is not valid,
     * or with status 500 (Internal Server Error) if the vehicleModelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vehicle-models")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_VEHICLE_MODEL})
    public ResponseEntity<VehicleModelDTO> updateVehicleModel(@Valid @RequestBody VehicleModelDTO vehicleModelDTO) throws URISyntaxException {
        log.debug("REST request to update VehicleModel : {}", vehicleModelDTO);
        if (vehicleModelDTO.getId() == null) {
            return createVehicleModel(vehicleModelDTO);
        }
        VehicleModelDTO result = vehicleModelService.save(vehicleModelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vehicleModelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vehicle-models : get all the vehicleModels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleModels in body
     */
    @GetMapping("/vehicle-models")
    @Timed
    public ResponseEntity<List<VehicleModelDTO>> getAllVehicleModels(@RequestParam(required = false) String title,
                                                                     @RequestParam(required = false) VehicleModelType vehicleModelType,
                                                                     @RequestParam(required = false) CustomerGroup customerGroup,
                                                                     @RequestParam(required = false) Boolean confirm,
                                                                     @RequestParam(required = false) String productTitle,
                                                                     @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of VehicleModels");
        Page<VehicleModelDTO> page = vehicleModelService.findAll(title, vehicleModelType, customerGroup, productTitle, confirm, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-models");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-models : get all the vehicleModels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vehicleModels in body
     */
    @GetMapping("/vehicle-models/customer-group/{group}")
    @Timed
    public ResponseEntity<List<VehicleModelDTO>> getAllVehicleModels(@PathVariable("group") CustomerGroup group) {
        log.debug("REST request to get a page of VehicleModels");
        List<VehicleModelDTO> page = vehicleModelService.findAllByCustomerGroup(group);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    /**
     * GET  /vehicle-models/:id : get the "id" vehicleModel.
     *
     * @param id the id of the vehicleModelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vehicleModelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/vehicle-models/{id}")
    @Timed
    public ResponseEntity<VehicleModelDTO> getVehicleModel(@PathVariable Long id) {
        log.debug("REST request to get VehicleModel : {}", id);
        VehicleModelDTO vehicleModelDTO = vehicleModelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleModelDTO));
    }

    /**
     * DELETE  /vehicle-models/:id : delete the "id" vehicleModel.
     *
     * @param id the id of the vehicleModelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vehicle-models/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_VEHICLE_MODEL})
    public ResponseEntity<Void> deleteVehicleModel(@PathVariable Long id) {
        log.debug("REST request to delete VehicleModel : {}", id);
        vehicleModelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/vehicle-models/{id}/vehicle-capacities")
    @Timed
    public ResponseEntity<List<VehicleCapacityDTO>> getVehicleCapacities(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<VehicleCapacityDTO> allCarRfId = vehicleModelService.findAllVehicleCapacities(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/vehicle-models/{id}/vehicle-capacity")
    @Timed
    public ResponseEntity<VehicleCapacityDTO> getVehicleCapacities(@PathVariable Long id) {
        log.debug("REST request to get vehicleModel By id : {}", id);
        VehicleCapacityDTO vehicleCapacityDTO = vehicleModelService.findVehicleCapacity(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vehicleCapacityDTO));
    }

    @GetMapping("/vehicle-models/have-measure/{vehicleModelType}")
    @Timed
    public ResponseEntity<List<VehicleModelDTO>> getAllVehicleModels(@PathVariable VehicleModelType vehicleModelType, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of VehicleModels");
        Page<VehicleModelDTO> page = vehicleModelService.findAllByVehicleModel(vehicleModelType, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vehicle-models");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/vehicle-models/confirm/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_VEHICLE_MODEL})
    public ResponseEntity<Void> confirmVehicleModel(@PathVariable Long id) {
        log.debug("REST request to delete VehicleModel : {}", id);
        vehicleModelService.confirm(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
