package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A Plaque.
 */
@Entity
@Table(name = "plaque")
@Audited
public class Plaque extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "pattern")
    private String pattern;
    @Column(name = "code")
    private String code;
    @OneToMany(mappedBy = "plaque")
    @ShallowReference
    Set<PlaqueRule> plaqueRules;

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

    public Plaque title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
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
        Plaque plaque = (Plaque) o;
        if (plaque.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plaque.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plaque{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }

    public String getPattern() {
        return pattern;
    }

    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<PlaqueRule> getPlaqueRules() {
        return plaqueRules;
    }

    public void setPlaqueRules(Set<PlaqueRule> plaqueRules) {
        this.plaqueRules = plaqueRules;
    }
}
