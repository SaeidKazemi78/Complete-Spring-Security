package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.StakeholderType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Stakeholder.
 */
@Entity
@Table(name = "stakeholder")
@Audited
public class Stakeholder extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "share_percent")
    private Integer sharePercent;

    @Enumerated(EnumType.STRING)
    @Column(name = "stakeholder_type")
    private StakeholderType stakeholderType;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person company;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public Stakeholder sharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
        return this;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    public StakeholderType getStakeholderType() {
        return stakeholderType;
    }

    public Stakeholder stakeholderType(StakeholderType stakeholderType) {
        this.stakeholderType = stakeholderType;
        return this;
    }

    public void setStakeholderType(StakeholderType stakeholderType) {
        this.stakeholderType = stakeholderType;
    }

    public Person getCompany() {
        return company;
    }

    public Stakeholder company(Person person) {
        this.company = person;
        return this;
    }

    public void setCompany(Person person) {
        this.company = person;
    }

    public Person getPerson() {
        return person;
    }

    public Stakeholder person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
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
        Stakeholder stakeholder = (Stakeholder) o;
        if (stakeholder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), stakeholder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Stakeholder{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", stakeholderType='" + getStakeholderType() + "'" +
            "}";
    }
}
