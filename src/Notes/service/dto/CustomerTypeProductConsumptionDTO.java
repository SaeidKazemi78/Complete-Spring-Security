package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CustomerTypeProductConsumption entity.
 */
public class CustomerTypeProductConsumptionDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private Long customerTypeId;

    private Long productId;

    private String productTitle;

    private Long consumptionId;

    private String consumptionTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerTypeId() {
        return customerTypeId;
    }

    public void setCustomerTypeId(Long customerTypeId) {
        this.customerTypeId = customerTypeId;
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

    public Long getConsumptionId() {
        return consumptionId;
    }

    public void setConsumptionId(Long consumptionId) {
        this.consumptionId = consumptionId;
    }

    public String getConsumptionTitle() {
        return consumptionTitle;
    }

    public void setConsumptionTitle(String consumptionTitle) {
        this.consumptionTitle = consumptionTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO = (CustomerTypeProductConsumptionDTO) o;
        if(customerTypeProductConsumptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerTypeProductConsumptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerTypeProductConsumptionDTO{" +
            "id=" + getId() +
            "}";
    }
}
