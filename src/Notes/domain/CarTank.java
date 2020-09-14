package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.TankType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CarTank.
 */
@Entity
@Table(name = "car_tank",uniqueConstraints = @UniqueConstraint(columnNames = {"customer_id", "tank_no"}))
@Audited
public class CarTank extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tank_no")
    private Short tankNo;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "latitude")
    private Double latitude;

    @NotNull
    @Column(name = "height", nullable = false)
    private Double height;

    @Column(name = "radius")
    private Double radius;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "tank_type", nullable = false)
    private TankType tankType;

    @ManyToOne(fetch = FetchType.LAZY)
    @DiffIgnore
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public CarTank longitude(Double longitude) {
        this.longitude = longitude;
        return this;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public CarTank latitude(Double latitude) {
        this.latitude = latitude;
        return this;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public CarTank height(Double height) {
        this.height = height;
        return this;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    public CarTank radius(Double radius) {
        this.radius = radius;
        return this;
    }

    public TankType getTankType() {
        return tankType;
    }

    public void setTankType(TankType tankType) {
        this.tankType = tankType;
    }

    public CarTank tankType(TankType tankType) {
        this.tankType = tankType;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public CarTank customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public Short getTankNo() {
        return tankNo;
    }

    public CarTank setTankNo(Short tankNo) {
        this.tankNo = tankNo;
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
        CarTank carTank = (CarTank) o;
        if (carTank.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carTank.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarTank{" +
            "id=" + getId() +
            ", longitude=" + getLongitude() +
            ", latitude=" + getLatitude() +
            ", height=" + getHeight() +
            ", radius=" + getRadius() +
            ", tankType='" + getTankType() + "'" +
            "}";
    }
}
