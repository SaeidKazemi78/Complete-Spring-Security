package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.EntityAuditEventReportService;
import ir.donyapardaz.niopdc.base.service.dto.EntityAuditEventDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.text.ParseException;
import java.time.Instant;
import java.util.List;

/**
 * REST controller for getting the audit events for entity
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EntityAuditReportResource {

    private final Logger log = LoggerFactory.getLogger(EntityAuditReportResource.class);
    private final EntityAuditEventReportService entityAuditEventReportService;

    public EntityAuditReportResource(EntityAuditEventReportService entityAuditEventReportService) {
        this.entityAuditEventReportService = entityAuditEventReportService;
    }
  /*  private final EntityAuditEventReportRepository entityAuditEventRepository;

    public EntityAuditReportResource(EntityAuditEventReportRepository entityAuditEventRepository) {
        this.entityAuditEventRepository = entityAuditEventRepository;
    }*/

    @RequestMapping(value = "/audits/entity/all",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<String> getAuditedEntities() {
        return entityAuditEventReportService.findAllEntityType();
    }

    /**
     * fetches the last 100 change list for an entity class, if limit is passed fetches that many changes
     *
     * @return
     */
    @RequestMapping(value = "/audits/entity/changes",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<EntityAuditEventDTO>> getChanges(@RequestParam(value = "entityType") String entityType,
                                                                @RequestParam(value = "limit") Long limit,
                                                                @RequestParam(value = "username", required = false) String username,
                                                                @RequestParam(value = "actions", required = false) String actions,
                                                                @RequestParam(value = "ip", required = false) String ip,
                                                                @RequestParam(value = "id", required = false) Long id,
                                                                @RequestParam(value = "service", required = true) String service,
                                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant startTime,
                                                                @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant endTime) throws ClassNotFoundException {
        List<EntityAuditEventDTO> page = entityAuditEventReportService.findAllSnapshot(entityType, username, ip, id, service, startTime, endTime, Math.toIntExact(limit), actions);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @RequestMapping(value = "/audits/entity/{entityId}/version/{version}",
        method = RequestMethod.GET)
    @Timed
    public EntityAuditEventDTO getDetail(@PathVariable String entityId,
                                         @PathVariable Long version,
                                         @RequestParam("entityType") String entityType

    ) throws ParseException {
        EntityAuditEventDTO changes = entityAuditEventReportService.findAllByEntityType(entityId, version, entityType);

        return changes;
    }


}
