package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A BoundaryTag.
 */
@Entity
@Table(name = "boundary_tag")
@Audited
public class BoundaryTag extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @Column(name = "current_amount")
    private Long currentAmount;


    @NotNull
    @Column(name = "buy_price", nullable = false)
    private Double buyPrice;

    @Column(name = "buy_date")
    private ZonedDateTime buyDate;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @NotNull
    @ShallowReference
    private Location location;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public BoundaryTag amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public Double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public BoundaryTag buyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
        return this;
    }

    public ZonedDateTime getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(ZonedDateTime buyDate) {
        this.buyDate = buyDate;
    }

    public BoundaryTag buyDate(ZonedDateTime buyDate) {
        this.buyDate = buyDate;
        return this;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public BoundaryTag location(Location location) {
        this.location = location;
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
        BoundaryTag boundaryTag = (BoundaryTag) o;
        if (boundaryTag.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), boundaryTag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BoundaryTag{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", buyPrice=" + getBuyPrice() +
            ", buyDate='" + getBuyDate() + "'" +
            "}";
    }

    public Long getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Long current_amount) {
        this.currentAmount = current_amount;
    }
}
