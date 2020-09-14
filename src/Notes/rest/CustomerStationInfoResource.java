package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CustomerStationInfoService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CustomerStationInfoDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CustomerStationInfo.
 */
@RestController
@RequestMapping("/api")
public class CustomerStationInfoResource {

    private final Logger log = LoggerFactory.getLogger(CustomerStationInfoResource.class);

    private static final String ENTITY_NAME = "customerStationInfo";

    private final CustomerStationInfoService customerStationInfoService;

    public CustomerStationInfoResource(CustomerStationInfoService customerStationInfoService) {
        this.customerStationInfoService = customerStationInfoService;
    }

    /**
     * POST  /customer-station-infos : Create a new customerStationInfo.
     *
     * @param customerStationInfoDTO the customerStationInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerStationInfoDTO, or with status 400 (Bad Request) if the customerStationInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-station-infos")
    @Timed
    public ResponseEntity<CustomerStationInfoDTO> createCustomerStationInfo(@RequestBody CustomerStationInfoDTO customerStationInfoDTO) throws URISyntaxException {
        log.debug("REST request to save CustomerStationInfo : {}", customerStationInfoDTO);
        if (customerStationInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new customerStationInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerStationInfoDTO result = customerStationInfoService.save(customerStationInfoDTO);
        return ResponseEntity.created(new URI("/api/customer-station-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-station-infos : Updates an existing customerStationInfo.
     *
     * @param customerStationInfoDTO the customerStationInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerStationInfoDTO,
     * or with status 400 (Bad Request) if the customerStationInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the customerStationInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-station-infos")
    @Timed
    public ResponseEntity<CustomerStationInfoDTO> updateCustomerStationInfo(@RequestBody CustomerStationInfoDTO customerStationInfoDTO) throws URISyntaxException {
        log.debug("REST request to update CustomerStationInfo : {}", customerStationInfoDTO);
        if (customerStationInfoDTO.getId() == null) {
            return createCustomerStationInfo(customerStationInfoDTO);
        }
        CustomerStationInfoDTO result = customerStationInfoService.save(customerStationInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerStationInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-station-infos : get all the customerStationInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of customerStationInfos in body
     */
    @GetMapping("/customer-station-infos")
    @Timed
    public ResponseEntity<List<CustomerStationInfoDTO>> getAllCustomerStationInfos(Pageable pageable) {
        log.debug("REST request to get a page of CustomerStationInfos");
        Page<CustomerStationInfoDTO> page = customerStationInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customer-station-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /customer-station-infos/:id : get the "id" customerStationInfo.
     *
     * @param id the id of the customerStationInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerStationInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/customer-station-infos/{id}")
    @Timed
    public ResponseEntity<CustomerStationInfoDTO> getCustomerStationInfo(@PathVariable Long id) {
        log.debug("REST request to get CustomerStationInfo : {}", id);
        CustomerStationInfoDTO customerStationInfoDTO = customerStationInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerStationInfoDTO));
    }

    /**
     * DELETE  /customer-station-infos/:id : delete the "id" customerStationInfo.
     *
     * @param id the id of the customerStationInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-station-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerStationInfo(@PathVariable Long id) {
        log.debug("REST request to delete CustomerStationInfo : {}", id);
        customerStationInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
