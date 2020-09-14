package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import ir.donyapardaz.niopdc.base.validation.global.DateRange;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the SellContractProduct entity.
 */
@DateRange(first = "startDate", second = "finishDate")
public class SellContractProductDTO implements Serializable {

    private Long id;

    @NotNull
    private Long rateGroupId;
    private String rateGroupTitle;

    @NotNull
    private Long currencyRateGroupId;
    private String currencyRateGroupTitle;

    private String customerName;

    @NotNull
    private ZonedDateTime startDate;

    @NotNull
    private ZonedDateTime finishDate;

    private Long consumptionId;

    private String consumptionTitle;

    private Long productId;

    private Long productGroupId;

    private Boolean hasContainer;

    private Boolean calculateContainerPrice;

    private Long containerId;

    private Integer containerCapacity;

    private String productTitle;

    private String productColor;

    private Long sellContractCustomerId;

    private Long sellContractId;

    private String sellContractNumber;

    private Boolean manualQuota;

    private Set<Long> costGroupIds = new HashSet<>();
    private Set<BuyTypeDTO> buyTypes = new HashSet<>();
    private long capacity;
    private Long productRateId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public Long getConsumptionId() {
        return consumptionId;
    }

    public void setConsumptionId(Long consumptionId) {
        this.consumptionId = consumptionId;
    }

    public String getConsumptionTitle() {
        return consumptionTitle;
    }

    public void setConsumptionTitle(String consumptionTitle) {
        this.consumptionTitle = consumptionTitle;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductGroupId() {
        return productGroupId;
    }

    public void setProductGroupId(Long productGroupId) {
        this.productGroupId = productGroupId;
    }

    public Boolean getHasContainer() {
        return hasContainer;
    }

    public void setHasContainer(Boolean hasContainer) {
        this.hasContainer = hasContainer;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public Long getSellContractCustomerId() {
        return sellContractCustomerId;
    }

    public void setSellContractCustomerId(Long sellContractCustomerId) {
        this.sellContractCustomerId = sellContractCustomerId;
    }


    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }

    public void setSellContractNumber(String sellContractNumber) {
        this.sellContractNumber = sellContractNumber;
    }

    public String getSellContractNumber() {
        return sellContractNumber;
    }

    public void setCurrencyRateGroupTitle(String currencyRateGroupTitle) {
        this.currencyRateGroupTitle = currencyRateGroupTitle;
    }

    public String getCurrencyRateGroupTitle() {
        return currencyRateGroupTitle;
    }

    public void setRateGroupTitle(String rateGroupTitle) {
        this.rateGroupTitle = rateGroupTitle;
    }

    public String getRateGroupTitle() {
        return rateGroupTitle;
    }

    public String getProductColor() {
        return productColor;
    }

    public void setProductColor(String productColor) {
        this.productColor = productColor;
    }

    public Set<Long> getCostGroupIds() {
        return costGroupIds;
    }

    public void setCostGroupIds(Set<Long> costGroupIds) {
        this.costGroupIds = costGroupIds;
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

    public Integer getContainerCapacity() {
        return containerCapacity;
    }

    public void setContainerCapacity(Integer containerCapacity) {
        this.containerCapacity = containerCapacity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractProductDTO sellContractProductFullDTO = (SellContractProductDTO) o;
        if (sellContractProductFullDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractProductFullDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractProductFullDTO{" +
            "id=" + getId() +
            ", rateGroupId=" + getRateGroupId() +
            ", currencyRateGroupId=" + getCurrencyRateGroupId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }

    public void setCapacity(long capacity) {
        this.capacity = capacity;
    }

    public long getCapacity() {
        return capacity;
    }

    public Set<BuyTypeDTO> getBuyTypes() {
        return buyTypes;
    }

    public void setBuyTypes(Set<BuyTypeDTO> buyTypes) {
        this.buyTypes = buyTypes;
    }

    public Long getProductRateId() {
        return productRateId;
    }

    public void setProductRateId(Long productRateId) {
        this.productRateId = productRateId;
    }
}
