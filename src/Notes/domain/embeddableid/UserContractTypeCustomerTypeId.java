package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserContractTypeCustomerTypeId implements Serializable {

    private static final long serialVersionUID = 1L;


    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type")
    private ContractType contractType;

    @ManyToOne(fetch = FetchType.LAZY)
    private CustomerType customerType;

    public String getUsername() {
        return username;
    }

    public UserContractTypeCustomerTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public UserContractTypeCustomerTypeId contractType(ContractType contractType) {
        this.contractType = contractType;
        return this;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public UserContractTypeCustomerTypeId customerType(CustomerType customerType) {
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

        UserContractTypeCustomerTypeId that = (UserContractTypeCustomerTypeId) o;

        if (!username.equals(that.username)) return false;
        if (contractType != that.contractType) return false;
        return customerType.equals(that.customerType);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + contractType.hashCode();
        result = 31 * result + customerType.hashCode();
        return result;
    }
}
