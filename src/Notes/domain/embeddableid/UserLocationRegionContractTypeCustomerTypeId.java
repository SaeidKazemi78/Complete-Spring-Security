package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationRegionContractTypeCustomerTypeId implements Serializable {

    private static final long serialVersionUID = 1L;


    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type")
    private ContractType contractType;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;

    @ManyToOne(fetch = FetchType.LAZY)
    private CustomerType customerType;

    public String getUsername() {
        return username;
    }

    public UserLocationRegionContractTypeCustomerTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public UserLocationRegionContractTypeCustomerTypeId contractType(ContractType contractType) {
        this.contractType = contractType;
        return this;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationRegionContractTypeCustomerTypeId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Region getRegion() {
        return region;
    }

    public UserLocationRegionContractTypeCustomerTypeId region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public UserLocationRegionContractTypeCustomerTypeId customerType(CustomerType customerType) {
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

        UserLocationRegionContractTypeCustomerTypeId that = (UserLocationRegionContractTypeCustomerTypeId) o;

        if (!username.equals(that.username)) return false;
        if (contractType != that.contractType) return false;
        if (!location.equals(that.location)) return false;
        if (!region.equals(that.region)) return false;
        return customerType.equals(that.customerType);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + contractType.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + region.hashCode();
        result = 31 * result + customerType.hashCode();
        return result;
    }
}
