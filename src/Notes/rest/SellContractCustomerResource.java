package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.SellContractCustomerService;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerDTO;
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
 * REST controller for managing SellContractCustomer.
 */
@RestController
@RequestMapping("/api")
public class SellContractCustomerResource {

    private final Logger log = LoggerFactory.getLogger(SellContractCustomerResource.class);

    private static final String ENTITY_NAME = "sellContractCustomer";

    private final SellContractCustomerService sellContractCustomerService;

    public SellContractCustomerResource(SellContractCustomerService sellContractCustomerService) {
        this.sellContractCustomerService = sellContractCustomerService;
    }

    /**
     * GET  /sell-contract-customers : get all the sellContractCustomers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of sellContractCustomers in body
     */
    @GetMapping("/sell-contract-customers")
    @Timed
    public ResponseEntity<List<SellContractCustomerDTO>> getAllSellContractCustomers(Pageable pageable) {
        log.debug("REST request to get a page of SellContractCustomers");
        Page<SellContractCustomerDTO> page = sellContractCustomerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sell-contract-customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sell-contract-customers/:id : get the "id" sellContractCustomer.
     *
     * @param id the id of the sellContractCustomerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the sellContractCustomerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sell-contract-customers/{id}")
    @Timed
    public ResponseEntity<SellContractCustomerDTO> getSellContractCustomer(@PathVariable Long id) {
        log.debug("REST request to get SellContractCustomer : {}", id);
        SellContractCustomerDTO sellContractCustomerDTO = sellContractCustomerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(sellContractCustomerDTO));
    }


}
