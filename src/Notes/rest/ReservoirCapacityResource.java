package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.ReservoirCapacityService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ReservoirCapacityDTO;
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
 * REST controller for managing ReservoirCapacity.
 */
@RestController
@RequestMapping("/api")
public class ReservoirCapacityResource {

    private final Logger log = LoggerFactory.getLogger(ReservoirCapacityResource.class);

    private static final String ENTITY_NAME = "reservoirCapacity";

    private final ReservoirCapacityService reservoirCapacityService;

    public ReservoirCapacityResource(ReservoirCapacityService reservoirCapacityService) {
        this.reservoirCapacityService = reservoirCapacityService;
    }

    /**
     * POST  /reservoir-capacities : Create a new reservoirCapacity.
     *
     * @param reservoirCapacityDTO the reservoirCapacityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new reservoirCapacityDTO, or with status 400 (Bad Request) if the reservoirCapacity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/reservoir-capacities")
    @Timed
    public ResponseEntity<ReservoirCapacityDTO> createReservoirCapacity(@Valid @RequestBody ReservoirCapacityDTO reservoirCapacityDTO) throws URISyntaxException {
        log.debug("REST request to save ReservoirCapacity : {}", reservoirCapacityDTO);
        if (reservoirCapacityDTO.getId() != null) {
            throw new BadRequestAlertException("A new reservoirCapacity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ReservoirCapacityDTO result = reservoirCapacityService.save(reservoirCapacityDTO);
        return ResponseEntity.created(new URI("/api/reservoir-capacities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /reservoir-capacities : Updates an existing reservoirCapacity.
     *
     * @param reservoirCapacityDTO the reservoirCapacityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated reservoirCapacityDTO,
     * or with status 400 (Bad Request) if the reservoirCapacityDTO is not valid,
     * or with status 500 (Internal Server Error) if the reservoirCapacityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/reservoir-capacities")
    @Timed
    public ResponseEntity<ReservoirCapacityDTO> updateReservoirCapacity(@Valid @RequestBody ReservoirCapacityDTO reservoirCapacityDTO) throws URISyntaxException {
        log.debug("REST request to update ReservoirCapacity : {}", reservoirCapacityDTO);
        if (reservoirCapacityDTO.getId() == null) {
            return createReservoirCapacity(reservoirCapacityDTO);
        }
        ReservoirCapacityDTO result = reservoirCapacityService.save(reservoirCapacityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, reservoirCapacityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /reservoir-capacities : get all the reservoirCapacities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of reservoirCapacities in body
     */
    @GetMapping("/reservoir-capacities")
    @Timed
    public ResponseEntity<List<ReservoirCapacityDTO>> getAllReservoirCapacities(Pageable pageable) {
        log.debug("REST request to get a page of ReservoirCapacities");
        Page<ReservoirCapacityDTO> page = reservoirCapacityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/reservoir-capacities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /reservoir-capacities/:id : get the "id" reservoirCapacity.
     *
     * @param id the id of the reservoirCapacityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the reservoirCapacityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/reservoir-capacities/{id}")
    @Timed
    public ResponseEntity<ReservoirCapacityDTO> getReservoirCapacity(@PathVariable Long id) {
        log.debug("REST request to get ReservoirCapacity : {}", id);
        ReservoirCapacityDTO reservoirCapacityDTO = reservoirCapacityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(reservoirCapacityDTO));
    }

    /**
     * DELETE  /reservoir-capacities/:id : delete the "id" reservoirCapacity.
     *
     * @param id the id of the reservoirCapacityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/reservoir-capacities/{id}")
    @Timed
    public ResponseEntity<Void> deleteReservoirCapacity(@PathVariable Long id) {
        log.debug("REST request to delete ReservoirCapacity : {}", id);
        reservoirCapacityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
