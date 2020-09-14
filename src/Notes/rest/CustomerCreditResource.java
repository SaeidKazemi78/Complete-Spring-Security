package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.service.CustomerCreditService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.AssignCustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.ProductAmountResponseDTO;
import ir.donyapardaz.niopdc.base.validation.CustomerCreditValidator;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerCredit.
 */
@RestController
@RequestMapping("/api")
public class CustomerCreditResource {

    private static final String ENTITY_NAME = "customerCredit";
    private static final String ENTITY_NAME_PERSON = "personCredit";
    private final Logger log = LoggerFactory.getLogger(CustomerCreditResource.class);
    private final CustomerCreditService customerCreditService;
    private final CustomerCreditValidator customerCreditValidator;

    public CustomerCreditResource(CustomerCreditService customerCreditService, CustomerCreditValidator customerCreditValidator) {
        this.customerCreditService = customerCreditService;
        this.customerCreditValidator = customerCreditValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(customerCreditValidator);
    }


    /**
     * PUT  /customer-credits : Updates an existing customerCredit.
     *
     * @param customerCreditDTO the customerCreditDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerCreditDTO,
     * or with status 400 (Bad Request) if the customerCreditDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerCreditDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-credits")
    @Timed
    public ResponseEntity<CustomerCreditDTO> updateCustomerCredit(@Valid @RequestBody CustomerCreditDTO customerCreditDTO, BindingResult validation) throws Exception {
        log.debug("REST request to update CustomerCredit : {}", customerCreditDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (customerCreditDTO.getId() == null) {
            return createCustomerCredit(customerCreditDTO, validation);
        }
        CustomerCreditDTO result = customerCreditService.save(customerCreditDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(result.getPersonId() != null ? ENTITY_NAME_PERSON : ENTITY_NAME, customerCreditDTO.getId().toString()))
            .body(result);
    }

    /**
     * POST  /customer-credits : Create a new customerCredit.
     *
     * @param customerCreditDTO the customerCreditDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerCreditDTO, or with status 400 (Bad Request) if the customerCredit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-credits")
    @Timed
    public ResponseEntity<CustomerCreditDTO> createCustomerCredit(@Valid @RequestBody CustomerCreditDTO customerCreditDTO, BindingResult validation) throws Exception {
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        log.debug("REST request to save CustomerCredit : {}", customerCreditDTO);
        if (customerCreditDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerCredit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerCreditDTO result = customerCreditService.save(customerCreditDTO);
        return ResponseEntity.created(new URI("/api/customer-credits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(result.getPersonId() != null ? ENTITY_NAME_PERSON : ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    @PutMapping("/customer-credits/list")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> updateCustomerCreditList(@RequestBody CustomerCreditAbbasDTO customerCredits) throws Exception {
        List<CustomerCreditDTO> result = customerCreditService.save(customerCredits);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }


    @PutMapping("/customer-credits/sellContract/{sellContractId}/person/{personId}/customer/{customerId}/depot/{depotId}/currency/{currencyId}/buyGroup/{buyGroup}/date/{registerDate}/reserve-person-credit")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> reservePersonCredit(@PathVariable("sellContractId") Long sellContractId,
                                                                       @PathVariable("personId") Long personId,
                                                                       @PathVariable("customerId") Long customerId,
                                                                       @PathVariable("depotId") Long depotId,
                                                                       @PathVariable("currencyId") Long currencyId,
                                                                       @PathVariable("buyGroup") BuyGroup buyGroup,
                                                                       @PathVariable("registerDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) ZonedDateTime registerDate) {
        List<CustomerCreditDTO> result = customerCreditService.reservePersonCredit(
            sellContractId,
            personId,
            customerId,
            depotId,
            currencyId,
            buyGroup,
            registerDate);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    @PutMapping("/customer-credits/assign-customer-credit")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> assignCustomerCredit(
        @RequestBody AssignCustomerCreditDTO assignCustomerCreditDTO) {

        List<CustomerCreditDTO> result = customerCreditService.assignCustomerCredit(assignCustomerCreditDTO);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }


    @PutMapping("/customer-credits/revert")
    @Timed
    public ResponseEntity<Void> revertCustomerCredit(@RequestBody List<CustomerCreditDTO> customerCreditDTOS) {
        customerCreditService.revertCustomerCredit(customerCreditDTOS);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/customer-credits/filter/ids")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> getAllCustomerCredits(@RequestParam List<Long> ids) {
        log.debug("REST request to get a page of CustomerCredits");
        List<CustomerCreditDTO> customerCreditDTOS = customerCreditService.findAll(ids);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerCreditDTOS));
    }

    /**
     * GET  /customer-credits/:id : get the "id" customerCredit.
     *
     * @param id the id of the customerCreditDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerCreditDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-credits/{id}")
    @Timed
    public ResponseEntity<CustomerCreditDTO> getCustomerCredit(@PathVariable Long id) {
        log.debug("REST request to get CustomerCredit : {}", id);
        CustomerCreditDTO customerCreditDTO = customerCreditService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerCreditDTO));
    }

    /**
     * DELETE  /customer-credits/:id : delete the "id" customerCredit.
     *
     * @param id the id of the customerCreditDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-credits/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerCredit(@PathVariable Long id) {
        log.debug("REST request to delete CustomerCredit : {}", id);
        CustomerCreditDTO result = customerCreditService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(result.getPersonId() != null ? ENTITY_NAME_PERSON : ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/customer-credits/filter")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> getAllCustomerCreditsByFilter(
        @RequestParam BuyGroup buyGroup,
        @RequestParam(required = false) Long customerId,
        @RequestParam Long personId,
        @RequestParam(required = false) Long currencyRateGroupId,
        @RequestParam List<Long> productIds,
        @RequestParam Long currencyId,
        @RequestParam Long locationId
    ) {
        log.debug("REST request to get a page of CustomerCredits");
        List<CustomerCreditDTO> customerCreditDTOS = customerCreditService
            .findAllCustomerCreditsByFilter(
                buyGroup,
                customerId,
                personId,
                currencyRateGroupId,
                productIds,
                currencyId,
                locationId
            );
        if (customerCreditDTOS == null)
            customerCreditDTOS = new ArrayList<>();
        return ResponseUtil.wrapOrNotFound(Optional.of(customerCreditDTOS));
    }

    @GetMapping("/customer-credits/filter/quota/{customerId}/{productId}")
    @Timed
    public ResponseEntity<CustomerCreditDTO> getAllCustomerCreditsByFilterQuota(
        @PathVariable("customerId") Long customerId,
        @PathVariable("productId") Long productId
    ) {
        log.debug("REST request to get a page of CustomerCredits");
        CustomerCreditDTO customerCreditDTO = customerCreditService
            .findAllCustomerCreditsByFilter(customerId, productId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerCreditDTO));
    }

    @GetMapping("/customer-credits/{id}/ceiling-quotas")
    @Timed
    public ResponseEntity<List<CeilingQuotaDTO>> getAllCeilingQuota(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCredits");
        Page<CeilingQuotaDTO> page = customerCreditService.findAllCeilingQuota(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    @PutMapping("/customer-credits/ta")
    @Timed
    public ResponseEntity<Void> updateCustomerCreditList(@RequestBody CustomerCreditTaDTO customerCredit) throws Exception {
        customerCreditService.save(customerCredit);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/customer-credits/customer/{customerId}")
    @Timed
    public ResponseEntity<List<CreditBuyTypeRemainedDTO>> getAllCustomerCredit(@PathVariable("customerId") Long customerId) {
        return new ResponseEntity<>(customerCreditService.findAllRemainedByCustomer(customerId), HttpStatus.OK);
    }

    @GetMapping("/customer-credits/person/{personId}")
    @Timed
    public ResponseEntity<List<CreditBuyTypeRemainedDTO>> getAllPersonCredit(@PathVariable("personId") Long personId) {
        return new ResponseEntity<>(customerCreditService.findAllRemainedByPerson(personId), HttpStatus.OK);
    }

}
