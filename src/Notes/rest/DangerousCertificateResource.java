package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.DangerousCertificateService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.DangerousCertificateDTO;
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
 * REST controller for managing DangerousCertificate.
 */
@RestController
@RequestMapping("/api")
public class DangerousCertificateResource {

    private final Logger log = LoggerFactory.getLogger(DangerousCertificateResource.class);

    private static final String ENTITY_NAME = "dangerousCertificate";

    private final DangerousCertificateService dangerousCertificateService;

    public DangerousCertificateResource(DangerousCertificateService dangerousCertificateService) {
        this.dangerousCertificateService = dangerousCertificateService;
    }

    /**
     * POST  /dangerous-certificates : Create a new dangerousCertificate.
     *
     * @param dangerousCertificateDTO the dangerousCertificateDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dangerousCertificateDTO, or with status 400 (Bad Request) if the dangerousCertificate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dangerous-certificates")
    @Timed
    public ResponseEntity<DangerousCertificateDTO> createDangerousCertificate(@RequestBody DangerousCertificateDTO dangerousCertificateDTO) throws URISyntaxException {
        log.debug("REST request to save DangerousCertificate : {}", dangerousCertificateDTO);
        if (dangerousCertificateDTO.getId() != null) {
            throw new BadRequestAlertException("A new dangerousCertificate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DangerousCertificateDTO result = dangerousCertificateService.save(dangerousCertificateDTO);
        return ResponseEntity.created(new URI("/api/dangerous-certificates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dangerous-certificates : Updates an existing dangerousCertificate.
     *
     * @param dangerousCertificateDTO the dangerousCertificateDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dangerousCertificateDTO,
     * or with status 400 (Bad Request) if the dangerousCertificateDTO is not valid,
     * or with status 500 (Internal Server Error) if the dangerousCertificateDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dangerous-certificates")
    @Timed
    public ResponseEntity<DangerousCertificateDTO> updateDangerousCertificate(@RequestBody DangerousCertificateDTO dangerousCertificateDTO) throws URISyntaxException {
        log.debug("REST request to update DangerousCertificate : {}", dangerousCertificateDTO);
        if (dangerousCertificateDTO.getId() == null) {
            return createDangerousCertificate(dangerousCertificateDTO);
        }
        DangerousCertificateDTO result = dangerousCertificateService.save(dangerousCertificateDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dangerousCertificateDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dangerous-certificates : get all the dangerousCertificates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of dangerousCertificates in body
     */
    @GetMapping("/dangerous-certificates")
    @Timed
    public ResponseEntity<List<DangerousCertificateDTO>> getAllDangerousCertificates(Pageable pageable) {
        log.debug("REST request to get a page of DangerousCertificates");
        Page<DangerousCertificateDTO> page = dangerousCertificateService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/dangerous-certificates");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /dangerous-certificates/:id : get the "id" dangerousCertificate.
     *
     * @param id the id of the dangerousCertificateDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dangerousCertificateDTO, or with status 404 (Not Found)
     */
    @GetMapping("/dangerous-certificates/{id}")
    @Timed
    public ResponseEntity<DangerousCertificateDTO> getDangerousCertificate(@PathVariable Long id) {
        log.debug("REST request to get DangerousCertificate : {}", id);
        DangerousCertificateDTO dangerousCertificateDTO = dangerousCertificateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dangerousCertificateDTO));
    }

    /**
     * DELETE  /dangerous-certificates/:id : delete the "id" dangerousCertificate.
     *
     * @param id the id of the dangerousCertificateDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dangerous-certificates/{id}")
    @Timed
    public ResponseEntity<Void> deleteDangerousCertificate(@PathVariable Long id) {
        log.debug("REST request to delete DangerousCertificate : {}", id);
        dangerousCertificateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
