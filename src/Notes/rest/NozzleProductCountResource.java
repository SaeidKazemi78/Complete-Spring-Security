package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.NozzleProductCountService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.NozzleProductCountDTO;
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
 * REST controller for managing NozzleProductCount.
 */
@RestController
@RequestMapping("/api")
public class NozzleProductCountResource {

    private final Logger log = LoggerFactory.getLogger(NozzleProductCountResource.class);

    private static final String ENTITY_NAME = "nozzleProductCount";

    private final NozzleProductCountService nozzleProductCountService;

    public NozzleProductCountResource(NozzleProductCountService nozzleProductCountService) {
        this.nozzleProductCountService = nozzleProductCountService;
    }

    /**
     * POST  /nozzle-product-counts : Create a new nozzleProductCount.
     *
     * @param nozzleProductCountDTO the nozzleProductCountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nozzleProductCountDTO, or with status 400 (Bad Request) if the nozzleProductCount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nozzle-product-counts")
    @Timed
    public ResponseEntity<NozzleProductCountDTO> createNozzleProductCount(@RequestBody NozzleProductCountDTO nozzleProductCountDTO) throws URISyntaxException {
        log.debug("REST request to save NozzleProductCount : {}", nozzleProductCountDTO);
        if (nozzleProductCountDTO.getId() != null) {
            throw new BadRequestAlertException("A new nozzleProductCount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NozzleProductCountDTO result = nozzleProductCountService.save(nozzleProductCountDTO);
        return ResponseEntity.created(new URI("/api/nozzle-product-counts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nozzle-product-counts : Updates an existing nozzleProductCount.
     *
     * @param nozzleProductCountDTO the nozzleProductCountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nozzleProductCountDTO,
     * or with status 400 (Bad Request) if the nozzleProductCountDTO is not valid,
     * or with status 500 (Internal Server Error) if the nozzleProductCountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nozzle-product-counts")
    @Timed
    public ResponseEntity<NozzleProductCountDTO> updateNozzleProductCount(@RequestBody NozzleProductCountDTO nozzleProductCountDTO) throws URISyntaxException {
        log.debug("REST request to update NozzleProductCount : {}", nozzleProductCountDTO);
        if (nozzleProductCountDTO.getId() == null) {
            return createNozzleProductCount(nozzleProductCountDTO);
        }
        NozzleProductCountDTO result = nozzleProductCountService.save(nozzleProductCountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nozzleProductCountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nozzle-product-counts : get all the nozzleProductCounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of nozzleProductCounts in body
     */
    @GetMapping("/nozzle-product-counts")
    @Timed
    public ResponseEntity<List<NozzleProductCountDTO>> getAllNozzleProductCounts(Pageable pageable) {
        log.debug("REST request to get a page of NozzleProductCounts");
        Page<NozzleProductCountDTO> page = nozzleProductCountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/nozzle-product-counts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /nozzle-product-counts/:id : get the "id" nozzleProductCount.
     *
     * @param id the id of the nozzleProductCountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nozzleProductCountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/nozzle-product-counts/{id}")
    @Timed
    public ResponseEntity<NozzleProductCountDTO> getNozzleProductCount(@PathVariable Long id) {
        log.debug("REST request to get NozzleProductCount : {}", id);
        NozzleProductCountDTO nozzleProductCountDTO = nozzleProductCountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nozzleProductCountDTO));
    }

    /**
     * DELETE  /nozzle-product-counts/:id : delete the "id" nozzleProductCount.
     *
     * @param id the id of the nozzleProductCountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nozzle-product-counts/{id}")
    @Timed
    public ResponseEntity<Void> deleteNozzleProductCount(@PathVariable Long id) {
        log.debug("REST request to delete NozzleProductCount : {}", id);
        nozzleProductCountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
