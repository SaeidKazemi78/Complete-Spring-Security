package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A BoundaryDiscount.
 */
@Entity
@Table(name = "boundary_discount")
@Audited
public class BoundaryDiscount extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "liter", nullable = false)
    private Long liter;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "transit_hour_limit")
    private Long transitHourLimit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="location_id")
    private Location location ;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="country_id")
    private Country country ;



    @Enumerated(EnumType.STRING)
    @Column(name="vehicle_model_type")
    private VehicleModelType vehicleModelType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLiter() {
        return liter;
    }

    public void setLiter(Long liter) {
        this.liter = liter;
    }

    public BoundaryDiscount liter(Long liter) {
        this.liter = liter;
        return this;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
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
        BoundaryDiscount boundaryDiscount = (BoundaryDiscount) o;
        if (boundaryDiscount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), boundaryDiscount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BoundaryDiscount{" +
            "id=" + getId() +
            ", liter=" + getLiter() +
            "}";
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public Long getTransitHourLimit() {
        return transitHourLimit;
    }

    public void setTransitHourLimit(Long transitHourLimit) {
        this.transitHourLimit = transitHourLimit;
    }
}
