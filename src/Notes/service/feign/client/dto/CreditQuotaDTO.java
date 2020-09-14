package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;

public class CreditQuotaDTO implements Serializable {
    private Long customerCreditId;
    private Long decreasedAmount;
    private Long SellContractProductId;
    private Long creditNumber;


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

    public Long getSellContractProductId() {
        return SellContractProductId;
    }

    public void setSellContractProductId(Long sellContractProductId) {
        SellContractProductId = sellContractProductId;
    }

    public Long getCreditNumber() {
        return creditNumber;
    }

    public void setCreditNumber(Long creditNumber) {
        this.creditNumber = creditNumber;
    }
}
