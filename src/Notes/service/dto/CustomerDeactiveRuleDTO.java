package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.DeactiveReason;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the CustomerDeactiveRule entity.
 */
public class CustomerDeactiveRuleDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private String sellContractCode;

    @NotNull
    private ZonedDateTime startDate;

    private Long startPeriodDay;

    private Long endPeriodDay;

    private Boolean periodic;
    private Boolean byCustomerType;

    private CustomerGroup customerGroup;

    private Set<Long> exceptionCustomers;

    private ZonedDateTime finishDate;
    private String description;
    private String customerName;
    private String customerCode;
    private Long customerId;
    private Set<LocationDTO> locations = new HashSet<>();
    private Set<CustomerTypeDTO> customerTypes = new HashSet<>();
    private Set<DeactiveReason> deactiveReasons = new HashSet<>();


    public Set<DeactiveReason> getDeactiveReasons() {
        return deactiveReasons;
    }

    public void setDeactiveReasons(Set<DeactiveReason> deactiveReasons) {
        this.deactiveReasons = deactiveReasons;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSellContractCode() {
        return sellContractCode;
    }

    public void setSellContractCode(String sellContractCode) {
        this.sellContractCode = sellContractCode;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    public Set<CustomerTypeDTO> getCustomerTypes() {
        return customerTypes;
    }

    public void setCustomerTypes(Set<CustomerTypeDTO> customerTypes) {
        this.customerTypes = customerTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerDeactiveRuleDTO customerDeactiveRuleDTO = (CustomerDeactiveRuleDTO) o;
        if (customerDeactiveRuleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDeactiveRuleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerDeactiveRuleDTO{" +
            "id=" + getId() +
            ", sellContractCode='" + getSellContractCode() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Long getStartPeriodDay() {
        return startPeriodDay;
    }

    public void setStartPeriodDay(Long startPeriodDay) {
        this.startPeriodDay = startPeriodDay;
    }

    public Long getEndPeriodDay() {
        return endPeriodDay;
    }

    public void setEndPeriodDay(Long endPeriodDay) {
        this.endPeriodDay = endPeriodDay;
    }

    public Boolean getPeriodic() {
        return periodic;
    }

    public void setPeriodic(Boolean periodic) {
        this.periodic = periodic;
    }

    public Set<Long> getExceptionCustomers() {
        return exceptionCustomers;
    }

    public void setExceptionCustomers(Set<Long> exceptionCustomers) {
        this.exceptionCustomers = exceptionCustomers;
    }

    public Boolean getByCustomerType() {
        return byCustomerType;
    }

    public void setByCustomerType(Boolean byCustomerType) {
        this.byCustomerType = byCustomerType;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }
}
