package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.StakeholderService;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.StakeholderDTO;
import io.swagger.annotations.ApiParam;
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
 * REST controller for managing Stakeholder.
 */
@RestController
@RequestMapping("/api")
public class StakeholderResource {

    private final Logger log = LoggerFactory.getLogger(StakeholderResource.class);

    private static final String ENTITY_NAME = "stakeholder";

    private final StakeholderService stakeholderService;

    public StakeholderResource(StakeholderService stakeholderService) {
        this.stakeholderService = stakeholderService;
    }

    /**
     * POST  /stakeholders : Create a new stakeholder.
     *
     * @param stakeholderDTO the stakeholderDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stakeholderDTO, or with status 400 (Bad Request) if the stakeholder has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stakeholders")
    @Timed
    public ResponseEntity<StakeholderDTO> createStakeholder(@RequestBody StakeholderDTO stakeholderDTO) throws URISyntaxException {
        log.debug("REST request to save Stakeholder : {}", stakeholderDTO);
        if (stakeholderDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new stakeholder cannot already have an ID")).body(null);
        }
        StakeholderDTO result = stakeholderService.save(stakeholderDTO);
        return ResponseEntity.created(new URI("/api/stakeholders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stakeholders : Updates an existing stakeholder.
     *
     * @param stakeholderDTO the stakeholderDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stakeholderDTO,
     * or with status 400 (Bad Request) if the stakeholderDTO is not valid,
     * or with status 500 (Internal Server Error) if the stakeholderDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stakeholders")
    @Timed
    public ResponseEntity<StakeholderDTO> updateStakeholder(@RequestBody StakeholderDTO stakeholderDTO) throws URISyntaxException {
        log.debug("REST request to update Stakeholder : {}", stakeholderDTO);
        if (stakeholderDTO.getId() == null) {
            return createStakeholder(stakeholderDTO);
        }
        StakeholderDTO result = stakeholderService.save(stakeholderDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stakeholderDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stakeholders : get all the stakeholders.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stakeholders in body
     */
    @GetMapping("/stakeholders")
    @Timed
    public ResponseEntity<List<StakeholderDTO>> getAllStakeholders(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Stakeholders");
        Page<StakeholderDTO> page = stakeholderService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stakeholders");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /stakeholders/:id : get the "id" stakeholder.
     *
     * @param id the id of the stakeholderDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stakeholderDTO, or with status 404 (Not Found)
     */
    @GetMapping("/stakeholders/{id}")
    @Timed
    public ResponseEntity<StakeholderDTO> getStakeholder(@PathVariable Long id) {
        log.debug("REST request to get Stakeholder : {}", id);
        StakeholderDTO stakeholderDTO = stakeholderService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(stakeholderDTO));
    }

    /**
     * DELETE  /stakeholders/:id : delete the "id" stakeholder.
     *
     * @param id the id of the stakeholderDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stakeholders/{id}")
    @Timed
    public ResponseEntity<Void> deleteStakeholder(@PathVariable Long id) {
        log.debug("REST request to delete Stakeholder : {}", id);
        stakeholderService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
