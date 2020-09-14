package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.DatabaseConfiguration;
import ir.donyapardaz.niopdc.base.config.Profiles;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A Customer.
 */
@Entity
@Table(catalog = "niopdcrate_" + Profiles.activeProfile,schema = "dbo",name = "container_rate")
//@Table(catalog = "niopdcrate_demo",schema = "dbo",name = "container_rate")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ContainerRate implements Serializable {
    @Id
    private Long id;
    private Long containerId;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getContainerId() {
        return containerId;
    }

    public void setContainerId(Long containerId) {
        this.containerId = containerId;
    }
}
