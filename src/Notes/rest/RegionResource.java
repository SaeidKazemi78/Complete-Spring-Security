package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.RegionService;
import ir.donyapardaz.niopdc.base.service.dto.RegionDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionListDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionSelectorDTO;
import ir.donyapardaz.niopdc.base.validation.RegionValidator;
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
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Region.
 */
@RestController
@RequestMapping("/api")
public class RegionResource {

    private final Logger log = LoggerFactory.getLogger(RegionResource.class);

    private static final String ENTITY_NAME = "region";

    private final RegionService regionService;
    private final RegionValidator regionValidator;

    public RegionResource(RegionService regionService, RegionValidator regionValidator) {
        this.regionService = regionService;
        this.regionValidator = regionValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(regionValidator);
    }

    /**
     * POST  /regions : Create a new region.
     *
     * @param regionDTO the regionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new regionDTO, or with status 400 (Bad Request) if the region has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/regions")
    @Timed
    public ResponseEntity<RegionDTO> createRegion(@Valid @RequestBody RegionDTO regionDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Region : {}", regionDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (regionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new region cannot already have an ID")).body(null);
        }
        RegionDTO result = regionService.save(regionDTO);
        return ResponseEntity.created(new URI("/api/regions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /regions : Updates an existing region.
     *
     * @param regionDTO the regionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated regionDTO,
     * or with status 400 (Bad Request) if the regionDTO is not valid,
     * or with status 500 (Internal Server Error) if the regionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/regions")
    @Timed
    public ResponseEntity<RegionDTO> updateRegion(@Valid @RequestBody RegionDTO regionDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Region : {}", regionDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (regionDTO.getId() == null) {
            return createRegion(regionDTO, validation);
        }
        RegionDTO result = regionService.save(regionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, regionDTO.getId().toString()))
            .body(result);
    }



    /**
     * GET  /regions/childs/{parentId} : get all the regions by parentId.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of regions in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/regions/{parentId}/regions")
    @Timed
    public ResponseEntity<List<RegionListDTO>> getAllRegionsByParentId(@PathVariable Long parentId, @RequestParam(required = false) String query, @ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Regions");
        if (parentId == -1) parentId = null;
        Page<RegionListDTO> page = regionService.findAllByParentId(parentId, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/regions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /regions/selector/{parentId} : get all the regions by parentId.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of regions in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/regions/selector/{parentId}")
    @Timed
    public ResponseEntity<List<RegionListDTO>> getAllRegionsByParentId(@PathVariable Long parentId, @RequestParam(required = false) Boolean dataAccess, Long countryId, @RequestParam(required = false) Set<Long> locationIds)
        throws URISyntaxException {
        log.debug("REST request to get a page of Regions");
        if (parentId == -1) parentId = null;
        if (dataAccess == null) dataAccess = false;
        List<RegionListDTO> list = regionService.findAllByParentId(parentId, dataAccess, countryId, locationIds);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/regions/recursive-to-up")
    @Timed
    public ResponseEntity<Map<Long, List<RegionSelectorDTO>>> getAllRecursiveToUp(@RequestParam List<Long> ids)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        Map<Long, List<RegionSelectorDTO>> listMap = regionService.findAllRecursiveToUp(ids);
        return new ResponseEntity<>(listMap, HttpStatus.OK);
    }


    /**
     * GET  /regions/:id : get the "id" region.
     *
     * @param id the id of the regionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the regionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/regions/{id}")
    @Timed
    public ResponseEntity<RegionDTO> getRegion(@PathVariable Long id) {
        log.debug("REST request to get Region : {}", id);
        RegionDTO regionDTO = regionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(regionDTO));
    }

    /**
     * DELETE  /regions/:id : delete the "id" region.
     *
     * @param id the id of the regionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/regions/{id}")
    @Timed
    public ResponseEntity<Void> deleteRegion(@PathVariable Long id) {
        log.debug("REST request to delete Region : {}", id);
        regionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/regions/national/{regionId}")
    @Timed
    public ResponseEntity<Boolean> isNational(@PathVariable Long regionId) {
        log.debug("REST request to get Region National : {}", regionId);
        Boolean isNational = regionService.isNational(regionId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(isNational));
    }

    @PostMapping("/regions/excel")
    @Timed
    public ResponseEntity<Void> loadExcel(@RequestParam("file") MultipartFile uploadfile) throws IOException {
        log.debug("... load excel ....");

        regionService.loadExcel(uploadfile.getInputStream());
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, uploadfile.getName())).build();
    }
}
