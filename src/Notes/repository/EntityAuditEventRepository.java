package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.EntityAuditEvent;
import ir.donyapardaz.niopdc.base.domain.EntityAuditEventUnset;
import ir.donyapardaz.niopdc.base.service.dto.EntityAuditEventDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;

/**
 * Spring Data JPA repository for the EntityAuditEvent entity.
 */
public interface EntityAuditEventRepository extends JpaRepository<EntityAuditEvent, Long> {

    List<EntityAuditEvent> findAllByEntityTypeAndEntityId(String entityType, Long entityId);

    @Query("SELECT max(a.commitVersion) FROM EntityAuditEvent a where a.entityType = :type and a.entityId = :entityId")
    Integer findMaxCommitVersion(@Param("type") String type, @Param("entityId") Long entityId);

    @Query("SELECT DISTINCT (a.entityType) from EntityAuditEvent a")
    List<String> findAllEntityTypes();

    @Query(
        "select entityAuditEvent from EntityAuditEvent entityAuditEvent " +
            "where " +
            "entityAuditEvent.entityType=:entityType and " +
            "entityAuditEvent.modifiedDate between :startTime and :endTime"
    )
    Page<EntityAuditEvent> findAllByEntityTypeAndModifiedDateBetween(@Param("entityType") String entityType,
                                                                     @Param("startTime") Instant startTime,
                                                                     @Param("endTime") Instant endTime,
                                                                     Pageable pageRequest);

  /*  @Query("SELECT ae FROM EntityAuditEvent ae where ae.entityType = :type and ae.entityId = :entityId and " +
        "ae.commitVersion =(SELECT max(a.commitVersion) FROM EntityAuditEvent a where a.entityType = :type and " +
        "a.entityId = :entityId and a.commitVersion < :commitVersion)")
    EntityAuditEvent findOneByEntityTypeAndEntityIdAndCommitVersion(@Param("type") String type, @Param("entityId")
        Long entityId, @Param("commitVersion") Integer commitVersion);*/

    @Query(
        nativeQuery = true,
        value = "select distinct jv_global_id.type_name from jv_global_id"
    )
    List<String> findAllEntityType();

    @Query(
        nativeQuery = true,
        value = "select top(:limit) " +
            "jv_snapshot.snapshot_pk as id, " +
            "jv_snapshot.type as action, " +
            "jv_snapshot.state as entityValue, " +
            "jv_snapshot.managed_type as entityType, " +
            "jv_global_id.local_id as entityId, " +
            "jv_snapshot.version as commitVersion, " +
            "jv_commit.commit_date as modifiedDate, " +
            "jv_commit.author as modifiedBy, " +
            "jv_commit_property.property_value as ip " +

            " from  jv_snapshot " +
            "inner join jv_global_id on jv_snapshot.global_id_fk = jv_global_id.global_id_pk  " +
            "inner join jv_commit on jv_snapshot.commit_fk = jv_commit.commit_pk  " +
            "left   join jv_commit_property on  jv_commit.commit_pk = jv_commit_property.commit_fk  " +
            "and jv_commit_property.property_name='ipAddress' "+
            "where jv_snapshot.managed_type=:entityType and " +
            "(:username is null or jv_commit.author=:username ) and " +
            "('-1' in (:actions)   or jv_snapshot.type in (:actions)) and " +
            "jv_commit.commit_date between :startTime and :endTime "

    )
    List<EntityAuditEventUnset> findAllByEntityType(@Param("entityType") String entityType,
                                                    @Param("username") String username,
                                                    @Param("startTime") Instant startTime,
                                                    @Param("endTime") Instant endTime,
                                                    @Param("limit") Long limit,
                                                    @Param("actions") List<String> actions);

    @Query(
        value = "select\n" +
            "  jv_snapshot.snapshot_pk as id,\n" +
            "  jv_snapshot.type as action,\n" +
            "  jv_snapshot.state as entity_value,\n" +
            "  jv_snapshot.managed_type as entity_type,\n" +
            "  jv_global_id.local_id as entity_id,\n" +
            "  jv_snapshot.version as commit_version,\n" +
            "  jv_commit.commit_date as modified_date,\n" +
            "  jv_commit.author as modified_by\n" +
            "from jv_snapshot\n" +
            "  inner join jv_global_id on jv_snapshot.global_id_fk = jv_global_id.global_id_pk\n" +
            "  inner join jv_commit on jv_snapshot.commit_fk = jv_commit.commit_pk\n" +
            "\n" +
            "where\n" +
            "\n" +
            "jv_snapshot.managed_type=:type\n" +
            "and\n" +
            "jv_global_id.local_id = :entityId\n" +
            "and\n" +
            "jv_snapshot.version=(select max(sn.version) from jv_snapshot sn\n" +
            "    where sn.managed_type=:type\n" +
            "    and\n" +
            "    jv_global_id.local_id=:entityId\n" +
            "    and\n" +
            "    sn.version<:commitVersion)",
        nativeQuery = true
    )
    EntityAuditEvent findOneByEntityTypeAndEntityIdAndCommitVersion(@Param("type") String type, @Param("entityId")
        Long entityId, @Param("commitVersion") Integer commitVersion);

}
