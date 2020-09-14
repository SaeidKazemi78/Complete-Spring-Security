package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.CarRfIdService;
import ir.donyapardaz.niopdc.base.service.dto.CarRfIdDTO;
import ir.donyapardaz.niopdc.base.validation.CarRfIdValidator;
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
 * REST controller for managing CarRfId.
 */
@RestController
@RequestMapping("/api")
public class CarRfIdResource {

    private static final String ENTITY_NAME = "carRfId";
    private final Logger log = LoggerFactory.getLogger(CarRfIdResource.class);
    private final CarRfIdService carRfIdService;
    private final CarRfIdValidator carRfIdValidator;

    public CarRfIdResource(CarRfIdService carRfIdService, CarRfIdValidator carRfIdValidator) {
        this.carRfIdService = carRfIdService;
        this.carRfIdValidator = carRfIdValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(carRfIdValidator);
    }

    /**
     * POST  /car-rf-ids : Create a new carRfId.
     *
     * @param carRfIdDTO the carRfIdDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carRfIdDTO, or with status 400 (Bad Request) if the carRfId has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-rf-ids")
    @Timed
    public ResponseEntity<CarRfIdDTO> createCarRfId(@Valid @RequestBody CarRfIdDTO carRfIdDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save CarRfId : {}", carRfIdDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (carRfIdDTO.getId() != null) {
            throw new BadRequestAlertException("A new carRfId cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarRfIdDTO result = carRfIdService.save(carRfIdDTO);
        return ResponseEntity.created(new URI("/api/car-rf-ids/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-rf-ids : Updates an existing carRfId.
     *
     * @param carRfIdDTO the carRfIdDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carRfIdDTO,
     * or with status 400 (Bad Request) if the carRfIdDTO is not valid,
     * or with status 500 (Internal Server Error) if the carRfIdDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-rf-ids")
    @Timed
    public ResponseEntity<CarRfIdDTO> updateCarRfId(@Valid @RequestBody CarRfIdDTO carRfIdDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update CarRfId : {}", carRfIdDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (carRfIdDTO.getId() == null) {
            return createCarRfId(carRfIdDTO, validation);
        }
        CarRfIdDTO result = carRfIdService.save(carRfIdDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carRfIdDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-rf-ids : get all the carRfIds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carRfIds in body
     */
    @GetMapping("/car-rf-ids")
    @Timed
    public ResponseEntity<List<CarRfIdDTO>> getAllCarRfIds(Pageable pageable) {
        log.debug("REST request to get a page of CarRfIds");
        Page<CarRfIdDTO> page = carRfIdService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/car-rf-ids");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /car-rf-ids/:id : get the "id" carRfId.
     *
     * @param id the id of the carRfIdDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carRfIdDTO, or with status 404 (Not Found)
     */
    @GetMapping("/car-rf-ids/{id}")
    @Timed
    public ResponseEntity<CarRfIdDTO> getCarRfId(@PathVariable Long id) {
        log.debug("REST request to get CarRfId : {}", id);
        CarRfIdDTO carRfIdDTO = carRfIdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carRfIdDTO));
    }

    /**
     * DELETE  /car-rf-ids/:id : delete the "id" carRfId.
     *
     * @param id the id of the carRfIdDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    /*@DeleteMapping("/car-rf-ids/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarRfId(@PathVariable Long id) {
        log.debug("REST request to delete CarRfId : {}", id);
        carRfIdService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }*/

    @GetMapping("/car-rf-ids/count-rf-id/{customerId}")
    @Timed
    public ResponseEntity<Long> getCountRfIdForCustomer(@PathVariable Long customerId) {
        log.debug("REST request to get CarRfId : {}", customerId);
        Long carRfIdDTO = carRfIdService.getCountRfIdForCustomer(customerId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carRfIdDTO));
    }
}
