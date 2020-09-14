package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CarBakService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.CarBakDTO;
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
 * REST controller for managing CarBak.
 */
@RestController
@RequestMapping("/api")
public class CarBakResource {

    private final Logger log = LoggerFactory.getLogger(CarBakResource.class);

    private static final String ENTITY_NAME = "carBak";

    private final CarBakService carBakService;

    public CarBakResource(CarBakService carBakService) {
        this.carBakService = carBakService;
    }

    /**
     * POST  /car-baks : Create a new carBak.
     *
     * @param carBakDTO the carBakDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carBakDTO, or with status 400 (Bad Request) if the carBak has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-baks")
    @Timed
    public ResponseEntity<CarBakDTO> createCarBak(@RequestBody CarBakDTO carBakDTO) throws URISyntaxException {
        log.debug("REST request to save CarBak : {}", carBakDTO);
        if (carBakDTO.getId() != null) {
            throw new BadRequestAlertException("A new carBak cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarBakDTO result = carBakService.save(carBakDTO);
        return ResponseEntity.created(new URI("/api/car-baks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-baks : Updates an existing carBak.
     *
     * @param carBakDTO the carBakDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carBakDTO,
     * or with status 400 (Bad Request) if the carBakDTO is not valid,
     * or with status 500 (Internal Server Error) if the carBakDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-baks")
    @Timed
    public ResponseEntity<CarBakDTO> updateCarBak(@RequestBody CarBakDTO carBakDTO) throws URISyntaxException {
        log.debug("REST request to update CarBak : {}", carBakDTO);
        if (carBakDTO.getId() == null) {
            return createCarBak(carBakDTO);
        }
        CarBakDTO result = carBakService.save(carBakDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carBakDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-baks : get all the carBaks.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carBaks in body
     */
    @GetMapping("/car-baks")
    @Timed
    public ResponseEntity<List<CarBakDTO>> getAllCarBaks(Pageable pageable) {
        log.debug("REST request to get a page of CarBaks");
        Page<CarBakDTO> page = carBakService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/car-baks");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /car-baks/:id : get the "id" carBak.
     *
     * @param id the id of the carBakDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carBakDTO, or with status 404 (Not Found)
     */
    @GetMapping("/car-baks/{id}")
    @Timed
    public ResponseEntity<CarBakDTO> getCarBak(@PathVariable Long id) {
        log.debug("REST request to get CarBak : {}", id);
        CarBakDTO carBakDTO = carBakService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carBakDTO));
    }

    /**
     * DELETE  /car-baks/:id : delete the "id" carBak.
     *
     * @param id the id of the carBakDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-baks/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarBak(@PathVariable Long id) {
        log.debug("REST request to delete CarBak : {}", id);
        carBakService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
