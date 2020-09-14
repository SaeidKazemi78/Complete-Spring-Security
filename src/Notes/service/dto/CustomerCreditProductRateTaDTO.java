package ir.donyapardaz.niopdc.base.service.dto;

import java.io.Serializable;

public class CustomerCreditProductRateTaDTO implements Serializable {

    private Double amount;
    private String fromDate;
    private String isTarh; // 0
    private String karbordID; //
    private String productRateType; // 1 : yaranei,2 : ghare yaranei
    private String toDate;
    private String useTypeCode; // noe masraf

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getIsTarh() {
        return isTarh;
    }

    public void setIsTarh(String isTarh) {
        this.isTarh = isTarh;
    }

    public String getKarbordID() {
        return karbordID;
    }

    public void setKarbordID(String karbordID) {
        this.karbordID = karbordID;
    }

    public String getProductRateType() {
        return productRateType;
    }

    public void setProductRateType(String productRateType) {
        this.productRateType = productRateType;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getUseTypeCode() {
        return useTypeCode;
    }

    public void setUseTypeCode(String useTypeCode) {
        this.useTypeCode = useTypeCode;
    }
}
