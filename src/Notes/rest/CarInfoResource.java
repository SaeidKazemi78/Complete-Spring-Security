package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CarInfoService;
import ir.donyapardaz.niopdc.base.service.dto.CarInfoDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
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
 * REST controller for managing CarInfo.
 */
@RestController
@RequestMapping("/api")
public class CarInfoResource {

    private final Logger log = LoggerFactory.getLogger(CarInfoResource.class);

    private static final String ENTITY_NAME = "carInto";

    private final CarInfoService carInfoService;

    public CarInfoResource(CarInfoService carInfoService) {
        this.carInfoService = carInfoService;
    }

    /**
     * POST  /car-infos : Create a new carInto.
     *
     * @param carInfoDTO the carInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carInfoDTO, or with status 400 (Bad Request) if the carInto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-infos")
    @Timed
    public ResponseEntity<CarInfoDTO> createCarInto(@RequestBody CarInfoDTO carInfoDTO) throws URISyntaxException {
        log.debug("REST request to save CarInfo : {}", carInfoDTO);
        if (carInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new carInto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarInfoDTO result = carInfoService.save(carInfoDTO);
        return ResponseEntity.created(new URI("/api/car-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-infos : Updates an existing carInto.
     *
     * @param carInfoDTO the carInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carInfoDTO,
     * or with status 400 (Bad Request) if the carInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the carInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-infos")
    @Timed
    public ResponseEntity<CarInfoDTO> updateCarInto(@RequestBody CarInfoDTO carInfoDTO) throws URISyntaxException {
        log.debug("REST request to update CarInfo : {}", carInfoDTO);
        if (carInfoDTO.getId() == null) {
            return createCarInto(carInfoDTO);
        }
        CarInfoDTO result = carInfoService.save(carInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-infos : get all the carinfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carinfos in body
     */
    @GetMapping("/car-infos")
    @Timed
    public ResponseEntity<List<CarInfoDTO>> getAllCarinfos(Pageable pageable) {
        log.debug("REST request to get a page of Carinfos");
        Page<CarInfoDTO> page = carInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/car-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /car-infos/:id : get the "id" carInto.
     *
     * @param id the id of the carIntoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carIntoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/car-infos/{id}")
    @Timed
    public ResponseEntity<CarInfoDTO> getCarInto(@PathVariable Long id) {
        log.debug("REST request to get CarInfo : {}", id);
        CarInfoDTO carInfoDTO = carInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carInfoDTO));
    }

    /**
     * DELETE  /car-infos/:id : delete the "id" carInto.
     *
     * @param id the id of the carIntoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-infos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarInto(@PathVariable Long id) {
        log.debug("REST request to delete CarInfo : {}", id);
        carInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
