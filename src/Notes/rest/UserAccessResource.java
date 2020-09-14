package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.UserAccessService;
import ir.donyapardaz.niopdc.base.service.dto.UserAccessDTO;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

/**
 * REST controller for managing UserLocationId.
 */
@RestController
@RequestMapping("/api")
public class UserAccessResource {

    private final Logger log = LoggerFactory.getLogger(UserAccessResource.class);

    private static final String ENTITY_NAME = "userLocation";

    private final UserAccessService userAccessService;

    public UserAccessResource(UserAccessService userAccessService) {
        this.userAccessService = userAccessService;
    }


    @PostMapping("/user-accesses")
    @Timed
    public ResponseEntity<UserAccessDTO> createUserLocation(@Valid @RequestBody UserAccessDTO userAccessDTO) throws URISyntaxException {
        log.debug("REST request to save UserAccess : {}", userAccessDTO);

        UserAccessDTO result = userAccessService.save(userAccessDTO);
        return ResponseEntity.created(new URI("/api/user-locations/"))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getUserDTO().getLogin()))
            .body(result);
    }


    @PutMapping("/user-accesses")
    @Timed
    public ResponseEntity<UserAccessDTO> updateUserLocation(@Valid @RequestBody UserAccessDTO userAccessDTO) throws URISyntaxException {
        log.debug("REST request to update  userAccessDTO: {}", userAccessDTO);
        UserAccessDTO result = userAccessService.update(userAccessDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userAccessDTO.getUserDTO().getLogin()))
            .body(result);
    }
}
