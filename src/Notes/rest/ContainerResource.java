package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.service.ContainerService;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.BadRequestAlertException;
import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.PaginationUtil;
import ir.donyapardaz.niopdc.base.service.dto.ContainerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Container.
 */
@RestController
@RequestMapping("/api")
public class ContainerResource {

    private final Logger log = LoggerFactory.getLogger(ContainerResource.class);

    private static final String ENTITY_NAME = "container";

    private final ContainerService containerService;

    public ContainerResource(ContainerService containerService) {
        this.containerService = containerService;
    }

    /**
     * POST  /containers : Create a new container.
     *
     * @param containerDTO the containerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new containerDTO, or with status 400 (Bad Request) if the container has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/containers")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.CREATE_CONTAINER})
    public ResponseEntity<ContainerDTO> createContainer(@Valid @RequestBody ContainerDTO containerDTO) throws URISyntaxException {
        log.debug("REST request to save Container : {}", containerDTO);
        if (containerDTO.getId() != null) {
            throw new BadRequestAlertException("A new container cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContainerDTO result = containerService.save(containerDTO);
        return ResponseEntity.created(new URI("/api/containers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /containers : Updates an existing container.
     *
     * @param containerDTO the containerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated containerDTO,
     * or with status 400 (Bad Request) if the containerDTO is not valid,
     * or with status 500 (Internal Server Error) if the containerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/containers")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.EDIT_CONTAINER})
    public ResponseEntity<ContainerDTO> updateContainer(@Valid @RequestBody ContainerDTO containerDTO) throws URISyntaxException {
        log.debug("REST request to update Container : {}", containerDTO);
        if (containerDTO.getId() == null) {
            return createContainer(containerDTO);
        }
        ContainerDTO result = containerService.save(containerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, containerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /containers : get all the containers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of containers in body
     */
    @GetMapping("/containers")
    @Timed
    public ResponseEntity<List<ContainerDTO>> getAllContainers(Pageable pageable,@RequestParam(required = false) String query) {
        log.debug("REST request to get a page of Containers");
        Page<ContainerDTO> page = containerService.findAll(pageable,query);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/containers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /containers : get all the containers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of containers in body
     */
    @GetMapping("/containers/{containerId}/products")
    @Timed
    public ResponseEntity<List<ProductDTO>> getAllProducts(@PathVariable("containerId") Long containerId, @RequestParam(required = false) String query, @ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Containers");
        Page<ProductDTO> page = containerService.findAllProducts(containerId, query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/containers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /containers/:id : get the "id" container.
     *
     * @param id the id of the containerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the containerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/containers/{id}")
    @Timed
    public ResponseEntity<ContainerDTO> getContainer(@PathVariable Long id) {
        log.debug("REST request to get Container : {}", id);
        ContainerDTO containerDTO = containerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(containerDTO));
    }

    /**
     * DELETE  /containers/:id : delete the "id" container.
     *
     * @param id the id of the containerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/containers/{id}")
    @Timed
    @Secured({AuthoritiesConstants.ROLE_ADMIN,AuthoritiesConstants.DELETE_CONTAINER})
    public ResponseEntity<Void> deleteContainer(@PathVariable Long id) {
        log.debug("REST request to delete Container : {}", id);
        containerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
