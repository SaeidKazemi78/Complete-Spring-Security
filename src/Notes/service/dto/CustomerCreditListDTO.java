package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import ir.donyapardaz.niopdc.base.validation.global.DateRange;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the CustomerCredit entity.
 */
@DateRange(first = "startDate" , second = "finishDate")
public class CustomerCreditListDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    @NotNull
    private Integer creditNumber;

    private Double currentCredit;

    private Double credit;

    private Integer currentAmount;

    private Integer amount;

    private Long currencyId;

    private Long currencyRateGroupId;

    private Long customerId;

    private Long parentBuyTypeId;

    private String parentBuyTypeTitle;
    private String sellContractNo;

    private BuyGroup parentBuyGroup;

    private TypeEffect parentTypeEffect;

    private BuyTypeUsage parentBuyTypeUsage;

    private Boolean active;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getCreditNumber() {
        return creditNumber;
    }

    public void setCreditNumber(Integer creditNumber) {
        this.creditNumber = creditNumber;
    }

    public Double getCurrentCredit() {
        return currentCredit;
    }

    public void setCurrentCredit(Double currentCredit) {
        this.currentCredit = currentCredit;
    }

    public Double getCredit() {
        return credit;
    }

    public void setCredit(Double credit) {
        this.credit = credit;
    }

    public Integer getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Integer currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
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

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getParentBuyTypeId() {
        return parentBuyTypeId;
    }

    public void setParentBuyTypeId(Long buyTypeId) {
        this.parentBuyTypeId = buyTypeId;
    }

    public String getParentBuyTypeTitle() {
        return parentBuyTypeTitle;
    }

    public void setParentBuyTypeTitle(String buyTypeTitle) {
        this.parentBuyTypeTitle = buyTypeTitle;
    }

    public BuyGroup getParentBuyGroup() {
        return parentBuyGroup;
    }

    public void setParentBuyGroup(BuyGroup parentBuyGroup) {
        this.parentBuyGroup = parentBuyGroup;
    }

    public TypeEffect getParentTypeEffect() {
        return parentTypeEffect;
    }

    public BuyTypeUsage getParentBuyTypeUsage() {
        return parentBuyTypeUsage;
    }

    public void setParentBuyTypeUsage(BuyTypeUsage parentBuyTypeUsage) {
        this.parentBuyTypeUsage = parentBuyTypeUsage;
    }

    public void setParentTypeEffect(TypeEffect parentTypeEffect) {
        this.parentTypeEffect = parentTypeEffect;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerCreditListDTO customerCreditDTO = (CustomerCreditListDTO) o;
        if(customerCreditDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerCreditDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerCreditDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", creditNumber=" + getCreditNumber() +
            ", currentCredit=" + getCurrentCredit() +
            ", credit=" + getCredit() +
            ", currentAmount=" + getCurrentAmount() +
            ", amount=" + getAmount() +
            ", currencyId=" + getCurrencyId() +
            ", currencyRateGroupId=" + getCurrencyRateGroupId() +
            "}";
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getSellContractNo() {
        return sellContractNo;
    }

    public void setSellContractNo(String sellContractNo) {
        this.sellContractNo = sellContractNo;
    }
}
