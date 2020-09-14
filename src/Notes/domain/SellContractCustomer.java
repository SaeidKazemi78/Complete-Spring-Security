package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
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
 * A SellContractCustomer.
 */
@Entity
@Table(name = "sell_contract_customer")
@Audited
public class SellContractCustomer extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "has_transport")
    private Boolean hasTransport;

    @Size(min = 1, max = 20)
    @Column(name = "credit_account", length = 20)
    private String creditAccount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private SellContract sellContract;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Location location;

    @OneToMany(mappedBy = "sellContractCustomer")
    @JsonIgnore
        @ShallowReference
    private Set<SellContractProduct> sellContractProducts = new HashSet<>();

    @Column(nullable = false)
    @ElementCollection
    private Set<Long> costGroupIds;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isHasTransport() {
        return hasTransport;
    }

    public SellContractCustomer hasTransport(Boolean hasTransport) {
        this.hasTransport = hasTransport;
        return this;
    }

    public void setHasTransport(Boolean hasTransport) {
        this.hasTransport = hasTransport;
    }

    public SellContract getSellContract() {
        return sellContract;
    }

    public SellContractCustomer sellContract(SellContract sellContract) {
        this.sellContract = sellContract;
        return this;
    }

    public void setSellContract(SellContract sellContract) {
        this.sellContract = sellContract;
    }

    public Customer getCustomer() {
        /*if (this.customerFUll != null) {

            Customer customer1 = new Customer();

            customer1.setRegion(customerFUll.getRegion());

            customer1.setNationality(customerFUll.getNationality());
            customer1.setType(customerFUll.getType());
            customer1.setId(customerFUll.getId());
            customer1.setName(customerFUll.getName());
            customer1.setCode(customerFUll.getCode());
            customer1.setRegisterDate(customerFUll.getRegisterDate());
            customer1.setTransportCode(customerFUll.getTransportCode());
            customer1.setTelephone(customerFUll.getTelephone());
            customer1.setOldCode(customerFUll.getOldCode());
            customer1.setPostalCode(customerFUll.getPostalCode());
            customer1.setBirthday(customerFUll.getBirthday());
            customer1.setOrganizationType(customerFUll.getOrganizationType());
            customer1.setCreditAccount(customerFUll.getCreditAccount());
            customer1.setAddress(customerFUll.getAddress());
            customer1.setHasTransport(customerFUll.isHasTransport());
            customer1.setImpassable(customerFUll.isImpassable());
            customer1.setBuyOneToMany(customerFUll.isBuyOneToMany());
            customer1.setIdentifyCode(customerFUll.getIdentifyCode());
            customer1.setNozzleNo(customerFUll.getNozzleNo());
            Set<Location> set = customerFUll.getLocations();

            if (set != null) {
                customer1.setLocations(set);
            }
            this.customer = customer1;
            return this.customer;
        } else */return customer;

    }

    public SellContractCustomer customer(Customer customer) {
        if (this.customer != null)
            this.customer = customer;
        /*else if (this.customerFUll != null) {

            Customer customer1 = new Customer();

            customer1.setRegion(customerFUll.getRegion());

            customer1.setNationality(customerFUll.getNationality());
            customer1.setType(customerFUll.getType());
            customer1.setId(customerFUll.getId());
            customer1.setName(customerFUll.getName());
            customer1.setCode(customerFUll.getCode());
            customer1.setRegisterDate(customerFUll.getRegisterDate());
            customer1.setTransportCode(customerFUll.getTransportCode());
            customer1.setTelephone(customerFUll.getTelephone());
            customer1.setOldCode(customerFUll.getOldCode());
            customer1.setPostalCode(customerFUll.getPostalCode());
            customer1.setBirthday(customerFUll.getBirthday());
            customer1.setOrganizationType(customerFUll.getOrganizationType());
            customer1.setCreditAccount(customerFUll.getCreditAccount());
            customer1.setAddress(customerFUll.getAddress());
            customer1.setHasTransport(customerFUll.isHasTransport());
            customer1.setImpassable(customerFUll.isImpassable());
            customer1.setBuyOneToMany(customerFUll.isBuyOneToMany());
            customer1.setIdentifyCode(customerFUll.getIdentifyCode());
            customer1.setNozzleNo(customerFUll.getNozzleNo());
            Set<Location> set = customerFUll.getLocations();

            if (set != null) {
                customer1.setLocations(set);
            }
            this.customer = customer1;
        }*/
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Location getLocation() {
        return location;
    }

    public SellContractCustomer location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<SellContractProduct> getSellContractProducts() {
        return sellContractProducts;
    }

    public SellContractCustomer sellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
        return this;
    }

    public SellContractCustomer addSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.add(sellContractProduct);
        sellContractProduct.setSellContractCustomer(this);
        return this;
    }

    public SellContractCustomer removeSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.remove(sellContractProduct);
        sellContractProduct.setSellContractCustomer(null);
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
        SellContractCustomer sellContractCustomer = (SellContractCustomer) o;
        if (sellContractCustomer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractCustomer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractCustomer{" +
            "id=" + getId() +
            ", hasTransport='" + isHasTransport() + "'" +
            "}";
    }

    public Set<Long> getCostGroupIds() {
        return costGroupIds;
    }

    public void setCostGroupIds(Set<Long> costGroupIds) {
        this.costGroupIds = costGroupIds;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }
/*
    public CustomerFull getCustomerFUll() {
        return customerFUll;
    }

    public void setCustomerFUll(CustomerFull customerFull) {
        this.customerFUll = customerFull;

        Customer customer1 = new Customer();

        customer1.setRegion(customerFull.getRegion());

        customer1.setNationality(customerFull.getNationality());
        customer1.setType(customerFull.getType());
        customer1.setId(customerFull.getId());
        customer1.setName(customerFull.getName());
        customer1.setCode(customerFull.getCode());
        customer1.setRegisterDate(customerFull.getRegisterDate());
        customer1.setTransportCode(customerFull.getTransportCode());
        customer1.setTelephone(customerFull.getTelephone());
        customer1.setOldCode(customerFull.getOldCode());
        customer1.setPostalCode(customerFull.getPostalCode());
        customer1.setBirthday(customerFull.getBirthday());
        customer1.setOrganizationType(customerFull.getOrganizationType());
        customer1.setCreditAccount(customerFull.getCreditAccount());
        customer1.setAddress(customerFull.getAddress());
        customer1.setHasTransport(customerFull.isHasTransport());
        customer1.setImpassable(customerFull.isImpassable());
        customer1.setBuyOneToMany(customerFull.isBuyOneToMany());
        customer1.setIdentifyCode(customerFull.getIdentifyCode());
        customer1.setNozzleNo(customerFull.getNozzleNo());
        Set<Location> set = customerFull.getLocations();

        if (set != null) {
            customer1.setLocations(set);
        }
        this.customer = customer1;

    }*/
}
