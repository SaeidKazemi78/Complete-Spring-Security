package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.ConsumptionService;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ConsumptionDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
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
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Consumption.
 */
@RestController
@RequestMapping("/api")
public class ConsumptionResource {

    private final Logger log = LoggerFactory.getLogger(ConsumptionResource.class);

    private static final String ENTITY_NAME = "consumption";

    private final ConsumptionService consumptionService;

    public ConsumptionResource(ConsumptionService consumptionService) {
        this.consumptionService = consumptionService;
    }

    /**
     * POST  /consumptions : Create a new consumption.
     *
     * @param consumptionDTO the consumptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consumptionDTO, or with status 400 (Bad Request) if the consumption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consumptions")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_CONSUMPTION})
    public ResponseEntity<ConsumptionDTO> createConsumption(@Valid @RequestBody ConsumptionDTO consumptionDTO) throws URISyntaxException {
        log.debug("REST request to save Consumption : {}", consumptionDTO);
        if (consumptionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new consumption cannot already have an ID")).body(null);
        }
        ConsumptionDTO result = consumptionService.save(consumptionDTO);
        return ResponseEntity.created(new URI("/api/consumptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consumptions : Updates an existing consumption.
     *
     * @param consumptionDTO the consumptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consumptionDTO,
     * or with status 400 (Bad Request) if the consumptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the consumptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consumptions")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_CONSUMPTION})
    public ResponseEntity<ConsumptionDTO> updateConsumption(@Valid @RequestBody ConsumptionDTO consumptionDTO) throws URISyntaxException {
        log.debug("REST request to update Consumption : {}", consumptionDTO);
        if (consumptionDTO.getId() == null) {
            return createConsumption(consumptionDTO);
        }
        ConsumptionDTO result = consumptionService.save(consumptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consumptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consumptions : get all the consumptions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of consumptions in body
     */
    @GetMapping("/consumptions")
    @Timed
    public ResponseEntity<List<ConsumptionDTO>> getAllConsumptions(@RequestParam(required = false) String query,@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Consumptions");
        Page<ConsumptionDTO> page = consumptionService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/consumptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /consumptions/:id : get the "id" consumption.
     *
     * @param id the id of the consumptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consumptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/consumptions/{id}")
    @Timed
    public ResponseEntity<ConsumptionDTO> getConsumption(@PathVariable Long id) {
        log.debug("REST request to get Consumption : {}", id);
        ConsumptionDTO consumptionDTO = consumptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(consumptionDTO));
    }

    /**
     * DELETE  /consumptions/:id : delete the "id" consumption.
     *
     * @param id the id of the consumptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consumptions/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_CONSUMPTION})
    public ResponseEntity<Void> deleteConsumption(@PathVariable Long id) {
        log.debug("REST request to delete Consumption : {}", id);
        consumptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
