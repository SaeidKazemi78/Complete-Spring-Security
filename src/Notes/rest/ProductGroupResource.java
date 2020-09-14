package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.ProductGroupService;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ProductGroupDTO;
import io.swagger.annotations.ApiParam;
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
 * REST controller for managing ProductGroup.
 */
@RestController
@RequestMapping("/api")
public class ProductGroupResource {

    private final Logger log = LoggerFactory.getLogger(ProductGroupResource.class);

    private static final String ENTITY_NAME = "productGroup";

    private final ProductGroupService productGroupService;

    public ProductGroupResource(ProductGroupService productGroupService) {
        this.productGroupService = productGroupService;
    }

    /**
     * POST  /product-groups : Create a new productGroup.
     *
     * @param productGroupDTO the productGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productGroupDTO, or with status 400 (Bad Request) if the productGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-groups")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_PRODUCT_GROUP})
    public ResponseEntity<ProductGroupDTO> createProductGroup(@Valid @RequestBody ProductGroupDTO productGroupDTO) throws URISyntaxException {
        log.debug("REST request to save ProductGroup : {}", productGroupDTO);
        if (productGroupDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new productGroup cannot already have an ID")).body(null);
        }
        ProductGroupDTO result = productGroupService.save(productGroupDTO);
        return ResponseEntity.created(new URI("/api/product-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-groups : Updates an existing productGroup.
     *
     * @param productGroupDTO the productGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productGroupDTO,
     * or with status 400 (Bad Request) if the productGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the productGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-groups")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_PRODUCT_GROUP})
    public ResponseEntity<ProductGroupDTO> updateProductGroup(@Valid @RequestBody ProductGroupDTO productGroupDTO) throws URISyntaxException {
        log.debug("REST request to update ProductGroup : {}", productGroupDTO);
        if (productGroupDTO.getId() == null) {
            return createProductGroup(productGroupDTO);
        }
        ProductGroupDTO result = productGroupService.save(productGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-groups : get all the productGroups.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productGroups in body
     */
    @GetMapping("/product-groups")
    @Timed
    public ResponseEntity<List<ProductGroupDTO>> getAllProductGroups(@RequestParam(required = false) String query,@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ProductGroups");
        Page<ProductGroupDTO> page = productGroupService.findAll(pageable,query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-groups/:id : get the "id" productGroup.
     *
     * @param id the id of the productGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-groups/{id}")
    @Timed
    public ResponseEntity<ProductGroupDTO> getProductGroup(@PathVariable Long id) {
        log.debug("REST request to get ProductGroup : {}", id);
        ProductGroupDTO productGroupDTO = productGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productGroupDTO));
    }

    /**
     * DELETE  /product-groups/:id : delete the "id" productGroup.
     *
     * @param id the id of the productGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-groups/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_PRODUCT_GROUP})
    public ResponseEntity<Void> deleteProductGroup(@PathVariable Long id) {
        log.debug("REST request to delete ProductGroup : {}", id);
        productGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
