package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserCustomerTypeId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    private CustomerType customerType;


    public String getUsername() {
        return username;
    }

    public UserCustomerTypeId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public UserCustomerTypeId customerType(CustomerType customerType) {
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

        UserCustomerTypeId that = (UserCustomerTypeId) o;

        if (!username.equals(that.username)) return false;
        return customerType.equals(that.customerType);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + customerType.hashCode();
        return result;
    }
}
