package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;

public class ReserveCreditDTO implements Serializable {
    private Long customerCreditId;
    private Long sellContractProductId;
    private Long amount;
    private Long creditNumber;
    private Double totalPrice;

    public Long getCustomerCreditId() {
        return customerCreditId;
    }

    public void setCustomerCreditId(Long customerCreditId) {
        this.customerCreditId = customerCreditId;
    }

    public Long getSellContractProductId() {
        return sellContractProductId;
    }

    public void setSellContractProductId(Long sellContractProductId) {
        this.sellContractProductId = sellContractProductId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getCreditNumber() {
        return creditNumber;
    }

    public void setCreditNumber(Long creditNumber) {
        this.creditNumber = creditNumber;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
