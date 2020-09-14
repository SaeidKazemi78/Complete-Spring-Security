package ir.donyapardaz.niopdc.base.service.feign.client.dto;


import java.io.Serializable;

/**
 * A DTO for the OrderProduct entity.
 */
public class OrderProductValidationDTO implements Serializable {

    private Long sellContractProductId;
    private Integer amount;

    public Long getSellContractProductId() {
        return sellContractProductId;
    }

    public void setSellContractProductId(Long sellContractProductId) {
        this.sellContractProductId = sellContractProductId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }
}
