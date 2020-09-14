package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A CeilingQuota.
 */
@Entity
@Table(name = "ceiling_quota")
@Audited
public class CeilingQuota extends AbstractAuditingEntity implements Serializable {

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
    @Column(name = "amount", nullable = false)
    private Long amount;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @NotNull
    @ShallowReference
    private CustomerCredit customerCredit;

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

    public CeilingQuota startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public CeilingQuota finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public Long getAmount() {
        return amount;
    }

    public CeilingQuota amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public CustomerCredit getCustomerCredit() {
        return customerCredit;
    }

    public CeilingQuota customerCredit(CustomerCredit customerCredit) {
        this.customerCredit = customerCredit;
        return this;
    }

    public void setCustomerCredit(CustomerCredit customerCredit) {
        this.customerCredit = customerCredit;
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
        CeilingQuota ceilingQuota = (CeilingQuota) o;
        if (ceilingQuota.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), ceilingQuota.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CeilingQuota{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
