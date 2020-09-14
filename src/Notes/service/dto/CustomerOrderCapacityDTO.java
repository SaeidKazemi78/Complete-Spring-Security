package ir.donyapardaz.niopdc.base.service.dto;

import org.hibernate.envers.Audited;

import java.io.Serializable;


/**
 * A CustomerOrderCapacityDTO.
 */
@Audited
public class CustomerOrderCapacityDTO implements Serializable {

    private Long id;

    private Long capacity;

    private Boolean active;

    private Long customerId;

    private String productGroupTitle;

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

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getProductGroupTitle() {
        return productGroupTitle;
    }

    public void setProductGroupTitle(String productGroupTitle) {
        this.productGroupTitle = productGroupTitle;
    }
}
