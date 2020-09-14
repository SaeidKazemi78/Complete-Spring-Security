package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.BoundaryDiscountService;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;
import ir.donyapardaz.niopdc.base.service.dto.InquiryCmrDTO;
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
import javax.xml.rpc.ServiceException;
import java.net.URI;
import java.net.URISyntaxException;
import java.rmi.RemoteException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BoundaryDiscount.
 */
@RestController
@RequestMapping("/api")
public class BoundaryDiscountResource {

    private static final String ENTITY_NAME = "boundaryDiscount";
    private final Logger log = LoggerFactory.getLogger(BoundaryDiscountResource.class);
    private final BoundaryDiscountService boundaryDiscountService;

    public BoundaryDiscountResource(BoundaryDiscountService boundaryDiscountService) {
        this.boundaryDiscountService = boundaryDiscountService;
    }

    /**
     * POST  /boundary-discounts : Create a new boundaryDiscount.
     *
     * @param boundaryDiscountDTO the boundaryDiscountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new boundaryDiscountDTO, or with status 400 (Bad Request) if the boundaryDiscount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/boundary-discounts")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_BOUNDARY_DISCOUNT})
    public ResponseEntity<BoundaryDiscountDTO> createBoundaryDiscount(@Valid @RequestBody BoundaryDiscountDTO boundaryDiscountDTO) throws URISyntaxException {
        log.debug("REST request to save BoundaryDiscount : {}", boundaryDiscountDTO);
        if (boundaryDiscountDTO.getId() != null) {
            throw new BadRequestAlertException("A new boundaryDiscount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BoundaryDiscountDTO result = boundaryDiscountService.save(boundaryDiscountDTO);
        return ResponseEntity.created(new URI("/api/boundary-discounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /boundary-discounts : Updates an existing boundaryDiscount.
     *
     * @param boundaryDiscountDTO the boundaryDiscountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated boundaryDiscountDTO,
     * or with status 400 (Bad Request) if the boundaryDiscountDTO is not valid,
     * or with status 500 (Internal Server Error) if the boundaryDiscountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/boundary-discounts")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_BOUNDARY_DISCOUNT})
    public ResponseEntity<BoundaryDiscountDTO> updateBoundaryDiscount(@Valid @RequestBody BoundaryDiscountDTO boundaryDiscountDTO) throws URISyntaxException {
        log.debug("REST request to update BoundaryDiscount : {}", boundaryDiscountDTO);
        if (boundaryDiscountDTO.getId() == null) {
            return createBoundaryDiscount(boundaryDiscountDTO);
        }
        BoundaryDiscountDTO result = boundaryDiscountService.save(boundaryDiscountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, boundaryDiscountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /boundary-discounts : get all the boundaryDiscounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of boundaryDiscounts in body
     */
    @GetMapping("/boundary-discounts")
    @Timed
    public ResponseEntity<List<BoundaryDiscountDTO>> getAllBoundaryDiscounts(
        @RequestParam(required = false) String location,
        @RequestParam(required = false) String country,
        @RequestParam(required = false) String vehicleModelType,
        @RequestParam(required = false) String liter,
        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of BoundaryDiscounts");
        Page<BoundaryDiscountDTO> page = boundaryDiscountService.findAll(location, country, vehicleModelType, liter, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/boundary-discounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /boundary-discounts/:id : get the "id" boundaryDiscount.
     *
     * @param id the id of the boundaryDiscountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the boundaryDiscountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/boundary-discounts/{id}")
    @Timed
    public ResponseEntity<BoundaryDiscountDTO> getBoundaryDiscount(@PathVariable Long id) throws ServiceException, RemoteException {
        log.debug("REST request to get BoundaryDiscount : {}", id);
        BoundaryDiscountDTO boundaryDiscountDTO = boundaryDiscountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(boundaryDiscountDTO));
    }

    /**
     * DELETE  /boundary-discounts/:id : delete the "id" boundaryDiscount.
     *
     * @param id the id of the boundaryDiscountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/boundary-discounts/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_BOUNDARY_DISCOUNT})
    public ResponseEntity<Void> deleteBoundaryDiscount(@PathVariable Long id) {
        log.debug("REST request to delete BoundaryDiscount : {}", id);
        boundaryDiscountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/boundary-discounts/inquiry")
    @Timed
    public ResponseEntity<InquiryCmrDTO> inquiryCmr(@RequestParam Long locationId,
                                                    @RequestParam Long customerId,
                                                     String cmr,
                                                    @RequestParam VehicleModelType vehicleModelType) throws ServiceException, RemoteException {
        log.debug("REST request to get BoundaryDiscount : {}", cmr);
        InquiryCmrDTO boundaryDiscountDTO = boundaryDiscountService.inquiryCmr(locationId, customerId, cmr,vehicleModelType);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(boundaryDiscountDTO));
    }

}
