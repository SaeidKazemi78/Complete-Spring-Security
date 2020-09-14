package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CarRfId entity.
 */
public class CarRfIdDTO implements Serializable {

    private Long id;
    @NotNull
    private String code;
    @NotNull
    private Long locationId;

    private Boolean active;

    private Long customerId;

    private String customerName;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @NotNull
    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(@NotNull Long locationId) {
        this.locationId = locationId;
    }

    public Boolean getActive() {
        return active;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarRfIdDTO carRfIdDTO = (CarRfIdDTO) o;
        if(carRfIdDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carRfIdDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarRfIdDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
