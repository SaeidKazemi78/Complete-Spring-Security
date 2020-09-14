package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.DatabaseConfiguration;
import ir.donyapardaz.niopdc.base.config.Profiles;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A RateGroup.
 */
@Entity
@Table(catalog = "niopdcrate_" + Profiles.activeProfile, schema = "dbo", name = "currency_rate_group")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class CurrencyRateGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "title", unique = true)
    private String title;

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


    public CurrencyRateGroup title(String title) {
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
        CurrencyRateGroup rateGroup = (CurrencyRateGroup) o;
        if (rateGroup.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rateGroup.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RateGroup{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
