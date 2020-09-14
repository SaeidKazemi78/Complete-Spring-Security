package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the SellContractProduct entity.
 */
public class SellContractProductApiDTO implements Serializable {

    private Long id;

    @NotNull
    private Long rateGroupId;

    private String rateGroupTitle;

    @NotNull
    private Long currencyRateGroupId;

    private String currencyRateGroupTitle;

    private Long productId;

    private String productTitle;

    private Set<DepotApiDTO> depots = new HashSet<>();

    private Set<CostGroupApiDTO> costGroups = new HashSet<>();

    private Set<CurrencyApiDTO> currencies = new HashSet<>();

    private Set<BuyTypeApiDTO> buyTypes = new HashSet<>();
    private Set<TypeOfFuelReceipt> typeOfFuelReceipts= new HashSet<>();

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

    public Set<DepotApiDTO> getDepots() {
        return depots;
    }

    public void setDepots(Set<DepotApiDTO> depots) {
        this.depots = depots;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractProductApiDTO sellContractProductDTO = (SellContractProductApiDTO) o;
        if(sellContractProductDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractProductDTO.getId());
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
            "}";
    }

    public String getRateGroupTitle() {
        return rateGroupTitle;
    }

    public void setRateGroupTitle(String rateGroupTitle) {
        this.rateGroupTitle = rateGroupTitle;
    }

    public String getCurrencyRateGroupTitle() {
        return currencyRateGroupTitle;
    }

    public void setCurrencyRateGroupTitle(String currencyRateGroupTitle) {
        this.currencyRateGroupTitle = currencyRateGroupTitle;
    }

    public Set<CostGroupApiDTO> getCostGroups() {
        return costGroups;
    }

    public void setCostGroups(Set<CostGroupApiDTO> costGroups) {
        this.costGroups = costGroups;
    }

    public Set<CurrencyApiDTO> getCurrencies() {
        return currencies;
    }

    public void setCurrencies(Set<CurrencyApiDTO> currencies) {
        this.currencies = currencies;
    }

    public Set<BuyTypeApiDTO> getBuyTypes() {
        return buyTypes;
    }

    public void setBuyTypes(Set<BuyTypeApiDTO> buyTypes) {
        this.buyTypes = buyTypes;
    }

    public Set<TypeOfFuelReceipt> getTypeOfFuelReceipts() {
        return typeOfFuelReceipts;
    }

    public void setTypeOfFuelReceipts(Set<TypeOfFuelReceipt> typeOfFuelReceipts) {
        this.typeOfFuelReceipts = typeOfFuelReceipts;
    }
}
