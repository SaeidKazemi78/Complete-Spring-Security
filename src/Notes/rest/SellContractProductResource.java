package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.SellContractProductService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductFullDTO;
import ir.donyapardaz.niopdc.base.validation.SellContractProductValidator;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing SellContractProduct.
 */
@RestController
@RequestMapping("/api")
public class SellContractProductResource {

    private static final String ENTITY_NAME = "sellContractProduct";
    private final Logger log = LoggerFactory.getLogger(SellContractProductResource.class);
    private final SellContractProductService sellContractProductService;
    private SellContractProductValidator sellContractProductValidator;

    public SellContractProductResource(SellContractProductService sellContractProductService, SellContractProductValidator sellContractProductValidator) {
        this.sellContractProductService = sellContractProductService;
        this.sellContractProductValidator = sellContractProductValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(sellContractProductValidator);
    }

    /**
     * POST  /sell-contract-products : Create a new sellContractProduct.
     *
     * @param sellContractProductFullDTO the sellContractProductFullDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellContractProductFullDTO, or with status 400 (Bad Request) if the sellContractProduct has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sell-contract-products")
    @Timed
    public ResponseEntity createSellContractProduct(@Valid @RequestBody SellContractProductFullDTO sellContractProductFullDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save SellContractProduct : {}", sellContractProductFullDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (sellContractProductFullDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new sellContractProduct cannot already have an ID")).body(null);
        }
        SellContractProductFullDTO result = sellContractProductService.save(sellContractProductFullDTO);
        return ResponseEntity.created(new URI("/api/sell-contract-products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sell-contract-products : Updates an existing sellContractProduct.
     *
     * @param sellContractProductFullDTO the sellContractProductFullDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellContractProductFullDTO,
     * or with status 400 (Bad Request) if the sellContractProductFullDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellContractProductFullDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sell-contract-products")
    @Timed
    public ResponseEntity updateSellContractProduct(@Valid @RequestBody SellContractProductFullDTO sellContractProductFullDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update SellContractProduct : {}", sellContractProductFullDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (sellContractProductFullDTO.getId() == null) {
            return createSellContractProduct(sellContractProductFullDTO, validation);
        }
        SellContractProductFullDTO result = sellContractProductService.save(sellContractProductFullDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellContractProductFullDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sell-contract-products : get all the sellContractProducts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellContractProducts in body
     */
    @GetMapping("/sell-contract-products")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> getAllSellContractProducts(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SellContractProducts");
        Page<SellContractProductDTO> page = sellContractProductService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contract-products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sell-contract-products/:id : get the "id" sellContractProduct.
     *
     * @param id the id of the sellContractProductDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellContractProductDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sell-contract-products/{id}")
    @Timed
    public ResponseEntity<SellContractProductFullDTO> getSellContractProduct(@PathVariable Long id) {
        log.debug("REST request to get SellContractProduct : {}", id);
        SellContractProductFullDTO sellContractProductFullDTO = sellContractProductService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractProductFullDTO));
    }

    /**
     * DELETE  /sell-contract-products/:id : delete the "id" sellContractProduct.
     *
     * @param id the id of the sellContractProductDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sell-contract-products/{id}")
    @Timed
    public ResponseEntity<Void> deleteSellContractProduct(@PathVariable Long id) {
        log.debug("REST request to delete SellContractProduct : {}", id);
        sellContractProductService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/sell-contract-products/customer/{customerId}/sell-contract-products")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> getAllSellContractProductsByCustomerId(
        @PathVariable Long customerId) {
        log.debug("REST request to get a page of SellContracts");
        List<SellContractProductDTO> page = sellContractProductService.findAllSellContractProductByCustomerId(customerId);
        if (page == null)
            page = new ArrayList<>();
        return ResponseUtil.wrapOrNotFound(Optional.of(page));
    }

    @GetMapping("/sell-contract-products/person/{personId}/sell-contract-products")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> getAllSellContractProductsByPersonId(
        @PathVariable Long personId) {
        log.debug("REST request to get a page of SellContracts");
        List<SellContractProductDTO> page = sellContractProductService.findAllSellContractProductByPersonId(personId);
        if (page == null)
            page = new ArrayList<>();
        return ResponseUtil.wrapOrNotFound(Optional.of(page));
    }

    @GetMapping("/sell-contract-products/{sellContractProductId}/sell-contract-product-credits")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> getAllCustomerCredit(
        @PathVariable Long sellContractProductId,
        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SellContracts");
        Page<CustomerCreditDTO> page = sellContractProductService.findAllCustomerCredits(sellContractProductId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contract-products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/sell-contract-products/used-by-sell-contract-product")
    @Timed
    public ResponseEntity<Boolean> isUsedBySellContractProduct(@RequestParam(required = false) Long rateGroupId,
                                                               @RequestParam(required = false) Long currencyRateGroupId) {
        log.debug("REST request to get SellContractProduct : {}");
        Boolean res = sellContractProductService.isUsedBySellContractProduct(rateGroupId, currencyRateGroupId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(res));
    }

    @GetMapping("/sell-contract-products/{id}/get-sell-contract-customer-id")
    @Timed
    public ResponseEntity<Long> getSellContractCustomerIdBySellContractProduct(@PathVariable Long id) {
        log.debug("REST request to get SellContractProduct : {}", id);
        Long sellContractProductDTO = sellContractProductService.findSellContractCustomerIdBySellContractProduct(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractProductDTO));
    }

    @GetMapping("/sell-contract-products/{id}/sell-contract/have-quota")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> getAllSellContractByHaveQuotaCredit(@PathVariable Long id) {
        log.debug("REST request to get SellContractProduct : {}", id);
        List<SellContractProductDTO> sellContractProductFullDTO = sellContractProductService.getAllByHaveQuotaCredit(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractProductFullDTO));
    }

    @GetMapping("/sell-contract-products/transfer-quota/{fromSellContractProductId}")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> getSellContractProductForTransferQuota(@PathVariable Long fromSellContractProductId) {
        log.debug("REST request to get SellContractProduct : {}", fromSellContractProductId);
        List<SellContractProductDTO> sellContractProductFullDTO = sellContractProductService.getForTransferQuota(fromSellContractProductId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractProductFullDTO));
    }

    @GetMapping("/sell-contract-products/airplane/rate-group-ids")
    @Timed
    public ResponseEntity<Set<Long>> findAllRateGroupsIdsForAirplane() {
        log.debug("REST request to get a page of SellContractProducts");
        Set<Long> page = sellContractProductService.findAllRateGroupIdsForAirplane();
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
