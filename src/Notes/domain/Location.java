package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.TranshipType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.*;


/**
 * A Location.
 */
@Entity
@Table(name = "location",
    uniqueConstraints = @UniqueConstraint(columnNames = {"location_parent_id", "code"}))
@Audited
public class Location extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "name", length = 42, nullable = false, columnDefinition = "nvarchar(42)")
    private String name;

    @NotNull
//    @Size(min = 2, max = 4)bv
    @Column(name = "code", length = 4, nullable = false)
    private String code;

    @Column(name = "rmto_code")
    private String rmtoCode;

    //    @Size(min = 4, max = 4)
    @Column(name = "financial_code", length = 5)
    private String financialCode;

    @Size(min = 5, max = 20)
    @Column(name = "cost_account", length = 20)
    private String costAccount;

    @Column(name = "state_code")
    private String stateCode;

    @Column(name = "jhi_level")
    private Integer level;

    @Column(name = "far_country")
    private Boolean farCountry;
    @Column(name = "pump_before_control")
    private Boolean pumpBeforeControl;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Location locationParent;

    @OneToMany(mappedBy = "locationParent")
    @JsonIgnore
    @DiffIgnore
    private Set<Location> subLocations = new HashSet<>();


    @ManyToMany(mappedBy = "locations", cascade = CascadeType.ALL)
    @JsonIgnore
    @DiffIgnore
    private Set<Depot> depots = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "location_region",
        joinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "regions_id", referencedColumnName = "id"))
    @DiffIgnore
    private Set<Region> regions = new HashSet<>();

    @Column(name = "have_boundary_sell")
    private Boolean haveBoundarySell;

    @Enumerated(EnumType.STRING)
    @Column(name = "tranship_type")
    private TranshipType transhipType;

    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    @DiffIgnore
    private Set<Person> people = new HashSet<>();

    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    @DiffIgnore
    private Set<Customer> customers = new HashSet<>();

    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    @DiffIgnore
    private Set<News> news = new HashSet<>();

    @Column(name = "day")
    private ZonedDateTime day;


    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @DiffIgnore
    private Set<CustomerDeactiveRule> customerDeactiveRules = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    @DiffIgnore
    private Country country;

    @Column(name = "before_control")
    private Boolean beforeControl;

    @Column(name = "before_control_tranship")
    private Boolean beforeControlTranship;

    @Column(name = "tolerance")
    private Long tolerance;

    @Column(name = "has_depot")
    private Boolean hasDepot;

    @Column(name = "doc_for_parent_location")
    private Boolean docForParentLocation;

    @Column(name = "checkbook_account_number")
    private String checkbookAccountNumber;

    @ElementCollection
    private List<Long> bankAccountTypeIds = new ArrayList<>();

    @Column(name = "boundary_exemption")
    private Long boundaryExemption;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getBeforeControlTranship() {
        return beforeControlTranship;
    }

    public void setBeforeControlTranship(Boolean beforeControlTranship) {
        this.beforeControlTranship = beforeControlTranship;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }


    public String getFinancialCode() {
        return financialCode;
    }

    public void setFinancialCode(String financialCode) {
        this.financialCode = financialCode;
    }

    public Location financialCode(String financialCode) {
        this.financialCode = financialCode;
        return this;
    }

    public Set<News> getNews() {
        return news;
    }

    public void setNews(Set<News> news) {
        this.news = news;
    }
    public String getCostAccount() {
        return costAccount;
    }

    public void setCostAccount(String costAccount) {
        this.costAccount = costAccount;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Boolean getFarCountry() {
        return farCountry;
    }

    public void setFarCountry(Boolean farCountry) {
        this.farCountry = farCountry;
    }

    public Boolean getPumpBeforeControl() {
        return pumpBeforeControl;
    }

    public void setPumpBeforeControl(Boolean pumpBeforeControl) {
        this.pumpBeforeControl = pumpBeforeControl;
    }

    public Location getLocationParent() {
        return locationParent;
    }

    public void setLocationParent(Location location) {
        this.locationParent = location;
    }


    public Set<Region> getRegions() {
        return regions;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }


    public Set<Depot> getDepots() {
        return depots;
    }

    public void setDepots(Set<Depot> depots) {
        this.depots = depots;
    }


    public Set<Person> getPeople() {
        return people;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
    }



    public Set<Location> getSubLocations() {
        return subLocations;
    }

    public void setSubLocations(Set<Location> subLocations) {
        this.subLocations = subLocations;
    }


    public Set<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public ZonedDateTime getDay() {
        return day;
    }

    public void setDay(ZonedDateTime day) {
        this.day = day;
    }

    public Set<CustomerDeactiveRule> getCustomerDeactiveRules() {
        return customerDeactiveRules;
    }

    public void setCustomerDeactiveRules(Set<CustomerDeactiveRule> customerDeactiveRules) {
        this.customerDeactiveRules = customerDeactiveRules;
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
        Location location = (Location) o;
        if (location.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), location.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Location{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", financialCode='" + getFinancialCode() + "'" +
            ", costAccount='" + getCostAccount() + "'" +
            ", level=" + getLevel() +
            "}";
    }

    public Boolean getHaveBoundarySell() {
        return haveBoundarySell;
    }

    public void setHaveBoundarySell(Boolean haveBoundarySell) {
        this.haveBoundarySell = haveBoundarySell;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Boolean getBeforeControl() {
        return beforeControl;
    }

    public void setBeforeControl(Boolean beforeControl) {
        this.beforeControl = beforeControl;
    }

    public TranshipType getTranshipType() {
        return transhipType;
    }

    public void setTranshipType(TranshipType transhipType) {
        this.transhipType = transhipType;
    }

    public Long getTolerance() {
        return tolerance;
    }

    public void setTolerance(Long tolerance) {
        this.tolerance = tolerance;
    }

    public Boolean getHasDepot() {
        return hasDepot;
    }

    public void setHasDepot(Boolean hasDepot) {
        this.hasDepot = hasDepot;
    }

    public String getCheckbookAccountNumber() {
        return checkbookAccountNumber;
    }

    public void setCheckbookAccountNumber(String checkbookAccountNumber) {
        this.checkbookAccountNumber = checkbookAccountNumber;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public List<Long> getBankAccountTypeIds() {
        return bankAccountTypeIds;
    }

    public void setBankAccountTypeIds(List<Long> bankAccountTypeIds) {
        this.bankAccountTypeIds = bankAccountTypeIds;
    }

    public Long getBoundaryExemption() {
        return boundaryExemption;
    }

    public void setBoundaryExemption(Long boundaryExemption) {
        this.boundaryExemption = boundaryExemption;
    }

    public String getRmtoCode() {
        return rmtoCode;
    }

    public void setRmtoCode(String rmtoCode) {
        this.rmtoCode = rmtoCode;
    }

    public Boolean getDocForParentLocation() {
        return docForParentLocation;
    }

    public void setDocForParentLocation(Boolean docForParentLocation) {
        this.docForParentLocation = docForParentLocation;
    }
}
