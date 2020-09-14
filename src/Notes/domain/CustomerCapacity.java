package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerCapacity.
 */
@Entity
@Table(name = "customer_capacity")
@Audited
public class CustomerCapacity extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "capacity", nullable = false)
    private Integer capacity;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @NotNull
    @DiffIgnore
    private Customer customer;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @NotNull
    private ProductGroup productGroup;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public CustomerCapacity capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerCapacity customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public ProductGroup getProductGroup() {
        return productGroup;
    }

    public CustomerCapacity productGroup(ProductGroup productGroup) {
        this.productGroup = productGroup;
        return this;
    }

    public void setProductGroup(ProductGroup productGroup) {
        this.productGroup = productGroup;
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
        CustomerCapacity customerCapacity = (CustomerCapacity) o;
        if (customerCapacity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerCapacity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerCapacity{" +
            "id=" + getId() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
