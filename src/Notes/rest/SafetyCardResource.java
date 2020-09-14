package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.SafetyCardService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.SafetyCardDTO;
import io.github.jhipster.web.util.ResponseUtil;
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
 * REST controller for managing SafetyCard.
 */
@RestController
@RequestMapping("/api")
public class SafetyCardResource {

    private final Logger log = LoggerFactory.getLogger(SafetyCardResource.class);

    private static final String ENTITY_NAME = "safetyCard";

    private final SafetyCardService safetyCardService;

    public SafetyCardResource(SafetyCardService safetyCardService) {
        this.safetyCardService = safetyCardService;
    }

    /**
     * POST  /safety-cards : Create a new safetyCard.
     *
     * @param safetyCardDTO the safetyCardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new safetyCardDTO, or with status 400 (Bad Request) if the safetyCard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/safety-cards")
    @Timed
    public ResponseEntity<SafetyCardDTO> createSafetyCard(@RequestBody SafetyCardDTO safetyCardDTO) throws URISyntaxException {
        log.debug("REST request to save SafetyCard : {}", safetyCardDTO);
        if (safetyCardDTO.getId() != null) {
            throw new BadRequestAlertException("A new safetyCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SafetyCardDTO result = safetyCardService.save(safetyCardDTO);
        return ResponseEntity.created(new URI("/api/safety-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /safety-cards : Updates an existing safetyCard.
     *
     * @param safetyCardDTO the safetyCardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated safetyCardDTO,
     * or with status 400 (Bad Request) if the safetyCardDTO is not valid,
     * or with status 500 (Internal Server Error) if the safetyCardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/safety-cards")
    @Timed
    public ResponseEntity<SafetyCardDTO> updateSafetyCard(@RequestBody SafetyCardDTO safetyCardDTO) throws URISyntaxException {
        log.debug("REST request to update SafetyCard : {}", safetyCardDTO);
        if (safetyCardDTO.getId() == null) {
            return createSafetyCard(safetyCardDTO);
        }
        SafetyCardDTO result = safetyCardService.save(safetyCardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, safetyCardDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /safety-cards : get all the safetyCards.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of safetyCards in body
     */
    @GetMapping("/safety-cards")
    @Timed
    public ResponseEntity<List<SafetyCardDTO>> getAllSafetyCards(Pageable pageable) {
        log.debug("REST request to get a page of SafetyCards");
        Page<SafetyCardDTO> page = safetyCardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/safety-cards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /safety-cards/:id : get the "id" safetyCard.
     *
     * @param id the id of the safetyCardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the safetyCardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/safety-cards/{id}")
    @Timed
    public ResponseEntity<SafetyCardDTO> getSafetyCard(@PathVariable Long id) {
        log.debug("REST request to get SafetyCard : {}", id);
        SafetyCardDTO safetyCardDTO = safetyCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(safetyCardDTO));
    }

    /**
     * DELETE  /safety-cards/:id : delete the "id" safetyCard.
     *
     * @param id the id of the safetyCardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/safety-cards/{id}")
    @Timed
    public ResponseEntity<Void> deleteSafetyCard(@PathVariable Long id) {
        log.debug("REST request to delete SafetyCard : {}", id);
        safetyCardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
