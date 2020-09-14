package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkRefuelCenterType;
import ir.donyapardaz.niopdc.base.service.ShiftWorkService;
import ir.donyapardaz.niopdc.base.service.dto.ShiftWorkDTO;
import ir.donyapardaz.niopdc.base.validation.ShiftWorkValidator;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ShiftWork.
 */
@RestController
@RequestMapping("/api")
public class ShiftWorkResource {

    private static final String ENTITY_NAME = "shiftWork";
    private final Logger log = LoggerFactory.getLogger(ShiftWorkResource.class);
    private final ShiftWorkService shiftWorkService;
    private final ShiftWorkValidator shiftWorkValidator;

    public ShiftWorkResource(ShiftWorkService shiftWorkService, ShiftWorkValidator shiftWorkValidator) {
        this.shiftWorkService = shiftWorkService;
        this.shiftWorkValidator = shiftWorkValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(shiftWorkValidator);
    }


    /**
     * GET  /shift-works : get all the shiftWorks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of shiftWorks in body
     */
    @GetMapping("/shift-works")
    @Timed
    public ResponseEntity<List<ShiftWorkDTO>> getAllShiftWorks(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ShiftWorks");
        Page<ShiftWorkDTO> page = shiftWorkService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/shift-works");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /shift-works/:id : get the "id" shiftWork.
     *
     * @param id the id of the shiftWorkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shiftWorkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shift-works/{id}")
    @Timed
    public ResponseEntity<ShiftWorkDTO> getShiftWork(@PathVariable Long id) {
        log.debug("REST request to get ShiftWork : {}", id);
        ShiftWorkDTO shiftWorkDTO = shiftWorkService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shiftWorkDTO));
    }


    /**
     * GET  /shift-works/:id : get the "id" shiftWork.
     *
     * @param locationId the id of the shiftWorkDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the shiftWorkDTO, or with status 404 (Not Found)
     */
    @GetMapping("/shift-works/location/first-shift/{locationId}")
    @Timed
    public ResponseEntity<ShiftWorkDTO> getFirstShiftWorkByLocationId(@PathVariable("locationId") Long locationId) {

        ShiftWorkDTO shiftWorkDTO = shiftWorkService.firstByLocationId(locationId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shiftWorkDTO));
    }


    /**
     * DELETE  /shift-works/:id : delete the "id" shiftWork.
     *
     * @param id the id of the shiftWorkDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/shift-works/{id}")
    @Timed
    public ResponseEntity<Void> deleteShiftWork(@PathVariable Long id) {
        log.debug("REST request to delete ShiftWork : {}", id);
        shiftWorkService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/shift-works/{id}/open")
    @Timed
    public ResponseEntity<Void> openShiftWork(@PathVariable Long id) {
        log.debug("Rest request to open Shift Work");

        shiftWorkService.open(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shift-works/{id}/close")
    @Timed
    public ResponseEntity<Void> close(@PathVariable Long id) {
        log.debug("Rest request to close Shift Work");

        shiftWorkService.close(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shift-works/refuel-center/{refuelCenterId}/shift-type/{shiftType}/is-open")
    @Timed
    public ResponseEntity<Boolean> isOpenShiftWork(@PathVariable Long refuelCenterId, @PathVariable ShiftWorkRefuelCenterType shiftType) {
        log.debug("REST request to check is open : {}", refuelCenterId);
        Boolean shiftWorkDTO = shiftWorkService.isOpenShiftWork(refuelCenterId, shiftType);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shiftWorkDTO));
    }

    @GetMapping("/shift-works/refuel-center/{refuelCenterId}/shiftType/{shiftType}")
    @Timed
    public ResponseEntity<List<ShiftWorkDTO>> getAllShiftWorks(
        @PathVariable Long refuelCenterId,
        @PathVariable ShiftWorkRefuelCenterType shiftType,
        @RequestParam(required = false) String query,
        @ApiParam Pageable pageable
    ) {
        log.debug("REST request to get a page of shift work");
        Page<ShiftWorkDTO> page = shiftWorkService.findAllByRefuelCenterAndShiftType(refuelCenterId,shiftType,query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @GetMapping("/shift-works/refuel-center/{refuelCenterId}/shift-type/{shiftType}/open")
    @Timed
    public ResponseEntity<Void> openShiftWork(@PathVariable Long refuelCenterId,
                                              @PathVariable ShiftWorkRefuelCenterType shiftType) {
        log.debug("Rest request to open Shift Work");

        shiftWorkService.openByRefuelCenter(refuelCenterId,shiftType);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/shift-works/refuel-center/{refuelCenterId}/shift-type/{shiftType}/close")
    @Timed
    public ResponseEntity<Void> closeShiftWork(@PathVariable Long refuelCenterId,
                                              @PathVariable ShiftWorkRefuelCenterType shiftType) {
        log.debug("Rest request to open Shift Work");

        shiftWorkService.closeByRefuelCenter(refuelCenterId,shiftType);
        return ResponseEntity.ok().build();
    }
}
