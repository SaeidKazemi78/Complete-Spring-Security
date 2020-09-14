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
public class SellContractProductFullDTO implements Serializable {

    private Long id;

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

    private Boolean active;

    private Long consumptionId;

    private String consumptionTitle;

    private Long productId;

    private Long productGroupId;

    private String productTitle;

    private String productColor;

    private Long sellContractCustomerId;

    private Set<Long> sellContractCustomerIds = new HashSet<>();

    @NotNull
    private Long sellContractId;

    private String sellContractNumber;

    private Set<DepotDTO> depots = new HashSet<>();

    private Set<BuyTypeDTO> buyTypes = new HashSet<>();

    private Set<Long> costGroupIds = new HashSet<>();

    private Set<Long> currencyIds = new HashSet<>();

    private Set<TypeOfFuelReceipt> typeOfFuelReceipts = new HashSet<>();

    private Boolean manualQuota;
    private Long productRateId;
    private Boolean adjustment;
    private Long productRateCurrencyId;
    private String productRateSrc;
    private Double productRatePrice;
    private Long niopdcBankAccountTypeId;
    private String niopdcBankAccountTypeTitle;

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

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
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

    public Long getProductGroupId() {
        return productGroupId;
    }

    public void setProductGroupId(Long productGroupId) {
        this.productGroupId = productGroupId;
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

    public Set<DepotDTO> getDepots() {
        return depots;
    }

    public void setDepots(Set<DepotDTO> depots) {
        this.depots = depots;
    }

    public Set<BuyTypeDTO> getBuyTypes() {
        return buyTypes;
    }

    public void setBuyTypes(Set<BuyTypeDTO> buyTypes) {
        this.buyTypes = buyTypes;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractProductFullDTO sellContractProductFullDTO = (SellContractProductFullDTO) o;
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
            ", active='" + isActive() + "'" +
            "}";
    }

    public Set<Long> getCostGroupIds() {
        return costGroupIds;
    }

    public void setCostGroupIds(Set<Long> costGroupIds) {
        this.costGroupIds = costGroupIds;
    }

    public Set<Long> getCurrencyIds() {
        return currencyIds;
    }

    public void setCurrencyIds(Set<Long> currencyIds) {
        this.currencyIds = currencyIds;
    }

    public Set<TypeOfFuelReceipt> getTypeOfFuelReceipts() {
        return typeOfFuelReceipts;
    }

    public void setTypeOfFuelReceipts(Set<TypeOfFuelReceipt> typeOfFuelReceipts) {
        this.typeOfFuelReceipts = typeOfFuelReceipts;
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }

    public Set<Long> getSellContractCustomerIds() {
        return sellContractCustomerIds;
    }

    public void setSellContractCustomerIds(Set<Long> sellContractCustomerIds) {
        this.sellContractCustomerIds = sellContractCustomerIds;
    }

    public Long getProductRateId() {
        return productRateId;
    }

    public void setProductRateId(Long productRateId) {
        this.productRateId = productRateId;
    }

    public Boolean getAdjustment() {
        return adjustment;
    }

    public void setAdjustment(Boolean adjustment) {
        this.adjustment = adjustment;
    }

    public Long getProductRateCurrencyId() {
        return productRateCurrencyId;
    }

    public void setProductRateCurrencyId(Long productRateCurrencyId) {
        this.productRateCurrencyId = productRateCurrencyId;
    }

    public String getProductRateSrc() {
        return productRateSrc;
    }

    public void setProductRateSrc(String productRateSrc) {
        this.productRateSrc = productRateSrc;
    }

    public Double getProductRatePrice() {
        return productRatePrice;
    }

    public void setProductRatePrice(Double productRatePrice) {
        this.productRatePrice = productRatePrice;
    }

    public Long getNiopdcBankAccountTypeId() {
        return niopdcBankAccountTypeId;
    }

    public void setNiopdcBankAccountTypeId(Long niopdcBankAccountTypeId) {
        this.niopdcBankAccountTypeId = niopdcBankAccountTypeId;
    }

    public String getNiopdcBankAccountTypeTitle() {
        return niopdcBankAccountTypeTitle;
    }

    public void setNiopdcBankAccountTypeTitle(String niopdcBankAccountTypeTitle) {
        this.niopdcBankAccountTypeTitle = niopdcBankAccountTypeTitle;
    }
}
