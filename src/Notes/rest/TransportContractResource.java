package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.TransportContractService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.TransportContractDTO;
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
 * REST controller for managing TransportContract.
 */
@RestController
@RequestMapping("/api")
public class TransportContractResource {

    private final Logger log = LoggerFactory.getLogger(TransportContractResource.class);

    private static final String ENTITY_NAME = "transportContract";

    private final TransportContractService transportContractService;

    public TransportContractResource(TransportContractService transportContractService) {
        this.transportContractService = transportContractService;
    }

    /**
     * POST  /transport-contracts : Create a new transportContract.
     *
     * @param transportContractDTO the transportContractDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new transportContractDTO, or with status 400 (Bad Request) if the transportContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/transport-contracts")
    @Timed
    public ResponseEntity<TransportContractDTO> createTransportContract(@Valid @RequestBody TransportContractDTO transportContractDTO) throws URISyntaxException {
        log.debug("REST request to save TransportContract : {}", transportContractDTO);
        if (transportContractDTO.getId() != null) {
            throw new BadRequestAlertException("A new transportContract cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TransportContractDTO result = transportContractService.save(transportContractDTO);
        return ResponseEntity.created(new URI("/api/transport-contracts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /transport-contracts : Updates an existing transportContract.
     *
     * @param transportContractDTO the transportContractDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated transportContractDTO,
     * or with status 400 (Bad Request) if the transportContractDTO is not valid,
     * or with status 500 (Internal Server Error) if the transportContractDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/transport-contracts")
    @Timed
    public ResponseEntity<TransportContractDTO> updateTransportContract(@Valid @RequestBody TransportContractDTO transportContractDTO) throws URISyntaxException {
        log.debug("REST request to update TransportContract : {}", transportContractDTO);
        if (transportContractDTO.getId() == null) {
            return createTransportContract(transportContractDTO);
        }
        TransportContractDTO result = transportContractService.save(transportContractDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, transportContractDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /transport-contracts : get all the transportContracts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of transportContracts in body
     */
    @GetMapping("/transport-contracts")
    @Timed
    public ResponseEntity<List<TransportContractDTO>> getAllTransportContracts(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of TransportContracts");
        Page<TransportContractDTO> page = transportContractService.findAll(query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transport-contracts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /transport-contracts/:id : get the "id" transportContract.
     *
     * @param id the id of the transportContractDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the transportContractDTO, or with status 404 (Not Found)
     */
    @GetMapping("/transport-contracts/{id}")
    @Timed
    public ResponseEntity<TransportContractDTO> getTransportContract(@PathVariable Long id) {
        log.debug("REST request to get TransportContract : {}", id);
        TransportContractDTO transportContractDTO = transportContractService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(transportContractDTO));
    }

    /**
     * DELETE  /transport-contracts/:id : delete the "id" transportContract.
     *
     * @param id the id of the transportContractDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/transport-contracts/{id}")
    @Timed
    public ResponseEntity<Void> deleteTransportContract(@PathVariable Long id) {
        log.debug("REST request to delete TransportContract : {}", id);
        transportContractService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/transport-contracts/{id}/confirm")
    @Timed
    public ResponseEntity<Void> confirmTransportContract(@PathVariable Long id) {
        log.debug("REST request to confirm TransportContract : {}", id);
        transportContractService.confirm(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityConfirmedAlert(ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/transport-contracts/{id}/revert-confirm")
    @Timed
    public ResponseEntity<Void> revertConfirmTransportContract(@PathVariable Long id) {
        log.debug("REST request to revert confirm TransportContract : {}", id);
        transportContractService.revertConfirm(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityConfirmedAlert(ENTITY_NAME, id.toString())).build();
    }
}
