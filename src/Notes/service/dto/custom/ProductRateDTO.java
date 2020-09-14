package ir.donyapardaz.niopdc.base.service.dto.custom;


import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the ProductRate entity.
 */
public class ProductRateDTO implements Serializable {

    private Long id;

    private Long productId;
    private String productTitle;
    private Long containerId;
    private String containerTitle;


    @Size(min = 3)
    private String src;

    @NotNull
    private Double price;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    private Long currencyId;

    private String currencyTitle;

    private Integer currencyRate;

    @NotNull
    private Long rateGroupId;

    private String rateGroupTitle;

    private Long productStepId;
    private Long productStepNo;

    private Boolean confirm;

    private Boolean adjustment;

    private Boolean adjustmented;

    private Integer adjustmentNumber;

    private ContractType type;

    private Long bankAccountTypeId;

    private String niopdcBankAccountTypeTitle;

    public ProductRateDTO() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getContainerId() {
        return containerId;
    }

    public void setContainerId(Long containerId) {
        this.containerId = containerId;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public String getCurrencyTitle() {
        return currencyTitle;
    }

    public void setCurrencyTitle(String currencyTitle) {
        this.currencyTitle = currencyTitle;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public String getRateGroupTitle() {
        return rateGroupTitle;
    }

    public void setRateGroupTitle(String rateGroupTitle) {
        this.rateGroupTitle = rateGroupTitle;
    }

    public Long getProductStepId() {
        return productStepId;
    }

    public void setProductStepId(Long productStepId) {
        this.productStepId = productStepId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductRateDTO productRateDTO = (ProductRateDTO) o;
        if (productRateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productRateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductRateApiDTO{" +
            "id=" + getId() +
            ", productId=" + getProductId() +
            ", containerId=" + getContainerId() +
            ", src='" + getSrc() + "'" +
            ", price=" + getPrice() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }

    public Integer getCurrencyRate() {
        return currencyRate;
    }

    public void setCurrencyRate(Integer currencyRate) {
        this.currencyRate = currencyRate;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public String getContainerTitle() {
        return containerTitle;
    }

    public void setContainerTitle(String containerTitle) {
        this.containerTitle = containerTitle;
    }

    public Boolean getConfirm() {
        return confirm;
    }

    public void setConfirm(Boolean confirm) {
        this.confirm = confirm;
    }

    public Long getProductStepNo() {
        return productStepNo;
    }

    public void setProductStepNo(Long productStepNo) {
        this.productStepNo = productStepNo;
    }

    public Boolean getAdjustment() {
        return adjustment;
    }

    public void setAdjustment(Boolean adjustment) {
        this.adjustment = adjustment;
    }

    public Boolean getAdjustmented() {
        return adjustmented;
    }

    public void setAdjustmented(Boolean adjustmented) {
        this.adjustmented = adjustmented;
    }

    public Integer getAdjustmentNumber() {
        return adjustmentNumber;
    }

    public void setAdjustmentNumber(Integer adjustmentNumber) {
        this.adjustmentNumber = adjustmentNumber;
    }

    public void setType(ContractType type) {
        this.type = type;
    }

    public ContractType getType() {
        return type;
    }

    public Long getBankAccountTypeId() {
        return bankAccountTypeId;
    }

    public void setBankAccountTypeId(Long bankAccountTypeId) {
        this.bankAccountTypeId = bankAccountTypeId;
    }

    public String getNiopdcBankAccountTypeTitle() {
        return niopdcBankAccountTypeTitle;
    }

    public void setNiopdcBankAccountTypeTitle(String niopdcBankAccountTypeTitle) {
        this.niopdcBankAccountTypeTitle = niopdcBankAccountTypeTitle;
    }
}
