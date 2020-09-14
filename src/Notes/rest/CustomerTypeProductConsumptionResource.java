package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.domain.Consumption;
import ir.donyapardaz.niopdc.base.service.CustomerTypeProductConsumptionService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeProductConsumptionDTO;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerTypeProductConsumption.
 */
@RestController
@RequestMapping("/api")
public class CustomerTypeProductConsumptionResource {

    private static final String ENTITY_NAME = "customerTypeProductConsumption";
    private final Logger log = LoggerFactory.getLogger(CustomerTypeProductConsumptionResource.class);
    private final CustomerTypeProductConsumptionService customerTypeProductConsumptionService;

    public CustomerTypeProductConsumptionResource(CustomerTypeProductConsumptionService customerTypeProductConsumptionService) {
        this.customerTypeProductConsumptionService = customerTypeProductConsumptionService;
    }

    /**
     * POST  /customer-type-product-consumptions : Create a new customerTypeProductConsumption.
     *
     * @param customerTypeProductConsumptionDTO the customerTypeProductConsumptionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerTypeProductConsumptionDTO, or with status 400 (Bad Request) if the customerTypeProductConsumption has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-type-product-consumptions")
    @Timed
    public ResponseEntity<CustomerTypeProductConsumptionDTO> createCustomerTypeProductConsumption(@Valid @RequestBody CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerTypeProductConsumption : {}", customerTypeProductConsumptionDTO);
        if (customerTypeProductConsumptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerTypeProductConsumption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerTypeProductConsumptionDTO result = customerTypeProductConsumptionService.save(customerTypeProductConsumptionDTO);
        return ResponseEntity.created(new URI("/api/customer-type-product-consumptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-type-product-consumptions : Updates an existing customerTypeProductConsumption.
     *
     * @param customerTypeProductConsumptionDTO the customerTypeProductConsumptionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerTypeProductConsumptionDTO,
     * or with status 400 (Bad Request) if the customerTypeProductConsumptionDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerTypeProductConsumptionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-type-product-consumptions")
    @Timed
    public ResponseEntity<CustomerTypeProductConsumptionDTO> updateCustomerTypeProductConsumption(@Valid @RequestBody CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerTypeProductConsumption : {}", customerTypeProductConsumptionDTO);
        if (customerTypeProductConsumptionDTO.getId() == null) {
            return createCustomerTypeProductConsumption(customerTypeProductConsumptionDTO);
        }
        CustomerTypeProductConsumptionDTO result = customerTypeProductConsumptionService.save(customerTypeProductConsumptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerTypeProductConsumptionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-type-product-consumptions : get all the customerTypeProductConsumptions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerTypeProductConsumptions in body
     */
    @GetMapping("/customer-type-product-consumptions")
    @Timed
    public ResponseEntity<List<CustomerTypeProductConsumptionDTO>> getAllCustomerTypeProductConsumptions(Pageable pageable) {
        log.debug("REST request to get a page of CustomerTypeProductConsumptions");
        Page<CustomerTypeProductConsumptionDTO> page = customerTypeProductConsumptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-type-product-consumptions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-type-product-consumptions/:id : get the "id" customerTypeProductConsumption.
     *
     * @param id the id of the customerTypeProductConsumptionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerTypeProductConsumptionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-type-product-consumptions/{id}")
    @Timed
    public ResponseEntity<CustomerTypeProductConsumptionDTO> getCustomerTypeProductConsumption(@PathVariable Long id) {
        log.debug("REST request to get CustomerTypeProductConsumption : {}", id);
        CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO = customerTypeProductConsumptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerTypeProductConsumptionDTO));
    }

    /**
     * DELETE  /customer-type-product-consumptions/:id : delete the "id" customerTypeProductConsumption.
     *
     * @param id the id of the customerTypeProductConsumptionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-type-product-consumptions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerTypeProductConsumption(@PathVariable Long id) {
        log.debug("REST request to delete CustomerTypeProductConsumption : {}", id);
        customerTypeProductConsumptionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/customer-type-product-consumptions/{productId}/{customerId}")
    @Timed
    public ResponseEntity<List<Consumption>> getAllCustomerTypeProductConsumptionsByProductAndCustomer(
        @PathVariable Long productId,
        @PathVariable Long customerId
    ) {
        log.debug("REST request to get a page of CustomerTypeProductConsumptions");
        List<Consumption> result = customerTypeProductConsumptionService.findAllByProductIdAndCustomerId(productId, customerId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
