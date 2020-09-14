package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.config.DatabaseConfiguration;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A BuyType.
 */
@Entity
@Table(name = "buy_type")
@Audited
public class BuyType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false)
    private String title;


    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "buy_group", nullable = false)
    private BuyGroup buyGroup;

    @Column(name = "effect_date")
    private Long effectDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "buy_type_usage", nullable = false)
    private BuyTypeUsage buyTypeUsage;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_effect")
    private TypeEffect typeEffect;

    @Column(name = "sell_limit")
    private Boolean sellLimit;

    @ManyToMany(mappedBy = "buyTypes")
    @JsonIgnore
    @DiffIgnore
    private Set<SellContractProduct> sellContractProducts = new HashSet<>();


    @Column(name = "min_credit")
    private Double minCredit;

    @Column(name = "min_amount")
    private Double minAmount;

    @ElementCollection(targetClass = CustomerGroup.class)
    @Enumerated(EnumType.STRING)
    private Set<CustomerGroup> customerGroups = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public BuyType title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BuyGroup getBuyGroup() {
        return buyGroup;
    }

    public BuyType buyGroup(BuyGroup buyGroup) {
        this.buyGroup = buyGroup;
        return this;
    }

    public void setBuyGroup(BuyGroup buyGroup) {
        this.buyGroup = buyGroup;
    }

    public Long getEffectDate() {
        return effectDate;
    }

    public BuyType effectDate(Long effectDate) {
        this.effectDate = effectDate;
        return this;
    }

    public void setEffectDate(Long effectDate) {
        this.effectDate = effectDate;
    }

    public BuyTypeUsage getBuyTypeUsage() {
        return buyTypeUsage;
    }

    public BuyType buyTypeUsage(BuyTypeUsage buyTypeUsage) {
        this.buyTypeUsage = buyTypeUsage;
        return this;
    }

    public void setBuyTypeUsage(BuyTypeUsage buyTypeUsage) {
        this.buyTypeUsage = buyTypeUsage;
    }

    public TypeEffect getTypeEffect() {
        return typeEffect;
    }

    public BuyType typeEffect(TypeEffect typeEffect) {
        this.typeEffect = typeEffect;
        return this;
    }

    public void setTypeEffect(TypeEffect typeEffect) {
        this.typeEffect = typeEffect;
    }

    public Boolean isSellLimit() {
        return sellLimit;
    }

    public BuyType sellLimit(Boolean sellLimit) {
        this.sellLimit = sellLimit;
        return this;
    }

    public void setSellLimit(Boolean sellLimit) {
        this.sellLimit = sellLimit;
    }

    public Set<SellContractProduct> getSellContractProducts() {
        return sellContractProducts;
    }

    public BuyType sellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
        return this;
    }

    public BuyType addSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.add(sellContractProduct);
        sellContractProduct.getBuyTypes().add(this);
        return this;
    }

    public BuyType removeSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.remove(sellContractProduct);
        sellContractProduct.getBuyTypes().remove(this);
        return this;
    }

    public void setSellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BuyType buyType = (BuyType) o;
        if (buyType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), buyType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BuyType{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", buyGroup='" + getBuyGroup() + "'" +
            ", effectDate=" + getEffectDate() +
            ", buyTypeUsage='" + getBuyTypeUsage() + "'" +
            ", typeEffect='" + getTypeEffect() + "'" +
            ", sellLimit='" + isSellLimit() + "'" +
            "}";
    }

    public Double getMinCredit() {
        return minCredit;
    }

    public void setMinCredit(Double minCredit) {
        this.minCredit = minCredit;
    }

    public Double getMinAmount() {
        return minAmount;
    }

    public void setMinAmount(Double minAmount) {
        this.minAmount = minAmount;
    }

    public Set<CustomerGroup> getCustomerGroups() {
        return customerGroups;
    }

    public void setCustomerGroups(Set<CustomerGroup> customerGroups) {
        this.customerGroups = customerGroups;
    }
}
