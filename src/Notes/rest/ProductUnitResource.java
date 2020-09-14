package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.ProductUnitService;
import ir.donyapardaz.niopdc.base.service.dto.ContainerDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ProductUnitDTO;
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
 * REST controller for managing ProductUnit.
 */
@RestController
@RequestMapping("/api")
public class ProductUnitResource {

    private final Logger log = LoggerFactory.getLogger(ProductUnitResource.class);

    private static final String ENTITY_NAME = "productUnit";

    private final ProductUnitService productUnitService;

    public ProductUnitResource(ProductUnitService productUnitService) {
        this.productUnitService = productUnitService;
    }

    /**
     * POST  /product-units : Create a new productUnit.
     *
     * @param productUnitDTO the productUnitDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productUnitDTO, or with status 400 (Bad Request) if the productUnit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-units")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_PRODUCT_UNIT})
    public ResponseEntity<ProductUnitDTO> createProductUnit(@Valid @RequestBody ProductUnitDTO productUnitDTO) throws URISyntaxException {
        log.debug("REST request to save ProductUnit : {}", productUnitDTO);
        if (productUnitDTO.getId() != null) {
            throw new BadRequestAlertException("A new productUnit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductUnitDTO result = productUnitService.save(productUnitDTO);
        return ResponseEntity.created(new URI("/api/product-units/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-units : Updates an existing productUnit.
     *
     * @param productUnitDTO the productUnitDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productUnitDTO,
     * or with status 400 (Bad Request) if the productUnitDTO is not valid,
     * or with status 500 (Internal Server Error) if the productUnitDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-units")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_PRODUCT_UNIT})
    public ResponseEntity<ProductUnitDTO> updateProductUnit(@Valid @RequestBody ProductUnitDTO productUnitDTO) throws URISyntaxException {
        log.debug("REST request to update ProductUnit : {}", productUnitDTO);
        if (productUnitDTO.getId() == null) {
            return createProductUnit(productUnitDTO);
        }
        ProductUnitDTO result = productUnitService.save(productUnitDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productUnitDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-units : get all the productUnits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productUnits in body
     */
    @GetMapping("/product-units")
    @Timed
    public ResponseEntity<List<ProductUnitDTO>> getAllProductUnits(@RequestParam(required = false) String query,@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ProductUnits");
        Page<ProductUnitDTO> page = productUnitService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-units");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-units/:id : get the "id" productUnit.
     *
     * @param id the id of the productUnitDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productUnitDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-units/{id}")
    @Timed
    public ResponseEntity<ProductUnitDTO> getProductUnit(@PathVariable Long id) {
        log.debug("REST request to get ProductUnit : {}", id);
        ProductUnitDTO productUnitDTO = productUnitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productUnitDTO));
    }

    /**
     * DELETE  /product-units/:id : delete the "id" productUnit.
     *
     * @param id the id of the productUnitDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-units/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_PRODUCT_UNIT})
    public ResponseEntity<Void> deleteProductUnit(@PathVariable Long id) {
        log.debug("REST request to delete ProductUnit : {}", id);
        productUnitService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * GET  /product-units/:id/containers : get all the productUnitRates.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productUnitRates in body
     */
    @GetMapping("/product-units/{id}/containers")
    @Timed
    public ResponseEntity<List<ContainerDTO>> getAllContainers(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ProductUnitRates");
        List<ContainerDTO> page = productUnitService.findAllContainers(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
