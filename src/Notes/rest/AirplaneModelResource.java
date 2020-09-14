package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.AirplaneModelService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.AirplaneModelDTO;
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
 * REST controller for managing AirplaneModel.
 */
@RestController
@RequestMapping("/api")
public class AirplaneModelResource {

    private final Logger log = LoggerFactory.getLogger(AirplaneModelResource.class);

    private static final String ENTITY_NAME = "airplaneModel";

    private final AirplaneModelService airplaneModelService;

    public AirplaneModelResource(AirplaneModelService airplaneModelService) {
        this.airplaneModelService = airplaneModelService;
    }

    /**
     * POST  /airplane-models : Create a new airplaneModel.
     *
     * @param airplaneModelDTO the airplaneModelDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airplaneModelDTO, or with status 400 (Bad Request) if the airplaneModel has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airplane-models")
    @Timed
    public ResponseEntity<AirplaneModelDTO> createAirplaneModel(@Valid @RequestBody AirplaneModelDTO airplaneModelDTO) throws URISyntaxException {
        log.debug("REST request to save AirplaneModel : {}", airplaneModelDTO);
        if (airplaneModelDTO.getId() != null) {
            throw new BadRequestAlertException("A new airplaneModel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AirplaneModelDTO result = airplaneModelService.save(airplaneModelDTO);
        return ResponseEntity.created(new URI("/api/airplane-models/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airplane-models : Updates an existing airplaneModel.
     *
     * @param airplaneModelDTO the airplaneModelDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airplaneModelDTO,
     * or with status 400 (Bad Request) if the airplaneModelDTO is not valid,
     * or with status 500 (Internal Server Error) if the airplaneModelDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airplane-models")
    @Timed
    public ResponseEntity<AirplaneModelDTO> updateAirplaneModel(@Valid @RequestBody AirplaneModelDTO airplaneModelDTO) throws URISyntaxException {
        log.debug("REST request to update AirplaneModel : {}", airplaneModelDTO);
        if (airplaneModelDTO.getId() == null) {
            return createAirplaneModel(airplaneModelDTO);
        }
        AirplaneModelDTO result = airplaneModelService.save(airplaneModelDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airplaneModelDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airplane-models : get all the airplaneModels.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of airplaneModels in body
     */
    @GetMapping("/airplane-models")
    @Timed
    public ResponseEntity<List<AirplaneModelDTO>> getAllAirplaneModels(Pageable pageable) {
        log.debug("REST request to get a page of AirplaneModels");
        Page<AirplaneModelDTO> page = airplaneModelService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/airplane-models");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /airplane-models/:id : get the "id" airplaneModel.
     *
     * @param id the id of the airplaneModelDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airplaneModelDTO, or with status 404 (Not Found)
     */
    @GetMapping("/airplane-models/{id}")
    @Timed
    public ResponseEntity<AirplaneModelDTO> getAirplaneModel(@PathVariable Long id) {
        log.debug("REST request to get AirplaneModel : {}", id);
        AirplaneModelDTO airplaneModelDTO = airplaneModelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(airplaneModelDTO));
    }

    /**
     * DELETE  /airplane-models/:id : delete the "id" airplaneModel.
     *
     * @param id the id of the airplaneModelDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airplane-models/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirplaneModel(@PathVariable Long id) {
        log.debug("REST request to delete AirplaneModel : {}", id);
        airplaneModelService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
