package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.service.dto.EntityAuditEventDTO;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Mapper for the entity News and its DTO NewsDTO.
 */
@Mapper(componentModel = "spring")
public interface EntityAuditMapper {
    default List<EntityAuditEventDTO> toDto(List<CdoSnapshot> entityList) {
        return entityList.stream().map(this::toDto).collect(Collectors.toList());
    }

    default EntityAuditEventDTO toDto(CdoSnapshot cdoSnapshot) {
        EntityAuditEventDTO result = new EntityAuditEventDTO();
        if (cdoSnapshot == null)
            return null;
        result.setEntityType(cdoSnapshot.getGlobalId().getTypeName());
        result.setAction(cdoSnapshot.getType().toString());
        result.setCommitVersion(cdoSnapshot.getVersion());
        result.setModifiedDate(cdoSnapshot.getCommitMetadata().getCommitDateInstant());
        result.setModifiedBy(cdoSnapshot.getCommitMetadata().getAuthor());
        result.setIp(cdoSnapshot.getCommitMetadata().getProperties().get("ipAddress"));
        result.setEntityId(Long.valueOf(cdoSnapshot.getGlobalId().value().split("/")[1]));
        return result;
    }
}
