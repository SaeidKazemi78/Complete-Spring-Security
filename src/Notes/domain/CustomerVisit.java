package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerVisit.
 */
@Entity
@Table(name = "customer_visit")
@Audited
public class CustomerVisit  extends AbstractAuditingEntity implements Serializable  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false,length = 600)
    private String description;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public CustomerVisit description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Customer getCustomer() {
        return customer;
    }

    public CustomerVisit customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
        CustomerVisit customerVisit = (CustomerVisit) o;
        if (customerVisit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerVisit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerVisit{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
