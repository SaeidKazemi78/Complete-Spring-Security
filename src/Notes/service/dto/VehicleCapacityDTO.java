package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the VehicleCapacity entity.
 */
public class VehicleCapacityDTO implements Serializable {

    private Long id;

    @NotNull
    private Long capacity;

    private Long vehicleModelId;

    private Long productId;

    private String productTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getVehicleModelId() {
        return vehicleModelId;
    }

    public void setVehicleModelId(Long vehicleModelId) {
        this.vehicleModelId = vehicleModelId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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

        VehicleCapacityDTO vehicleCapacityDTO = (VehicleCapacityDTO) o;
        if(vehicleCapacityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicleCapacityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VehicleCapacityDTO{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
