package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.CustomAuditable;
import ir.donyapardaz.niopdc.base.domain.Location;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.DiffInclude;
import org.javers.core.metamodel.annotation.Id;
import org.javers.core.metamodel.annotation.ShallowReference;
import org.javers.core.metamodel.annotation.ValueObject;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    public String getUsername() {
        return username;
    }

    public UserLocationId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserLocationId that = (UserLocationId) o;

        if (!username.equals(that.username)) return false;
        return location.equals(that.location);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + location.hashCode();
        return result;
    }

}
