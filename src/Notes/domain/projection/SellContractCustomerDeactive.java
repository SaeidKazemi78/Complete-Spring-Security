package ir.donyapardaz.niopdc.base.domain.projection;

import com.querydsl.core.annotations.QueryProjection;
import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import ir.donyapardaz.niopdc.base.domain.SellContract;

public class SellContractCustomerDeactive {
    private SellContract sellContract;
    private CustomerDeactiveRule customerDeactiveRule;

    @QueryProjection
    public SellContractCustomerDeactive(SellContract sellContract, CustomerDeactiveRule customerDeactiveRule) {
        this.sellContract = sellContract;
        this.customerDeactiveRule = customerDeactiveRule;
    }

    public SellContract getSellContract() {
        return sellContract;
    }

    public void setSellContract(SellContract sellContract) {
        this.sellContract = sellContract;
    }

    public CustomerDeactiveRule getCustomerDeactiveRule() {
        return customerDeactiveRule;
    }

    public void setCustomerDeactiveRule(CustomerDeactiveRule customerDeactiveRule) {
        this.customerDeactiveRule = customerDeactiveRule;
    }
}
