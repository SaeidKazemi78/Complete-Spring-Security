package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.PaymentPeriod;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.CustomerCreditService;
import ir.donyapardaz.niopdc.base.service.CustomerExistDTO;
import ir.donyapardaz.niopdc.base.service.CustomerService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerSellContractDTO;
import ir.donyapardaz.niopdc.base.validation.CustomerValidator;
import ir.donyapardaz.niopdc.base.web.rest.errors.ValidationResponseEntityGenerator;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Customer.
 */
@RestController
@RequestMapping("/api")
public class CustomerResource {

    private static final String ENTITY_NAME = "customer";
    private final Logger log = LoggerFactory.getLogger(CustomerResource.class);
    private final CustomerService customerService;
    private final CustomerCreditService customerCreditService;


    private final CustomerValidator customerValidator;

    public CustomerResource(CustomerService customerService, CustomerCreditService customerCreditService, CustomerValidator customerValidator) {
        this.customerService = customerService;
        this.customerCreditService = customerCreditService;
        this.customerValidator = customerValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(customerValidator);
    }

    /**
     * POST  /customers : Create a new customer.
     *
     * @param customerDTO the customerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerDTO, or with status 400 (Bad Request) if the customer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customers")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_CUSTOMER, AuthoritiesConstants.CREATE_BOUNDARY_CUSTOMER})
    public ResponseEntity<CustomerFullDTO> createCustomer(@Valid @RequestBody CustomerFullDTO customerDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customerDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (customerDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new customer cannot already have an ID")).body(null);
        }
        CustomerFullDTO result = customerService.save(customerDTO);
        return ResponseEntity.created(new URI("/api/customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PostMapping("/customers/car")
    @Timed
    public ResponseEntity<CustomerFullDTO> createCar(@Valid @RequestBody CustomerFullDTO customerDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Customer : {}", customerDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (customerDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new customer cannot already have an ID")).body(null);
        }
        CustomerFullDTO result = customerService.saveCar(customerDTO);
        return ResponseEntity.created(new URI("/api/customers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationCarAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customers : Updates an existing customer.
     *
     * @param customerDTO the customerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerDTO,
     * or with status 400 (Bad Request) if the customerDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customers")
    @Timed
//    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_CUSTOMER, AuthoritiesConstants.EDIT_BOUNDARY_CUSTOMER})
    public ResponseEntity<CustomerFullDTO> updateCustomer(@Valid @RequestBody CustomerFullDTO customerDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customerDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        }
        if (customerDTO.getId() == null) {
            return createCustomer(customerDTO, validation);
        }
        CustomerFullDTO result = customerService.save(customerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerDTO.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customers : Updates an existing customer.
     *
     * @param customerDTO the customerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerDTO,
     * or with status 400 (Bad Request) if the customerDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customers/credit-account")
    @Timed
    public ResponseEntity<CustomerFullDTO> updateCreditAccountCustomer(@RequestBody CustomerFullDTO customerDTO) throws Exception {
        log.debug("REST request to update Customer : {}", customerDTO);

        customerService.saveCreditAccount(customerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerDTO.getId().toString()))
            .build();
    }

    @PutMapping("/customers/car")
    @Timed
    public ResponseEntity<CustomerFullDTO> updateCar(@Valid @RequestBody CustomerFullDTO customerDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Customer : {}", customerDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        }
        if (customerDTO.getId() == null) {
            return createCar(customerDTO, validation);
        }
        CustomerFullDTO result = customerService.saveCar(customerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateCarAlert(ENTITY_NAME, customerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customers : get all the customers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customers in body
     */
    @GetMapping("/customers")
    @Timed
    public ResponseEntity<List<CustomerDTO>> getAllCustomers(
        @RequestParam(required = false) String locationName,
        @RequestParam(required = false) String query,
        @RequestParam(required = false) Boolean haveSellContract,
        @RequestParam(required = false) ContractType contractType,
        @RequestParam(required = false) String selfCode,
        @RequestParam(required = false) Long personId,
        @RequestParam(required = false) List<Long> customerTypeIds,
        @ApiParam Pageable pageable
    ) {
        log.debug("REST request to get a page of Customers");

        Page<CustomerDTO> page = customerService.findAll(locationName, query, haveSellContract, contractType, selfCode, personId, customerTypeIds, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customers/{id}")
    @Timed
    public ResponseEntity<CustomerFullDTO> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        CustomerFullDTO customerDTO = customerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerDTO));
    }

    @GetMapping("/customers/code/{code}")
    @Timed
    public ResponseEntity<CustomerFullDTO> getCustomerByCode(@PathVariable String code) {
        log.debug("REST request to get Customer : {}", code);
        CustomerFullDTO customerDTO = customerService.findOneByCode(code);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerDTO));
    }

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customers/info/{id}")
    @Timed
    public ResponseEntity<String> getCustomerInfo(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        String customerDTO = customerService.getCustomerInfo(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerDTO));
    }

    /**
     * DELETE  /customers/:id : delete the "id" customer.
     *
     * @param id the id of the customerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customers/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_CUSTOMER, AuthoritiesConstants.DELETE_BOUNDARY_CUSTOMER})
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        log.debug("REST request to delete Customer : {}", id);
        customerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    //region CustomerCredit

    /**
     * GET  customers/:id/customer-credits : get all the customerCredits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerCredits in body
     */
    @GetMapping("customers/{id}/customer-credits")
    @Timed
    public ResponseEntity<List<CustomerCreditListDTO>> getAllCustomerCredits(@PathVariable Long id, @RequestParam(required = false) String query,
                                                                             @RequestParam(required = false, name = "isCredit") Boolean isCredit,
                                                                             @RequestParam(required = false, name = "archive") Boolean archive,
                                                                             @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCredits");
        Page<CustomerCreditListDTO> page = customerService.findAllCustomerCredit(id, isCredit, archive, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("customers/{id}/transport-contracts")
    @Timed
    public ResponseEntity<List<TransportContractDTO>> getAllTransportContract(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of TransportContracts");
        Page<TransportContractDTO> page = customerService.findAllTransportContracts(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/transport-contracts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("customers/{customerId}/exist-transport-contracts")
    @Timed
    public ResponseEntity<Boolean> hasAccessForOrderRegisterAndCheckTransportContracts(@PathVariable Long customerId) {
        log.debug("REST request to get a page of TransportContracts");
        Boolean result = customerService.hasAccessForOrderRegisterAndCheckTransportContracts(customerId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    //endregion

    //region CustomerCapacity

    /**
     * GET  customers/:id/customer-credits : get all the customerCredits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerCredits in body
     */
    @GetMapping("customers/{id}/customer-capacities")
    @Timed
    public ResponseEntity<List<CustomerCapacityDTO>> getAllCustomerCapacities(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCapacity");
        Page<CustomerCapacityDTO> page = customerService.findAllCustomerCapacities(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    //endregion

 /*   @GetMapping("/customers/{buyGroup}/{currencyId}/{depotId}/{personId}/sell-contracts/sell-contract-products")
    @Timed
    public ResponseEntity<List<SellContractProductDTO>> findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
        @PathVariable BuyGroup buyGroup,
        @RequestParam(required = false) Long currencyRateGroupId,
        @PathVariable Long currencyId,
        @PathVariable Long depotId,
        @RequestParam(required = false) Long customerId,
        @RequestParam Long sellContractId,
        @PathVariable Long personId,
        @RequestParam(required = false) TypeOfFuelReceipt typeOfFuelReceipt,
        @RequestParam String contractType
    ) {
        log.debug("REST request to get a page of SellContracts");
        List<SellContractProductDTO> page = customerService.findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
            buyGroup, currencyRateGroupId, currencyId, depotId, customerId, personId, typeOfFuelReceipt, contractType, sellContractId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }*/

    @GetMapping("customers/{id}/customer-scores")
    @Timed
    public ResponseEntity<List<CustomerScoreDTO>> getAllCustomerScores(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCredits");
        Page<CustomerScoreDTO> page = customerService.findAllCustomerScores(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("customers/sell-contracts")
    @Timed
    public ResponseEntity<List<CustomerSellContractDTO>> getAllCustomerSellContract(
        @RequestParam Integer year,
        @RequestParam Integer month,
        @RequestParam Integer day,
        @RequestParam PaymentPeriod paymentPeriod
    ) {
        log.debug("REST request to get a page of CustomerCredits");
        List<CustomerSellContractDTO> result = customerService.getAllCustomerSellContract(year, month, day, paymentPeriod);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("customers/old-customer/{salesCode}/{nationalCode}")
    @Timed
    public ResponseEntity<OldCustomerDTO> getOldCustomer(
        @PathVariable String salesCode,
        @PathVariable String nationalCode
    ) {
        log.debug("REST request to get a page of Old Customer");
        OldCustomerDTO result = customerService.getOldCustomer(salesCode, nationalCode);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/customers/rf-id/{rfId}")
    @Timed
    public ResponseEntity<List<CustomerFullDTO>> getCustomerByRfId(@PathVariable String rfId) {
        log.debug("REST request to get Customer By RfId: {}", rfId);
        List<CustomerFullDTO> customerDTO = customerService.findOneByRfId(rfId);
        return ResponseEntity.ok(customerDTO);
    }

    @GetMapping("/customers/find-id/rf-id/{rfId}")
    @Timed
    public ResponseEntity<Long> getCustomerIdByRfId(@PathVariable String rfId) {
        log.debug("REST request to get Customer By RfId: {}", rfId);
        Long id = customerService.findIdByRfId(rfId);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

    @GetMapping("/customers/plaque/{plaque}")
    @Timed
    public ResponseEntity<List<CustomerFullDTO>> getCustomersByPlaque(@PathVariable String plaque) {
        log.debug("REST request to get Customer By Plaque: {}", plaque);
        List<CustomerFullDTO> customerDTO = customerService.findTop5ByPlaque(plaque);
        return ResponseEntity.ok(customerDTO);
    }

    @GetMapping("/customers/find-id/plaque/{plaque}")
    @Timed
    public ResponseEntity<Long> getCustomerByPlaque(@PathVariable String plaque) {
        log.debug("REST request to get Customer By Plaque: {}", plaque);
        Long id = customerService.findIdByPlaque(plaque);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }


    @GetMapping("/customers/{id}/car-tanks")
    @Timed
    public ResponseEntity<List<CarTankDTO>> getCarTanks(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car tank: {}", id);
        Page<CarTankDTO> carTankDTOS = customerService.findAllCarTanks(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(carTankDTOS, "/api/customers");
        return new ResponseEntity<>(carTankDTOS.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customers/{id}/car-rf-ids")
    @Timed
    public ResponseEntity<List<CarRfIdDTO>> getCarRfIds(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<CarRfIdDTO> allCarRfId = customerService.findAllCarRfId(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customers/boundary-customers")
    @Timed
    public ResponseEntity<List<CarCustomerDTO>> getAllBoundaryCustomers(@RequestParam(required = false) String vehicleModel,
                                                                        @RequestParam(required = false) String carRfId,
                                                                        @RequestParam(required = false) String plaque,
                                                                        @RequestParam(required = false) String plaquePart1,
                                                                        @RequestParam(required = false) String plaquePart2,
                                                                        @RequestParam(required = false) String plaquePart3,
                                                                        @RequestParam(required = false) String type,
                                                                        @RequestParam(required = false) Boolean archive,
                                                                        @RequestParam(required = false) String typeCode,
                                                                        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Customers");

        Page<CarCustomerDTO> page = customerService.findAllBoundaryCustomers(vehicleModel, archive, carRfId, plaque,
            plaquePart1, plaquePart2,
            plaquePart3, type, typeCode, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customers/boundary-customers/offline")
    @Timed
    public ResponseEntity<List<CarCustomerOfflineDTO>> getAllBoundaryCustomersOffline(
        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Customers");

        Page<CarCustomerOfflineDTO> page = customerService.findAllBoundaryCustomers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @PutMapping("/customers/boundary-customers/{id}/archive")
    @Timed
    public ResponseEntity<Boolean> archiveBoundaryCustomers(@PathVariable Long id) {
        customerService.archiveCustomer(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityArchiveAlert(ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/customers/boundary-customers/{id}/de-archive")
    @Timed
    public ResponseEntity<Boolean> deArchiveBoundaryCustomers(@PathVariable Long id) {
        customerService.deArchiveCustomer(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityArchiveAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/customers/exist")
    @Timed
    public ResponseEntity<Boolean> exist(@Valid @RequestBody CustomerExistDTO customerExistDTO) {
        Boolean e = customerService.exist(customerExistDTO);
        return new ResponseEntity<>(e, HttpStatus.OK);
    }

    @GetMapping("/customers/active")
    @Timed
    public ResponseEntity<Boolean> checkActiveCustomer(@RequestParam List<Long> ids) {
        log.debug("REST request to get Customer : {}", ids);
        Boolean isActive = customerService.checkActiveCustomer(ids);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(isActive));
    }

    @GetMapping("/customers/tank-measure")
    @Timed
    public ResponseEntity<List<CarTankDTO>> getTankMeasure(
        @RequestParam("rfId") String rfId) {
        log.debug("REST request to get car tank measure : {}");
        List<CarTankDTO> carTankDTO = customerService.getTankMeasure(rfId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carTankDTO));
    }


    @GetMapping("/customers/{customerId}/customer-order-capacities/{forceLoad}")
    @Timed
    public ResponseEntity<List<CustomerOrderCapacityDTO>> getAllCustomerOrderCapacities(@PathVariable("customerId") Long customerId,
                                                                                        @RequestParam(required = false) String query,
                                                                                        @PathVariable(value = "forceLoad", required = false) Boolean forceLoad,
                                                                                        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Customers");
        Page<CustomerOrderCapacityDTO> page = customerService.findAllCustomerOrderCapacities(customerId, query, forceLoad, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customers/{customerId}/get-list-car-amount")
    @Timed
    public ResponseEntity<List<Long>> getAllCustomerGetListCarAmount(@PathVariable("customerId") Long customerId) {
        log.debug("REST request to get a page of Customers");

        List<Long> page = customerService.getListOfCarAmount(customerId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/customers/{customerId}/customer-order-capacities")
    @Timed
    public ResponseEntity<List<CustomerOrderCapacityDTO>> getAllCustomerOrderCapacities(@PathVariable("customerId") Long customerId, @RequestParam(value = "productId") Long productId) {
        log.debug("REST request to get a page of Customers");

        List<CustomerOrderCapacityDTO> page = customerService.findAllCustomerOrderCapacities(customerId, productId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/customers/{id}/customer-station-info")
    @Timed
    public ResponseEntity<CustomerStationInfoDTO> getCustomerStationInfo(@PathVariable Long id) {
        log.debug("REST request to get Customer Station Info : {}", id);
        CustomerStationInfoDTO customerStationInfoDTO = customerService.findCustomerStationInfo(id);
        return new ResponseEntity<>(customerStationInfoDTO, HttpStatus.OK);
    }

    /**
     * GET  /product-rate-differences : get all the productRateDifferences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productRateDifferences in body
     */
    @GetMapping("/customers/{customerId}/code-location")
    @Timed
    public ResponseEntity<IdCodeLocationDTO> getCodeLocation(@PathVariable Long customerId) {
        log.debug("REST request to get a page of ProductRateDifferences");
        IdCodeLocationDTO page = customerService.getCodeLocation(customerId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    @GetMapping("customers/{id}/customer-visits")
    @Timed
    public ResponseEntity<List<CustomerVisitDTO>> getAllCustomerVisit(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCredits");
        Page<CustomerVisitDTO> page = customerService.findAllCustomerVisit(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("customers/{id}/has-fare")
    @Timed
    public ResponseEntity<Boolean> customerHasFare(@PathVariable Long id) {
        log.debug("REST request to get customer has transport fare :{}", id);
        Boolean result = customerService.customerHasFare(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @PostMapping("/customers/boundary-customers/exist")
    @Timed
    public ResponseEntity<Long> getExistBoundaryCarId(
        @RequestBody CarCustomerOfflineDTO customerDTO
    ) {
        log.debug("REST request to get a page of Customers");

        Long result = customerService.checkExistBoundaryCustomer(customerDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
