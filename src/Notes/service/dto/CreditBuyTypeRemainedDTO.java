package ir.donyapardaz.niopdc.base.service.dto;

import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;

import java.math.BigInteger;

public class CreditBuyTypeRemainedDTO {
    private BigInteger remainedAmount;
    private BigInteger remainedCredit;
    private BuyGroup buyGroup;
    private String productCode;
    private String productTitle;

    public BigInteger getRemainedAmount() {
        return remainedAmount;
    }

    public void setRemainedAmount(BigInteger remainedAmount) {
        this.remainedAmount = remainedAmount;
    }

    public BigInteger getRemainedCredit() {
        return remainedCredit;
    }

    public void setRemainedCredit(BigInteger remainedCredit) {
        this.remainedCredit = remainedCredit;
    }

    public BuyGroup getBuyGroup() {
        return buyGroup;
    }

    public void setBuyGroup(BuyGroup buyGroup) {
        this.buyGroup = buyGroup;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }
}
