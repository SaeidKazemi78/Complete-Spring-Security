package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfDangerousCertificateCard;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DangerousCertificate.
 */
@Entity
@Table(name = "dangerous_certificate")
@Audited
public class DangerousCertificate extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_expire_date")
    private ZonedDateTime cardExpireDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypeOfDangerousCertificateCard type;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Driver driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Depot depot;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public DangerousCertificate cardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
        return this;
    }

    public ZonedDateTime getCardExpireDate() {
        return cardExpireDate;
    }

    public void setCardExpireDate(ZonedDateTime cardExpireDate) {
        this.cardExpireDate = cardExpireDate;
    }

    public DangerousCertificate cardExpireDate(ZonedDateTime cardExpireDate) {
        this.cardExpireDate = cardExpireDate;
        return this;
    }

    public TypeOfDangerousCertificateCard getType() {
        return type;
    }

    public void setType(TypeOfDangerousCertificateCard type) {
        this.type = type;
    }

    public DangerousCertificate type(TypeOfDangerousCertificateCard type) {
        this.type = type;
        return this;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public DangerousCertificate driver(Driver driver) {
        this.driver = driver;
        return this;
    }

    public Depot getDepot() {
        return depot;
    }

    public void setDepot(Depot depot) {
        this.depot = depot;
    }

    public DangerousCertificate depot(Depot depot) {
        this.depot = depot;
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
        DangerousCertificate dangerousCertificate = (DangerousCertificate) o;
        if (dangerousCertificate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dangerousCertificate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DangerousCertificate{" +
            "id=" + getId() +
            ", cardNumber='" + getCardNumber() + "'" +
            ", cardExpireDate='" + getCardExpireDate() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
