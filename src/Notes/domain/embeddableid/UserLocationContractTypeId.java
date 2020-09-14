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
public class UserLocationContractTypeId implements Serializable {

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

    public String getUsername() {
        return username;
    }

    public UserLocationContractTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public UserLocationContractTypeId contractType(ContractType contractType) {
        this.contractType = contractType;
        return this;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationContractTypeId location(Location location) {
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

        UserLocationContractTypeId that = (UserLocationContractTypeId) o;

        if (!username.equals(that.username)) return false;
        if (contractType != that.contractType) return false;
        return location.equals(that.location);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + contractType.hashCode();
        result = 31 * result + location.hashCode();
        return result;
    }
}
