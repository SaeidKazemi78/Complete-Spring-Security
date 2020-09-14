package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CustomerVisitService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CustomerVisitDTO;
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
 * REST controller for managing CustomerVisit.
 */
@RestController
@RequestMapping("/api")
public class CustomerVisitResource {

    private final Logger log = LoggerFactory.getLogger(CustomerVisitResource.class);

    private static final String ENTITY_NAME = "customerVisit";

    private final CustomerVisitService customerVisitService;

    public CustomerVisitResource(CustomerVisitService customerVisitService) {
        this.customerVisitService = customerVisitService;
    }

    /**
     * POST  /customer-visits : Create a new customerVisit.
     *
     * @param customerVisitDTO the customerVisitDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerVisitDTO, or with status 400 (Bad Request) if the customerVisit has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-visits")
    @Timed
    public ResponseEntity<CustomerVisitDTO> createCustomerVisit(@Valid @RequestBody CustomerVisitDTO customerVisitDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerVisit : {}", customerVisitDTO);
        if (customerVisitDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerVisit cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerVisitDTO result = customerVisitService.save(customerVisitDTO);
        return ResponseEntity.created(new URI("/api/customer-visits/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-visits : Updates an existing customerVisit.
     *
     * @param customerVisitDTO the customerVisitDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerVisitDTO,
     * or with status 400 (Bad Request) if the customerVisitDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerVisitDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-visits")
    @Timed
    public ResponseEntity<CustomerVisitDTO> updateCustomerVisit(@Valid @RequestBody CustomerVisitDTO customerVisitDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerVisit : {}", customerVisitDTO);
        if (customerVisitDTO.getId() == null) {
            return createCustomerVisit(customerVisitDTO);
        }
        CustomerVisitDTO result = customerVisitService.save(customerVisitDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerVisitDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-visits : get all the customerVisits.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerVisits in body
     */
    @GetMapping("/customer-visits")
    @Timed
    public ResponseEntity<List<CustomerVisitDTO>> getAllCustomerVisits(Pageable pageable) {
        log.debug("REST request to get a page of CustomerVisits");
        Page<CustomerVisitDTO> page = customerVisitService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-visits");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-visits/:id : get the "id" customerVisit.
     *
     * @param id the id of the customerVisitDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerVisitDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-visits/{id}")
    @Timed
    public ResponseEntity<CustomerVisitDTO> getCustomerVisit(@PathVariable Long id) {
        log.debug("REST request to get CustomerVisit : {}", id);
        CustomerVisitDTO customerVisitDTO = customerVisitService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerVisitDTO));
    }

    /**
     * DELETE  /customer-visits/:id : delete the "id" customerVisit.
     *
     * @param id the id of the customerVisitDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-visits/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerVisit(@PathVariable Long id) {
        log.debug("REST request to delete CustomerVisit : {}", id);
        customerVisitService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
