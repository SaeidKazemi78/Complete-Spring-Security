package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.javers.core.metamodel.annotation.ShallowReference;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationRegionContractTypeId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type")
    private ContractType contractType;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region region;

    public String getUsername() {
        return username;
    }

    public UserLocationRegionContractTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public UserLocationRegionContractTypeId contractType(ContractType contractType) {
        this.contractType = contractType;
        return this;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationRegionContractTypeId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Region getRegion() {
        return region;
    }

    public UserLocationRegionContractTypeId region(Region region) {
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

        UserLocationRegionContractTypeId that = (UserLocationRegionContractTypeId) o;

        if (!username.equals(that.username)) return false;
        if (contractType != that.contractType) return false;
        if (!location.equals(that.location)) return false;
        return region.equals(that.region);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + contractType.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + region.hashCode();
        return result;
    }
}
