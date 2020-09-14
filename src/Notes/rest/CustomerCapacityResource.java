package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CustomerCapacityService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCapacityDTO;
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
 * REST controller for managing CustomerCapacity.
 */
@RestController
@RequestMapping("/api")
public class CustomerCapacityResource {

    private final Logger log = LoggerFactory.getLogger(CustomerCapacityResource.class);

    private static final String ENTITY_NAME = "customerCapacity";

    private final CustomerCapacityService customerCapacityService;

    public CustomerCapacityResource(CustomerCapacityService customerCapacityService) {
        this.customerCapacityService = customerCapacityService;
    }

    /**
     * POST  /customer-capacities : Create a new customerCapacity.
     *
     * @param customerCapacityDTO the customerCapacityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerCapacityDTO, or with status 400 (Bad Request) if the customerCapacity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-capacities")
    @Timed
    public ResponseEntity<CustomerCapacityDTO> createCustomerCapacity(@Valid @RequestBody CustomerCapacityDTO customerCapacityDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerCapacity : {}", customerCapacityDTO);
        if (customerCapacityDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerCapacity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerCapacityDTO result = customerCapacityService.save(customerCapacityDTO);
        return ResponseEntity.created(new URI("/api/customer-capacities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-capacities : Updates an existing customerCapacity.
     *
     * @param customerCapacityDTO the customerCapacityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerCapacityDTO,
     * or with status 400 (Bad Request) if the customerCapacityDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerCapacityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-capacities")
    @Timed
    public ResponseEntity<CustomerCapacityDTO> updateCustomerCapacity(@Valid @RequestBody CustomerCapacityDTO customerCapacityDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerCapacity : {}", customerCapacityDTO);
        if (customerCapacityDTO.getId() == null) {
            return createCustomerCapacity(customerCapacityDTO);
        }
        CustomerCapacityDTO result = customerCapacityService.save(customerCapacityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerCapacityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-capacities : get all the customerCapacities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerCapacities in body
     */
    @GetMapping("/customer-capacities")
    @Timed
    public ResponseEntity<List<CustomerCapacityDTO>> getAllCustomerCapacities(Pageable pageable) {
        log.debug("REST request to get a page of CustomerCapacities");
        Page<CustomerCapacityDTO> page = customerCapacityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-capacities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-capacities/:id : get the "id" customerCapacity.
     *
     * @param id the id of the customerCapacityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerCapacityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-capacities/{id}")
    @Timed
    public ResponseEntity<CustomerCapacityDTO> getCustomerCapacity(@PathVariable Long id) {
        log.debug("REST request to get CustomerCapacity : {}", id);
        CustomerCapacityDTO customerCapacityDTO = customerCapacityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerCapacityDTO));
    }

    /**
     * DELETE  /customer-capacities/:id : delete the "id" customerCapacity.
     *
     * @param id the id of the customerCapacityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-capacities/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerCapacity(@PathVariable Long id) {
        log.debug("REST request to delete CustomerCapacity : {}", id);
        customerCapacityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
