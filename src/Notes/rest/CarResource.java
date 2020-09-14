package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.CarService;
import ir.donyapardaz.niopdc.base.service.dto.CarBakDTO;
import ir.donyapardaz.niopdc.base.service.dto.CarDTO;
import ir.donyapardaz.niopdc.base.service.dto.CarInfoDTO;
import ir.donyapardaz.niopdc.base.service.dto.DriverDTO;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Car.
 */
@RestController
@RequestMapping("/api")
public class CarResource {

    private static final String ENTITY_NAME = "car";
    private final Logger log = LoggerFactory.getLogger(CarResource.class);
    private final CarService carService;

    public CarResource(CarService carService) {
        this.carService = carService;
    }

    /**
     * POST  /cars : Create a new car.
     *
     * @param carDTO the carDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carDTO, or with status 400 (Bad Request) if the car has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cars")
    @Timed
    public ResponseEntity<CarDTO> createCar(@RequestBody CarDTO carDTO) throws URISyntaxException {
        log.debug("REST request to save Car : {}", carDTO);
        if (carDTO.getId() != null) {
            throw new BadRequestAlertException("A new car cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarDTO result = carService.save(carDTO);
        return ResponseEntity.created(new URI("/api/cars/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cars : Updates an existing car.
     *
     * @param carDTO the carDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carDTO,
     * or with status 400 (Bad Request) if the carDTO is not valid,
     * or with status 500 (Internal Server Error) if the carDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cars")
    @Timed
    public ResponseEntity<CarDTO> updateCar(@RequestBody CarDTO carDTO) throws URISyntaxException {
        log.debug("REST request to update Car : {}", carDTO);
        if (carDTO.getId() == null) {
            return createCar(carDTO);
        }
        CarDTO result = carService.save(carDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cars : get all the cars.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of cars in body
     */
    @GetMapping("/cars")
    @Timed
    public ResponseEntity<List<CarDTO>> getAllCars(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Cars");
        Page<CarDTO> page = carService.findAll(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /cars/:id : get the "id" car.
     *
     * @param id the id of the carDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carDTO, or with status 404 (Not Found)
     */
    @GetMapping("/cars/{id}")
    @Timed
    public ResponseEntity<CarDTO> getCar(@PathVariable Long id) {
        log.debug("REST request to get Car : {}", id);
        CarDTO carDTO = carService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(carDTO));
    }

    /**
     * DELETE  /cars/:id : delete the "id" car.
     *
     * @param id the id of the carDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cars/{id}")
    @Timed
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        log.debug("REST request to delete Car : {}", id);
        carService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/cars/{id}/drivers")
    @Timed
    public ResponseEntity<List<DriverDTO>> getDrivers(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<DriverDTO> allCarRfId = carService.findAllDrivers(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/cars/{id}/car-baks")
    @Timed
    public ResponseEntity<List<CarBakDTO>> getCarBak(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<CarBakDTO> allCarRfId = carService.findAllCarBaks(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/cars/{id}/car-infos")
    @Timed
    public ResponseEntity<List<CarInfoDTO>> getCarInfo(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        Page<CarInfoDTO> allCarRfId = carService.findAllCarInfo(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(allCarRfId, "/api/customers");
        return new ResponseEntity<>(allCarRfId.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/cars/{id}/drivers-all")
    @Timed
    public ResponseEntity<List<DriverDTO>> getAllDrivers(@PathVariable Long id) {
        log.debug("REST request to get Customer By car rf ids: {}", id);
        List<DriverDTO> allCarRfId = carService.findAllDrivers(id);
        return new ResponseEntity<>(allCarRfId, HttpStatus.OK);
    }

    @PostMapping("/cars/upload-file")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        carService.updateFromExcel(file);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateFromExcelAlert(ENTITY_NAME, file.getContentType())).build();
    }

    @GetMapping("/cars/have-driver/{personId}")
    @Timed
    public ResponseEntity<List<CarDTO>> getAllCarsByHaveDriver(@RequestParam(required = false) String query, @ApiParam Pageable pageable,
                                                               @RequestParam(required = false) String title,
                                                               @PathVariable Long personId) {
        log.debug("REST request to get a page of Cars");
        Page<CarDTO> page = carService.findAllByHaveDriver(title, personId, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
