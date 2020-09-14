package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.CustomerRatingService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerRatingDTO;
import ir.donyapardaz.niopdc.base.validation.CustomerRatingValidator;
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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerRating.
 */
@RestController
@RequestMapping("/api")
public class CustomerRatingResource {

    private static final String ENTITY_NAME = "customerRating";
    private final Logger log = LoggerFactory.getLogger(CustomerRatingResource.class);
    private final CustomerRatingService customerRatingService;
    private final CustomerRatingValidator customerRatingValidator;

    public CustomerRatingResource(CustomerRatingService customerRatingService, CustomerRatingValidator customerRatingValidator) {
        this.customerRatingService = customerRatingService;
        this.customerRatingValidator = customerRatingValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(customerRatingValidator);
    }

    /**
     * POST  /customer-ratings : Create a new customerRating.
     *
     * @param customerRatingDTO the customerRatingDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerRatingDTO, or with status 400 (Bad Request) if the customerRating has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-ratings")
    @Timed
    public ResponseEntity<CustomerRatingDTO> createCustomerRating(@Valid @RequestBody CustomerRatingDTO customerRatingDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save CustomerRating : {}", customerRatingDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (customerRatingDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerRating cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerRatingDTO result = customerRatingService.save(customerRatingDTO);
        return ResponseEntity.created(new URI("/api/customer-ratings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-ratings : Updates an existing customerRating.
     *
     * @param customerRatingDTO the customerRatingDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerRatingDTO,
     * or with status 400 (Bad Request) if the customerRatingDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerRatingDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-ratings")
    @Timed
    public ResponseEntity<CustomerRatingDTO> updateCustomerRating(@Valid @RequestBody CustomerRatingDTO customerRatingDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update CustomerRating : {}", customerRatingDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (customerRatingDTO.getId() == null) {
            return createCustomerRating(customerRatingDTO, validation);
        }
        CustomerRatingDTO result = customerRatingService.save(customerRatingDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerRatingDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-ratings : get all the customerRatings.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerRatings in body
     */
    @GetMapping("/customer-ratings")
    @Timed
    public ResponseEntity<List<CustomerRatingDTO>> getAllCustomerRatings(Pageable pageable) {
        log.debug("REST request to get a page of CustomerRatings");
        Page<CustomerRatingDTO> page = customerRatingService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-ratings");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-ratings/:id : get the "id" customerRating.
     *
     * @param id the id of the customerRatingDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerRatingDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-ratings/{id}")
    @Timed
    public ResponseEntity<CustomerRatingDTO> getCustomerRating(@PathVariable Long id) {
        log.debug("REST request to get CustomerRating : {}", id);
        CustomerRatingDTO customerRatingDTO = customerRatingService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerRatingDTO));
    }

    /**
     * DELETE  /customer-ratings/:id : delete the "id" customerRating.
     *
     * @param id the id of the customerRatingDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-ratings/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerRating(@PathVariable Long id) {
        log.debug("REST request to delete CustomerRating : {}", id);
        customerRatingService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
