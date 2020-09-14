package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.enumeration.RouteType;
import org.hibernate.envers.Audited;

/**
 * A Route.
 */
@Entity
@Table(name = "route")
@Audited
public class Route extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "source_code")
    private String sourceCode;

    @Column(name = "source_tada_code")
    private String sourceTadaCode;

    @Column(name = "source_name")
    private String sourceName;

    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "dest_code")
    private String destCode;

    @Column(name = "dest_op_code")
    private String destOpCode;

    @Column(name = "dest_name")
    private String destName;

    @Column(name = "old_code")
    private String oldCode;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "customer_status")
    private Long customerStatus;

    @Column(name = "haml_type")
    private Boolean hamlType;

    @Column(name = "customer_type")
    private Long customerType;

    @Column(name = "rate")
    private Long rate;

    @Column(name = "distance_km")
    private Long distanceKm;

    @Column(name = "description")
    private String description;

    @Column(name = "execute_date")
    private ZonedDateTime executeDate;

    @Column(name = "ta_code")
    private String taCode;

    @Column(name = "code")
    private String code;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "address")
    private String address;

    @Column(name = "via")
    private Long via;

    @Column(name = "caption")
    private String caption;

    @Enumerated(EnumType.STRING)
    @Column(name = "route_type")
    private RouteType routeType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public Route sourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
        return this;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public String getSourceTadaCode() {
        return sourceTadaCode;
    }

    public Route sourceTadaCode(String sourceTadaCode) {
        this.sourceTadaCode = sourceTadaCode;
        return this;
    }

    public void setSourceTadaCode(String sourceTadaCode) {
        this.sourceTadaCode = sourceTadaCode;
    }

    public String getSourceName() {
        return sourceName;
    }

    public Route sourceName(String sourceName) {
        this.sourceName = sourceName;
        return this;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public Route customerCode(String customerCode) {
        this.customerCode = customerCode;
        return this;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getDestCode() {
        return destCode;
    }

    public Route destCode(String destCode) {
        this.destCode = destCode;
        return this;
    }

    public void setDestCode(String destCode) {
        this.destCode = destCode;
    }

    public String getDestOpCode() {
        return destOpCode;
    }

    public Route destOpCode(String destOpCode) {
        this.destOpCode = destOpCode;
        return this;
    }

    public void setDestOpCode(String destOpCode) {
        this.destOpCode = destOpCode;
    }

    public String getDestName() {
        return destName;
    }

    public Route destName(String destName) {
        this.destName = destName;
        return this;
    }

    public void setDestName(String destName) {
        this.destName = destName;
    }

    public String getOldCode() {
        return oldCode;
    }

    public Route oldCode(String oldCode) {
        this.oldCode = oldCode;
        return this;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public Route isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Long getCustomerStatus() {
        return customerStatus;
    }

    public Route customerStatus(Long customerStatus) {
        this.customerStatus = customerStatus;
        return this;
    }

    public void setCustomerStatus(Long customerStatus) {
        this.customerStatus = customerStatus;
    }

    public Boolean isHamlType() {
        return hamlType;
    }

    public Route hamlType(Boolean hamlType) {
        this.hamlType = hamlType;
        return this;
    }

    public void setHamlType(Boolean hamlType) {
        this.hamlType = hamlType;
    }

    public Long getCustomerType() {
        return customerType;
    }

    public Route customerType(Long customerType) {
        this.customerType = customerType;
        return this;
    }

    public void setCustomerType(Long customerType) {
        this.customerType = customerType;
    }

    public Long getRate() {
        return rate;
    }

    public Route rate(Long rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public Long getDistanceKm() {
        return distanceKm;
    }

    public Route distanceKm(Long distanceKm) {
        this.distanceKm = distanceKm;
        return this;
    }

    public void setDistanceKm(Long distanceKm) {
        this.distanceKm = distanceKm;
    }

    public String getDescription() {
        return description;
    }

    public Route description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getExecuteDate() {
        return executeDate;
    }

    public Route executeDate(ZonedDateTime executeDate) {
        this.executeDate = executeDate;
        return this;
    }

    public void setExecuteDate(ZonedDateTime executeDate) {
        this.executeDate = executeDate;
    }

    public String getTaCode() {
        return taCode;
    }

    public Route taCode(String taCode) {
        this.taCode = taCode;
        return this;
    }

    public void setTaCode(String taCode) {
        this.taCode = taCode;
    }

    public String getCode() {
        return code;
    }

    public Route code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Route customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public Route address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getVia() {
        return via;
    }

    public Route via(Long via) {
        this.via = via;
        return this;
    }

    public void setVia(Long via) {
        this.via = via;
    }

    public String getCaption() {
        return caption;
    }

    public Route caption(String caption) {
        this.caption = caption;
        return this;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public RouteType getRouteType() {
        return routeType;
    }

    public Route routeType(RouteType routeType) {
        this.routeType = routeType;
        return this;
    }

    public void setRouteType(RouteType routeType) {
        this.routeType = routeType;
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
        Route route = (Route) o;
        if (route.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), route.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Route{" +
            "id=" + getId() +
            ", sourceCode='" + getSourceCode() + "'" +
            ", sourceTadaCode='" + getSourceTadaCode() + "'" +
            ", sourceName='" + getSourceName() + "'" +
            ", customerCode='" + getCustomerCode() + "'" +
            ", destCode='" + getDestCode() + "'" +
            ", destOpCode='" + getDestOpCode() + "'" +
            ", destName='" + getDestName() + "'" +
            ", oldCode='" + getOldCode() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", customerStatus=" + getCustomerStatus() +
            ", hamlType='" + isHamlType() + "'" +
            ", customerType=" + getCustomerType() +
            ", rate=" + getRate() +
            ", distanceKm=" + getDistanceKm() +
            ", description='" + getDescription() + "'" +
            ", executeDate='" + getExecuteDate() + "'" +
            ", taCode='" + getTaCode() + "'" +
            ", code='" + getCode() + "'" +
            ", customerName='" + getCustomerName() + "'" +
            ", address='" + getAddress() + "'" +
            ", via=" + getVia() +
            ", caption='" + getCaption() + "'" +
            ", routeType='" + getRouteType() + "'" +
            "}";
    }
}
