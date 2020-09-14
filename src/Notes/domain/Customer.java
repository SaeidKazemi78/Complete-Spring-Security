package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer",schema = "dbo")
@Audited
public class Customer extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToMany
    @JoinTable(name = "customer_location",
        joinColumns = @JoinColumn(name = "customers_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @DiffIgnore
    private Set<SellContractCustomer> sellContractCustomers = new HashSet<>();

    @Size(min = 3, max = 42)
    @Column(name = "name", length = 255)
    private String name;

    @Size(min = 10, max = 10)
    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Size(min = 1, max = 25)
    @Column(name = "register_code", length = 25)
    private String registerCode;

    @Size(min = 1, max = 20)
    @Column(name = "movable_code", length = 20)
    private String movableCode;

    @NotNull
    @Column(name = "register_date", nullable = false)
    private ZonedDateTime registerDate;

    @Size(min = 3, max = 12)
    @Column(name = "telephone", length = 12)
    private String telephone;

    @Size(min = 3, max = 512)
    @Column(name = "address", length = 512)
    private String address;


    @Column(name = "valid",columnDefinition = "boolean default false")
    private Boolean valid = false;

    @Column(name = "buy_one_to_many")
    private Boolean buyOneToMany;

    @Column(name = "sales_permit")
    private Boolean salesPermit;

    @Column(name = "identify_code")
    private String identifyCode;

    @Size(max = 9)
    @Column(name = "gs_id", length = 9)
    private String gsId;

    @Size(min = 1, max = 20)
    @Column(name = "credit_account", length = 20)
    private String creditAccount;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    @DiffIgnore
    private CustomerStationInfo customerStationInfo;


    @OneToMany(mappedBy = "customer" ,fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<CustomerVisit> customerVisits = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @ShallowReference
    private CustomerType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region region;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "archive")
    private Boolean archive;

    @Column(nullable = false)
    @ElementCollection
    private Set<Long> refuelCenterIds = new HashSet<>();

    @Column(name = "plaque")
    private String plaque;

    @Column(name = "plaque_two")
    private String plaqueTwo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @ShallowReference
    private Product product;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @OrderBy("tankNo")
    private Set<CarTank> carTanks = new HashSet<>();

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<CarRfId> carRfIds = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private VehicleModel vehicleModel;


    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<CustomerDeactiveRule> customerDeactiveRules = new HashSet<>();

    @Column(name = "plaque_template_code")
    private String plaqueTemplateCode;

    @Column(name = "plaque_two_template_code")
    private String plaqueTwoTemplateCode;


    @Column(name = "car_rf_id")
    private String carRfId;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    @DiffIgnore
    private Set<CustomerCapacity> customerCapacities = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    private Country country;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }


    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean isBuyOneToMany() {
        return buyOneToMany;
    }


    public void setBuyOneToMany(Boolean buyOneToMany) {
        this.buyOneToMany = buyOneToMany;
    }

    public Boolean isSalesPermit() {
        return salesPermit;
    }

    public Customer salesPermit(Boolean salesPermit) {
        this.salesPermit = salesPermit;
        return this;
    }

    public Boolean isValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public void setSalesPermit(Boolean salesPermit) {
        this.salesPermit = salesPermit;
    }

    public String getIdentifyCode() {
        return identifyCode;
    }


    public void setIdentifyCode(String identifyCode) {
        this.identifyCode = identifyCode;
    }

    public String getGsId() {
        return gsId;
    }


    public void setGsId(String gsId) {
        this.gsId = gsId;
    }

    public Set<CustomerVisit> getCustomerVisits() {
        return customerVisits;
    }

    public Customer customerVisits(Set<CustomerVisit> customerVisits) {
        this.customerVisits = customerVisits;
        return this;
    }

    public Customer addCustomerVisit(CustomerVisit customerVisit) {
        this.customerVisits.add(customerVisit);
        customerVisit.setCustomer(this);
        return this;
    }

    public Customer removeCustomerVisit(CustomerVisit customerVisit) {
        this.customerVisits.remove(customerVisit);
        customerVisit.setCustomer(null);
        return this;
    }

    public void setCustomerVisits(Set<CustomerVisit> customerVisits) {
        this.customerVisits = customerVisits;
    }

    public CustomerType getType() {
        return type;
    }


    public void setType(CustomerType customerType) {
        this.type = customerType;
    }

    public Region getRegion() {
        return region;
    }


    public void setRegion(Region region) {
        this.region = region;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getRegisterCode() {
        return registerCode;
    }

    public void setRegisterCode(String registerCode) {
        this.registerCode = registerCode;
    }

    public String getMovableCode() {
        return movableCode;
    }

    public void setMovableCode(String movableCode) {
        this.movableCode = movableCode;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public CustomerStationInfo getCustomerStationInfo() {
        return customerStationInfo;
    }

    public void setCustomerStationInfo(CustomerStationInfo customerStationInfo) {
        this.customerStationInfo = customerStationInfo;
    }

    public Customer customerStationInfo(CustomerStationInfo customerStationInfo) {
        this.customerStationInfo = customerStationInfo;
        return this;
    }

    public Set<SellContractCustomer> getSellContractCustomers() {
        return sellContractCustomers;
    }

    public void setSellContractCustomers(Set<SellContractCustomer> sellContractCustomers) {
        this.sellContractCustomers = sellContractCustomers;
    }

/*    public AirplaneModel getAirplaneModel() {
        return airplaneModel;
    }

    public void setAirplaneModel(AirplaneModel airplaneModel) {
        this.airplaneModel = airplaneModel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove*/


    public Product getProduct() {
        return product;
    }

    public Customer setProduct(Product product) {
        this.product = product;
        return this;
    }

    public Customer removeSellContractCustomer(SellContractCustomer sellContractCustomer) {
        this.sellContractCustomers.remove(sellContractCustomer);
        sellContractCustomer.setCustomer(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
    public Set<CustomerCapacity> getCustomerCapacities() {
        return customerCapacities;
    }

    public void setCustomerCapacities(Set<CustomerCapacity> customerCapacities) {
        this.customerCapacities = customerCapacities;
    }

    public Customer customerCapacities(Set<CustomerCapacity> customerCapacities) {
        this.customerCapacities = customerCapacities;
        return this;
    }

    public Customer addCustomerCapacities(CustomerCapacity customerCapacity) {
        this.customerCapacities.add(customerCapacity);
        customerCapacity.setCustomer(this);
        return this;
    }

    public Customer removeCustomerCapacities(CustomerCapacity customerCapacity) {
        this.customerCapacities.remove(customerCapacity);
        customerCapacity.setCustomer(null);
        return this;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", registerCode='" + getRegisterCode() + "'" +
            ", movableCode='" + getMovableCode() + "'" +
            ", registerDate='" + getRegisterDate() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", address='" + getAddress() + "'" +
            ", buyOneToMany='" + isBuyOneToMany() + "'" +
            ", salesPermit='" + isSalesPermit() + "'" +
            ", identifyCode='" + getIdentifyCode() + "'" +
            ", gsId='" + getGsId() + "'" +
            "}";
    }

    public Set<CarTank> getCarTanks() {
        return carTanks;
    }

    public Customer setCarTanks(Set<CarTank> carTanks) {
        this.carTanks = carTanks;
        return this;
    }

    public Set<CarRfId> getCarRfIds() {
        return carRfIds;
    }

    public Customer setCarRfIds(Set<CarRfId> carRfIds) {
        this.carRfIds = carRfIds;
        return this;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public VehicleModel getVehicleModel() {
        return vehicleModel;
    }

    public Customer setVehicleModel(VehicleModel vehicleModel) {
        this.vehicleModel = vehicleModel;
        return this;
    }

    public Set<CustomerDeactiveRule> getCustomerDeactiveRules() {
        return customerDeactiveRules;
    }

    public void setCustomerDeactiveRules(Set<CustomerDeactiveRule> customerDeactiveRules) {
        this.customerDeactiveRules = customerDeactiveRules;
    }

    public Set<Long> getRefuelCenterIds() {
        return refuelCenterIds;
    }

    public void setRefuelCenterIds(Set<Long> refuelCenterIds) {
        this.refuelCenterIds = refuelCenterIds;
    }

    public String getPlaqueTemplateCode() {
        return plaqueTemplateCode;
    }

    public void setPlaqueTemplateCode(String plaqueTemplateCode) {
        this.plaqueTemplateCode = plaqueTemplateCode;
    }

    public String getPlaqueTwoTemplateCode() {
        return plaqueTwoTemplateCode;
    }

    public void setPlaqueTwoTemplateCode(String plaqueTwoTemplateCode) {
        this.plaqueTwoTemplateCode = plaqueTwoTemplateCode;
    }

    public String getCarRfId() {
        return carRfId;
    }

    public void setCarRfId(String carRfId) {
        this.carRfId = carRfId;
    }

    public String getPlaqueTwo() {
        return plaqueTwo;
    }

    public void setPlaqueTwo(String plaqueTwo) {
        this.plaqueTwo = plaqueTwo;
    }


    public String getPlaque() {
        return plaque;
    }

    public void setPlaque(String plaque) {
        this.plaque = plaque;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}
