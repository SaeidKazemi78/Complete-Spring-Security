package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.service.UserConfigService;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.UserConfigDTO;
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
 * REST controller for managing UserConfig.
 */
@RestController
@RequestMapping("/api")
public class UserConfigResource {

    private final Logger log = LoggerFactory.getLogger(UserConfigResource.class);

    private static final String ENTITY_NAME = "userConfig";

    private final UserConfigService userConfigService;

    public UserConfigResource(UserConfigService userConfigService) {
        this.userConfigService = userConfigService;
    }

    /**
     * POST  /user-configs : Create a new userConfig.
     *
     * @param userConfigDTO the userConfigDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userConfigDTO, or with status 400 (Bad Request) if the userConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-configs")
    @Timed
    public ResponseEntity<UserConfigDTO> createUserConfig(@Valid @RequestBody UserConfigDTO userConfigDTO) throws URISyntaxException {
        log.debug("REST request to save UserConfig : {}", userConfigDTO);
        if (userConfigDTO.getId() != null) {
            throw new BadRequestAlertException("A new userConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserConfigDTO result = userConfigService.save(userConfigDTO);
        return ResponseEntity.created(new URI("/api/user-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-configs : Updates an existing userConfig.
     *
     * @param userConfigDTO the userConfigDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userConfigDTO,
     * or with status 400 (Bad Request) if the userConfigDTO is not valid,
     * or with status 500 (Internal Server Error) if the userConfigDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-configs")
    @Timed
    public ResponseEntity<UserConfigDTO> updateUserConfig(@Valid @RequestBody UserConfigDTO userConfigDTO) throws URISyntaxException {
        log.debug("REST request to update UserConfig : {}", userConfigDTO);
        if (userConfigDTO.getId() == null) {
            return createUserConfig(userConfigDTO);
        }
        UserConfigDTO result = userConfigService.save(userConfigDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userConfigDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-configs : get all the userConfigs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userConfigs in body
     */
    @GetMapping("/user-configs")
    @Timed
    public ResponseEntity<List<UserConfigDTO>> getAllUserConfigs(@RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of UserConfigs");
        Page<UserConfigDTO> page = userConfigService.findAll(query,pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-configs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-configs/:id : get the "id" userConfig.
     *
     * @param id the id of the userConfigDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userConfigDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-configs/{id}")
    @Timed
    public ResponseEntity<UserConfigDTO> getUserConfig(@PathVariable Long id) {
        log.debug("REST request to get UserConfig : {}", id);
        UserConfigDTO userConfigDTO = userConfigService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userConfigDTO));
    }

    /**
     * DELETE  /user-configs/:id : delete the "id" userConfig.
     *
     * @param id the id of the userConfigDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-configs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserConfig(@PathVariable Long id) {
        log.debug("REST request to delete UserConfig : {}", id);
        userConfigService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
