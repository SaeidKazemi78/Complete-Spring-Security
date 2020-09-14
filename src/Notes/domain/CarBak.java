package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CarBak.
 */
@Entity
@Table(name = "car_bak",schema = "dbo")
@Audited
public class CarBak extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "capacity")
    private Long capacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Product product;

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

    public CarBak capacity(Long capacity) {
        this.capacity = capacity;
        return this;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public CarBak car(Car car) {
        this.car = car;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public CarBak product(Product product) {
        this.product = product;
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
        CarBak carBak = (CarBak) o;
        if (carBak.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carBak.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarBak{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
