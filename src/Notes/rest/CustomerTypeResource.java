package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.CustomerTypeService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeListDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeProductConsumptionDTO;
import ir.donyapardaz.niopdc.base.validation.CustomerTypeValidator;
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
 * REST controller for managing CustomerType.
 */
@RestController
@RequestMapping("/api")
public class CustomerTypeResource {

    private static final String ENTITY_NAME = "customerType";
    private final Logger log = LoggerFactory.getLogger(CustomerTypeResource.class);
    private final CustomerTypeService customerTypeService;
    private final CustomerTypeValidator customerTypeValidator;

    public CustomerTypeResource(CustomerTypeService customerTypeService, CustomerTypeValidator customerTypeValidator) {
        this.customerTypeService = customerTypeService;
        this.customerTypeValidator = customerTypeValidator;
    }


    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(customerTypeValidator);
    }

    /*
     * POST  /customer-types : Create a new customerType.
     *
     * @param customerTypeDTO the customerTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerTypeDTO, or with status 400 (Bad Request) if the customerType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-types")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_CUSTOMER_TYPE})
    public ResponseEntity<CustomerTypeDTO> createCustomerType(@Valid @RequestBody CustomerTypeDTO customerTypeDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save CustomerType : {}", customerTypeDTO);
        if (customerTypeDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new customerType cannot already have an ID")).body(null);
        }
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        } else {
            CustomerTypeDTO result = customerTypeService.save(customerTypeDTO);
            return ResponseEntity.created(new URI("/api/customer-types/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        }
    }

    /**
     * PUT  /customer-types : Updates an existing customerType.
     *
     * @param customerTypeDTO the customerTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerTypeDTO,
     * or with status 400 (Bad Request) if the customerTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-types")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_CUSTOMER_TYPE})
    public ResponseEntity<CustomerTypeDTO> updateCustomerType(@Valid @RequestBody CustomerTypeDTO customerTypeDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update CustomerType : {}", customerTypeDTO);
        if (customerTypeDTO.getId() == null) {
            return createCustomerType(customerTypeDTO, validation);
        }
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        } else {
            CustomerTypeDTO result = customerTypeService.save(customerTypeDTO);
            return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerTypeDTO.getId().toString()))
                .body(result);
        }
    }

    /**
     * GET  /customer-types : get all the customerTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerTypes in body
     */
    @GetMapping("/customer-types")
    @Timed
    public ResponseEntity<List<CustomerTypeListDTO>> getAllCustomerTypes(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerTypes");
        Page<CustomerTypeListDTO> page = customerTypeService.findAll(query, pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/customer-types/customerGroup/{customerGroup}")
    @Timed
    public ResponseEntity<List<CustomerTypeDTO>> getAllCustomerTypes(@PathVariable CustomerGroup customerGroup) {
        log.debug("REST request to get a page of CustomerTypes");
        List<CustomerTypeDTO> page = customerTypeService.findAll(customerGroup);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/customer-types/{customerGroup}/{vehicleModelType}")
    @Timed
    public ResponseEntity<List<CustomerTypeDTO>> getAllCustomerTypes(@PathVariable CustomerGroup customerGroup,
                                                                     @PathVariable VehicleModelType vehicleModelType) {
        log.debug("REST request to get a page of CustomerTypes");
        List<CustomerTypeDTO> page = customerTypeService.findAll(customerGroup, vehicleModelType);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    /**
     * GET  /customer-types/:id : get the "id" customerType.
     *
     * @param id the id of the customerTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-types/{id}")
    @Timed
    public ResponseEntity<CustomerTypeDTO> getCustomerType(@PathVariable Long id) {
        log.debug("REST request to get CustomerType : {}", id);
        CustomerTypeDTO customerTypeDTO = customerTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerTypeDTO));
    }

    /**
     * DELETE  /customer-types/:id : delete the "id" customerType.
     *
     * @param id the id of the customerTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-types/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_CUSTOMER_TYPE})
    public ResponseEntity<Void> deleteCustomerType(@PathVariable Long id) {
        log.debug("REST request to delete CustomerType : {}", id);
        customerTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    //region customer-type-product-consumptions
    @GetMapping("customer-types/{customerTypeId}/customer-type-product-consumptions")
    @Timed
    public ResponseEntity<List<CustomerTypeProductConsumptionDTO>> getAllCustomerTypeProductConsumptions(@PathVariable("customerTypeId") Long customerTypeId, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerTypeProductConsumptions");
        Page<CustomerTypeProductConsumptionDTO> page = customerTypeService.findAllCustomerTypeProductConsumption(customerTypeId, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-type-product-consumptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    //endregion

    @GetMapping("/customer-types/all-customer-types-by-id")
    @Timed
    public ResponseEntity<List<CustomerTypeDTO>> getAllCustomerTypesByIds(@RequestParam Set<Long> ids) {
        log.debug("REST request to get a page of CustomerTypes by ids");
        List<CustomerTypeDTO> page = customerTypeService.findAllByIds(ids);

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(page));
    }

    /*
        @GetMapping("customer-types/{customerTypeId}/expense-incomes")
        @Timed
        public ResponseEntity<List<ExpenseIncomeDTO>> getAllExpenseIncomes(@PathVariable("customerTypeId") Long customerTypeId) {
            log.debug("REST request to get a page of CustomerTypeProductConsumptions");
            List<ExpenseIncomeDTO> page = customerTypeService.findAllExpenseIncomes(customerTypeId);
            return new ResponseEntity<>(page, HttpStatus.OK);
        }
        //endregion

    */
    @PostMapping("/customer-types/list-customer-group")
    @Timed
    public ResponseEntity<List<CustomerTypeListDTO>> getAllCustomerTypesByListOfCustomerGroup(@RequestBody List<CustomerGroup> customerGroups) {
        log.debug("REST request to get a page of CustomerTypes");
        List<CustomerTypeListDTO> page = customerTypeService.findAllByCustomerGroups(customerGroups);

        return new ResponseEntity<>(page, HttpStatus.OK);
    }

}
