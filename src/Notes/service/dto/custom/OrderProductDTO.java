package ir.donyapardaz.niopdc.base.service.dto.custom;

import java.util.List;

public class OrderProductDTO {
    private List<Long> costGroupId;
    private Long productId;
    private Long locationId;
    private Long regionId;
    private Long customerTypeId;
    private Long rateGroupId;
    private Long currencyRateGroupId;

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
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

    public List<Long> getCostGroupId() {
        return costGroupId;
    }

    public void setCostGroupId(List<Long> costGroupId) {
        this.costGroupId = costGroupId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Long getCustomerTypeId() {
        return customerTypeId;
    }

    public void setCustomerTypeId(Long customerTypeId) {
        this.customerTypeId = customerTypeId;
    }

}
