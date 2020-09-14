package ir.donyapardaz.niopdc.base.domain.projection;

import com.querydsl.core.annotations.QueryProjection;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;

public class SellContractProductCurrencyRateGroup {
    private SellContractProduct sellContractProduct;
    private CurrencyRateGroup currencyRateGroup;
    private RateGroup rateGroup;

    @QueryProjection
    public SellContractProductCurrencyRateGroup(SellContractProduct sellContractProduct, CurrencyRateGroup currencyRateGroup, RateGroup rateGroup) {
        this.sellContractProduct = sellContractProduct;
        this.currencyRateGroup = currencyRateGroup;
        this.rateGroup = rateGroup;
    }

    public SellContractProduct getSellContractProduct() {
        return sellContractProduct;
    }

    public void setSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProduct = sellContractProduct;
    }

    public CurrencyRateGroup getCurrencyRateGroup() {
        return currencyRateGroup;
    }

    public void setCurrencyRateGroup(CurrencyRateGroup currencyRateGroup) {
        this.currencyRateGroup = currencyRateGroup;
    }

    public RateGroup getRateGroup() {
        return rateGroup;
    }

    public void setRateGroup(RateGroup rateGroup) {
        this.rateGroup = rateGroup;
    }
}
