package ir.donyapardaz.niopdc.base.domain;

import java.io.Serializable;
import java.time.Instant;

public interface EntityAuditEventUnset extends Serializable {

    public Long getId();

    public Long getEntityId();

    public String getEntityType() ;
    public String getAction();

    public String getEntityValue() ;

    public Long getCommitVersion() ;

    public String getModifiedBy() ;

    public Instant getModifiedDate() ;

    public String getIp() ;
}
