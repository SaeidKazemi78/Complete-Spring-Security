package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;

/**
 * A DTO for the UserConfig entity.
 */
public class UserConfigDTO implements Serializable {

    private Long id;

    private String username;

    private TypeOfFuelReceipt typeOfFuelReceipt;

    private Long customerId;

    private String customerName;

    private Long depotId;

    private String depotTitle;

    private Long productId;

    private String productTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public TypeOfFuelReceipt getTypeOfFuelReceipt() {
        return typeOfFuelReceipt;
    }

    public void setTypeOfFuelReceipt(TypeOfFuelReceipt typeOfFuelReceipt) {
        this.typeOfFuelReceipt = typeOfFuelReceipt;
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

    public Long getDepotId() {
        return depotId;
    }

    public void setDepotId(Long depotId) {
        this.depotId = depotId;
    }

    public String getDepotTitle() {
        return depotTitle;
    }

    public void setDepotTitle(String depotTitle) {
        this.depotTitle = depotTitle;
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

        UserConfigDTO userConfigDTO = (UserConfigDTO) o;
        if(userConfigDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userConfigDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserConfigDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", typeOfFuelReceipt='" + getTypeOfFuelReceipt() + "'" +
            "}";
    }
}
