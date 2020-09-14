package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonGroup;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.PersonService;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.validation.PersonValidator;
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
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Person.
 */
@RestController
/*@RequestMapping(value = {"/api","pr/api"})*/
public class PersonResource {

    private static final String ENTITY_NAME = "person";
    private final Logger log = LoggerFactory.getLogger(PersonResource.class);
    private final PersonService personService;
    private PersonValidator personValidator;


    public PersonResource(PersonService personService, PersonValidator personValidator) {
        this.personService = personService;
        this.personValidator = personValidator;

    }

    @InitBinder
    public void initBinder(WebDataBinder webDataBinder) {
        webDataBinder.setValidator(personValidator);
    }


    /**
     * POST  /people : Create a new person.
     *
     * @param personDTO the personDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personDTO, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/people")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.CREATE_PERSON})
    public ResponseEntity<PersonDTO> createPerson(@Valid @RequestBody PersonDTO personDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Person : {}", personDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        if (personDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new person cannot already have an ID")).body(null);
        }
        PersonDTO result = personService.save(personDTO, false);
        return ResponseEntity.created(new URI("/api/people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * POST  /people : Create a new person.
     *
     * @param personDTO the personDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personDTO, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/people/register")
    @Timed
    public ResponseEntity<Void> registerPerson(@Valid @RequestBody PersonDTO personDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to save Person : {}", personDTO);
        if (validation.hasErrors())
            ValidationResponseEntityGenerator.badRequest(validation);
        if (personDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new person cannot already have an ID")).body(null);
        }
        personService.register(personDTO);
        return ResponseEntity.ok().body(null);
    }

    /**
     * POST  /people : Create a new person.
     *
     * @param personDTO the personDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personDTO, or with status 400 (Bad Request) if the person has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/api/people/create-user")
    @Timed
    public ResponseEntity<PersonDTO> createUser(@Valid @RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to save Person User : {}", personDTO);
        if (personDTO.getId() == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new person cannot already have not an ID")).body(null);
        }
        PersonDTO result = personService.createUser(personDTO);
        return ResponseEntity.created(new URI("/api/people/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /people : Updates an existing person.
     *
     * @param personDTO the personDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personDTO,
     * or with status 400 (Bad Request) if the personDTO is not valid,
     * or with status 500 (Internal Server Error) if the personDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/api/people")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.EDIT_PERSON})
    public ResponseEntity<PersonDTO> updatePerson(@Valid @RequestBody PersonDTO personDTO, BindingResult validation) throws URISyntaxException {
        log.debug("REST request to update Person : {}", personDTO);
        if (validation.hasErrors()) {
            return ValidationResponseEntityGenerator.getBadRequest(validation);
        }
        if (personDTO.getId() == null) {
            return createPerson(personDTO, validation);
        }
        PersonDTO result = personService.save(personDTO, false);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personDTO.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /people : Updates an existing person.
     *
     * @param personDTO the personDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personDTO,
     * or with status 400 (Bad Request) if the personDTO is not valid,
     * or with status 500 (Internal Server Error) if the personDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/api/people/credit-account")
    @Timed
    public ResponseEntity<PersonDTO> updateCreditAccountPerson(@Valid @RequestBody PersonDTO personDTO, BindingResult validation) throws Exception {
        log.debug("REST request to update Person : {}", personDTO);

        personService.saveCreditAccount(personDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personDTO.getId().toString()))
            .build();
    }

    /**
     * GET  /people : get all the people.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/api/people")
    @Timed
//    @Secured(value = {AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.LIST_PERSON})
    public ResponseEntity<List<PersonListDTO>> getAllPeople(@RequestParam(required = false) Boolean onlySellContractAirplane, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonListDTO> page = personService.findAll(query, pageable, false);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people : get all the people.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/api/people/transport")
    @Timed
//    @Secured(value = {AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.LIST_PERSON})
    public ResponseEntity<List<PersonListDTO>> getAllPeopleTransport(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonListDTO> page = personService.findAll(query, pageable, true);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people : get all the people.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/api/people/selector")
    @Timed
    public ResponseEntity<List<PersonListDTO>> getAllPeopleSelector(@RequestParam(required = false) Boolean onlySellContractAirplane,
                                                                    @RequestParam(required = false) Boolean self,
                                                                    @RequestParam(required = false) String query,
                                                                    @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonListDTO> page = personService.findAllSelector(onlySellContractAirplane, self, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people/selector");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people : get all the people.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of people in body
     */
    @GetMapping("/api/people/{id}/stakeholders")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllStakeholder(@PathVariable() Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonDTO> page = personService.findAll(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/people");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /people/:id : get the "id" person.
     *
     * @param id the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @GetMapping("/api/people/{id}")
    @Timed
    public ResponseEntity<PersonDTO> getPerson(@PathVariable Long id, @RequestParam(required = false) Long companyId) {
        log.debug("REST request to get Person : {}, companyId {}", id, companyId);
        PersonDTO personDTO = personService.findOne(id, companyId);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personDTO));
    }

    /**
     * GET  /customers/:id : get the "id" customer.
     *
     * @param id the id of the customerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/api/people/info/{id}")
    @Timed
    public ResponseEntity<String> getPersonInfo(@PathVariable Long id) {
        log.debug("REST request to get Customer : {}", id);
        String customerDTO = personService.getPersonInfo(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerDTO));
    }


    /**
     * GET  /people/national-code/:nationalCode : get the "id" person.
     *
     * @param nationalCode the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @GetMapping("/api/people/national-code/{nationalCode}")
    @Timed
    public ResponseEntity<PersonDTO> getPersonByNationalCode(@PathVariable String nationalCode) {
        log.debug("REST request to get Person : {}, companyId {}", nationalCode);
        PersonDTO personDTO = personService.findByNationalCode(nationalCode);
        return ResponseEntity.ok(personDTO);
    }

    /**
     * GET  /people/national-code/:nationalCode : get the "id" person.
     *
     * @param nationalCode the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @GetMapping("/api/people/finder-national-code/{nationalCode}")
    @Timed
    public ResponseEntity<SabtAhvalSAHAPersonInfoDTO> getPersonByFinderNationalCode(@PathVariable String nationalCode) {
        log.debug("REST request to get Person : {}, companyId {}", nationalCode);
        SabtAhvalSAHAPersonInfoDTO personDTO = personService.findByFinderNationalCode(nationalCode);
        return ResponseEntity.ok(personDTO);
    }

    /**
     * GET  /people/nationalCode/:nationalCode : get the "id" person.
     *
     * @param personDTO1 the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @PostMapping("/api/people/base-info")
    @Timed
    public ResponseEntity<PersonDTO> getPersonByBaseInfo(@RequestBody PersonDTO personDTO1) {
        log.debug("REST request to get Person : {}, companyId {}", personDTO1);
        PersonDTO personDTO = personService.findBaseInfo(personDTO1);
        return ResponseEntity.ok(personDTO);
    }

    @GetMapping("/api/people/exist-national-code/{nationalCode}")
    @Timed
    public ResponseEntity<Boolean> existByNationalCode(@PathVariable String nationalCode) {
        log.debug("REST request to get Person : {}, companyId {}", nationalCode);
        Boolean personDTO = personService.existByNationalCode(nationalCode);
        return ResponseEntity.ok(personDTO);
    }

    /**
     * GET  /people/:id : get the "id" person.
     *
     * @param username the id of the personDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personDTO, or with status 404 (Not Found)
     */
    @GetMapping("/api/people/username/{username}")
    @Timed
    public ResponseEntity<PersonListDTO> getPerson(@PathVariable String username) {
        log.debug("REST request to get Person : {}, companyId {}", username);
        PersonListDTO id = personService.findOneByUsername(username);
        return ResponseEntity.ok(id);
    }

    /**
     * DELETE  /people/:id : delete the "id" person.
     *
     * @param id the id of the personDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/api/people/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN, AuthoritiesConstants.DELETE_PERSON})
    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
        log.debug("REST request to delete Person : {}", id);
        personService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/api/people/active/{id}")
    @Timed
    public ResponseEntity<Void> activePerson(@PathVariable Long id) {
        log.debug("REST request to active Person : {}", id);
        personService.active(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityActiveAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/api/people/de-active/{id}")
    @Timed
    public ResponseEntity<Void> deActivePerson(@PathVariable Long id) {
        log.debug("REST request to de-active Person : {}", id);
        personService.deActive(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeActiveAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/api/people/reject/{id}")
    @Timed
    public ResponseEntity<Void> rejectPerson(@PathVariable Long id) {
        log.debug("REST request to reject Person : {}", id);
        personService.reject(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityRejectedAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/api/people/{id}/customer-credits")
    @Timed
    public ResponseEntity<List<CustomerCreditDTO>> getAllCustomerCredits(@PathVariable Long id, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of CustomerCredits");
        Page<CustomerCreditDTO> page = personService.findAllCustomerCredit(id, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/customers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/api/people/{id}/customers")
    @Timed
    public ResponseEntity<List<CustomerDTO>> getAllCustomers(@PathVariable Long id) {
        log.debug("REST request to get a page of CustomerCredits");
        List<CustomerDTO> page = personService.findAllCustomer(id);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @GetMapping("/api/people/factor/{id}")
    @Timed
    public ResponseEntity<PersonCustomDTO> getPersonDetailsForFactor(@PathVariable Long id) {
        log.debug("REST request to get Person : {}", id);
        PersonCustomDTO personDTO = personService.findForFactor(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(personDTO));
    }

    /**
     * GET  /product-rate-differences : get all the productRateDifferences.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productRateDifferences in body
     */
    @GetMapping("/api/people/{personId}/code-location")
    @Timed
    public ResponseEntity<IdCodeLocationDTO> getCodeLocation(@PathVariable Long personId) {
        log.debug("REST request to get a page of ProductRateDifferences");
        IdCodeLocationDTO page = personService.getCodeLocation(personId);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }


    @PutMapping("/api/people/update")
    @Timed
    public ResponseEntity<PersonDTO> updateUserPerson(@Valid @RequestBody PersonDTO personDTO) throws URISyntaxException {
        log.debug("REST request to update User Person : {}", personDTO);
        if (personDTO.getId() == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new person cannot already have not an ID")).body(null);
        }
        PersonDTO result = personService.updateUserPerson(personDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personDTO.getId().toString()))
            .body(result);
    }

    @GetMapping("/api/people/person-group/{personGroup}")
    @Timed
    public ResponseEntity<List<PersonDTO>> getAllPeopleByPersonGroup(
        @RequestParam(required = false) String query,
        @PathVariable PersonGroup personGroup,
        @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of People");
        Page<PersonDTO> page = personService.findAllByPersonGroup(query,personGroup, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/cars");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping("/api/people/upload-file")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        personService.updateFromExcel(file);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateFromExcelAlert(ENTITY_NAME, file.getContentType())).build();
    }

    @GetMapping("/api/people/code/{code}")
    @Timed
    public ResponseEntity<PersonDTO> getPersonByCode(@PathVariable String code) {
        log.debug("REST request to get Person : {}, companyId {}", code);
        PersonDTO personDTO = personService.findByCode(code);
        return ResponseEntity.ok(personDTO);
    }
}
