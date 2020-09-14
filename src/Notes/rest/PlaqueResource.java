package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.PlaqueService;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueRuleDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueDTO;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Plaque.
 */
@RestController
@RequestMapping("/api")
public class PlaqueResource {

    private final Logger log = LoggerFactory.getLogger(PlaqueResource.class);

    private static final String ENTITY_NAME = "plaque";

    private final PlaqueService plaqueService;

    public PlaqueResource(PlaqueService plaqueService) {
        this.plaqueService = plaqueService;
    }

    /**
     * POST  /plaques : Create a new plaque.
     *
     * @param plaqueDTO the plaqueDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plaqueDTO, or with status 400 (Bad Request) if the plaque has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plaques")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_PLAQUE})
    public ResponseEntity<PlaqueDTO> createPlaque(@Valid @RequestBody PlaqueDTO plaqueDTO) throws URISyntaxException {
        log.debug("REST request to save Plaque : {}", plaqueDTO);
        if (plaqueDTO.getId() != null) {
            throw new BadRequestAlertException("A new plaque cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlaqueDTO result = plaqueService.save(plaqueDTO);
        return ResponseEntity.created(new URI("/api/plaques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plaques : Updates an existing plaque.
     *
     * @param plaqueDTO the plaqueDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plaqueDTO,
     * or with status 400 (Bad Request) if the plaqueDTO is not valid,
     * or with status 500 (Internal Server Error) if the plaqueDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plaques")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_PLAQUE})
    public ResponseEntity<PlaqueDTO> updatePlaque(@Valid @RequestBody PlaqueDTO plaqueDTO) throws URISyntaxException {
        log.debug("REST request to update Plaque : {}", plaqueDTO);
        if (plaqueDTO.getId() == null) {
            return createPlaque(plaqueDTO);
        }
        PlaqueDTO result = plaqueService.save(plaqueDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plaqueDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plaques : get all the plaques.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of plaques in body
     */
    @GetMapping("/plaques")
    @Timed
    public ResponseEntity<List<PlaqueDTO>> getAllPlaques(Pageable pageable,String query) {
        log.debug("REST request to get a page of Plaques");
        Page<PlaqueDTO> page = plaqueService.findAll(pageable,query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/plaques");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /plaques/:id : get the "id" plaque.
     *
     * @param id the id of the plaqueDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plaqueDTO, or with status 404 (Not Found)
     */
    @GetMapping("/plaques/{id}")
    @Timed
    public ResponseEntity<PlaqueDTO> getPlaque(@PathVariable Long id) {
        log.debug("REST request to get Plaque : {}", id);
        PlaqueDTO plaqueDTO = plaqueService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(plaqueDTO));
    }

    /**
     * DELETE  /plaques/:id : delete the "id" plaque.
     *
     * @param id the id of the plaqueDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plaques/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_PLAQUE})
    public ResponseEntity<Void> deletePlaque(@PathVariable Long id) {
        log.debug("REST request to delete Plaque : {}", id);
        plaqueService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
