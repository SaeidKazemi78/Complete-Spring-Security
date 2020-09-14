package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.DepotService;
import ir.donyapardaz.niopdc.base.service.dto.DepotDTO;
import ir.donyapardaz.niopdc.base.service.dto.DepotFullDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
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
 * REST controller for managing Depot.
 */
@RestController
@RequestMapping("/api")
public class DepotResource {

    private final Logger log = LoggerFactory.getLogger(DepotResource.class);

    private static final String ENTITY_NAME = "depot";

    private final DepotService depotService;

    public DepotResource(DepotService depotService) {
        this.depotService = depotService;
    }

    /**
     * POST  /depots : Create a new depot.
     *
     * @param depotDTO the depotDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new depotDTO, or with status 400 (Bad Request) if the depot has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/depots")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_DEPOT})
    public ResponseEntity<DepotFullDTO> createDepot(@Valid @RequestBody DepotFullDTO depotDTO) throws URISyntaxException {
        log.debug("REST request to save Depot : {}", depotDTO);
        if (depotDTO.getId() != null) {
            throw new BadRequestAlertException("A new depot cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DepotFullDTO result = depotService.save(depotDTO);
        return ResponseEntity.created(new URI("/api/depots/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /depots : Updates an existing depot.
     *
     * @param depotDTO the depotDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated depotDTO,
     * or with status 400 (Bad Request) if the depotDTO is not valid,
     * or with status 500 (Internal Server Error) if the depotDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/depots")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_DEPOT})
    public ResponseEntity<DepotFullDTO> updateDepot(@Valid @RequestBody DepotFullDTO depotDTO) throws URISyntaxException {
        log.debug("REST request to update Depot : {}", depotDTO);
        if (depotDTO.getId() == null) {
            return createDepot(depotDTO);
        }
        DepotFullDTO result = depotService.save(depotDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, depotDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /depots : get all the depots.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of depots in body
     */
    @GetMapping("/depots")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepots(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Depots");
        Page<DepotDTO> page = depotService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/depots");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /depots/all : get all the depots.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of depots in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/depots/all")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepots()
        throws URISyntaxException {
        log.debug("REST request to get a page of Depots");
        List<DepotDTO> all = depotService.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    /**
     * GET  /depots/:id : get the "id" depot.
     *
     * @param id the id of the depotDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depotDTO, or with status 404 (Not Found)
     */
    @GetMapping("/depots/{id}")
    @Timed
    public ResponseEntity<DepotFullDTO> getDepot(@PathVariable Long id) {
        log.debug("REST request to get Depot : {}", id);
        DepotFullDTO depotDTO = depotService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(depotDTO));
    }

    /**
     * DELETE  /depots/:id : delete the "id" depot.
     *
     * @param id the id of the depotDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/depots/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_DEPOT})
    public ResponseEntity<Void> deleteDepot(@PathVariable Long id) {
        log.debug("REST request to delete Depot : {}", id);
        depotService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    // region products


    @GetMapping("depots/{depotId}/products")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProducts(@PathVariable("depotId") Long depotId, @ApiParam Pageable pageable) {
        Page<ProductDTO> page = depotService.findAllProducts(depotId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/depots/refuel-center/{id}")
    @Timed
    public ResponseEntity<DepotFullDTO> getDepotByRefuelCenterId(@PathVariable Long id) {
        log.debug("REST request to get Depot : {}", id);
        DepotFullDTO depotDTO = depotService.findOneByRefuelCenterId(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(depotDTO));
    }

    @GetMapping("/depots/code/{depotCode}")
    @Timed
    public ResponseEntity<DepotDTO> getDepotIdByCode(@PathVariable String depotCode) {
        log.debug("REST request to get Depot : {}", depotCode);
        DepotDTO depotDTO = depotService.getDepotIdByCode(depotCode);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(depotDTO));
    }

    @PostMapping("/depots/get-by-code")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepot(@RequestBody List<String> depotCodes) {
        log.debug("REST request to get Depot : {}", depotCodes);
        List<DepotDTO> depotDTO = depotService.getAllDepotByCodes(depotCodes);
        return new ResponseEntity<>(depotDTO, HttpStatus.OK);
    }

}
