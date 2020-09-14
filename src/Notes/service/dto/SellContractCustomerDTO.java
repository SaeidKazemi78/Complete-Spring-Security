package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the SellContractCustomer entity.
 */
public class SellContractCustomerDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private Boolean hasTransport;

    @Size(min = 1, max = 20)
    private String creditAccount;

    private Long sellContractId;

    private Long customerId;

    private String customerName;

    private String customerRegCode;

    private Long locationId;

    private String locationName;

    private Long customerTypeId;

    private CustomerGroup customerGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isHasTransport() {
        return hasTransport;
    }

    public void setHasTransport(Boolean hasTransport) {
        this.hasTransport = hasTransport;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
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

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractCustomerDTO sellContractCustomerDTO = (SellContractCustomerDTO) o;
        if (sellContractCustomerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractCustomerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractCustomerDTO{" +
            "id=" + getId() +
            ", hasTransport='" + isHasTransport() + "'" +
            "}";
    }

    public Long getCustomerTypeId() {
        return customerTypeId;
    }

    public void setCustomerTypeId(Long customerTypeId) {
        this.customerTypeId = customerTypeId;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public String getCustomerRegCode() {
        return customerRegCode;
    }

    public void setCustomerRegCode(String customerRegCode) {
        this.customerRegCode = customerRegCode;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

}
