package ir.donyapardaz.niopdc.base.domain.embeddableid;

import ir.donyapardaz.niopdc.base.domain.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.javers.core.metamodel.annotation.ShallowReference;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * A UserDataAccess.
 */
@Embeddable
public class UserLocationPersonId implements Serializable {

    private static final long serialVersionUID = 1L;


    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "username", length = 50, nullable = false)
    private String username;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person person;


    public String getUsername() {
        return username;
    }

    public UserLocationPersonId username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Location getLocation() {
        return location;
    }

    public UserLocationPersonId location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }


    public Person getPerson() {
        return person;
    }

    public UserLocationPersonId person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public UserLocationPersonId customer(Customer customer) {
        return this;
    }

    public UserLocationPersonId customerType(CustomerType customerType) {
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserLocationPersonId that = (UserLocationPersonId) o;

        if (!username.equals(that.username)) return false;
        if (!location.equals(that.location)) return false;
        return person.equals(that.person);
    }

    @Override
    public int hashCode() {
        int result = username.hashCode();
        result = 31 * result + location.hashCode();
        result = 31 * result + person.hashCode();
        return result;
    }
}
