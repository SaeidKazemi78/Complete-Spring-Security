package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CarTankService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CarTankDTO;
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
 * REST controller for managing CarTank.
 */
@RestController
@RequestMapping("/api")
public class CarTankResource {

    private final Logger log = LoggerFactory.getLogger(CarTankResource.class);

    private static final String ENTITY_NAME = "carTank";

    private final CarTankService carTankService;

    public CarTankResource(CarTankService carTankService) {
        this.carTankService = carTankService;
    }

    /**
     * POST  /car-tanks : Create a new carTank.
     *
     * @param carTankDTO the carTankDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carTankDTO, or with status 400 (Bad Request) if the carTank has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-tanks")
    @Timed
    public ResponseEntity<CarTankDTO> createCarTank(@Valid @RequestBody CarTankDTO carTankDTO) throws URISyntaxException {
        log.debug("REST request to save CarTank : {}", carTankDTO);
        if (carTankDTO.getId() != null) {
            throw new BadRequestAlertException("A new carTank cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarTankDTO result = carTankService.save(carTankDTO);
        return ResponseEntity.created(new URI("/api/car-tanks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-tanks : Updates an existing carTank.
     *
     * @param carTankDTO the carTankDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carTankDTO,
     * or with status 400 (Bad Request) if the carTankDTO is not valid,
     * or with status 500 (Internal Server Error) if the carTankDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-tanks")
    @Timed
    public ResponseEntity<CarTankDTO> updateCarTank(@Valid @RequestBody CarTankDTO carTankDTO) throws URISyntaxException {
        log.debug("REST request to update CarTank : {}", carTankDTO);
        if (carTankDTO.getId() == null) {
            return createCarTank(carTankDTO);
        }
        CarTankDTO result = carTankService.save(carTankDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carTankDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-tanks/:id : get the "id" carTank.
     *
     * @param id the id of the carTankDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carTankDTO, or with status 404 (Not Found)
     */
    @GetMapping("/car-tanks/{id}")
    @Timed
    public ResponseEntity<CarTankDTO> getCarTank(@PathVariable Long id) {
        log.debug("REST request to get CarTank : {}", id);
        CarTankDTO carTankDTO = carTankService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carTankDTO));
    }

    /**
     * DELETE  /car-tanks/:id : delete the "id" carTank.
     *
     * @param id the id of the carTankDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-tanks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarTank(@PathVariable Long id) {
        log.debug("REST request to delete CarTank : {}", id);
        carTankService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/car-tanks/get-all")
    @Timed
    public ResponseEntity<List<CarTankDTO>> getAllCarTanksByIds(@RequestParam("ids")List<Long> ids) {
        log.debug("REST request to get a page of CarTanks");
        List<CarTankDTO> page = carTankService.findAllByIds(ids);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }
}
