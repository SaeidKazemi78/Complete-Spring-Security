package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A VehicleCapacity.
 */
@Entity
@Table(name = "vehicle_capacity")
@Audited
public class VehicleCapacity extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ShallowReference
    @Column(name = "capacity", nullable = false)
    private Long capacity;

    @ManyToOne(fetch = FetchType.LAZY)
    private VehicleModel vehicleModel;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @NotNull
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

    public VehicleCapacity capacity(Long capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public VehicleModel getVehicleModel() {
        return vehicleModel;
    }

    public VehicleCapacity vehicleModel(VehicleModel vehicleModel) {
        this.vehicleModel = vehicleModel;
        return this;
    }

    public void setVehicleModel(VehicleModel vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public Product getProduct() {
        return product;
    }

    public VehicleCapacity product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
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
        VehicleCapacity vehicleCapacity = (VehicleCapacity) o;
        if (vehicleCapacity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleCapacity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleCapacity{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
