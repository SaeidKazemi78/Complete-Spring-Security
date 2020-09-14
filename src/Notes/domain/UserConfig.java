package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

/**
 * A UserConfig.
 */
@Entity
@Table(name = "user_config")
@Audited
public class UserConfig extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "username", nullable = false)
    private String username;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_fuel_receipt")
    private TypeOfFuelReceipt typeOfFuelReceipt;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Depot depot;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public UserConfig username(String username) {
        this.username = username;
        return this;
    }

    public TypeOfFuelReceipt getTypeOfFuelReceipt() {
        return typeOfFuelReceipt;
    }

    public void setTypeOfFuelReceipt(TypeOfFuelReceipt typeOfFuelReceipt) {
        this.typeOfFuelReceipt = typeOfFuelReceipt;
    }

    public UserConfig typeOfFuelReceipt(TypeOfFuelReceipt typeOfFuelReceipt) {
        this.typeOfFuelReceipt = typeOfFuelReceipt;
        return this;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public UserConfig customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public Depot getDepot() {
        return depot;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }

    public UserConfig depot(Depot depot) {
        this.depot = depot;
        return this;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public UserConfig product(Product product) {
        this.product = product;
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
        UserConfig userConfig = (UserConfig) o;
        if (userConfig.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userConfig.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserConfig{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", typeOfFuelReceipt='" + getTypeOfFuelReceipt() + "'" +
            "}";
    }
}
