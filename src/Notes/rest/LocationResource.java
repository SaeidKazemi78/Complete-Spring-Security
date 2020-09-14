package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.OrderType;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.LocationService;
import ir.donyapardaz.niopdc.base.service.PersonService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO;
import ir.donyapardaz.niopdc.base.validation.LocationValidator;
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
import java.io.IOException;
import java.math.BigInteger;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * REST controller for managing Location.
 */
@RestController
@RequestMapping("/api")
public class LocationResource {

    private static final String ENTITY_NAME = "location";
    private final Logger log = LoggerFactory.getLogger(LocationResource.class);
    private final LocationService locationService;
    private final PersonService personService;
    private final LocationValidator locationValidator;

    public LocationResource(LocationService locationService, PersonService personService, LocationValidator locationValidator) {
        this.locationService = locationService;
        this.personService = personService;
        this.locationValidator = locationValidator;
    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(locationValidator);
    }

    /**
     * POST  /locations : Create a new location.
     *
     * @param locationDTO the locationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new locationDTO, or with status 400 (Bad Request) if the location has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/locations")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_LOCATION})
    public ResponseEntity<LocationFullDTO> createLocation(@Valid @RequestBody LocationFullDTO locationDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Location : {}", locationDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (locationDTO.getId() != null) {
            throw new BadRequestAlertException("A new location cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocationFullDTO result = locationService.save(locationDTO);
        ResponseEntity<LocationFullDTO> responseEntity = null;
        if (result.getLevel() == 0) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else if (result.getLevel() == 1) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else if (result.getLevel() == 2) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        }

        return responseEntity;
    }

    /**
     * PUT  /locations : Updates an existing location.
     *
     * @param locationDTO the locationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated locationDTO,
     * or with status 400 (Bad Request) if the locationDTO is not valid,
     * or with status 500 (Internal Server Error) if the locationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/locations")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_LOCATION})
    public ResponseEntity<LocationFullDTO> updateLocation(@Valid @RequestBody LocationFullDTO locationDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Location : {}", locationDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (locationDTO.getId() == null) {
            return createLocation(locationDTO, validation);
        }

        LocationFullDTO result = locationService.save(locationDTO);

        ResponseEntity<LocationFullDTO> responseEntity = null;
        if (result.getLevel() == 0) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else if (result.getLevel() == 1) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityAreaUpdateAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        } else if (result.getLevel() == 2) {
            responseEntity = ResponseEntity.created(new URI("/api/locations/" + result.getId()))
                .headers(HeaderUtil.createEntityZoneUpdateAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
        }

        return responseEntity;
    }


    /**
     * GET  /locations/:id/sub-location : get all the sub locations id.
     *
     * @param ids the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     */
    @GetMapping("/locations/sub-location")
    @Timed
    public ResponseEntity<List<LocationFullDTO>> getAllSubLocations(@RequestParam List<Long> ids) {
        log.debug("REST request to get a list of Locations");
        List<LocationFullDTO> list = locationService.findAllSubLocation(ids);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /locations/:id/sub-location : get all the sub locations id.
     *
     * @param level
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     */
    @GetMapping("/locations/level/{level}")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllSubLocationsByLevel(@PathVariable("level") int level) {
        log.debug("REST request to get a list of Locations");
        List<LocationDTO> list = locationService.findAllSubLocationByLevel(level);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /locations/childs/{parentId} : get all the locations by location parent id.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/locations/{parentId}/locations")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllLocationsByParentId(
        @PathVariable Long parentId,
        @RequestParam(required = false) String query,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String code,
        @ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        if (parentId == -1) parentId = null;
        List<LocationDTO> page = locationService.findAllByLocationId(parentId, name, code, query, pageable);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    /**
     * GET  /locations : get all the locations by location parent id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/locations/selector/{parentId}")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllLocationsByParentId(@PathVariable Long parentId, @RequestParam(required = false) Boolean dataAccess, @RequestParam(required = false) List<Long> customerIds)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        if (parentId == -1) parentId = null;
        List<LocationDTO> list = locationService.findAllByLocationIdAndCustomerIds(parentId, dataAccess, customerIds);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/locations/selector")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllParentLocations(@RequestParam List<Long> ids)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        List<LocationDTO> list = locationService.findAllByParent(ids);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /locations/:id : get the "id" location.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the locationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/root")
    @Timed
    public ResponseEntity<LocationFullDTO> getLocationRoot() {
        log.debug("REST request to get Location setad");
        LocationFullDTO locationDTO = locationService.findRoot();
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(locationDTO));
    }

    /**
     * GET  /locations/:id : get the "id" location.
     *
     * @param id the id of the locationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the locationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/{id}")
    @Timed
    public ResponseEntity<LocationFullDTO> getLocation(@PathVariable Long id) {
        log.debug("REST request to get Location : {}", id);
        LocationFullDTO locationDTO = locationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(locationDTO));
    }


    /**
     * GET  /locations/:id/up-recursive : get the "id" location.
     *
     * @param id the id of the locationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the locationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/{id}/up-recursive")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllRecursiveToUp(@PathVariable Long id) {
        log.debug("REST request to get Location : {}", id);
        List<LocationDTO> list = locationService.findAllRecursiveToUp(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    /**
     * GET  /locations/up-recursive : get the "id" location.
     *
     * @param ids the id of the locationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the locationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/up-recursive")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllRecursiveToUp(@RequestParam List<Long> ids) {
        log.debug("REST request to get Location : {}", ids);
        List<LocationDTO> list = locationService.findAllRecursiveToUp(ids);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/locations/recursive-to-up-ids")
    @Timed
    public ResponseEntity<Map<Long, List<LocationSelectorDTO>>> getAllRecursiveToUpIds(@RequestParam List<Long> ids)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        Map<Long, List<LocationSelectorDTO>> listMap = locationService.findAllRecursiveToUpIds(ids);
        return new ResponseEntity<>(listMap, HttpStatus.OK);
    }

    /**
     * GET  /locations/:id/depots : get the "id" location.
     *
     * @param id the id of the locationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depotDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/{id}/depots/{contractType}")
    @Timed
    public ResponseEntity<List<DepotDTO>> getLocationDepots(@PathVariable Long id, @PathVariable String contractType) {
        log.debug("REST request to get Location : {}", id);
        List<DepotDTO> depotsDTO = locationService.findAllDepotRecursive(id, contractType);
        return new ResponseEntity<>(depotsDTO, HttpStatus.OK);
    }

    /**
     * GET  /locations/:id/depots : get the "id" location.
     *
     * @param id the id of the locationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the depotDTO, or with status 404 (Not Found)
     */
    @GetMapping("/locations/{id}/depots")
    @Timed
    public ResponseEntity<List<DepotDTO>> getLocationDepots(@PathVariable Long id) {
        log.debug("REST request to get Location : {}", id);
        List<DepotDTO> depotsDTO = locationService.findAllDepotRecursive(id);
        return new ResponseEntity<>(depotsDTO, HttpStatus.OK);
    }

    /**
     * DELETE  /locations/:id : delete the "id" location.
     *
     * @param id the id of the locationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/locations/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_LOCATION})
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        log.debug("REST request to delete Location : {}", id);
        Integer level = locationService.delete(id);
        HttpHeaders entityDeletionAlert = null;
        if (level == 0)
            entityDeletionAlert = HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString());
        else if (level == 1)
            entityDeletionAlert = HeaderUtil.createEntityAreaDeletionAlert(ENTITY_NAME, id.toString());
        else if (level == 2)
            entityDeletionAlert = HeaderUtil.createEntityZoneDeletionAlert(ENTITY_NAME, id.toString());

        return ResponseEntity.ok().headers(entityDeletionAlert).build();
    }

    @GetMapping("/locations/{id}/close")
    @Timed
    public ResponseEntity<Void> closeLocation(@PathVariable Long id) {
        log.debug("REST request to close Location : {}", id);
        locationService.close(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCloseAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/locations/{id}/open")
    @Timed
    public ResponseEntity<Void> OpenLocation(@PathVariable Long id) {
        log.debug("REST request to open Location : {}", id);
        locationService.open(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityOpenAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("locations/get/{id}/open")
    @Timed
    public ResponseEntity<LocationDTO> getOpenDay(@PathVariable Long id) {
        log.debug("REST request to get Location : {}", id);
        LocationDTO locationDTO = locationService.getOpenDay(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(locationDTO));
    }


    //region Region

    /**
     * GET  /locations/:locationId/regions : get all the locations by location parent id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/locations/{locationId}/regions")
    @Timed
    public ResponseEntity<List<RegionDTO>> getAllRegionByLocationId(@PathVariable Long locationId)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        if (locationId == -1) locationId = null;
        List<RegionDTO> regions = locationService.findAllRegionByLocationId(locationId);
        return new ResponseEntity<>(regions, HttpStatus.OK);
    }

    /**
     * GET  /locations/:locationId/regions : get all the locations by location parent id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @PostMapping("/locations/regions")
    @Timed
    public ResponseEntity<List<RegionDTO>> getAllRegionByLocationId(@RequestParam List<Long> ids)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        List<RegionDTO> regions = locationService.findAllRegionByLocationIds(ids);
        return new ResponseEntity<>(regions, HttpStatus.OK);
    }
    //endregion

    //region Region

    /**
     * GET  /locations/depots : get all the locations by location parent id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @PostMapping("/locations/{locationId}/depots")
    @Timed
    public ResponseEntity<List<DepotDTO>> getAllDepotByLocations(@PathVariable Long locationId, @PathVariable String contractType)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations " + locationId);
        List<DepotDTO> depots = locationService.findAllDepotRecursive(locationId, contractType);
        return new ResponseEntity<>(depots, HttpStatus.OK);
    }
    //endregion

    //region Region

    /**
     * GET  /locations/depots : get all the locations by location parent id.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/locations/{locationId}/customers")
    @Timed
    public ResponseEntity<List<CustomerFullDTO>> getAllCustomerByLocation(@PathVariable Long locationId)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations " + locationId);
        List<CustomerFullDTO> customers = locationService.findAllCustomers(locationId);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/locations/{locationId}/{customerId}/people")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllPersonByLocation(@PathVariable Long locationId, @PathVariable Long customerId)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations " + locationId);
        List<PersonDTO> customers = personService.getAllPersonByLocation(locationId, customerId);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/locations/customer-person/{sellContractId}/{personId}")
    @Timed
    public ResponseEntity<CustomerPersonDTO> getOneCustomerPerson(@PathVariable Long sellContractId, @PathVariable Long personId, @RequestParam(required = false) Long customerId) {
        log.debug("REST request to get a page of CustomerPerson airport");
        CustomerPersonDTO customerPersonDTO = personService.findCustomerPerson(sellContractId, personId, customerId);
        return new ResponseEntity<>(customerPersonDTO, HttpStatus.OK);
    }


    @GetMapping("/locations/{locationId}/customer-person")
    @Timed
    public ResponseEntity<List<CustomerPersonDTO>> getAllCustomerPersonByLocation(@PathVariable Long locationId, String query, @ApiParam Pageable pageable)
        throws IOException {
        Page<CustomerPersonDTO> page = personService.getAllPersonCustomerByLocation(locationId, new ObjectMapper().readValue(query, CustomerPersonDTO.class), pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/locations/customer-person");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/locations/customer-person/{mode}")
    @Timed
    public ResponseEntity<List<CustomerPersonDTO>> getAllCustomerPersonAirPort(@PathVariable String mode, String query, @ApiParam Pageable pageable)
        throws IOException {
        log.debug("REST request to get a page of CustomerPerson airport");
        CustomerPersonDTO query1 = new ObjectMapper().readValue(query, CustomerPersonDTO.class);
        if (mode.equals("airplane"))
            query1.setOrderType(OrderType.AIRPLANE);
        else
            query1.setOrderType(OrderType.REFUEL_CENTER);

        Page<CustomerPersonDTO> page = personService.getAllPersonCustomerByLocation(null, query1, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/locations/customer-person/airplane");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    //endregion
    @GetMapping("/locations/{level}/level")
    @Timed
    public ResponseEntity<List<LocationWithCountryDTO>> getAllLocationByLevel(@PathVariable int level)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations " + level);
        List<LocationWithCountryDTO> customers = locationService.findAllByLevelAndUsername(level);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/locations/order")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllLocationForOrder()
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations ");
        List<LocationDTO> customers = locationService.getAllLocationForOrder();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/secured/locations/{username}")
    @Timed
    public ResponseEntity<List<BigInteger>> getAllLocationByUserName(@PathVariable String username) {
        log.debug("REST request to get List locationId by username ");
        List<BigInteger> customers = locationService.getAllLocationByUsername(username);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }


    @PostMapping("/locations/sub-location-by-level/{level}")
    @Timed
    public ResponseEntity<List<LocationDTO>> getAllSubLocationsByLevel
        (@RequestParam List<Long> ids, @PathVariable Integer level)
        throws URISyntaxException {
        log.debug("REST request to get a page of Locations");
        List<LocationDTO> locations = locationService.findAllSubLocationsByLevel(ids, level);
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @GetMapping("/locations/{id}/shift-works")
    @Timed
    public ResponseEntity<List<ShiftWorkDTO>> getAllShiftWorks(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of shift work");
        Page<ShiftWorkDTO> page = locationService.findAllShiftWorks(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/locations/{locationId}/open-shift-works")
    @Timed
    public ResponseEntity<Void> openShiftWork(@PathVariable Long locationId, @RequestParam Boolean tomorrow) {
        log.debug("Rest request to open Shift Work");

        locationService.openShiftWork(locationId, tomorrow);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/locations/{locationId}/close-shift-works")
    @Timed
    public ResponseEntity<Void> closeShiftWork(@PathVariable Long locationId) {
        log.debug("Rest request to close Shift Work");

        locationService.closeShiftWork(locationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/locations/{locationId}/open-shift-work-with-order-number")
    @Timed
    public ResponseEntity<ShiftWorkDTO> findOpenShiftWorkWithOrderNumber(@PathVariable Long locationId) {
        log.debug("REST request to check is open : {}", locationId);
        ShiftWorkDTO shiftWorkDTO = locationService.findOpenedShiftWorkWithOrderNumber(locationId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shiftWorkDTO));
    }

    @GetMapping("/locations/{locationId}/open-shift-work")
    @Timed
    public ResponseEntity<ShiftWorkDTO> findOpenShiftWorkOrder(@PathVariable Long locationId) {
        log.debug("REST request to check is open : {}", locationId);
        ShiftWorkDTO shiftWorkDTO = locationService.findOpenedShiftWork(locationId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(shiftWorkDTO));
    }

    @GetMapping("/locations/{id}/boundary-tags")
    @Timed
    public ResponseEntity<List<BoundaryTagDTO>> getAllBoundaryTag(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of boundary tag");
        Page<BoundaryTagDTO> page = locationService.findAllBoundaryTag(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/locations/{id}/tag-rates")
    @Timed
    public ResponseEntity<List<TagRateDTO>> getAllTagRates(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of tag rate");
        Page<TagRateDTO> page = locationService.findAllTagRate(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/locations/{locationCode}/get-by-code")
    @Timed
    public ResponseEntity<LocationDTO> getLocationByCode(@PathVariable String locationCode,
                                                         @RequestParam(required = false, name = "lvl") Long lvl) {
        log.debug("REST request to get location by code");
        LocationDTO location = locationService.findOneLocationByCode(locationCode, lvl);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(location));
    }
}
