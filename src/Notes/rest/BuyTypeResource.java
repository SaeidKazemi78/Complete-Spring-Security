package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.BuyTypeService;
import ir.donyapardaz.niopdc.base.service.dto.BuyTypeDTO;
import ir.donyapardaz.niopdc.base.validation.BuyTypeValidator;
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
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BuyType.
 */
@RestController
@RequestMapping("/api")
public class BuyTypeResource {

    private static final String ENTITY_NAME = "buyType";
    private final Logger log = LoggerFactory.getLogger(BuyTypeResource.class);
    private final BuyTypeService buyTypeService;
    private final BuyTypeValidator buyTypeValidator;

    public BuyTypeResource(BuyTypeService buyTypeService, BuyTypeValidator buyTypeValidator) {
        this.buyTypeService = buyTypeService;
        this.buyTypeValidator = buyTypeValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(buyTypeValidator);
    }

    /**
     * POST  /buy-types : Create a new buyType.
     *
     * @param buyTypeDTO the buyTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new buyTypeDTO, or with status 400 (Bad Request) if the buyType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/buy-types")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_BUY_TYPE})
    public ResponseEntity<BuyTypeDTO> createBuyType(@Valid @RequestBody BuyTypeDTO buyTypeDTO, BindingResult validation) throws URISyntaxException {
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        log.debug("REST request to save BuyType : {}", buyTypeDTO);
        if (buyTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new buyType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BuyTypeDTO result = buyTypeService.save(buyTypeDTO);
        return ResponseEntity.created(new URI("/api/buy-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /buy-types : Updates an existing buyType.
     *
     * @param buyTypeDTO the buyTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated buyTypeDTO,
     * or with status 400 (Bad Request) if the buyTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the buyTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/buy-types")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_BUY_TYPE})
    public ResponseEntity<BuyTypeDTO> updateBuyType(@Valid @RequestBody BuyTypeDTO buyTypeDTO, BindingResult validation) throws URISyntaxException {
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        log.debug("REST request to update BuyType : {}", buyTypeDTO);
        if (buyTypeDTO.getId() == null) {
            return createBuyType(buyTypeDTO, validation);
        }
        BuyTypeDTO result = buyTypeService.save(buyTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, buyTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /buy-types : get all the buyTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of buyTypes in body
     */
    @GetMapping("/buy-types")
    @Timed
    public ResponseEntity<List<BuyTypeDTO>> getAllBuyTypes(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of BuyTypes");
        Page<BuyTypeDTO> page = buyTypeService.findAll(query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/buy-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    /**
     * GET  /buy-types : get all the buyTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of buyTypes in body
     */
    @GetMapping("/buy-types/customer-credit")
    @Timed
    public ResponseEntity<List<BuyTypeDTO>> getAllBuyTypesForCustomerCredit(@RequestParam(required = false, name = "customerId") Long customerId, @RequestParam(required = false, name = "isCredit") Boolean isCredit) {
        log.debug("REST request to get a page of BuyTypes");
        List<BuyTypeDTO> list = buyTypeService.findAllForCustomerCredit(customerId, isCredit);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /buy-types : get all the buyTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of buyTypes in body
     */
    @GetMapping("/buy-types/sell-contract-product")
    @Timed
    public ResponseEntity<List<BuyTypeDTO>> getAllBuyTypesForSellContractProduct(@RequestParam(required = false, name = "customerId") Long customerId) {
        log.debug("REST request to get a page of BuyTypes");
        List<BuyTypeDTO> list = buyTypeService.findAllForSellContractProduct(customerId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /buy-types/:id : get the "id" buyType.
     *
     * @param id the id of the buyTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the buyTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/buy-types/{id}")
    @Timed
    public ResponseEntity<BuyTypeDTO> getBuyType(@PathVariable Long id) {
        log.debug("REST request to get BuyType : {}", id);
        BuyTypeDTO buyTypeDTO = buyTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(buyTypeDTO));
    }


    @GetMapping("/buy-types/quota")
    @Timed
    public ResponseEntity<BuyTypeDTO> getQuota() {
        BuyTypeDTO buyTypeDTO = buyTypeService.getQuota();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(buyTypeDTO));
    }

    /**
     * DELETE  /buy-types/:id : delete the "id" buyType.
     *
     * @param id the id of the buyTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/buy-types/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_BUY_TYPE})
    public ResponseEntity<Void> deleteBuyType(@PathVariable Long id) {
        log.debug("REST request to delete BuyType : {}", id);
        buyTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
