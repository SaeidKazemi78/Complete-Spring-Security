package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;

public class RevertCreditDTO implements Serializable{
    private Long customerCreditId;
    private Long decreasedAmount;
    private Long decreasedCredit;

    public Long getCustomerCreditId() {
        return customerCreditId;
    }

    public void setCustomerCreditId(Long customerCreditId) {
        this.customerCreditId = customerCreditId;
    }

    public Long getDecreasedAmount() {
        return decreasedAmount;
    }

    public void setDecreasedAmount(Long decreasedAmount) {
        this.decreasedAmount = decreasedAmount;
    }

    public Long getDecreasedCredit() {
        return decreasedCredit;
    }

    public void setDecreasedCredit(Long decreasedCredit) {
        this.decreasedCredit = decreasedCredit;
    }
}
