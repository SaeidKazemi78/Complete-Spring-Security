package ir.donyapardaz.niopdc.base.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;

/**
 * A DTO for the BuyType entity.
 */
public class BuyTypeDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;


    @NotNull
    private BuyGroup buyGroup;

    private Long effectDate;

    @NotNull
    private BuyTypeUsage buyTypeUsage;

    private TypeEffect typeEffect;

    private Boolean sellLimit;


    private Double minCredit;
    private Long minAmount;

    @NotNull
    private Set<CustomerGroup> customerGroups ;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BuyGroup getBuyGroup() {
        return buyGroup;
    }

    public void setBuyGroup(BuyGroup buyGroup) {
        this.buyGroup = buyGroup;
    }

    public Long getEffectDate() {
        return effectDate;
    }

    public void setEffectDate(Long effectDate) {
        this.effectDate = effectDate;
    }

    public BuyTypeUsage getBuyTypeUsage() {
        return buyTypeUsage;
    }

    public void setBuyTypeUsage(BuyTypeUsage buyTypeUsage) {
        this.buyTypeUsage = buyTypeUsage;
    }

    public TypeEffect getTypeEffect() {
        return typeEffect;
    }

    public void setTypeEffect(TypeEffect typeEffect) {
        this.typeEffect = typeEffect;
    }

    public Boolean isSellLimit() {
        return sellLimit;
    }

    public void setSellLimit(Boolean sellLimit) {
        this.sellLimit = sellLimit;
    }

    public Set<CustomerGroup> getCustomerGroups() {
        return customerGroups;
    }

    public void setCustomerGroups(Set<CustomerGroup> customerGroups) {
        this.customerGroups = customerGroups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BuyTypeDTO buyTypeDTO = (BuyTypeDTO) o;
        if(buyTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), buyTypeDTO.getId());
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

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BuyTypeDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", buyGroup='" + getBuyGroup() + "'" +
            ", effectDate=" + getEffectDate() +
            ", buyTypeUsage='" + getBuyTypeUsage() + "'" +
            ", typeEffect='" + getTypeEffect() + "'" +
            ", sellLimit='" + isSellLimit() + "'" +
            "}";
    }
}
