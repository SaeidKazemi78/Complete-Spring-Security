package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.enumeration.StationType;
import org.hibernate.envers.Audited;

/**
 * A CustomerStationInfo.
 */
@Entity
@Table(name = "customer_station_info")
@Audited
public class CustomerStationInfo extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "station_type")
    private StationType stationType;

    @Column(name = "has_dispatching")
    private Boolean hasDispatching;

    @Column(name = "has_kahab")
    private Boolean hasKahab;

    @Column(name = "has_canopy")
    private Boolean hasCanopy;

    @Column(name = "has_body_pump")
    private Boolean hasBodyPump;

    @Column(name = "has_work_clothes")
    private Boolean hasWorkClothes;

    @Column(name = "has_columns")
    private Boolean hasColumns;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id", unique = true)
    private Customer customer;

    @OneToMany(mappedBy = "customerStationInfo", cascade = CascadeType.ALL)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<NozzleProductCount> nozzleProductCounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StationType getStationType() {
        return stationType;
    }

    public CustomerStationInfo stationType(StationType stationType) {
        this.stationType = stationType;
        return this;
    }

    public void setStationType(StationType stationType) {
        this.stationType = stationType;
    }

    public Boolean isHasDispatching() {
        return hasDispatching;
    }

    public CustomerStationInfo hasDispatching(Boolean hasDispatching) {
        this.hasDispatching = hasDispatching;
        return this;
    }

    public void setHasDispatching(Boolean hasDispatching) {
        this.hasDispatching = hasDispatching;
    }

    public Boolean isHasKahab() {
        return hasKahab;
    }

    public CustomerStationInfo hasKahab(Boolean hasKahab) {
        this.hasKahab = hasKahab;
        return this;
    }

    public void setHasKahab(Boolean hasKahab) {
        this.hasKahab = hasKahab;
    }

    public Boolean isHasCanopy() {
        return hasCanopy;
    }

    public CustomerStationInfo hasCanopy(Boolean hasCanopy) {
        this.hasCanopy = hasCanopy;
        return this;
    }

    public void setHasCanopy(Boolean hasCanopy) {
        this.hasCanopy = hasCanopy;
    }

    public Boolean isHasBodyPump() {
        return hasBodyPump;
    }

    public CustomerStationInfo hasBodyPump(Boolean hasBodyPump) {
        this.hasBodyPump = hasBodyPump;
        return this;
    }

    public void setHasBodyPump(Boolean hasBodyPump) {
        this.hasBodyPump = hasBodyPump;
    }

    public Boolean isHasWorkClothes() {
        return hasWorkClothes;
    }

    public CustomerStationInfo hasWorkClothes(Boolean hasWorkClothes) {
        this.hasWorkClothes = hasWorkClothes;
        return this;
    }

    public void setHasWorkClothes(Boolean hasWorkClothes) {
        this.hasWorkClothes = hasWorkClothes;
    }

    public Boolean isHasColumns() {
        return hasColumns;
    }

    public CustomerStationInfo hasColumns(Boolean hasColumns) {
        this.hasColumns = hasColumns;
        return this;
    }

    public void setHasColumns(Boolean hasColumns) {
        this.hasColumns = hasColumns;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerStationInfo customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Set<NozzleProductCount> getNozzleProductCounts() {
        return nozzleProductCounts;
    }

    public CustomerStationInfo nozzleProductCounts(Set<NozzleProductCount> nozzleProductCounts) {
        this.nozzleProductCounts = nozzleProductCounts;
        return this;
    }

    public CustomerStationInfo addNozzleProductCounts(NozzleProductCount nozzleProductCount) {
        this.nozzleProductCounts.add(nozzleProductCount);
        nozzleProductCount.setCustomerStationInfo(this);
        return this;
    }

    public CustomerStationInfo removeNozzleProductCounts(NozzleProductCount nozzleProductCount) {
        this.nozzleProductCounts.remove(nozzleProductCount);
        nozzleProductCount.setCustomerStationInfo(null);
        return this;
    }

    public void setNozzleProductCounts(Set<NozzleProductCount> nozzleProductCounts) {
        this.nozzleProductCounts = nozzleProductCounts;
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
        CustomerStationInfo customerStationInfo = (CustomerStationInfo) o;
        if (customerStationInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerStationInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerStationInfo{" +
            "id=" + getId() +
            ", stationType='" + getStationType() + "'" +
            ", hasDispatching='" + isHasDispatching() + "'" +
            ", hasKahab='" + isHasKahab() + "'" +
            ", hasCanopy='" + isHasCanopy() + "'" +
            ", hasBodyPump='" + isHasBodyPump() + "'" +
            ", hasWorkClothes='" + isHasWorkClothes() + "'" +
            ", hasColumns='" + isHasColumns() + "'" +
            "}";
    }
}
