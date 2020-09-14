package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A SalesCode.
 */
@Entity
@Table(name = "sales_code")
@Audited
public class SalesCode extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "received_date")
    private ZonedDateTime receivedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public SalesCode code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ZonedDateTime getReceivedDate() {
        return receivedDate;
    }

    public SalesCode receivedDate(ZonedDateTime receivedDate) {
        this.receivedDate = receivedDate;
        return this;
    }

    public void setReceivedDate(ZonedDateTime receivedDate) {
        this.receivedDate = receivedDate;
    }

    public Person getPerson() {
        return person;
    }

    public SalesCode person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SalesCode salesCode = (SalesCode) o;
        if (salesCode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesCode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesCode{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", receivedDate='" + getReceivedDate() + "'" +
            "}";
    }
}
