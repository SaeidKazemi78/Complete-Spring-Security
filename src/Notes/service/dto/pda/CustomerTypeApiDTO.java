package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.LocationType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CustomerType entity.
 */
public class CustomerTypeApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    private LocationType locationType;

    @NotNull
    private CustomerGroup customerGroup;

    private Boolean taxExempt;

    @Size(min = 3, max = 42)
    private String customerCodeTitle;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public Boolean isTaxExempt() {
        return taxExempt;
    }

    public void setTaxExempt(Boolean taxExempt) {
        this.taxExempt = taxExempt;
    }

    public String getCustomerCodeTitle() {
        return customerCodeTitle;
    }

    public void setCustomerCodeTitle(String customerCodeTitle) {
        this.customerCodeTitle = customerCodeTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerTypeApiDTO customerTypeDTO = (CustomerTypeApiDTO) o;
        if(customerTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerTypeDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", locationType='" + getLocationType() + "'" +
            ", customerGroup='" + getCustomerGroup() + "'" +
            ", taxExempt='" + isTaxExempt() + "'" +
            ", customerCodeTitle='" + getCustomerCodeTitle() + "'" +
            "}";
    }
}
