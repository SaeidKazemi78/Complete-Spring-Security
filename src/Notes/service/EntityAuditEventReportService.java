package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.service.dto.EntityAuditEventDTO;
import ir.donyapardaz.niopdc.base.service.mapper.EntityAuditMapper;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.javers.core.Changes;
import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.core.metamodel.object.SnapshotType;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EntityAuditEventReportService {

    private final Logger log = LoggerFactory.getLogger(EntityAuditEventReportService.class);
    private final Javers javers;
    private final EntityAuditMapper entityAuditMapper;

    public EntityAuditEventReportService(Javers javers, EntityAuditMapper entityAuditMapper) {
        this.javers = javers;
        this.entityAuditMapper = entityAuditMapper;
    }

    public EntityAuditEventDTO findAllByEntityType(String entityId, Long version, String entityType) throws ParseException {
        EntityAuditEventDTO s = new EntityAuditEventDTO();

        JqlQuery query = QueryBuilder.byInstanceId(entityId, entityType)
            .withVersion(version).build();
        Changes changes = this.javers.findChanges(query);
        String[] lineSplit = getChange(changes);

        StringBuilder result = new StringBuilder();
        for (String ss : lineSplit) {
            if (!ss.contains("lastModified") && !ss.contains("date") && !ss.contains("Date"))
                result.append(ss).append("\n");
        }

        s.setEntityType(entityType);
        s.setEntityValue(result.toString());
        return s;
    }

    private String[] getChange(Changes changes) throws ParseException {
        String plainText = changes.prettyPrint();

        String finalText = plainText.replace("Changes:", "تغییرات:");
        String[] lineSplit = finalText.split("\n");

        lineSplit[1] = lineSplit[1].replace("Commit", "انجام");
        lineSplit[1] = lineSplit[1].replace("done", "شده");
        lineSplit[1] = lineSplit[1].replace("by", "توسط");
        lineSplit[1] = lineSplit[1].replace("at", "در زمان");


        String[] lineOne = lineSplit[1].split(" ");
        String username = lineOne[4];
        String day = lineOne[7];
        String month = lineOne[8];
        String year = lineOne[9].substring(0, 4);
        String time = lineOne[10];

        DateFormat fmt = new SimpleDateFormat("yyyy-MMMM-dd hh:mm:ss");
        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(fmt.parse(year + "-" + month + "-" + day + " " + time).toInstant(), ZoneId.systemDefault());
        YearMonthDay yearMonthDay = DateUtil.convertToPersian(zonedDateTime);
        yearMonthDay.setHour(String.valueOf(zonedDateTime.getHour()));
        yearMonthDay.setMin(String.valueOf(zonedDateTime.getMinute()));
        yearMonthDay.setSec(String.valueOf(zonedDateTime.getSecond()));
        lineSplit[1] = "انجام شده توسط " + username + " در زمان (" + yearMonthDay + ")";

        for (int i = 3; i < lineSplit.length; i++) {
            String line = lineSplit[i].replace("value changed from", "-> از ");
            line = line.replace("to", "به");
            line = line + " تغییر پیدا کرد.";
            lineSplit[i] = line;
        }
        lineSplit[2] = "";
        return lineSplit;
    }

    public List<EntityAuditEventDTO> findAllSnapshot(String entityType, String username, String ip, Long id, String service, Instant startTime, Instant endTime, Integer limit, String actions) throws ClassNotFoundException {
        service = "niopdcbase";
        Class c = Class.forName(entityType);
        QueryBuilder q;
        if (id == null) {
            q = QueryBuilder.byClass(c).from(LocalDateTime.ofInstant(startTime, ZoneId.systemDefault()))
                .to(LocalDateTime.ofInstant(endTime, ZoneId.systemDefault())).limit(limit);
        } else {
            q = QueryBuilder.byInstanceId(id, c).from(LocalDateTime.ofInstant(startTime, ZoneId.systemDefault()))
                .to(LocalDateTime.ofInstant(endTime, ZoneId.systemDefault())).limit(limit);
        }

        if (username != null)
            q = q.byAuthor(username);
        if (actions != null)
            q = q.withSnapshotType(SnapshotType.valueOf(actions));

        if (ip != null)
            q = q.withCommitProperty("ipAddress", ip);

        q = q.withCommitProperty("microservice", service);

        List<CdoSnapshot> snapshots = javers.findSnapshots(q.build());
        List<EntityAuditEventDTO> entityAuditEventDTOS = entityAuditMapper.toDto(snapshots);
        return entityAuditEventDTOS;
    }

    public List<String> findAllEntityType() {
        JqlQuery query = QueryBuilder.anyDomainObject()
            .withCommitProperty("microservice", "niopdcbase")
            .build();
        List<CdoSnapshot> snapshots = this.javers.findSnapshots(query);
        return snapshots.stream().map(cdoSnapshot -> cdoSnapshot.getGlobalId().getTypeName()).distinct().collect(Collectors.toList());

    }
}
