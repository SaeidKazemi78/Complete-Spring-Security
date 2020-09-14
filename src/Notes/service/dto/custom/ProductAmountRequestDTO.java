package ir.donyapardaz.niopdc.base.service.dto.custom;

import ir.donyapardaz.niopdc.base.domain.enumeration.CostMethod;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Set;

/**
 * A DTO for the get rate product .
 */
public class ProductAmountRequestDTO implements Serializable {

    private Long customerId;

    private Long productId;

    private Boolean hasContainer;

    private Boolean calculateContainerPrice;

    private Long containerId;

    private Integer capacity;

    private Long rateGroupId;

    private Long currencyId;

    private Long currencyRateGroupId;

    private Long amount;

    private CostMethod costMethod;

    private Set<Long> costGroupIds;

    private ZonedDateTime registerDate;

    public ProductAmountRequestDTO() {
    }

    public ProductAmountRequestDTO(Long customerId,
                                   Long productId,
                                   Boolean hasContainer,
                                   Boolean calculateContainerPrice,
                                   Long containerId,
                                   Integer capacity,
                                   Long rateGroupId,
                                   Long currencyId,
                                   Long currencyRateGroupId,
                                   Long amount,
                                   CostMethod costMethod,
                                   Set<Long> costGroupIds,
                                   ZonedDateTime registerDate) {
        this.customerId = customerId;
        this.productId = productId;
        this.hasContainer = hasContainer;
        this.calculateContainerPrice = calculateContainerPrice;
        this.containerId = containerId;
        this.capacity = capacity;
        this.rateGroupId = rateGroupId;
        this.currencyId = currencyId;
        this.currencyRateGroupId = currencyRateGroupId;
        this.amount = amount;
        this.costMethod = costMethod;
        this.costGroupIds = costGroupIds;
        this.registerDate = registerDate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Boolean getHasContainer() {
        return hasContainer;
    }

    public void setHasContainer(Boolean hasContainer) {
        this.hasContainer = hasContainer;
    }

    public Boolean getCalculateContainerPrice() {
        return calculateContainerPrice;
    }

    public void setCalculateContainerPrice(Boolean calculateContainerPrice) {
        this.calculateContainerPrice = calculateContainerPrice;
    }

    public Long getContainerId() {
        return containerId;
    }

    public void setContainerId(Long containerId) {
        this.containerId = containerId;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Set<Long> getCostGroupIds() {
        return costGroupIds;
    }

    public void setCostGroupIds(Set<Long> costGroupIds) {
        this.costGroupIds = costGroupIds;
    }

    public CostMethod getCostMethod() {
        return costMethod;
    }

    public void setCostMethod(CostMethod costMethod) {
        this.costMethod = costMethod;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }
}
