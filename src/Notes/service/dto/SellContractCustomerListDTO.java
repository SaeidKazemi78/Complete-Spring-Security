package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;

/**
 * A DTO for the SellContractCustomer entity.
 */
public class SellContractCustomerListDTO implements Serializable {

    private Long id;
    private Long customerId;
    private String customerName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
