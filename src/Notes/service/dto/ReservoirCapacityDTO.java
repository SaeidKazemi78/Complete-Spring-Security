package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ReservoirCapacity entity.
 */
public class ReservoirCapacityDTO implements Serializable {

    private Long id;

    @NotNull
    private Long capacity;

    private Boolean active;

    private Long productId;

    private String productTitle;

    private Long personId;

    private String personName;

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

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
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

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ReservoirCapacityDTO reservoirCapacityDTO = (ReservoirCapacityDTO) o;
        if(reservoirCapacityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), reservoirCapacityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ReservoirCapacityDTO{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
