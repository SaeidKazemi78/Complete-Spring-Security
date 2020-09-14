package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.CustomerDeactiveRuleService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerDeactiveRuleDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.BillDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerDeactiveRule.
 */
@RestController
@RequestMapping("/api")
public class CustomerDeactiveRuleResource {

    private static final String ENTITY_NAME = "customerDeactiveRule";
    private final Logger log = LoggerFactory.getLogger(CustomerDeactiveRuleResource.class);
    private final CustomerDeactiveRuleService customerDeactiveRuleService;

    public CustomerDeactiveRuleResource(CustomerDeactiveRuleService customerDeactiveRuleService) {
        this.customerDeactiveRuleService = customerDeactiveRuleService;
    }

    /**
     * POST  /customer-deactive-rules : Create a new customerDeactiveRule.
     *
     * @param customerDeactiveRuleDTO the customerDeactiveRuleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerDeactiveRuleDTO, or with status 400 (Bad Request) if the customerDeactiveRule has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-deactive-rules")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_CUSTOMER_DEACTIVE_RULE})
    public ResponseEntity<CustomerDeactiveRuleDTO> createCustomerDeactiveRule(@Valid @RequestBody CustomerDeactiveRuleDTO customerDeactiveRuleDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerDeactiveRule : {}", customerDeactiveRuleDTO);
        if (customerDeactiveRuleDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerDeactiveRule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerDeactiveRuleDTO result = customerDeactiveRuleService.save(customerDeactiveRuleDTO);
        return ResponseEntity.created(new URI("/api/customer-deactive-rules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-deactive-rules : Updates an existing customerDeactiveRule.
     *
     * @param customerDeactiveRuleDTO the customerDeactiveRuleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerDeactiveRuleDTO,
     * or with status 400 (Bad Request) if the customerDeactiveRuleDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerDeactiveRuleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-deactive-rules")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_CUSTOMER_DEACTIVE_RULE})
    public ResponseEntity<CustomerDeactiveRuleDTO> updateCustomerDeactiveRule(@Valid @RequestBody CustomerDeactiveRuleDTO customerDeactiveRuleDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerDeactiveRule : {}", customerDeactiveRuleDTO);
        if (customerDeactiveRuleDTO.getId() == null) {
            return createCustomerDeactiveRule(customerDeactiveRuleDTO);
        }
        CustomerDeactiveRuleDTO result = customerDeactiveRuleService.save(customerDeactiveRuleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerDeactiveRuleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-deactive-rules : get all the customerDeactiveRules.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerDeactiveRules in body
     */
    @GetMapping("/customer-deactive-rules")
    @Timed
    public ResponseEntity<List<CustomerDeactiveRuleDTO>> getAllCustomerDeactiveRules(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerDeactiveRules");
        Page<CustomerDeactiveRuleDTO> page = customerDeactiveRuleService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-deactive-rules");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-deactive-rules/:id : get the "id" customerDeactiveRule.
     *
     * @param id the id of the customerDeactiveRuleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDeactiveRuleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-deactive-rules/{id}")
    @Timed
    public ResponseEntity<CustomerDeactiveRuleDTO> getCustomerDeactiveRule(@PathVariable Long id) {
        log.debug("REST request to get CustomerDeactiveRule : {}", id);
        CustomerDeactiveRuleDTO customerDeactiveRuleDTO = customerDeactiveRuleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerDeactiveRuleDTO));
    }

    /**
     * DELETE  /customer-deactive-rules/:id : delete the "id" customerDeactiveRule.
     *
     * @param id the id of the customerDeactiveRuleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-deactive-rules/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_CUSTOMER_DEACTIVE_RULE})
    public ResponseEntity<Void> deleteCustomerDeactiveRule(@PathVariable Long id) {
        log.debug("REST request to delete CustomerDeactiveRule : {}", id);
        customerDeactiveRuleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


/*    @GetMapping("/customer-deactive-rules/check")
    @Timed
    public boolean findDeactiveRuleForCustomer(@RequestParam("startDate") ZonedDateTime startDate,
                                               @RequestParam("finishDate") ZonedDateTime finishDate,
                                               @RequestParam(required = false, value = "locationID") Long locationID,
                                               @RequestParam(required = false, value = "sellContractCode") String sellContractCode,
                                               @RequestParam(required = false, value = "customerCode") String customerCode,
                                               @RequestParam(required = false, value = "customerTypesId") Long customerTypesId
    ) throws URISyntaxException {
        return customerDeactiveRuleService.checkDeactiveRule(startDate, finishDate, locationID, sellContractCode, customerCode, customerTypesId);
    }*/

    @PostMapping("/customer-deactive-rules/active")
    @Timed
    public ResponseEntity<Boolean> findDeactiveRuleForCustomer(@RequestBody BillDTO bill
    ) throws URISyntaxException {
        Boolean result = customerDeactiveRuleService.checkActive(bill);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(result));
    }

    @GetMapping("/customer-deactive-rules/check")
    @Timed
    public ResponseEntity<List<CustomerDeactiveRuleDTO>> checkCustomerDeactive(@RequestParam(required = false) Long customerId, @RequestParam(required = false) Long customerTypeId, @RequestParam(required = false) Long locationId, @RequestParam(required = false) Long sellContractId) {
        List<CustomerDeactiveRuleDTO> ruleDTOS = customerDeactiveRuleService.checkCustomerDeactive(customerId, customerTypeId, locationId);
        return new ResponseEntity<>(ruleDTOS, HttpStatus.OK);
    }

}
