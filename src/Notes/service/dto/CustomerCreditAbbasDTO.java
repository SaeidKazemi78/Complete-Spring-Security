package ir.donyapardaz.niopdc.base.service.dto;


import java.util.List;

public class CustomerCreditAbbasDTO {
    private List<CustomerCreditDTO> customerCredits;

    public List<CustomerCreditDTO> getCustomerCredits() {
        return customerCredits;
    }

    public void setCustomerCredits(List<CustomerCreditDTO> customerCredits) {
        this.customerCredits = customerCredits;
    }
}
