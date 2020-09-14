package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the Order entity.
 */
public class OrderValidationDTO implements Serializable {

    List<OrderProductValidationDTO> orderProductValidations;
    private Long customerId;
    private Long locationId;
    private Long currencyId;
    private Boolean isNational;
    private Long depotId;
    private Long currencyRateGroupId;
    private BuyGroup buyGroup;
    private Long personId;
    private TypeOfFuelReceipt typeOfFuelReceipt;
    private Long sellContractId;

    public Boolean getNational() {
        return isNational;
    }

    public OrderValidationDTO setNational(Boolean national) {
        isNational = national;
        return this;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getDepotId() {
        return depotId;
    }

    public void setDepotId(Long depotId) {
        this.depotId = depotId;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public BuyGroup getBuyGroup() {
        return buyGroup;
    }

    public void setBuyGroup(BuyGroup buyGroup) {
        this.buyGroup = buyGroup;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public List<OrderProductValidationDTO> getOrderProductValidations() {
        return orderProductValidations;
    }

    public void setOrderProductValidations(List<OrderProductValidationDTO> orderProductValidations) {
        this.orderProductValidations = orderProductValidations;
    }

    public TypeOfFuelReceipt getTypeOfFuelReceipt() {
        return typeOfFuelReceipt;
    }

    public void setTypeOfFuelReceipt(TypeOfFuelReceipt typeOfFuelReceipt) {
        this.typeOfFuelReceipt = typeOfFuelReceipt;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }
}
