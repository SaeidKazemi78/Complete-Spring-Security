package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.SalesCodeService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.SalesCodeDTO;
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
 * REST controller for managing SalesCode.
 */
@RestController
@RequestMapping("/api")
public class SalesCodeResource {

    private final Logger log = LoggerFactory.getLogger(SalesCodeResource.class);

    private static final String ENTITY_NAME = "salesCode";

    private final SalesCodeService salesCodeService;

    public SalesCodeResource(SalesCodeService salesCodeService) {
        this.salesCodeService = salesCodeService;
    }

    /**
     * POST  /sales-codes : Create a new salesCode.
     *
     * @param salesCodeDTO the salesCodeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new salesCodeDTO, or with status 400 (Bad Request) if the salesCode has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sales-codes")
    @Timed
    public ResponseEntity<SalesCodeDTO> createSalesCode(@Valid @RequestBody SalesCodeDTO salesCodeDTO) throws URISyntaxException {
        log.debug("REST request to save SalesCode : {}", salesCodeDTO);
        if (salesCodeDTO.getId() != null) {
            throw new BadRequestAlertException("A new salesCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SalesCodeDTO result = salesCodeService.save(salesCodeDTO);
        return ResponseEntity.created(new URI("/api/sales-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sales-codes : Updates an existing salesCode.
     *
     * @param salesCodeDTO the salesCodeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated salesCodeDTO,
     * or with status 400 (Bad Request) if the salesCodeDTO is not valid,
     * or with status 500 (Internal Server Error) if the salesCodeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sales-codes")
    @Timed
    public ResponseEntity<SalesCodeDTO> updateSalesCode(@Valid @RequestBody SalesCodeDTO salesCodeDTO) throws URISyntaxException {
        log.debug("REST request to update SalesCode : {}", salesCodeDTO);
        if (salesCodeDTO.getId() == null) {
            return createSalesCode(salesCodeDTO);
        }
        SalesCodeDTO result = salesCodeService.save(salesCodeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, salesCodeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sales-codes : get all the salesCodes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of salesCodes in body
     */
    @GetMapping("/sales-codes")
    @Timed
    public ResponseEntity<List<SalesCodeDTO>> getAllSalesCodes(Pageable pageable) {
        log.debug("REST request to get a page of SalesCodes");
        Page<SalesCodeDTO> page = salesCodeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sales-codes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sales-codes/:id : get the "id" salesCode.
     *
     * @param id the id of the salesCodeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the salesCodeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sales-codes/{id}")
    @Timed
    public ResponseEntity<SalesCodeDTO> getSalesCode(@PathVariable Long id) {
        log.debug("REST request to get SalesCode : {}", id);
        SalesCodeDTO salesCodeDTO = salesCodeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(salesCodeDTO));
    }

    /**
     * DELETE  /sales-codes/:id : delete the "id" salesCode.
     *
     * @param id the id of the salesCodeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sales-codes/{id}")
    @Timed
    public ResponseEntity<Void> deleteSalesCode(@PathVariable Long id) {
        log.debug("REST request to delete SalesCode : {}", id);
        salesCodeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
