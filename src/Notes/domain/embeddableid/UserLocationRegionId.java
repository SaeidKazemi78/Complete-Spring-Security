package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.CustomAuditable;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Region;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationRegionId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;


    public String getUsername() {
        return username;
    }

    public UserLocationRegionId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationRegionId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Region getRegion() {
        return region;
    }

    public UserLocationRegionId region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserLocationRegionId that = (UserLocationRegionId) o;

        if (!username.equals(that.username)) return false;
        if (!location.equals(that.location)) return false;
        return region.equals(that.region);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + region.hashCode();
        return result;
    }
}
