package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.OrderType;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import ir.donyapardaz.niopdc.base.domain.projection.CustomerSellContract;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.DepotService;
import ir.donyapardaz.niopdc.base.service.SellContractService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.CurrencyDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerSellContractDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.SellContractProductPersonCustomerDTO;
import ir.donyapardaz.niopdc.base.validation.SellContractValidator;
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
import java.util.Set;

/**
 * REST controller for managing SellContract.
 */
@RestController
@RequestMapping("/api")
public class SellContractResource {

    private static final String ENTITY_NAME = "sellContract";
    private final Logger log = LoggerFactory.getLogger(SellContractResource.class);
    private final SellContractService sellContractService;
    private final SellContractValidator sellContractValidator;
    private DepotService depotService;

    public SellContractResource(SellContractService sellContractService, SellContractValidator sellContractValidator) {
        this.sellContractService = sellContractService;
        this.sellContractValidator = sellContractValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(sellContractValidator);
    }

    /**
     * POST  /sell-contracts : Create a new sellContract.
     *
     * @param sellContractDTO the sellContractDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new sellContractDTO, or with status 400 (Bad Request) if the sellContract has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sell-contracts")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_SELL_CONTRACT})
    public ResponseEntity<SellContractDTO> createSellContract(@Valid @RequestBody SellContractDTO sellContractDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save SellContract : {}", sellContractDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        } else {
            if (sellContractDTO.getId() != null) {
                throw new BadRequestAlertException("A new sellContract cannot already have an ID", ENTITY_NAME, "idexists");
            }
            SellContractDTO result = sellContractService.save(sellContractDTO);
            return ResponseEntity.created(new URI("/api/sell-contracts/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        }
    }

    /**
     * PUT  /sell-contracts : Updates an existing sellContract.
     *
     * @param sellContractDTO the sellContractDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sellContractDTO,
     * or with status 400 (Bad Request) if the sellContractDTO is not valid,
     * or with status 500 (Internal Server Error) if the sellContractDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sell-contracts")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_SELL_CONTRACT})
    public ResponseEntity<SellContractDTO> updateSellContract(@Valid @RequestBody SellContractDTO sellContractDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update SellContract : {}", sellContractDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        } else {
            if (sellContractDTO.getId() == null) {
                return createSellContract(sellContractDTO, validation);
            }
            SellContractDTO result = sellContractService.save(sellContractDTO);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, sellContractDTO.getId().toString()))
                .body(result);
        }
    }

    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts")
    @Timed
    public ResponseEntity<List<NativeSellContractDTO>> getAllSellContracts(@RequestParam(required = false, defaultValue = "false") boolean addendum,
                                                                           @RequestParam(required = false) Long customerId,
                                                                           @RequestParam(required = false) Long personId,
                                                                           @RequestParam(required = false) String contractNo,
                                                                           @RequestParam(required = false) String personName,
                                                                           @RequestParam(required = false) String customerName,
                                                                           @RequestParam(required = false) Boolean active,
                                                                           @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SellContracts");
        Page<NativeSellContractDTO> page = sellContractService.findAll(addendum,
            customerId, personId, personName, customerName, contractNo, active, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contracts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sell-contracts/types : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts/types")
    @Timed
    public ResponseEntity<Set<ContractType>> getAllSellContracts(Long customerId) {
        log.debug("REST request to get a page of SellContracts");
        Set<ContractType> types = sellContractService.findAllTypes(customerId);
        return new ResponseEntity<>(types, HttpStatus.OK);
    }

/*    @GetMapping("/sell-contracts/{customerId}/customers")
    @Timed
    public ResponseEntity<List<SellContractDTO>> getAllSellContractsByCustomer(@PathVariable("customerId") Long customerId, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SellContracts");
        Page<SellContractDTO> page = sellContractService.findAllByCustomer(pageable, customerId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contracts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }*/

    /**
     * GET  /sell-contracts/:id : get the "id" sellContract.
     *
     * @param id the id of the sellContractDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellContractDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sell-contracts/{id}")
    @Timed
    public ResponseEntity<SellContractDTO> getSellContract(@PathVariable Long id) {
        log.debug("REST request to get SellContract : {}", id);
        SellContractDTO sellContractDTO = sellContractService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractDTO));
    }

    /**
     * DELETE  /sell-contracts/:id : delete the "id" sellContract.
     *
     * @param id the id of the sellContractDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sell-contracts/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_SELL_CONTRACT})
    public ResponseEntity<Void> deleteSellContract(@PathVariable Long id) {
        log.debug("REST request to delete SellContract : {}", id);
        sellContractService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * PUT  /sell-contracts/:id : confirm the "id" sellContract.
     *
     * @param id the id of the sellContractDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @PutMapping("/sell-contracts/confirm/{id}")
    @Timed
    public ResponseEntity<List<SellContractCustomerDTO>> confirmSellContract(@PathVariable Long id) {
        log.debug("REST request to confirm SellContract : {}", id);
        List<SellContractCustomerDTO> unSuccessSend = sellContractService.confirm(id);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityConfirmedAlert(ENTITY_NAME,id.toString())).body(unSuccessSend);
    }

    /*Most used in order*/

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/{orderType}/depots")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepotsBySellContractAndPersonAndCustomer(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable OrderType orderType
    ) {
        log.debug("REST request to get a page of SellContracts");
        List<DepotDTO> page = sellContractService.getAllDepotsBySellContractAndPersonAndCustomer(sellContractId, personId, customerId, orderType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/{orderType}/depot/{depotId}")
    @Timed
    public ResponseEntity<DepotDTO> getOneDepotsBySellContractAndPersonAndCustomer(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable OrderType orderType,
        @PathVariable Long depotId
    ) {
        log.debug("REST request to get a page of SellContracts");
        DepotDTO page = sellContractService.getOneDepotsBySellContractAndPersonAndCustomer(sellContractId, personId, customerId, orderType, depotId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    @GetMapping("sell-contracts/{sellContractId}/person/{personId}/depot/{depotId}/{orderType}/currencies")
    @Timed
    public ResponseEntity<List<CurrencyDTO>> getCurrenciesBySellContractAndPersonAndCustomerByDepot(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable Long depotId,
        @PathVariable OrderType orderType
    ) {
        log.debug("REST request to get a page of SellContracts");
        List<CurrencyDTO> page = sellContractService.getCurrenciesBySellContractAndPersonAndCustomerByDepot(sellContractId, personId, customerId, depotId, orderType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/depot/{depotId}/currency/{currencyId}/{orderType}/buyGroup")
    @Timed
    public ResponseEntity<List<BuyGroup>> findBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable Long depotId,
        @PathVariable Long currencyId,
        @PathVariable OrderType orderType
    ) {
        log.debug("REST request to get a page of SellContracts");
        List<BuyGroup> page = sellContractService.findBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
            sellContractId, personId, customerId, depotId, currencyId, orderType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/depot/{depotId}/currency/{currencyId}/{orderType}/buyGroup/{buyGroup}")
    @Timed
    public ResponseEntity<BuyGroup> findOneBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable Long depotId,
        @PathVariable Long currencyId,
        @PathVariable OrderType orderType,
        @PathVariable BuyGroup buyGroup
    ) {
        log.debug("REST request to get a page of SellContracts");
        BuyGroup page = sellContractService.findOneBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
            sellContractId, personId, customerId, depotId, currencyId, orderType, buyGroup);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/customer/{customerId}/depot/{depotId}/currency/{currencyId}/buyGroup/{buyGroup}/{orderType}/type-of-fuel-receipt")
    @Timed
    public ResponseEntity<List<TypeOfFuelReceipt>> findTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @PathVariable Long customerId,
        @PathVariable Long depotId,
        @PathVariable Long currencyId,
        @PathVariable BuyGroup buyGroup,
        @PathVariable OrderType orderType
    ) {
        log.debug("REST request to get a page of SellContracts");
        List<TypeOfFuelReceipt> page = sellContractService.findTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, orderType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/customer/depot/{depotId}/currency/{currencyId}/buyGroup/{buyGroup}/{orderType}/type-of-fuel-receipt")
    @Timed
    public ResponseEntity<TypeOfFuelReceipt> findOneTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(value ="customerId",required = false) Long customerId,
        @PathVariable Long depotId,
        @PathVariable Long currencyId,
        @PathVariable BuyGroup buyGroup,
        @PathVariable OrderType orderType,
        @RequestParam(value = "typeOfFuelReceipt",required = false) TypeOfFuelReceipt typeOfFuelReceipt
    ) {
        log.debug("REST request to get a page of SellContracts");
        TypeOfFuelReceipt page = sellContractService.findOneTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, orderType, typeOfFuelReceipt);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/sell-contracts/{sellContractId}/person/{personId}/depot/{depotId}/currency/{currencyId}/{orderType}/buyGroup/{buyGroup}/sell-contract-product-and-pc")
    @Timed
    public ResponseEntity<SellContractProductPersonCustomerDTO> findProductAndPersonAndCustomerForOrderEdit(
        @PathVariable Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) Long customerId,
        @PathVariable Long depotId,
        @PathVariable Long currencyId,
        @PathVariable OrderType orderType,
        @PathVariable BuyGroup buyGroup,
        @RequestParam(required = false) TypeOfFuelReceipt typeOfFuelReceipt
    ) {
        log.debug("REST request to get a page of SellContracts");
        SellContractProductPersonCustomerDTO page = sellContractService.findProductAndPersonAndCustomerForOrderEdit(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, orderType, typeOfFuelReceipt);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts/{sellContractId}/sell-contract-products")
    @Timed
    public ResponseEntity<List<SellContractProductFullDTO>> getAllSellContractProducts(
        @PathVariable Long sellContractId,
        @RequestParam(required = false) String query,
        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of SellContracts");
        Page<SellContractProductFullDTO> page = sellContractService.findAllSellContractProduct(sellContractId, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contracts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts/{sellContractId}/sell-contract-customers")
    @Timed
    public ResponseEntity<List<SellContractCustomerDTO>> getAllSellContractCustomer(
        @PathVariable Long sellContractId) {
        log.debug("REST request to get a list of SellContracts");
        List<SellContractCustomerDTO> list = sellContractService.findAllSellContractCustomer(sellContractId);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts/{sellContractId}/depot")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepotBySellContract(@PathVariable Long sellContractId) {
        log.debug("REST request to get a list of SellContracts");
        List<DepotDTO> list = sellContractService.findAllDepotBySellContract(sellContractId);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }


    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @GetMapping("/sell-contracts/person/{personId}/customer/{customerId}")
    @Timed
    public ResponseEntity<CustomerAccountingDTO> findCustomerAccounting(
        @PathVariable Long personId, @PathVariable Long customerId) {
        log.debug("REST request to get a list of SellContracts");
        CustomerAccountingDTO list = sellContractService.findCustomerAccounting(personId, customerId);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /sell-contracts : get all the sellContracts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sellContracts in body
     */
    @PutMapping("/sell-contracts/customer-accounting")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN})
    public ResponseEntity<CustomerAccountingDTO> updateCustomerAccounting(
        @Valid @RequestBody CustomerAccountingDTO customerAccountingDTO) throws Exception {
        log.debug("REST request to get a list of SellContracts");
        sellContractService.updateCustomerAccounting(customerAccountingDTO);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("customerAccounting", ""))
            .build();
    }


}
