package ir.donyapardaz.niopdc.base.service.dto.custom;

import java.util.List;

public class RateResponseDTO {
    private Long productId;
    private Long amount;
    private Double basePrice;//بهای کل
    private Double productRate;//بهای واحد
    private Long productRateId;
    private Long rateGroupId;
    private Double basePriceContainer;//بهای کل
    private Double productRateContainer;//بهای واحد
    private Long productRateIdContainer;
    private Long rateGroupIdContainer;
    private List<CostResponseDTO> costResponses;

    public void setBasePriceContainer(Double basePriceContainer) {
        this.basePriceContainer = basePriceContainer;
    }

    public Double getBasePriceContainer() {
        return basePriceContainer;
    }


    public Long getProductRateIdContainer() {
        return productRateIdContainer;
    }

    public void setProductRateIdContainer(Long productRateIdContainer) {
        this.productRateIdContainer = productRateIdContainer;
    }

    public Long getRateGroupIdContainer() {
        return rateGroupIdContainer;
    }

    public void setRateGroupIdContainer(Long rateGroupIdContainer) {
        this.rateGroupIdContainer = rateGroupIdContainer;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public Long getProductRateId() {
        return productRateId;
    }

    public void setProductRateId(Long productRateId) {
        this.productRateId = productRateId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public Double getProductRate() {
        return productRate;
    }

    public void setProductRate(Double productRate) {
        this.productRate = productRate;
    }

    public Double getProductRateContainer() {
        return productRateContainer;
    }

    public void setProductRateContainer(Double productRateContainer) {
        this.productRateContainer = productRateContainer;
    }

    public List<CostResponseDTO> getCostResponses() {
        return costResponses;
    }

    public void setCostResponses(List<CostResponseDTO> costResponses) {
        this.costResponses = costResponses;
    }
}
