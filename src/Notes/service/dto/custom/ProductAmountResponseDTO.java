package ir.donyapardaz.niopdc.base.service.dto.custom;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * A DTO for the get rate product .
 */
public class ProductAmountResponseDTO implements Serializable {
    private Long currencyRateId;
    private Double currencyRatePrice;
    private Long sellContractProductId;
    private Long rateGroupId;

    private Long productId;
    private Long productRateId;
    private Double productRatePrice;
    private Double productTotalPrice;//بهای کل
    private Long productNiopdcBankAccountTypeId;
    private Double amount;

    private Long containerId;
    private Double containerTotalPrice;//بهای کل
    private Double containerRatePrice; // نرخ ظرف
    private Long containerRateId; // ایدی نرخ ظرف
    private Long containerRateGroupId; // گروه نرخی ظرف
    private Long containerNiopdcBankAccountTypeId;
    private Integer count;

    private List<CostResponseDTO> costResponses = new ArrayList<>();

    public void setCurrencyRateId(Long currencyRateId) {
        this.currencyRateId = currencyRateId;
    }

    public Long getCurrencyRateId() {
        return currencyRateId;
    }

    public void setCostResponses(List<CostResponseDTO> costResponses) {
        this.costResponses = costResponses;
    }

    public void setCurrencyRatePrice(Double currencyRatePrice) {
        this.currencyRatePrice = currencyRatePrice;
    }

    public Long getSellContractProductId() {
        return sellContractProductId;
    }

    public void setSellContractProductId(Long sellContractProductId) {
        this.sellContractProductId = sellContractProductId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getProductRateId() {
        return productRateId;
    }

    public void setProductRateId(Long productRateId) {
        this.productRateId = productRateId;
    }

    public Double getProductRatePrice() {
        return productRatePrice;
    }

    public void setProductRatePrice(Double productRatePrice) {
        this.productRatePrice = productRatePrice;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getProductTotalPrice() {
        return productTotalPrice;
    }

    public void setProductTotalPrice(Double productTotalPrice) {
        this.productTotalPrice = productTotalPrice;
    }

    public Long getProductNiopdcBankAccountTypeId() {
        return productNiopdcBankAccountTypeId;
    }

    public void setProductNiopdcBankAccountTypeId(Long productNiopdcBankAccountTypeId) {
        this.productNiopdcBankAccountTypeId = productNiopdcBankAccountTypeId;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public Long getContainerId() {
        return containerId;
    }

    public void setContainerId(Long containerId) {
        this.containerId = containerId;
    }

    public Double getContainerTotalPrice() {
        return containerTotalPrice;
    }

    public void setContainerTotalPrice(Double containerTotalPrice) {
        this.containerTotalPrice = containerTotalPrice;
    }

    public Double getContainerRatePrice() {
        return containerRatePrice;
    }

    public void setContainerRatePrice(Double containerRatePrice) {
        this.containerRatePrice = containerRatePrice;
    }

    public Long getContainerRateId() {
        return containerRateId;
    }

    public void setContainerRateId(Long containerRateId) {
        this.containerRateId = containerRateId;
    }

    public Long getContainerRateGroupId() {
        return containerRateGroupId;
    }

    public void setContainerRateGroupId(Long containerRateGroupId) {
        this.containerRateGroupId = containerRateGroupId;
    }

    public Long getContainerNiopdcBankAccountTypeId() {
        return containerNiopdcBankAccountTypeId;
    }

    public void setContainerNiopdcBankAccountTypeId(Long containerNiopdcBankAccountTypeId) {
        this.containerNiopdcBankAccountTypeId = containerNiopdcBankAccountTypeId;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public List<CostResponseDTO> getCostResponses() {
        return costResponses;
    }

    public Double getCurrencyRatePrice() {
        return currencyRatePrice;
    }

    public Double getSumCostPrice() {
        return getCostResponses().stream().mapToDouble(CostResponseDTO::getPrice).sum();
    }

    public Double getSumCredit() {
        return (getAmount() * getProductRatePrice() / getCurrencyRatePrice()) +
            ((getCount() != null || getContainerRatePrice() != null )? (getCount() * getContainerRatePrice() / getCurrencyRatePrice()) : 0 )+
            (getSumCostPrice() / getCurrencyRatePrice());
    }

    public Double getSumPrice() {
        return (getAmount() * getProductRatePrice() ) +
            (getCount() * getContainerRatePrice()) +
            (getSumCostPrice());
    }
}
