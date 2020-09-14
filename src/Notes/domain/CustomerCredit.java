package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import ir.donyapardaz.niopdc.base.validation.global.DateRange;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A CustomerCredit.
 */
@Entity
@Table(name = "customer_credit")
@Audited
@DateRange(first = "startDate", second = "finishDate")
@JsonIdentityInfo(generator = ObjectIdGenerators.UUIDGenerator.class, property = "@UUID")
public class CustomerCredit extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @NotNull
    @Column(name = "exportation_date", nullable = false)
    private ZonedDateTime exportationDate;

    @NotNull
    @Column(name = "credit_number", nullable = false)
    private Integer creditNumber;

    @Column(name = "current_credit")
    private Double currentCredit;

    @Column(name = "credit")
    private Double credit;

    @Column(name = "current_amount")
    private Double currentAmount;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "currency_id")
    private Long currencyId;

    @Column(name = "currency_rate_group_id")
    private Long currencyRateGroupId;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private BuyType parentBuyType;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person person;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private SellContractProduct product;

    @Column(name = "min_credit")
    private Double minCredit;

    @Column(name = "min_amount")
    private Double minAmount;

    @Column(name = "has_allowed_days")
    private Boolean hasAllowedDays;

    @Column(name = "active")
    private Boolean active;

    @OneToMany(mappedBy = "customerCredit", cascade = CascadeType.ALL)
    @JsonIgnore
    @ShallowReference
    @JsonManagedReference("customerCreditAllowedDays")
    private Set<CustomerCreditAllowedDay> customerCreditAllowedDays = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public CustomerCredit startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public CustomerCredit finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public ZonedDateTime getExportationDate() {
        return exportationDate;
    }

    public void setExportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
    }

    public CustomerCredit exportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
        return this;
    }

    public Integer getCreditNumber() {
        return creditNumber;
    }

    public void setCreditNumber(Integer creditNumber) {
        this.creditNumber = creditNumber;
    }

    public CustomerCredit creditNumber(Integer creditNumber) {
        this.creditNumber = creditNumber;
        return this;
    }

    public Double getCurrentCredit() {
        return currentCredit;
    }

    public void setCurrentCredit(Double currentCredit) {
        this.currentCredit = currentCredit;
    }

    public CustomerCredit currentCredit(Double currentCredit) {
        this.currentCredit = currentCredit;
        return this;
    }

    public Double getCredit() {
        return credit;
    }

    public void setCredit(Double credit) {
        this.credit = credit;
    }

    public CustomerCredit credit(Double credit) {
        this.credit = credit;
        return this;
    }

    public Double getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Double currentAmount) {
        this.currentAmount = currentAmount;
    }

    public CustomerCredit currentAmount(Double currentAmount) {
        this.currentAmount = currentAmount;
        return this;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public CustomerCredit amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public Long getCurrencyId() {
        return currencyId;
    }

    public void setCurrencyId(Long currencyId) {
        this.currencyId = currencyId;
    }

    public CustomerCredit currencyId(Long currencyId) {
        this.currencyId = currencyId;
        return this;
    }

    public Long getCurrencyRateGroupId() {
        return currencyRateGroupId;
    }

    public void setCurrencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
    }

    public CustomerCredit currencyRateGroupId(Long currencyRateGroupId) {
        this.currencyRateGroupId = currencyRateGroupId;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public CustomerCredit customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public BuyType getParentBuyType() {
        return parentBuyType;
    }

    public void setParentBuyType(BuyType buyType) {
        this.parentBuyType = buyType;
    }

    public CustomerCredit parentBuyType(BuyType buyType) {
        this.parentBuyType = buyType;
        return this;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public CustomerCredit person(Person person) {
        this.person = person;
        return this;
    }

    public SellContractProduct getProduct() {
        return product;
    }

    public void setProduct(SellContractProduct sellContractProduct) {
        this.product = sellContractProduct;
    }

    public CustomerCredit product(SellContractProduct sellContractProduct) {
        this.product = sellContractProduct;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerCredit customerCredit = (CustomerCredit) o;
        if (customerCredit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerCredit.getId());
    }


    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerCredit{" +
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

    public Boolean getHasAllowedDays() {
        return hasAllowedDays;
    }

    public void setHasAllowedDays(Boolean hasAllowedDays) {
        this.hasAllowedDays = hasAllowedDays;
    }

    public Set<CustomerCreditAllowedDay> getCustomerCreditAllowedDays() {
        return customerCreditAllowedDays;
    }

    public void setCustomerCreditAllowedDays(Set<CustomerCreditAllowedDay> customerCreditAllowedDays) {
        this.customerCreditAllowedDays = customerCreditAllowedDays;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
