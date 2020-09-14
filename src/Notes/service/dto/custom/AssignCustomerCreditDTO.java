package ir.donyapardaz.niopdc.base.service.dto.custom;

import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;

import java.time.ZonedDateTime;
import java.util.List;

public class AssignCustomerCreditDTO {

    Long personId;

    Long customerId;

    Long currencyId;

    ZonedDateTime registerDate;

    List<BuyGroup> buyGroups;

    List<ProductAmountResponseDTO> productRates;

    List<CustomerCreditDTO> reverts;

    boolean reserve;

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public AssignCustomerCreditDTO personId(Long personId) {
        this.personId = personId;
        return this;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public AssignCustomerCreditDTO customerId(Long customerId) {
        this.customerId = customerId;
        return this;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public AssignCustomerCreditDTO currencyId(Long currencyId) {
        this.currencyId = currencyId;
        return this;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public AssignCustomerCreditDTO registerDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public List<BuyGroup> getBuyGroups() {
        return buyGroups;
    }

    public void setBuyGroups(List<BuyGroup> buyGroups) {
        this.buyGroups = buyGroups;
    }

    public AssignCustomerCreditDTO buyGroups(List<BuyGroup> buyGroups) {
        this.buyGroups = buyGroups;
        return this;
    }

    public List<ProductAmountResponseDTO> getProductRates() {
        return productRates;
    }

    public void setProductRates(List<ProductAmountResponseDTO> productRates) {
        this.productRates = productRates;
    }

    public AssignCustomerCreditDTO productRates(List<ProductAmountResponseDTO> productRates) {
        this.productRates = productRates;
        return this;
    }

    public boolean isReserve() {
        return reserve;
    }

    public void setReserve(boolean reserve) {
        this.reserve = reserve;
    }
    public AssignCustomerCreditDTO reserve(boolean reserve) {
        this.reserve = reserve;
        return this;
    }

    public List<CustomerCreditDTO> getReverts() {
        return reverts;
    }

    public void setReverts(List<CustomerCreditDTO> reverts) {
        this.reverts = reverts;
    }
}
