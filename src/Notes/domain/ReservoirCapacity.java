package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A ReservoirCapacity.
 */
@Entity
@Table(name = "reservoir_capacity")
@Audited
public class ReservoirCapacity extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "capacity", nullable = false)
    private Long capacity;

    @Column(name = "active")
    private Boolean active;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @NotNull
    @ShallowReference
    private Product product;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @NotNull
    @ShallowReference
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public ReservoirCapacity capacity(Long capacity) {
        this.capacity = capacity;
        return this;
    }

    public Boolean isActive() {
        return active;
    }

    public ReservoirCapacity active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public ReservoirCapacity product(Product product) {
        this.product = product;
        return this;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public ReservoirCapacity person(Person person) {
        this.person = person;
        return this;
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
        ReservoirCapacity reservoirCapacity = (ReservoirCapacity) o;
        if (reservoirCapacity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservoirCapacity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReservoirCapacity{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
