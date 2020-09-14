package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.ProductSrcService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ProductSrcDTO;
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
 * REST controller for managing ProductSrc.
 */
@RestController
@RequestMapping("/api")
public class ProductSrcResource {

    private final Logger log = LoggerFactory.getLogger(ProductSrcResource.class);

    private static final String ENTITY_NAME = "niopdcbaseProductSrc";

    private final ProductSrcService productSrcService;

    public ProductSrcResource(ProductSrcService productSrcService) {
        this.productSrcService = productSrcService;
    }

    /**
     * POST  /product-srcs : Create a new productSrc.
     *
     * @param productSrcDTO the productSrcDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productSrcDTO, or with status 400 (Bad Request) if the productSrc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-srcs")
    @Timed
    public ResponseEntity<ProductSrcDTO> createProductSrc(@Valid @RequestBody ProductSrcDTO productSrcDTO) throws URISyntaxException {
        log.debug("REST request to save ProductSrc : {}", productSrcDTO);
        if (productSrcDTO.getId() != null) {
            throw new BadRequestAlertException("A new productSrc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductSrcDTO result = productSrcService.save(productSrcDTO);
        return ResponseEntity.created(new URI("/api/product-srcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-srcs : Updates an existing productSrc.
     *
     * @param productSrcDTO the productSrcDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productSrcDTO,
     * or with status 400 (Bad Request) if the productSrcDTO is not valid,
     * or with status 500 (Internal Server Error) if the productSrcDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-srcs")
    @Timed
    public ResponseEntity<ProductSrcDTO> updateProductSrc(@Valid @RequestBody ProductSrcDTO productSrcDTO) throws URISyntaxException {
        log.debug("REST request to update ProductSrc : {}", productSrcDTO);
        if (productSrcDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductSrcDTO result = productSrcService.save(productSrcDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productSrcDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-srcs : get all the productSrcs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productSrcs in body
     */
    @GetMapping("/product-srcs")
    @Timed
    public ResponseEntity<List<ProductSrcDTO>> getAllProductSrcs(Pageable pageable) {
        log.debug("REST request to get a page of ProductSrcs");
        Page<ProductSrcDTO> page = productSrcService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-srcs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /product-srcs/:id : get the "id" productSrc.
     *
     * @param id the id of the productSrcDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productSrcDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-srcs/{id}")
    @Timed
    public ResponseEntity<ProductSrcDTO> getProductSrc(@PathVariable Long id) {
        log.debug("REST request to get ProductSrc : {}", id);
        ProductSrcDTO productSrcDTO = productSrcService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productSrcDTO));
    }

    /**
     * DELETE  /product-srcs/:id : delete the "id" productSrc.
     *
     * @param id the id of the productSrcDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-srcs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductSrc(@PathVariable Long id) {
        log.debug("REST request to delete ProductSrc : {}", id);
        productSrcService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
