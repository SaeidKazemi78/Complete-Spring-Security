package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.PassCardService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.PassCardDTO;
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
 * REST controller for managing PassCard.
 */
@RestController
@RequestMapping("/api")
public class PassCardResource {

    private final Logger log = LoggerFactory.getLogger(PassCardResource.class);

    private static final String ENTITY_NAME = "passCard";

    private final PassCardService passCardService;

    public PassCardResource(PassCardService passCardService) {
        this.passCardService = passCardService;
    }

    /**
     * POST  /pass-cards : Create a new passCard.
     *
     * @param passCardDTO the passCardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new passCardDTO, or with status 400 (Bad Request) if the passCard has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pass-cards")
    @Timed
    public ResponseEntity<PassCardDTO> createPassCard(@RequestBody PassCardDTO passCardDTO) throws URISyntaxException {
        log.debug("REST request to save PassCard : {}", passCardDTO);
        if (passCardDTO.getId() != null) {
            throw new BadRequestAlertException("A new passCard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PassCardDTO result = passCardService.save(passCardDTO);
        return ResponseEntity.created(new URI("/api/pass-cards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pass-cards : Updates an existing passCard.
     *
     * @param passCardDTO the passCardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated passCardDTO,
     * or with status 400 (Bad Request) if the passCardDTO is not valid,
     * or with status 500 (Internal Server Error) if the passCardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pass-cards")
    @Timed
    public ResponseEntity<PassCardDTO> updatePassCard(@RequestBody PassCardDTO passCardDTO) throws URISyntaxException {
        log.debug("REST request to update PassCard : {}", passCardDTO);
        if (passCardDTO.getId() == null) {
            return createPassCard(passCardDTO);
        }
        PassCardDTO result = passCardService.save(passCardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, passCardDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pass-cards : get all the passCards.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of passCards in body
     */
    @GetMapping("/pass-cards")
    @Timed
    public ResponseEntity<List<PassCardDTO>> getAllPassCards(Pageable pageable) {
        log.debug("REST request to get a page of PassCards");
        Page<PassCardDTO> page = passCardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/pass-cards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /pass-cards/:id : get the "id" passCard.
     *
     * @param id the id of the passCardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the passCardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/pass-cards/{id}")
    @Timed
    public ResponseEntity<PassCardDTO> getPassCard(@PathVariable Long id) {
        log.debug("REST request to get PassCard : {}", id);
        PassCardDTO passCardDTO = passCardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(passCardDTO));
    }

    /**
     * DELETE  /pass-cards/:id : delete the "id" passCard.
     *
     * @param id the id of the passCardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pass-cards/{id}")
    @Timed
    public ResponseEntity<Void> deletePassCard(@PathVariable Long id) {
        log.debug("REST request to delete PassCard : {}", id);
        passCardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
