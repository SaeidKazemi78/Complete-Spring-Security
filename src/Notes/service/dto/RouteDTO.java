package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.RouteType;

/**
 * A DTO for the Route entity.
 */
public class RouteDTO implements Serializable {

    private Long id;

    private String sourceCode;

    private String sourceTadaCode;

    private String sourceName;

    private String customerCode;

    private String destCode;

    private String destOpCode;

    private String destName;

    private String oldCode;

    private Boolean isActive;

    private Long customerStatus;

    private Boolean hamlType;

    private Long customerType;

    private Long rate;

    private Long distanceKm;

    private String description;

    private ZonedDateTime executeDate;

    private String taCode;

    private String code;

    private String customerName;

    private String address;

    private Long via;

    private String caption;

    private RouteType routeType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public String getSourceTadaCode() {
        return sourceTadaCode;
    }

    public void setSourceTadaCode(String sourceTadaCode) {
        this.sourceTadaCode = sourceTadaCode;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getDestCode() {
        return destCode;
    }

    public void setDestCode(String destCode) {
        this.destCode = destCode;
    }

    public String getDestOpCode() {
        return destOpCode;
    }

    public void setDestOpCode(String destOpCode) {
        this.destOpCode = destOpCode;
    }

    public String getDestName() {
        return destName;
    }

    public void setDestName(String destName) {
        this.destName = destName;
    }

    public String getOldCode() {
        return oldCode;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Long getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(Long customerStatus) {
        this.customerStatus = customerStatus;
    }

    public Boolean isHamlType() {
        return hamlType;
    }

    public void setHamlType(Boolean hamlType) {
        this.hamlType = hamlType;
    }

    public Long getCustomerType() {
        return customerType;
    }

    public void setCustomerType(Long customerType) {
        this.customerType = customerType;
    }

    public Long getRate() {
        return rate;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public Long getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Long distanceKm) {
        this.distanceKm = distanceKm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getExecuteDate() {
        return executeDate;
    }

    public void setExecuteDate(ZonedDateTime executeDate) {
        this.executeDate = executeDate;
    }

    public String getTaCode() {
        return taCode;
    }

    public void setTaCode(String taCode) {
        this.taCode = taCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getVia() {
        return via;
    }

    public void setVia(Long via) {
        this.via = via;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public RouteType getRouteType() {
        return routeType;
    }

    public void setRouteType(RouteType routeType) {
        this.routeType = routeType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RouteDTO routeDTO = (RouteDTO) o;
        if(routeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), routeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RouteDTO{" +
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
