package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.TagRateService;
import ir.donyapardaz.niopdc.base.service.dto.TagRateDTO;
import ir.donyapardaz.niopdc.base.validation.TagRateValidator;
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
 * REST controller for managing TagRate.
 */
@RestController
@RequestMapping("/api")
public class TagRateResource {

    private static final String ENTITY_NAME = "tagRate";
    private final Logger log = LoggerFactory.getLogger(TagRateResource.class);
    private final TagRateService tagRateService;
    private final TagRateValidator tagRateValidator;

    public TagRateResource(TagRateService tagRateService, TagRateValidator tagRateValidator) {
        this.tagRateService = tagRateService;
        this.tagRateValidator = tagRateValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(tagRateValidator);
    }

    /**
     * POST  /tag-rates : Create a new tagRate.
     *
     * @param tagRateDTO the tagRateDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tagRateDTO, or with status 400 (Bad Request) if the tagRate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tag-rates")
    @Timed
    public ResponseEntity<TagRateDTO> createTagRate(@Valid @RequestBody TagRateDTO tagRateDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save TagRate : {}", tagRateDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (tagRateDTO.getId() != null) {
            throw new BadRequestAlertException("A new tagRate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TagRateDTO result = tagRateService.save(tagRateDTO);
        return ResponseEntity.created(new URI("/api/tag-rates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tag-rates : Updates an existing tagRate.
     *
     * @param tagRateDTO the tagRateDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tagRateDTO,
     * or with status 400 (Bad Request) if the tagRateDTO is not valid,
     * or with status 500 (Internal Server Error) if the tagRateDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tag-rates")
    @Timed
    public ResponseEntity<TagRateDTO> updateTagRate(@Valid @RequestBody TagRateDTO tagRateDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update TagRate : {}", tagRateDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (tagRateDTO.getId() == null) {
            return createTagRate(tagRateDTO, validation);
        }
        TagRateDTO result = tagRateService.save(tagRateDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tagRateDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tag-rates : get all the tagRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of tagRates in body
     */
    @GetMapping("/tag-rates")
    @Timed
    public ResponseEntity<List<TagRateDTO>> getAllTagRates(Pageable pageable) {
        log.debug("REST request to get a page of TagRates");
        Page<TagRateDTO> page = tagRateService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/tag-rates");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /tag-rates/:id : get the "id" tagRate.
     *
     * @param id the id of the tagRateDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tagRateDTO, or with status 404 (Not Found)
     */
    @GetMapping("/tag-rates/{id}")
    @Timed
    public ResponseEntity<TagRateDTO> getTagRate(@PathVariable Long id) {
        log.debug("REST request to get TagRate : {}", id);
        TagRateDTO tagRateDTO = tagRateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tagRateDTO));
    }

    /**
     * DELETE  /tag-rates/:id : delete the "id" tagRate.
     *
     * @param id the id of the tagRateDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tag-rates/{id}")
    @Timed
    public ResponseEntity<Void> deleteTagRate(@PathVariable Long id) {
        log.debug("REST request to delete TagRate : {}", id);
        tagRateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/tag-rates/location-access")
    @Timed
    public ResponseEntity<List<TagRateDTO>> getAllTagRatesByLocationAccess(Pageable pageable) {
        log.debug("REST request to get a page of TagRates");
        List<TagRateDTO> page = tagRateService.findAllByLocationAccess();
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
}
