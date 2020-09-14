package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.enumeration.NozzleProductType;
import org.hibernate.envers.Audited;

/**
 * A NozzleProductCount.
 */
@Entity
@Table(name = "nozzle_product_count")
@Audited
public class NozzleProductCount extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nozzle_product_type")
    private NozzleProductType nozzleProductType;

    @Column(name = "nozzle_count")
    private Integer nozzleCount;

    @ManyToOne(fetch = FetchType.LAZY)
    private CustomerStationInfo customerStationInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NozzleProductType getNozzleProductType() {
        return nozzleProductType;
    }

    public NozzleProductCount nozzleProductType(NozzleProductType nozzleProductType) {
        this.nozzleProductType = nozzleProductType;
        return this;
    }

    public void setNozzleProductType(NozzleProductType nozzleProductType) {
        this.nozzleProductType = nozzleProductType;
    }

    public Integer getNozzleCount() {
        return nozzleCount;
    }

    public NozzleProductCount nozzleCount(Integer nozzleCount) {
        this.nozzleCount = nozzleCount;
        return this;
    }

    public void setNozzleCount(Integer nozzleCount) {
        this.nozzleCount = nozzleCount;
    }

    public CustomerStationInfo getCustomerStationInfo() {
        return customerStationInfo;
    }

    public NozzleProductCount customerStationInfo(CustomerStationInfo customerStationInfo) {
        this.customerStationInfo = customerStationInfo;
        return this;
    }

    public void setCustomerStationInfo(CustomerStationInfo customerStationInfo) {
        this.customerStationInfo = customerStationInfo;
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
        NozzleProductCount nozzleProductCount = (NozzleProductCount) o;
        if (nozzleProductCount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nozzleProductCount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NozzleProductCount{" +
            "id=" + getId() +
            ", nozzleProductType='" + getNozzleProductType() + "'" +
            ", nozzleCount=" + getNozzleCount() +
            "}";
    }
}
