package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A SellContractProduct.
 */
@Entity
@Table(name = "sell_contract_product")
@Audited
public class SellContractProduct extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rate_group_id")
    private Long rateGroupId;

    @Column(name = "product_rate_id")
    private Long productRateId;

    @NotNull
    @Column(name = "currency_rate_group_id", nullable = false)
    private Long currencyRateGroupId;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "finish_date", nullable = false)
    private ZonedDateTime finishDate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Consumption consumption;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private SellContractCustomer sellContractCustomer;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private SellContract sellContract;

    @ManyToMany
        @NotNull
    @JoinTable(name = "sell_contract_product_depot",
        joinColumns = @JoinColumn(name = "sell_contract_products_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "depots_id", referencedColumnName = "id"))
    @ShallowReference
    private Set<Depot> depots = new HashSet<>();

    @ManyToMany
        @NotNull
    @JoinTable(name = "sell_contract_product_buy_type",
        joinColumns = @JoinColumn(name = "sell_contract_products_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "buy_types_id", referencedColumnName = "id"))
    @ShallowReference
    private Set<BuyType> buyTypes = new HashSet<>();


    @Column(nullable = false)
    @ElementCollection
    private Set<Long> costGroupIds;

    @Column(nullable = false)
    @ElementCollection
    private Set<Long> currencyIds;

    @ElementCollection(targetClass = TypeOfFuelReceipt.class)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<TypeOfFuelReceipt> typeOfFuelReceipts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRateGroupId() {
        return rateGroupId;
    }

    public void setRateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
    }

    public SellContractProduct rateGroupId(Long rateGroupId) {
        this.rateGroupId = rateGroupId;
        return this;
    }

    public Long getProductRateId() {
        return productRateId;
    }

    public void setProductRateId(Long productRateId) {
        this.productRateId = productRateId;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public SellContractProduct currencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
        return this;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public SellContractProduct startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public SellContractProduct finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public Consumption getConsumption() {
        return consumption;
    }

    public void setConsumption(Consumption consumption) {
        this.consumption = consumption;
    }

    public SellContractProduct consumption(Consumption consumption) {
        this.consumption = consumption;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public SellContractProduct product(Product product) {
        this.product = product;
        return this;
    }

    public SellContractCustomer getSellContractCustomer() {
        return sellContractCustomer;
    }

    public void setSellContractCustomer(SellContractCustomer sellContractCustomer) {
        this.sellContractCustomer = sellContractCustomer;
    }

    public SellContractProduct sellContractCustomer(SellContractCustomer sellContractCustomer) {
        this.sellContractCustomer = sellContractCustomer;
        return this;
    }

    public SellContract getSellContract() {
        return sellContract;
    }

    public SellContractProduct sellContract(SellContract sellContract) {
        this.sellContract = sellContract;
        return this;
    }

    public void setSellContract(SellContract sellContract) {
        this.sellContract = sellContract;
    }

    public Set<Depot> getDepots() {
        return depots;
    }

    public Long getSellContractId() {
        if (sellContractCustomer != null) return sellContractCustomer.getId();
        else if (sellContract != null) return sellContract.getId();
        else return null;
    }

    public void setDepots(Set<Depot> depots) {
        this.depots = depots;
    }

    public SellContractProduct depots(Set<Depot> depots) {
        this.depots = depots;
        return this;
    }

    public SellContractProduct addDepot(Depot depot) {
        this.depots.add(depot);
        depot.getSellContractProducts().add(this);
        return this;
    }

    public SellContractProduct removeDepot(Depot depot) {
        this.depots.remove(depot);
        depot.getSellContractProducts().remove(this);
        return this;
    }

    public Set<BuyType> getBuyTypes() {
        return buyTypes;
    }

    public void setBuyTypes(Set<BuyType> buyTypes) {
        this.buyTypes = buyTypes;
    }

    public SellContractProduct buyTypes(Set<BuyType> buyTypes) {
        this.buyTypes = buyTypes;
        return this;
    }

    public SellContractProduct addBuyType(BuyType buyType) {
        this.buyTypes.add(buyType);
        buyType.getSellContractProducts().add(this);
        return this;
    }

    public SellContractProduct removeBuyType(BuyType buyType) {
        this.buyTypes.remove(buyType);
        buyType.getSellContractProducts().remove(this);
        return this;
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
        SellContractProduct sellContractProduct = (SellContractProduct) o;
        if (sellContractProduct.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractProduct.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractProduct{" +
            "id=" + getId() +
            ", rateGroupId=" + getRateGroupId() +
            ", currencyRateGroupId=" + getCurrencyRateGroupId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            "}";
    }

    public Set<Long> getCostGroupIds() {
        return costGroupIds;
    }

    public void setCostGroupIds(Set<Long> costGroupIds) {
        this.costGroupIds = costGroupIds;
    }

    public Set<Long> getCurrencyIds() {
        return currencyIds;
    }

    public void setCurrencyIds(Set<Long> currencyIds) {
        this.currencyIds = currencyIds;
    }

    public Set<TypeOfFuelReceipt> getTypeOfFuelReceipts() {
        return typeOfFuelReceipts;
    }

    public void setTypeOfFuelReceipts(Set<TypeOfFuelReceipt> typeOfFuelReceipts) {
        this.typeOfFuelReceipts = typeOfFuelReceipts;
    }
}
