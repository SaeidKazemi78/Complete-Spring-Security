package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.CustomAuditable;
import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Region;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationRegionCustomerTypeId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;

    @ManyToOne(fetch = FetchType.LAZY)
    private CustomerType customerType;

    public String getUsername() {
        return username;
    }

    public UserLocationRegionCustomerTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationRegionCustomerTypeId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Region getRegion() {
        return region;
    }

    public UserLocationRegionCustomerTypeId region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public UserLocationRegionCustomerTypeId customerType(CustomerType customerType) {
        this.customerType = customerType;
        return this;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserLocationRegionCustomerTypeId that = (UserLocationRegionCustomerTypeId) o;

        if (!username.equals(that.username)) return false;
        if (!location.equals(that.location)) return false;
        if (!region.equals(that.region)) return false;
        return customerType.equals(that.customerType);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + region.hashCode();
        result = 31 * result + customerType.hashCode();
        return result;
    }
}
