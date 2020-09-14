package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ProductShowStatus;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.ProductService;
import ir.donyapardaz.niopdc.base.service.dto.ConsumptionDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductListDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductSrcDTO;
import ir.donyapardaz.niopdc.base.validation.ProductValidator;
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
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private static final String ENTITY_NAME = "product";
    private final Logger log = LoggerFactory.getLogger(ProductResource.class);
    private final ProductService productService;
    private ProductValidator productValidator;

    public ProductResource(ProductService productService, ProductValidator productValidator) {
        this.productService = productService;
        this.productValidator = productValidator;
    }


    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(productValidator);
    }


    /**
     * POST  /products : Create a new product.
     *
     * @param productDTO the productDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productDTO, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/products")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_PRODUCT})
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Product : {}", productDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (productDTO.getId() != null) {
            throw new BadRequestAlertException("A new product cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductDTO result = productService.save(productDTO);
        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /products : Updates an existing product.
     *
     * @param productDTO the productDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productDTO,
     * or with status 400 (Bad Request) if the productDTO is not valid,
     * or with status 500 (Internal Server Error) if the productDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/products")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_PRODUCT})
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Product : {}", productDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        }
        if (productDTO.getId() == null) {
            return createProduct(productDTO, validation);
        }
        ProductDTO result = productService.save(productDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /products : get all the products.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping("/products")
    @Timed
    public ResponseEntity<List<ProductListDTO>> getAllProducts(Pageable pageable, @RequestParam(required = false) String query, @RequestParam(required = false) CustomerGroup customerGroup) {
        log.debug("REST request to get a page of Products");
        Page<ProductListDTO> page = productService.findAll(pageable, query, customerGroup);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /products : get all the products.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping("/products/has-container/{hasContainer}")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProductsByHasContainer(@PathVariable("hasContainer") Boolean hasContainer, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Products");
        Page<ProductDTO> page = productService.findAllByHasContainer(hasContainer, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    /**
     * GET  /products : get all the products.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */
    @GetMapping("/products/rate-groups/{rateGroupId}/has-container/{hasContainer}")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProductsByHasContainer(@PathVariable("rateGroupId") Long rateGroupId, @PathVariable("hasContainer") Boolean hasContainer) {
        log.debug("REST request to get a page of Products");
        List<ProductDTO> page = productService.findAllByRateGroupAndHasContainer(rateGroupId, hasContainer);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param id the id of the productDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productDTO, or with status 404 (Not Found)
     */
    @GetMapping("/products/{id}")
    @Timed
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        ProductDTO productDTO = productService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productDTO));
    }

    /**
     * DELETE  /products/:id : delete the "id" product.
     *
     * @param id the id of the productDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/products/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_PRODUCT})
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        productService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    // region consumptions
    @GetMapping("/products/{customerId}/{productId}/consumptions")
    @Timed
    public ResponseEntity<List<ConsumptionDTO>> getAllConsumptions(@PathVariable("customerId") Long customerId, @PathVariable("productId") Long productId, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ProductRates for product ");
        Page<ConsumptionDTO> page = productService.getAllConsumptions(pageable, customerId, productId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/products/{id}/consumptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    //endregion

    @GetMapping("/products/all-products-by-id")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProductsByIds(@RequestParam Set<Long> ids) {
        log.debug("REST request to get a page of Products by ids");
        List<ProductDTO> list = productService.findAllByIds(ids);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(list));
    }

    @GetMapping("/products/customer-group/{customerGroup}")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProductsForBoundary(@PathVariable CustomerGroup customerGroup) {
        log.debug("REST request to get a page of Products");
        List<ProductDTO> page = productService.findAllByCustomerGroup(customerGroup);

        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/products/customer")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProductsByCustomerId(@RequestParam(value = "customerId") Long customerId,
                                                                       @RequestParam(value = "date") ZonedDateTime date) {
        log.debug("REST request to get a page of Products By Customer");
        List<ProductDTO> page = productService.findAllByCustomerId(customerId, date);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/products/product-show-status/{productShowStatus}")
    @Timed
    public ResponseEntity<List<ProductListDTO>> getAllProducts(@PathVariable ProductShowStatus productShowStatus, Pageable pageable, @RequestParam(required = false) String query) {
        log.debug("REST request to get a page of Products");
        Page<ProductListDTO> page = productService.findAllByProductShowStatus(productShowStatus, pageable, query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/products/{id}/product-srcs")
    @Timed
    public ResponseEntity<List<ProductSrcDTO>> getAllProducts(@PathVariable Long id, Pageable pageable, @RequestParam(required = false) String query) {
        log.debug("REST request to get a page of Products");
        Page<ProductSrcDTO> page = productService.findAllProductSrcByProductId(id, pageable, query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products/" + id + "/product-srcs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/products/{id}/product-srcs/find-all")
    @Timed
    public ResponseEntity<List<ProductSrcDTO>> getAllProducts(@PathVariable Long id) {
        log.debug("REST request to get a page of Products");
        List<ProductSrcDTO> page = productService.findAllProductSrcByProductId(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @PostMapping("/products/get-by-code")
    @Timed
    public ResponseEntity<List<ProductDTO>> getByCode(@RequestBody List<String> codes) {
        log.debug("REST request to get a page of Products");
        List<ProductDTO> page = productService.findAllProductByProductCode(codes);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


}
