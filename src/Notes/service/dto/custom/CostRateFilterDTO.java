package ir.donyapardaz.niopdc.base.service.dto.custom;

import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

public class CostRateFilterDTO {
    private SellProductAmountDTO sellProductAmount;
    private Long currencyId;
    private Long customerId;
    private ContractType contractType;
    private Long currencyRateGroupId;

    public void setSellProductAmount(SellProductAmountDTO sellProductAmount) {
        this.sellProductAmount = sellProductAmount;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public SellProductAmountDTO getSellProductAmount() {
        return sellProductAmount;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }
}
