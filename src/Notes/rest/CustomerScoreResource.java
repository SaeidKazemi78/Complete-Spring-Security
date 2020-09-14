package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CustomerScoreService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CustomerScoreDTO;
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
 * REST controller for managing CustomerScore.
 */
@RestController
@RequestMapping("/api")
public class CustomerScoreResource {

    private final Logger log = LoggerFactory.getLogger(CustomerScoreResource.class);

    private static final String ENTITY_NAME = "customerScore";

    private final CustomerScoreService customerScoreService;

    public CustomerScoreResource(CustomerScoreService customerScoreService) {
        this.customerScoreService = customerScoreService;
    }

    /**
     * POST  /customer-scores : Create a new customerScore.
     *
     * @param customerScoreDTO the customerScoreDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerScoreDTO, or with status 400 (Bad Request) if the customerScore has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-scores")
    @Timed
    public ResponseEntity<CustomerScoreDTO> createCustomerScore(@Valid @RequestBody CustomerScoreDTO customerScoreDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerScore : {}", customerScoreDTO);
        if (customerScoreDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerScore cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerScoreDTO result = customerScoreService.save(customerScoreDTO);
        return ResponseEntity.created(new URI("/api/customer-scores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-scores : Updates an existing customerScore.
     *
     * @param customerScoreDTO the customerScoreDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerScoreDTO,
     * or with status 400 (Bad Request) if the customerScoreDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerScoreDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-scores")
    @Timed
    public ResponseEntity<CustomerScoreDTO> updateCustomerScore(@Valid @RequestBody CustomerScoreDTO customerScoreDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerScore : {}", customerScoreDTO);
        if (customerScoreDTO.getId() == null) {
            return createCustomerScore(customerScoreDTO);
        }
        CustomerScoreDTO result = customerScoreService.save(customerScoreDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerScoreDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-scores : get all the customerScores.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerScores in body
     */
    @GetMapping("/customer-scores")
    @Timed
    public ResponseEntity<List<CustomerScoreDTO>> getAllCustomerScores(Pageable pageable) {
        log.debug("REST request to get a page of CustomerScores");
        Page<CustomerScoreDTO> page = customerScoreService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-scores");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-scores/:id : get the "id" customerScore.
     *
     * @param id the id of the customerScoreDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerScoreDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-scores/{id}")
    @Timed
    public ResponseEntity<CustomerScoreDTO> getCustomerScore(@PathVariable Long id) {
        log.debug("REST request to get CustomerScore : {}", id);
        CustomerScoreDTO customerScoreDTO = customerScoreService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerScoreDTO));
    }

    /**
     * DELETE  /customer-scores/:id : delete the "id" customerScore.
     *
     * @param id the id of the customerScoreDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-scores/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerScore(@PathVariable Long id) {
        log.debug("REST request to delete CustomerScore : {}", id);
        customerScoreService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
