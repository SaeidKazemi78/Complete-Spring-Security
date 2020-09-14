package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.domain.enumeration.ConfigType;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.domain.projection.CurrencyRateGroup;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.NiopdcConfigService;
import ir.donyapardaz.niopdc.base.service.dto.NiopdcConfigDTO;
import ir.donyapardaz.niopdc.base.validation.NiopdcConfigValidator;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NiopdcConfig.
 */
@RestController
@RequestMapping("/api")
public class NiopdcConfigResource {

    private static final String ENTITY_NAME = "niopdcConfig";
    private final Logger log = LoggerFactory.getLogger(NiopdcConfigResource.class);
    private final NiopdcConfigService niopdcConfigService;
    private final NiopdcConfigValidator niopdcConfigValidator;

    public NiopdcConfigResource(NiopdcConfigService niopdcConfigService, NiopdcConfigValidator niopdcConfigValidator) {
        this.niopdcConfigService = niopdcConfigService;
        this.niopdcConfigValidator = niopdcConfigValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(niopdcConfigValidator);
    }

    /**
     * POST  /niopdc-configs : Create a new niopdcConfig.
     *
     * @param niopdcConfigDTO the niopdcConfigDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new niopdcConfigDTO, or with status 400 (Bad Request) if the niopdcConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/niopdc-configs")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_NIOPDC_CONFIG})
    public ResponseEntity<NiopdcConfigDTO> createNiopdcConfig(@Valid @RequestBody NiopdcConfigDTO niopdcConfigDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save NiopdcConfig : {}", niopdcConfigDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (niopdcConfigDTO.getId() != null) {
            throw new BadRequestAlertException("A new niopdcConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NiopdcConfigDTO result = niopdcConfigService.save(niopdcConfigDTO);
        return ResponseEntity.created(new URI("/api/niopdc-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /niopdc-configs : Updates an existing niopdcConfig.
     *
     * @param niopdcConfigDTO the niopdcConfigDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated niopdcConfigDTO,
     * or with status 400 (Bad Request) if the niopdcConfigDTO is not valid,
     * or with status 500 (Internal Server Error) if the niopdcConfigDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/niopdc-configs")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_NIOPDC_CONFIG})
    public ResponseEntity<NiopdcConfigDTO> updateNiopdcConfig(@Valid @RequestBody NiopdcConfigDTO niopdcConfigDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update NiopdcConfig : {}", niopdcConfigDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (niopdcConfigDTO.getId() == null) {
            return createNiopdcConfig(niopdcConfigDTO, validation);
        }
        NiopdcConfigDTO result = niopdcConfigService.save(niopdcConfigDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, niopdcConfigDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /niopdc-configs : get all the niopdcConfigs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of niopdcConfigs in body
     */
    @GetMapping("/niopdc-configs")
    @Timed
    public ResponseEntity<List<NiopdcConfigDTO>> getAllNiopdcConfigs(Pageable pageable) {
        log.debug("REST request to get a page of NiopdcConfigs");
        Page<NiopdcConfigDTO> page = niopdcConfigService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/niopdc-configs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }



    @GetMapping("/niopdc-configs/currency")
    @Timed
    public ResponseEntity<List<Currency>> getAllCurrencies(@RequestParam(required = true) ConfigType configType) {
        log.debug("REST request to get a page of Currencies");
        List<Currency> page = niopdcConfigService.findAllCurrencies(configType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/niopdc-configs/currency-rate-group")
    @Timed
    public ResponseEntity<CurrencyRateGroup> getAllCurrencyRateGroup(@RequestParam(required = true) ConfigType configType) {
        log.debug("REST request to get a page of Currency Rate Group");
        CurrencyRateGroup page = niopdcConfigService.findALlCurrencyRateGroup(configType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
    @GetMapping("/niopdc-configs/transfer-type")
    @Timed
    public ResponseEntity<Long> getTransferTypeId() {
        log.debug("REST request to get a page of transferTypeId");
        Long result = niopdcConfigService.findTransferType();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/niopdc-configs/invoice-counter-offset")
    @Timed
    public ResponseEntity<Long> getInvoiceCounterOffset() {
        log.debug("REST request to get a page of ");
        Long result = niopdcConfigService.getInvoiceCounterOffset();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/niopdc-configs/transfer-type-contaminate")
    @Timed
    public ResponseEntity<List<Long>> getTransferTypeContaminate() {
        log.debug("REST request to get a page of transferTypeId");
        List<Long> result = niopdcConfigService.findTransferTypeContaminate();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * GET  /niopdc-configs/:id : get the "id" niopdcConfig.
     *
     * @param id the id of the niopdcConfigDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the niopdcConfigDTO, or with status 404 (Not Found)
     */
    @GetMapping("/niopdc-configs/{id}")
    @Timed
    public ResponseEntity<NiopdcConfigDTO> getNiopdcConfig(@PathVariable Long id) {
        log.debug("REST request to get NiopdcConfig : {}", id);
        NiopdcConfigDTO niopdcConfigDTO = niopdcConfigService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(niopdcConfigDTO));
    }

    /**
     * DELETE  /niopdc-configs/:id : delete the "id" niopdcConfig.
     *
     * @param id the id of the niopdcConfigDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/niopdc-configs/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_NIOPDC_CONFIG})
    public ResponseEntity<Void> deleteNiopdcConfig(@PathVariable Long id) {
        log.debug("REST request to delete NiopdcConfig : {}", id);
        niopdcConfigService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
