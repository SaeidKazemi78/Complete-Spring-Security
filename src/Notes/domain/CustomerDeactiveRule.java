package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.DeactiveReason;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;

/**
 * A CustomerDeactiveRule.
 */
@Entity
@Table(name = "customer_deactive_rule")
@Audited
public class CustomerDeactiveRule extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sell_contract_code")
    private String sellContractCode;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "start_period_day")
    private Long startPeriodDay;
    @Column(name = "end_period_day")
    private Long endPeriodDay;
    @Column(name = "periodic")
    private Boolean periodic;
    @Column(name = "by_customer_type")
    private Boolean byCustomerType;

    @Column(name = "description")
    private String description;

    @Column(name = "customer_group")
    @Enumerated(EnumType.STRING)
    private CustomerGroup customerGroup;

    @ManyToMany
    @JoinTable(name = "customer_deactive_rule_location",
               joinColumns = @JoinColumn(name="customer_deactive_rules_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="locations_id", referencedColumnName="id"))
    private Set<Location> locations = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "customer_deactive_rule_customer_type",
               joinColumns = @JoinColumn(name="customer_deactive_rules_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="customer_types_id", referencedColumnName="id"))
    private Set<CustomerType> customerTypes = new HashSet<>();


    @ElementCollection(targetClass = DeactiveReason.class,fetch = FetchType.EAGER)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<DeactiveReason> deactiveReasons = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @DiffIgnore
    private Customer customer;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Long> exceptionCustomers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSellContractCode() {
        return sellContractCode;
    }

    public CustomerDeactiveRule sellContractCode(String sellContractCode) {
        this.sellContractCode = sellContractCode;
        return this;
    }
    public Set<DeactiveReason> getDeactiveReasons() {
        return deactiveReasons;
    }

    public void setDeactiveReasons(Set<DeactiveReason> deactiveReasons) {
        this.deactiveReasons = deactiveReasons;
    }

    public void setSellContractCode(String sellContractCode) {
        this.sellContractCode = sellContractCode;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public CustomerDeactiveRule startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public CustomerDeactiveRule finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public String getDescription() {
        return description;
    }

    public CustomerDeactiveRule description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public CustomerDeactiveRule locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public CustomerDeactiveRule addLocation(Location location) {
        this.locations.add(location);
        location.getCustomerDeactiveRules().add(this);
        return this;
    }

    public CustomerDeactiveRule removeLocation(Location location) {
        this.locations.remove(location);
        location.getCustomerDeactiveRules().remove(this);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<CustomerType> getCustomerTypes() {
        return customerTypes;
    }

    public CustomerDeactiveRule customerTypes(Set<CustomerType> customerTypes) {
        this.customerTypes = customerTypes;
        return this;
    }


    public void setCustomerTypes(Set<CustomerType> customerTypes) {
        this.customerTypes = customerTypes;
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
        CustomerDeactiveRule customerDeactiveRule = (CustomerDeactiveRule) o;
        if (customerDeactiveRule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDeactiveRule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerDeactiveRule{" +
            "id=" + getId() +
            ", sellContractCode='" + getSellContractCode() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Long getStartPeriodDay() {
        return startPeriodDay;
    }

    public void setStartPeriodDay(Long startPeriodDay) {
        this.startPeriodDay = startPeriodDay;
    }

    public Long getEndPeriodDay() {
        return endPeriodDay;
    }

    public void setEndPeriodDay(Long endPeriodDay) {
        this.endPeriodDay = endPeriodDay;
    }

    public Boolean getPeriodic() {
        return periodic;
    }

    public void setPeriodic(Boolean periodic) {
        this.periodic = periodic;
    }

    public Set<Long> getExceptionCustomers() {
        return exceptionCustomers;
    }

    public void setExceptionCustomers(Set<Long> exceptionCustomers) {
        this.exceptionCustomers = exceptionCustomers;
    }

    public Boolean getByCustomerType() {
        return byCustomerType;
    }

    public void setByCustomerType(Boolean byCustomerType) {
        this.byCustomerType = byCustomerType;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }
}
