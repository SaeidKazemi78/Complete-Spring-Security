package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.DigitType;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A PlaqueRule.
 */
@Entity
@Table(name = "plaque_rule")
@Audited
public class PlaqueRule extends AbstractAuditingEntity  implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "digit", nullable = false)
    private Integer digit;

    @NotNull
    @Column(name = "priority", nullable = false)
    private Integer priority;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "digit_type", nullable = false)
    private DigitType digitType;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @ShallowReference
    private Plaque plaque;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDigit() {
        return digit;
    }

    public void setDigit(Integer digit) {
        this.digit = digit;
    }

    public PlaqueRule digit(Integer digit) {
        this.digit = digit;
        return this;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public PlaqueRule priority(Integer priority) {
        this.priority = priority;
        return this;
    }

    public DigitType getDigitType() {
        return digitType;
    }

    public void setDigitType(DigitType digitType) {
        this.digitType = digitType;
    }

    public PlaqueRule digitType(DigitType digitType) {
        this.digitType = digitType;
        return this;
    }

    public Plaque getPlaque() {
        return plaque;
    }

    public void setPlaque(Plaque plaque) {
        this.plaque = plaque;
    }

    public PlaqueRule plaque(Plaque plaque) {
        this.plaque = plaque;
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
        PlaqueRule plaqueRule = (PlaqueRule) o;
        if (plaqueRule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plaqueRule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaqueRule{" +
            "id=" + getId() +
            ", digit=" + getDigit() +
            ", priority=" + getPriority() +
            ", digitType='" + getDigitType() + "'" +
            "}";
    }
}
