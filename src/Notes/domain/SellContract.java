package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;
import org.javers.core.metamodel.annotation.ValueObject;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A SellContract.
 */
@Entity
@Table(name = "sell_contract",
    uniqueConstraints = @UniqueConstraint(columnNames = {"contract_no", "addendum_number"}))
@Audited
public class SellContract extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "finish_date", nullable = false)
    private ZonedDateTime finishDate;

    @NotNull
    @Column(name = "exportation_date", nullable = false)
    private ZonedDateTime exportationDate;

    @NotNull
    @Size(min = 3, max = 15)
    @Column(name = "contract_no", length = 15, nullable = false)
    private String contractNo;

    @Column(name = "description", length = 255)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "contract_type")
    private ContractType contractType;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "archive")
    private Boolean archive;

    @Column(name = "addendum_number")
    private Integer addendumNumber;

    @Column(name = "addendum_date")
    private ZonedDateTime addendumDate;

    @Column(name = "calculate_tax")
    private Boolean calculateTax;

    @OneToMany(mappedBy = "sellContract", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SellContractPerson> sellContractPeople = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "sell_contract_location",
        joinColumns = @JoinColumn(name="sell_contracts_id", referencedColumnName="id"),
        inverseJoinColumns = @JoinColumn(name="locations_id", referencedColumnName="id"))
    @ShallowReference
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "sellContract", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<SellContractCustomer> sellContractCustomers = new HashSet<>();

    @OneToMany(mappedBy = "sellContract")
    @DiffIgnore
    private Set<SellContractProduct> sellContractProducts = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private SellContract parent;

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

    public SellContract startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public SellContract finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public ZonedDateTime getExportationDate() {
        return exportationDate;
    }

    public SellContract exportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
        return this;
    }

    public void setExportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
    }

    public String getContractNo() {
        return contractNo;
    }

    public SellContract contractNo(String contractNo) {
        this.contractNo = contractNo;
        return this;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getDescription() {
        return description;
    }

    public SellContract description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public SellContract contractType(ContractType contractType) {
        this.contractType = contractType;
        return this;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Boolean isActive() {
        return active;
    }

    public SellContract active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public SellContract locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }


    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<SellContractProduct> getSellContractProducts() {
        return sellContractProducts;
    }

    public SellContract sellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
        return this;
    }

    public SellContract addSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.add(sellContractProduct);
        sellContractProduct.setSellContract(this);
        return this;
    }

    public SellContract removeSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.remove(sellContractProduct);
        sellContractProduct.setSellContract(null);
        return this;
    }

    public void setSellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
    }

    public Set<SellContractCustomer> getSellContractCustomers() {
        return sellContractCustomers;
    }

    public SellContract sellContractCustomers(Set<SellContractCustomer> sellContractCustomers) {
        this.sellContractCustomers = sellContractCustomers;
        return this;
    }

    public SellContract addSellContractCustomer(SellContractCustomer sellContractCustomer) {
        this.sellContractCustomers.add(sellContractCustomer);
        sellContractCustomer.setSellContract(this);
        return this;
    }

    public SellContract removeSellContractCustomer(SellContractCustomer sellContractCustomer) {
        this.sellContractCustomers.remove(sellContractCustomer);
        sellContractCustomer.setSellContract(null);
        return this;
    }

    public void setSellContractCustomers(Set<SellContractCustomer> sellContractCustomers) {
        this.sellContractCustomers = sellContractCustomers;
    }

    public Set<SellContractPerson> getSellContractPeople() {
        return sellContractPeople;
    }

    public SellContract sellContractPeople(Set<SellContractPerson> sellContractPeople) {
        this.sellContractPeople = sellContractPeople;
        return this;
    }

    public SellContract addSellContractPerson(SellContractPerson sellContractPerson) {
        this.sellContractPeople.add(sellContractPerson);
        sellContractPerson.setSellContract(this);
        return this;
    }

    public SellContract removeSellContractPerson(SellContractPerson sellContractPerson) {
        this.sellContractPeople.remove(sellContractPerson);
        sellContractPerson.setSellContract(null);
        return this;
    }

    public void setSellContractPeople(Set<SellContractPerson> sellContractPeople) {
        this.sellContractPeople = sellContractPeople;
    }

    public Boolean getCalculateTax() {
        return calculateTax;
    }

    public void setCalculateTax(Boolean calculateTax) {
        this.calculateTax = calculateTax;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    public Integer getAddendumNumber() {
        return addendumNumber;
    }

    public void setAddendumNumber(Integer addendumNumber) {
        this.addendumNumber = addendumNumber;
    }

    public ZonedDateTime getAddendumDate() {
        return addendumDate;
    }

    public void setAddendumDate(ZonedDateTime addendumDate) {
        this.addendumDate = addendumDate;
    }

    public SellContract getParent() {
        return parent;
    }

    public void setParent(SellContract parent) {
        this.parent = parent;
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
        SellContract sellContract = (SellContract) o;
        if (sellContract.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContract.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContract{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", exportationDate='" + getExportationDate() + "'" +
            ", contractNo='" + getContractNo() + "'" +
            ", description='" + getDescription() + "'" +
            ", contractType='" + getContractType() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }



}
