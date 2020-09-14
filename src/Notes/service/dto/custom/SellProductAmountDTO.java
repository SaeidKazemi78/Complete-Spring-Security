package ir.donyapardaz.niopdc.base.service.dto.custom;

public class SellProductAmountDTO {
    private Long sellContractProductId;
    private Long amount;
    private OrderProductDTO orderProduct;

    public Long getSellContractProductId() {
        return sellContractProductId;
    }

    public void setSellContractProductId(Long sellContractProductId) {
        this.sellContractProductId = sellContractProductId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public OrderProductDTO getOrderProduct() {
        return orderProduct;
    }

    public void setOrderProduct(OrderProductDTO orderProduct) {
        this.orderProduct = orderProduct;
    }
}
