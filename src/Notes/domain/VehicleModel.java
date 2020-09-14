package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;

/**
 * A VehicleModel.
 */
@Entity
@Table(name = "vehicle_model")
@Audited
public class VehicleModel extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "customer_group")
    private CustomerGroup customerGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Product product;


    @Column(name = "capacity")
    private Long capacity;

    @Column(name = "confirm")
    private Boolean confirm;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_model_type", nullable = false)
    private VehicleModelType vehicleModelType;

    @OneToMany(mappedBy = "vehicleModel", fetch = FetchType.EAGER)
    @JsonIgnore
    @ShallowReference
    private Set<VehicleCapacity> vehicleCapacities = new HashSet<>();

    public String getCapacityInfo() {
        String result = "";
        if (customerGroup == CustomerGroup.BOUNDARY) {
            if (product != null) {
                result += product.getTitle();
            }
            if (capacity != null) {
                result += capacity + " لیتر ";
            }
            return result;
        } else if (customerGroup == CustomerGroup.AIRPLANE) {
            Optional<VehicleCapacity> vehicleCapacity = vehicleCapacities.stream().findFirst();
            return vehicleCapacity.map(vehicleCapacity1 -> vehicleCapacity1.getCapacity() + " لیتر " + vehicleCapacity1.getProduct().getTitle()).orElse("");
        }
        return "";
    }

    public Product getProduct() {
        return product;
    }

    public VehicleModel setProduct(Product product) {
        this.product = product;
        return this;
    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public VehicleModel title(String title) {
        this.title = title;
        return this;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public VehicleModel customerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
        return this;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public VehicleModel vehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
        return this;
    }

    public Set<VehicleCapacity> getVehicleCapacities() {
        return vehicleCapacities;
    }

    public void setVehicleCapacities(Set<VehicleCapacity> vehicleCapacities) {
        this.vehicleCapacities = vehicleCapacities;
    }

    public VehicleModel vehicleCapacities(Set<VehicleCapacity> vehicleCapacities) {
        this.vehicleCapacities = vehicleCapacities;
        return this;
    }

    public VehicleModel addVehicleCapacity(VehicleCapacity vehicleCapacity) {
        this.vehicleCapacities.add(vehicleCapacity);
        vehicleCapacity.setVehicleModel(this);
        return this;
    }

    public VehicleModel removeVehicleCapacity(VehicleCapacity vehicleCapacity) {
        this.vehicleCapacities.remove(vehicleCapacity);
        vehicleCapacity.setVehicleModel(null);
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
        VehicleModel vehicleModel = (VehicleModel) o;
        if (vehicleModel.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleModel.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleModel{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", capacity='" + getCapacity() + "'" +
            ", customerGroup='" + getCustomerGroup() + "'" +
            ", vehicleModelType='" + getVehicleModelType() + "'" +
            "}";
    }


    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public VehicleModel setConfirm(Boolean confirm) {
        this.confirm = confirm;
        return this;
    }
}
