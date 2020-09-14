package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.CeilingQuotaService;
import ir.donyapardaz.niopdc.base.service.dto.CeilingQuotaDTO;
import ir.donyapardaz.niopdc.base.validation.CeilingQuotaValidator;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.errors.ValidationResponseEntityGenerator;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CeilingQuota.
 */
@RestController
@RequestMapping("/api")
public class CeilingQuotaResource {

    private static final String ENTITY_NAME = "ceilingQuota";
    private final Logger log = LoggerFactory.getLogger(CeilingQuotaResource.class);
    private final CeilingQuotaService ceilingQuotaService;
    private final CeilingQuotaValidator ceilingQuotaValidator;

    public CeilingQuotaResource(CeilingQuotaService ceilingQuotaService, CeilingQuotaValidator ceilingQuotaValidator) {
        this.ceilingQuotaService = ceilingQuotaService;
        this.ceilingQuotaValidator = ceilingQuotaValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(ceilingQuotaValidator);
    }

    /**
     * POST  /ceiling-quotas : Create a new ceilingQuota.
     *
     * @param ceilingQuotaDTO the ceilingQuotaDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new ceilingQuotaDTO, or with status 400 (Bad Request) if the ceilingQuota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ceiling-quotas")
    @Timed
    public ResponseEntity<CeilingQuotaDTO> createCeilingQuota(@Valid @RequestBody CeilingQuotaDTO ceilingQuotaDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save CeilingQuota : {}", ceilingQuotaDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (ceilingQuotaDTO.getId() != null) {
            throw new BadRequestAlertException("A new ceilingQuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CeilingQuotaDTO result = ceilingQuotaService.save(ceilingQuotaDTO);
        return ResponseEntity.created(new URI("/api/ceiling-quotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ceiling-quotas : Updates an existing ceilingQuota.
     *
     * @param ceilingQuotaDTO the ceilingQuotaDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated ceilingQuotaDTO,
     * or with status 400 (Bad Request) if the ceilingQuotaDTO is not valid,
     * or with status 500 (Internal Server Error) if the ceilingQuotaDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ceiling-quotas")
    @Timed
    public ResponseEntity<CeilingQuotaDTO> updateCeilingQuota(@Valid @RequestBody CeilingQuotaDTO ceilingQuotaDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update CeilingQuota : {}", ceilingQuotaDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (ceilingQuotaDTO.getId() == null) {
            return createCeilingQuota(ceilingQuotaDTO,validation);
        }
        CeilingQuotaDTO result = ceilingQuotaService.save(ceilingQuotaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, ceilingQuotaDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ceiling-quotas : get all the ceilingQuotas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ceilingQuotas in body
     */
    @GetMapping("/ceiling-quotas")
    @Timed
    public ResponseEntity<List<CeilingQuotaDTO>> getAllCeilingQuotas(Pageable pageable) {
        log.debug("REST request to get a page of CeilingQuotas");
        Page<CeilingQuotaDTO> page = ceilingQuotaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ceiling-quotas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ceiling-quotas/:id : get the "id" ceilingQuota.
     *
     * @param id the id of the ceilingQuotaDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the ceilingQuotaDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ceiling-quotas/{id}")
    @Timed
    public ResponseEntity<CeilingQuotaDTO> getCeilingQuota(@PathVariable Long id) {
        log.debug("REST request to get CeilingQuota : {}", id);
        CeilingQuotaDTO ceilingQuotaDTO = ceilingQuotaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(ceilingQuotaDTO));
    }

    /**
     * DELETE  /ceiling-quotas/:id : delete the "id" ceilingQuota.
     *
     * @param id the id of the ceilingQuotaDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ceiling-quotas/{id}")
    @Timed
    public ResponseEntity<Void> deleteCeilingQuota(@PathVariable Long id) {
        log.debug("REST request to delete CeilingQuota : {}", id);
        ceilingQuotaService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
