package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.PlaqueRuleService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueRuleDTO;
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
 * REST controller for managing PlaqueRule.
 */
@RestController
@RequestMapping("/api")
public class PlaqueRuleResource {

    private final Logger log = LoggerFactory.getLogger(PlaqueRuleResource.class);

    private static final String ENTITY_NAME = "plaqueRule";

    private final PlaqueRuleService plaqueRuleService;

    public PlaqueRuleResource(PlaqueRuleService plaqueRuleService) {
        this.plaqueRuleService = plaqueRuleService;
    }

    /**
     * POST  /plaque-rules : Create a new plaqueRule.
     *
     * @param plaqueRuleDTO the plaqueRuleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plaqueRuleDTO, or with status 400 (Bad Request) if the plaqueRule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plaque-rules")
    @Timed
    public ResponseEntity<PlaqueRuleDTO> createPlaqueRule(@Valid @RequestBody PlaqueRuleDTO plaqueRuleDTO) throws URISyntaxException {
        log.debug("REST request to save PlaqueRule : {}", plaqueRuleDTO);
        if (plaqueRuleDTO.getId() != null) {
            throw new BadRequestAlertException("A new plaqueRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaqueRuleDTO result = plaqueRuleService.save(plaqueRuleDTO);
        return ResponseEntity.created(new URI("/api/plaque-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plaque-rules : Updates an existing plaqueRule.
     *
     * @param plaqueRuleDTO the plaqueRuleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plaqueRuleDTO,
     * or with status 400 (Bad Request) if the plaqueRuleDTO is not valid,
     * or with status 500 (Internal Server Error) if the plaqueRuleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plaque-rules")
    @Timed
    public ResponseEntity<PlaqueRuleDTO> updatePlaqueRule(@Valid @RequestBody PlaqueRuleDTO plaqueRuleDTO) throws URISyntaxException {
        log.debug("REST request to update PlaqueRule : {}", plaqueRuleDTO);
        if (plaqueRuleDTO.getId() == null) {
            return createPlaqueRule(plaqueRuleDTO);
        }
        PlaqueRuleDTO result = plaqueRuleService.save(plaqueRuleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plaqueRuleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plaque-rules : get all the plaqueRules.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of plaqueRules in body
     */
    @GetMapping("/plaque-rules")
    @Timed
    public ResponseEntity<List<PlaqueRuleDTO>> getAllPlaqueRules(Pageable pageable) {
        log.debug("REST request to get a page of PlaqueRules");
        Page<PlaqueRuleDTO> page = plaqueRuleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/plaque-rules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /plaque-rules/:id : get the "id" plaqueRule.
     *
     * @param id the id of the plaqueRuleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plaqueRuleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/plaque-rules/{id}")
    @Timed
    public ResponseEntity<PlaqueRuleDTO> getPlaqueRule(@PathVariable Long id) {
        log.debug("REST request to get PlaqueRule : {}", id);
        PlaqueRuleDTO plaqueRuleDTO = plaqueRuleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(plaqueRuleDTO));
    }

    /**
     * DELETE  /plaque-rules/:id : delete the "id" plaqueRule.
     *
     * @param id the id of the plaqueRuleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plaque-rules/{id}")
    @Timed
    public ResponseEntity<Void> deletePlaqueRule(@PathVariable Long id) {
        log.debug("REST request to delete PlaqueRule : {}", id);
        plaqueRuleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
