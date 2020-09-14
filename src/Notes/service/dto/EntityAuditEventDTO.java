package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.EntityAuditEventUnset;

import java.io.Serializable;
import java.time.Instant;

public class EntityAuditEventDTO   {


    private Long id;

    private Long entityId;

    private String entityType;

    private String action;

    private String entityValue;

    private Long commitVersion;

    private String modifiedBy;

    private Instant modifiedDate;

    private String ip;

    public EntityAuditEventDTO() {
    }

    public EntityAuditEventDTO(Long id, Long entityId, String entityType, String action, String entityValue,
                               Long commitVersion, String modifiedBy, Instant modifiedDate, String ip) {
        this.id = id;
        this.entityId = entityId;
        this.entityType = entityType;
        this.action = action;
        this.entityValue = entityValue;
        this.commitVersion = commitVersion;
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
        this.ip = ip;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEntityId() {
        return entityId;
    }

    public void setEntityId(Long entityId) {
        this.entityId = entityId;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityValue() {
        return entityValue;
    }

    public void setEntityValue(String entityValue) {
        this.entityValue = entityValue;
    }

    public Long getCommitVersion() {
        return commitVersion;
    }

    public void setCommitVersion(Long commitVersion) {
        this.commitVersion = commitVersion;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Instant getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Instant modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }


    public static EntityAuditEventDTO fromEntityAuditEventUnset(EntityAuditEventUnset eventUnset){
        return new EntityAuditEventDTO(eventUnset.getId(),eventUnset.getEntityId(),eventUnset.getEntityType()
            ,eventUnset.getAction(),eventUnset.getEntityValue(),eventUnset.getCommitVersion(),eventUnset.getModifiedBy(),
            eventUnset.getModifiedDate(),eventUnset.getIp());
    }

}
