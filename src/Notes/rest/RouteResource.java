package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.web.util.ResponseUtil;
import ir.donyapardaz.niopdc.base.service.RouteService;
import ir.donyapardaz.niopdc.base.service.dto.RouteDTO;
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
 * REST controller for managing Route.
 */
@RestController
@RequestMapping("/api")
public class RouteResource {

    private static final String ENTITY_NAME = "route";
    private final Logger log = LoggerFactory.getLogger(RouteResource.class);
    private final RouteService routeService;

    public RouteResource(RouteService routeService) {
        this.routeService = routeService;
    }

    /**
     * POST  /routes : Create a new route.
     *
     * @param routeDTO the routeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new routeDTO, or with status 400 (Bad Request) if the route has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/routes")
    @Timed
    public ResponseEntity<RouteDTO> createRoute(@RequestBody RouteDTO routeDTO) throws URISyntaxException {
        log.debug("REST request to save Route : {}", routeDTO);
        if (routeDTO.getId() != null) {
            throw new BadRequestAlertException("A new route cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RouteDTO result = routeService.save(routeDTO);
        return ResponseEntity.created(new URI("/api/routes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /routes : Updates an existing route.
     *
     * @param routeDTO the routeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated routeDTO,
     * or with status 400 (Bad Request) if the routeDTO is not valid,
     * or with status 500 (Internal Server Error) if the routeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/routes")
    @Timed
    public ResponseEntity<RouteDTO> updateRoute(@RequestBody RouteDTO routeDTO) throws URISyntaxException {
        log.debug("REST request to update Route : {}", routeDTO);
        if (routeDTO.getId() == null) {
            return createRoute(routeDTO);
        }
        RouteDTO result = routeService.save(routeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, routeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /routes : get all the routes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of routes in body
     */
    @GetMapping("/routes")
    @Timed
    public ResponseEntity<List<RouteDTO>> getAllRoutes(Pageable pageable) {
        log.debug("REST request to get a page of Routes");
        Page<RouteDTO> page = routeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/routes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /routes/:id : get the "id" route.
     *
     * @param id the id of the routeDTO to retrieve
     * @ret30/04/1398 10:55:45 قurn the ResponseEntity with status 200 (OK) and with body the routeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/routes/{id}")
    @Timed
    public ResponseEntity<RouteDTO> getRoute(@PathVariable Long id) {
        log.debug("REST request to get Route : {}", id);
        RouteDTO routeDTO = routeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(routeDTO));
    }

    /**
     * DELETE  /routes/:id : delete the "id" route.
     *
     * @param id the id of the routeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/routes/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        log.debug("REST request to delete Route : {}", id);
        routeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/routes/source-depot/{sourceCode}/target-depot/{targetCode}")
    @Timed
    public ResponseEntity<RouteDTO> getRouteBySourceAndTargetDepotCode(@PathVariable String sourceCode, @PathVariable String targetCode) {
        log.debug("REST request to get Route : {}", sourceCode);
        RouteDTO routeDTO = routeService.findOneBySourceAndTargetDepotCode(sourceCode,targetCode);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(routeDTO));
    }


    @PostMapping("/routes/upload-file")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        routeService.updateFromExcel(file);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateFromExcelAlert(ENTITY_NAME, file.getContentType())).build();
    }
}
