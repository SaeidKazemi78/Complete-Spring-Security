package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerTypeProductConsumption.
 */
@Entity
@Table(name = "customer_type_p_c" ,
    uniqueConstraints=
@UniqueConstraint(columnNames={"consumption_id", "product_id","customer_type_id"}))
@Audited
public class CustomerTypeProductConsumption extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private CustomerType customerType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Consumption consumption;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public CustomerTypeProductConsumption customerType(CustomerType customerType) {
        this.customerType = customerType;
        return this;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
    }

    public Product getProduct() {
        return product;
    }

    public CustomerTypeProductConsumption product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Consumption getConsumption() {
        return consumption;
    }

    public CustomerTypeProductConsumption consumption(Consumption consumption) {
        this.consumption = consumption;
        return this;
    }

    public void setConsumption(Consumption consumption) {
        this.consumption = consumption;
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
        CustomerTypeProductConsumption customerTypeProductConsumption = (CustomerTypeProductConsumption) o;
        if (customerTypeProductConsumption.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerTypeProductConsumption.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerTypeProductConsumption{" +
            "id=" + getId() +
            "}";
    }
}
