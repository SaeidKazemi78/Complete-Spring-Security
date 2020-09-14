package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.CustomerCreditAllowedDay;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import ir.donyapardaz.niopdc.base.validation.global.DateRange;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the CustomerCredit entity.
 */
@DateRange(first = "startDate", second = "finishDate")
public class CustomerCreditDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    @NotNull
    private ZonedDateTime exportationDate;

    @NotNull
    private Integer creditNumber;

    private Double currentCredit;

    private Double credit;

    private Double currentAmount;

    private Double amount;

    private Long currencyId;

    private Long currencyRateGroupId;

    private Long customerId;

    private String customerName;

    private Long parentBuyTypeId;

    private Double parentBuyTypeMinCredit;

    private Double parentBuyTypeMinAmount;

    private String parentBuyTypeTitle;

    private BuyGroup parentBuyGroup;

    private TypeEffect parentTypeEffect;

    private BuyTypeUsage parentBuyTypeUsage;

    private Long personId;

    private String personName;

    private Long productId;

    private String productTitle;

    private Double minCredit;
    private Long minAmount;

    private Boolean hasAllowedDays;

    private Boolean active;

    private Set<CustomerCreditAllowedDayDTO> customerCreditAllowedDays = new HashSet<>();

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

    public ZonedDateTime getExportationDate() {
        return exportationDate;
    }

    public void setExportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
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

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Double currentAmount) {
        this.currentAmount = currentAmount;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
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

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long sellContractProductId) {
        this.productId = sellContractProductId;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
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

    public void setParentTypeEffect(TypeEffect parentTypeEffect) {
        this.parentTypeEffect = parentTypeEffect;
    }

    public BuyTypeUsage getParentBuyTypeUsage() {
        return parentBuyTypeUsage;
    }

    public void setParentBuyTypeUsage(BuyTypeUsage parentBuyTypeUsage) {
        this.parentBuyTypeUsage = parentBuyTypeUsage;
    }

    public Double getMinCredit() {
        return minCredit;
    }

    public void setMinCredit(Double minCredit) {
        this.minCredit = minCredit;
    }

    public Long getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(Long minAmount) {
        this.minAmount = minAmount;
    }

    public Double getParentBuyTypeMinCredit() {
        return parentBuyTypeMinCredit;
    }

    public void setParentBuyTypeMinCredit(Double parentBuyTypeMinCredit) {
        this.parentBuyTypeMinCredit = parentBuyTypeMinCredit;
    }

    public Double getParentBuyTypeMinAmount() {
        return parentBuyTypeMinAmount;
    }

    public void setParentBuyTypeMinAmount(Double parentBuyTypeMinAmount) {
        this.parentBuyTypeMinAmount = parentBuyTypeMinAmount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerCreditDTO customerCreditDTO = (CustomerCreditDTO) o;
        if (customerCreditDTO.getId() == null || getId() == null) {
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
            ", exportationDate='" + getExportationDate() + "'" +
            ", creditNumber=" + getCreditNumber() +
            ", currentCredit=" + getCurrentCredit() +
            ", credit=" + getCredit() +
            ", currentAmount=" + getCurrentAmount() +
            ", amount=" + getAmount() +
            ", currencyId=" + getCurrencyId() +
            ", currencyRateGroupId=" + getCurrencyRateGroupId() +
            "}";
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Set<CustomerCreditAllowedDayDTO> getCustomerCreditAllowedDays() {
        return customerCreditAllowedDays;
    }

    public void setCustomerCreditAllowedDays(Set<CustomerCreditAllowedDayDTO> customerCreditAllowedDays) {
        this.customerCreditAllowedDays = customerCreditAllowedDays;
    }

    public Boolean getHasAllowedDays() {
        return hasAllowedDays;
    }

    public void setHasAllowedDays(Boolean hasAllowedDays) {
        this.hasAllowedDays = hasAllowedDays;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
