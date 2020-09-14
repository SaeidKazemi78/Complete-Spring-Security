package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.CustomerOrderCapacityService;
import ir.donyapardaz.niopdc.base.service.dto.CustomerOrderCapacityDTO;
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
 * REST controller for managing CustomerOrderCapacity.
 */
@RestController
@RequestMapping("/api")
public class CustomerOrderCapacityResource {

    private final Logger log = LoggerFactory.getLogger(CustomerOrderCapacityResource.class);

    private static final String ENTITY_NAME = "customerOrderCapacity";

    private final CustomerOrderCapacityService customerOrderCapacityService;

    public CustomerOrderCapacityResource(CustomerOrderCapacityService customerOrderCapacityService) {
        this.customerOrderCapacityService = customerOrderCapacityService;
    }

    /**
     * GET  /customer-order-capacities/:id : get the "id" customerOrderCapacity.
     *
     * @param id the id of the customerOrderCapacityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerOrderCapacityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-order-capacities/{id}")
    @Timed
    public ResponseEntity<CustomerOrderCapacityDTO> getCustomerOrderCapacity(@PathVariable Long id) {
        log.debug("REST request to get CustomerOrderCapacity : {}", id);
        CustomerOrderCapacityDTO customerOrderCapacityDTO = customerOrderCapacityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerOrderCapacityDTO));
    }


    @PutMapping("/customer-order-capacities/{id}/active")
    @Timed
    public ResponseEntity<Void> activeCustomerOrderCapacity(@PathVariable Long id) {
        log.debug("REST request to delete CustomerOrderCapacity : {}", id);
        customerOrderCapacityService.active(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityActiveAlert(ENTITY_NAME, id.toString())).build();
    }

    @PutMapping("/customer-order-capacities/{id}/de-active")
    @Timed
    public ResponseEntity<Void> deActiveCustomerOrderCapacity(@PathVariable Long id) {
        log.debug("REST request to delete CustomerOrderCapacity : {}", id);
        customerOrderCapacityService.deActive(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeActiveAlert(ENTITY_NAME, id.toString())).build();
    }
}
