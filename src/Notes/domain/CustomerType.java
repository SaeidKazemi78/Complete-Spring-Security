package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.LocationType;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A CustomerType.
 */
@Entity
@Table(name = "customer_type")
@Audited
public class CustomerType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false, unique = true, columnDefinition = "nvarchar(42)")
    private String title;

    @NotNull
    @Column(name = "code",  nullable = false, unique = true)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(name = "location_type")
    private LocationType locationType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "customer_group", nullable = false)
    private CustomerGroup customerGroup;

    @DiffIgnore
    @OneToMany(mappedBy = "type", fetch = FetchType.LAZY)
    private Set<Customer> customers;

    @Column(name = "tax_exempt")
    private Boolean taxExempt;

    @Column(name = "has_gs_id")
    private Boolean hasGsId;

    private Boolean active;

    @Column(name = "manual_quota")
    private Boolean manualQuota;

    @Size(min = 3, max = 42)
    @Column(name = "customer_code_title", length = 42)
    private String customerCodeTitle;

    @Column(name = "old_code", length = 42)
    private String oldCode;

    @Column(name = "iranian")
    private Boolean iranian;

    @ManyToMany
    @JoinTable(name = "customer_type_customer_type_ignore",
        joinColumns = @JoinColumn(name = "customer_types_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "customer_type_ignores_id", referencedColumnName = "id"))
    private Set<CustomerType> customerTypeIgnores = new HashSet<>();


    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_model_type")
    private VehicleModelType vehicleModelType;


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

    public void setTitle(String title) {
        this.title = title;
    }

    public CustomerType title(String title) {
        this.title = title;
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public CustomerType code(String code) {
        this.code = code;
        return this;
    }

    public LocationType getLocationType() {
        return locationType;
    }

    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }

    public CustomerType locationType(LocationType locationType) {
        this.locationType = locationType;
        return this;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public CustomerType customerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
        return this;
    }

    public Boolean isTaxExempt() {
        return taxExempt;
    }

    public CustomerType taxExempt(Boolean taxExempt) {
        this.taxExempt = taxExempt;
        return this;
    }

    public void setTaxExempt(Boolean taxExempt) {
        this.taxExempt = taxExempt;
    }

    public Boolean isHasGsId() {
        return hasGsId;
    }

    public CustomerType hasGsId(Boolean hasGsId) {
        this.hasGsId = hasGsId;
        return this;
    }

    public void setHasGsId(Boolean hasGsId) {
        this.hasGsId = hasGsId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getCustomerCodeTitle() {
        return customerCodeTitle;
    }

    public void setCustomerCodeTitle(String customerCodeTitle) {
        this.customerCodeTitle = customerCodeTitle;
    }

    public CustomerType customerCodeTitle(String customerCodeTitle) {
        this.customerCodeTitle = customerCodeTitle;
        return this;
    }

    public String getOldCode() {
        return oldCode;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }

    public Set<CustomerType> getCustomerTypeIgnores() {
        return customerTypeIgnores;
    }

    public void setCustomerTypeIgnores(Set<CustomerType> customerTypes) {
        this.customerTypeIgnores = customerTypes;
    }

    public CustomerType customerTypeIgnores(Set<CustomerType> customerTypes) {
        this.customerTypeIgnores = customerTypes;
        return this;
    }

    public CustomerType addCustomerTypeIgnore(CustomerType customerType) {
        this.customerTypeIgnores.add(customerType);
        return this;
    }

    public CustomerType removeCustomerTypeIgnore(CustomerType customerType) {
        this.customerTypeIgnores.remove(customerType);
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
        CustomerType customerType = (CustomerType) o;
        if (customerType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerType{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", locationType='" + getLocationType() + "'" +
            ", customerGroup='" + getCustomerGroup() + "'" +
            ", taxExempt='" + isTaxExempt() + "'" +
            ", hasGsId='" + isHasGsId() + "'" +
            ", customerCodeTitle='" + getCustomerCodeTitle() + "'" +
            "}";
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public Boolean isIranian() {
        return iranian;
    }

    public void setIranian(Boolean iranian) {
        this.iranian = iranian;
    }
}
