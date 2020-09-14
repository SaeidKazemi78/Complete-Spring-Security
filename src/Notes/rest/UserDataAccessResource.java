package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.UserDataAccessService;
import ir.donyapardaz.niopdc.base.service.dto.LocationDTO;
import ir.donyapardaz.niopdc.base.service.dto.LocationFullDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.UserDataAccessDTO;
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
 * REST controller for managing UserDataAccess.
 */
@RestController
@RequestMapping("/api")
public class UserDataAccessResource {

    private final Logger log = LoggerFactory.getLogger(UserDataAccessResource.class);

    private static final String ENTITY_NAME = "userDataAccess";

    private final UserDataAccessService userDataAccessService;

    public UserDataAccessResource(UserDataAccessService userDataAccessService) {
        this.userDataAccessService = userDataAccessService;
    }

    /**
     * POST  /user-data-accesses : Create a new userDataAccess.
     *
     * @param userDataAccessDTO the userDataAccessDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userDataAccessDTO, or with status 400 (Bad Request) if the userDataAccess has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-data-accesses")
    @Timed
    public ResponseEntity<UserDataAccessDTO> createUserDataAccess(@Valid @RequestBody UserDataAccessDTO userDataAccessDTO) throws URISyntaxException {
        log.debug("REST request to save UserDataAccess : {}", userDataAccessDTO);
        if (userDataAccessDTO.getId() != null) {
            throw new BadRequestAlertException("A new userDataAccess cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserDataAccessDTO result = userDataAccessService.save(userDataAccessDTO);
        return ResponseEntity.created(new URI("/api/user-data-accesses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-data-accesses : Updates an existing userDataAccess.
     *
     * @param userDataAccessDTO the userDataAccessDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userDataAccessDTO,
     * or with status 400 (Bad Request) if the userDataAccessDTO is not valid,
     * or with status 500 (Internal Server Error) if the userDataAccessDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-data-accesses")
    @Timed
    public ResponseEntity<UserDataAccessDTO> updateUserDataAccess(@Valid @RequestBody UserDataAccessDTO userDataAccessDTO) throws URISyntaxException {
        log.debug("REST request to update UserDataAccess : {}", userDataAccessDTO);
        if (userDataAccessDTO.getId() == null) {
            return createUserDataAccess(userDataAccessDTO);
        }
        UserDataAccessDTO result = userDataAccessService.save(userDataAccessDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userDataAccessDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-data-accesses : get all the userDataAccesses.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userDataAccesses in body
     */
    @GetMapping("users/{user}/user-data-accesses")
    @Timed
    public ResponseEntity<List<UserDataAccessDTO>> getAllUserDataAccesses(@PathVariable("user") String user, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of UserDataAccesses");
        Page<UserDataAccessDTO> page = userDataAccessService.findAll(user, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-data-accesses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("users/{user}/user-data-accesses/location")
    @Timed
    public ResponseEntity<List<LocationDTO>> findAllLocationForUserTree(@PathVariable("user") String user) {
        log.debug("REST request to get a page of UserDataAccesses");
        List<LocationDTO> locationDTOS= userDataAccessService.findAllLocationForUserTree(user);
        return new ResponseEntity<>(locationDTOS, HttpStatus.OK);
    }

    @PostMapping("users/user-data-accesses/location")
    @Timed
    public ResponseEntity<Void> saveLocations(@RequestParam("user") String user,@RequestParam("locationIds") List<Long> locationIds) {
        log.debug("REST request to get a page of UserDataAccesses");
        userDataAccessService.saveLocations(locationIds,user);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, user)).build();
    }

    /**
     * GET  /user-data-accesses/:id : get the "id" userDataAccess.
     *
     * @param id the id of the userDataAccessDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userDataAccessDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-data-accesses/{id}")
    @Timed
    public ResponseEntity<UserDataAccessDTO> getUserDataAccess(@PathVariable Long id) {
        log.debug("REST request to get UserDataAccess : {}", id);
        UserDataAccessDTO userDataAccessDTO = userDataAccessService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userDataAccessDTO));
    }

    /**
     * DELETE  /user-data-accesses/:id : delete the "id" userDataAccess.
     *
     * @param id the id of the userDataAccessDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-data-accesses/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserDataAccess(@PathVariable Long id) {
        log.debug("REST request to delete UserDataAccess : {}", id);
        userDataAccessService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
