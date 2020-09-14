package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
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
public class UserLocationPersonCustomerId implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getUsername() {
        return username;
    }

    public UserLocationPersonCustomerId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserLocationPersonCustomerId contractType(ContractType contractType) {
        return this;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationPersonCustomerId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public UserLocationPersonCustomerId region(Region region) {
        return this;
    }

    public Person getPerson() {
        return person;
    }

    public UserLocationPersonCustomerId person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Customer getCustomer() {
        return customer;
    }

    public UserLocationPersonCustomerId customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public UserLocationPersonCustomerId customerType(CustomerType customerType) {
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserLocationPersonCustomerId that = (UserLocationPersonCustomerId) o;

        if (!username.equals(that.username)) return false;
        if (!location.equals(that.location)) return false;
        if (!person.equals(that.person)) return false;
        return customer.equals(that.customer);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + person.hashCode();
        result = 31 * result + customer.hashCode();
        return result;
    }
}
