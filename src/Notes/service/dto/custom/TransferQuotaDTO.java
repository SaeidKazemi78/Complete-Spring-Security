package ir.donyapardaz.niopdc.base.service.dto.custom;

public class TransferQuotaDTO {
    private Long fromSellContractProductId;
    private Long toSellContractProductId;
    private Long sellContractId;
    private Double amount;

    public Long getFromSellContractProductId() {
        return fromSellContractProductId;
    }

    public void setFromSellContractProductId(Long fromSellContractProductId) {
        this.fromSellContractProductId = fromSellContractProductId;
    }

    public Long getToSellContractProductId() {
        return toSellContractProductId;
    }

    public void setToSellContractProductId(Long toSellContractProductId) {
        this.toSellContractProductId = toSellContractProductId;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }
}
