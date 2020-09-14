package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.LocationType;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the CustomerType entity.
 */
public class CustomerTypeDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    private Boolean manualQuota;


    private LocationType locationType;

    @NotNull
    private CustomerGroup customerGroup;

    private Boolean taxExempt;

    private Boolean hasGsId;

    private Boolean active;

    private Boolean iranian;

    @Size(min = 3, max = 42)
    private String customerCodeTitle;

    @Size(max = 42)
    private String oldCode;

    private Set<CustomerTypeDTO> customerTypeIgnores = new HashSet<>();

    private Set<VehicleModelDTO> vehicleModels = new HashSet<>();

    private VehicleModelType vehicleModelType;

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

    public Boolean isHasGsId() {
        return hasGsId;
    }

    public void setHasGsId(Boolean hasGsId) {
        this.hasGsId = hasGsId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getCustomerCodeTitle() {
        return customerCodeTitle;
    }

    public void setCustomerCodeTitle(String customerCodeTitle) {
        this.customerCodeTitle = customerCodeTitle;
    }

    public String getOldCode() {
        return oldCode;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }

    public Set<CustomerTypeDTO> getCustomerTypeIgnores() {
        return customerTypeIgnores;
    }

    public void setCustomerTypeIgnores(Set<CustomerTypeDTO> customerTypes) {
        this.customerTypeIgnores = customerTypes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerTypeDTO customerTypeDTO = (CustomerTypeDTO) o;
        if (customerTypeDTO.getId() == null || getId() == null) {
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
            ", hasGsId='" + isHasGsId() + "'" +
            ", customerCodeTitle='" + getCustomerCodeTitle() + "'" +
            "}";
    }

    public Set<VehicleModelDTO> getVehicleModels() {
        return vehicleModels;
    }

    public void setVehicleModels(Set<VehicleModelDTO> vehicleModels) {
        this.vehicleModels = vehicleModels;
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public Boolean isIranian() {
        return iranian;
    }

    public void setIranian(Boolean iranian) {
        this.iranian = iranian;
    }
}
