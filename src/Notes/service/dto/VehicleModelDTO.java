package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;

/**
 * A DTO for the VehicleModel entity.
 */
public class VehicleModelDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    private CustomerGroup customerGroup;

    @NotNull
    private VehicleModelType vehicleModelType;

    private String productTitle;
    private String productCode;

    private Long capacity;
    private Long productId;

    private String capacityInfo;

    private Boolean confirm;

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

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VehicleModelDTO vehicleModelDTO = (VehicleModelDTO) o;
        if(vehicleModelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleModelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleModelDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", customerGroup='" + getCustomerGroup() + "'" +
            ", vehicleModelType='" + getVehicleModelType() + "'" +
            ", capacity='" + getCapacity() + "'" +
            "}";
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public String getCapacityInfo() {
        return capacityInfo;
    }

    public void setCapacityInfo(String capacityInfo) {
        this.capacityInfo = capacityInfo;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public VehicleModelDTO setConfirm(Boolean confirm) {
        this.confirm = confirm;
        return this;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
}
