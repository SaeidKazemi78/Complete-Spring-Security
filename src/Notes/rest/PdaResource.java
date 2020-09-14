package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.CountryService;
import ir.donyapardaz.niopdc.base.service.DepotService;
import ir.donyapardaz.niopdc.base.service.LocationService;
import ir.donyapardaz.niopdc.base.service.PersonService;
import ir.donyapardaz.niopdc.base.service.dto.pda.CountryApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.DepotApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.LocationApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.PersonApiDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/pda")
public class PdaResource {

    private final Logger log = LoggerFactory.getLogger(PdaResource.class);
    private final DepotService depotService;
    private final LocationService locationService;
    private final CountryService countryService;
    private final PersonService personService;

    public PdaResource(DepotService depotService, LocationService locationService, CountryService countryService, PersonService personService) {
        this.depotService = depotService;
        this.locationService = locationService;
        this.countryService = countryService;
        this.personService = personService;
    }


    //endregion
    @GetMapping("/depots")
    @Timed
    public ResponseEntity<List<DepotApiDTO>> getAllOrOne(
        @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
        @RequestParam(value = "id", required = false) Long id) {
        List<DepotApiDTO> page = depotService.findAllOrOne(id, startDate);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    /**
     * GET  /locations : get all the locations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of locations in body
     */
    @GetMapping("/locations")
    @Timed
    public ResponseEntity<List<LocationApiDTO>> getAllOrOneLocations(
        @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
        @RequestParam(value = "id", required = false) Long id) {
        log.debug("REST request to get a page of Locations");
        List<LocationApiDTO> page = locationService.findAllByStartDateAndId(startDate, id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    @GetMapping("/countries")
    @Timed
    public ResponseEntity<List<CountryApiDTO>> getAllRegion(
        @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
        @RequestParam(value = "id", required = false) Long id) {
        log.debug("REST request to get a page of CustomerCredits");
        List<CountryApiDTO> page = countryService.findAllOrOne(id, startDate);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    /**
     * GET  /people : get all the people.
     *
     * @param id the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */

    @GetMapping("/people")
    @Timed
    public ResponseEntity<List<PersonApiDTO>> getAllOrOnePeople(
        @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
        @RequestParam(value = "personId", required = false) Long id) {
        log.debug("REST request to get a page of People");
        long l = System.currentTimeMillis();
        List<PersonApiDTO> list = personService.findAllOrOne(id, startDate);
        long l2 = System.currentTimeMillis();
        log.debug("TIME:::::::::::::   " + String.valueOf(l2-l));
        return new ResponseEntity<>(list, HttpStatus.OK);
    }


}
