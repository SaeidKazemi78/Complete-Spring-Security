package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CustomerCapacity entity.
 */
public class CustomerCapacityDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer capacity;

    private Long customerId;

    private Long productGroupId;

    private String productGroupTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProductGroupId() {
        return productGroupId;
    }

    public void setProductGroupId(Long productGroupId) {
        this.productGroupId = productGroupId;
    }

    public String getProductGroupTitle() {
        return productGroupTitle;
    }

    public void setProductGroupTitle(String productGroupTitle) {
        this.productGroupTitle = productGroupTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerCapacityDTO customerCapacityDTO = (CustomerCapacityDTO) o;
        if(customerCapacityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerCapacityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerCapacityDTO{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
