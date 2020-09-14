package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.enumeration.RateGroupType;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * A RateGroup.
 */
@Entity
@Table(catalog = "niopdcrate_" + Profiles.activeProfile, schema = "dbo", name = "rate_group")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class RateGroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "title", unique = true)
    private String title;

    @ElementCollection
    @CollectionTable(catalog = "niopdcrate_" + Profiles.activeProfile,schema = "dbo")
    private Set<Long> customerTypeIds;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private RateGroupType type;

    @Column
    @ElementCollection
    @CollectionTable(catalog = "niopdcrate_" + Profiles.activeProfile,schema = "dbo")
    private List<Long> productIds;


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


    public RateGroup title(String title) {
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
        RateGroup rateGroup = (RateGroup) o;
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

    public Set<Long> getCustomerTypeIds() {
        return customerTypeIds;
    }

    public RateGroup setCustomerTypeIds(Set<Long> customerTypeIds) {
        this.customerTypeIds = customerTypeIds;
        return this;
    }

    public RateGroupType getType() {
        return type;
    }

    public void setType(RateGroupType type) {
        this.type = type;
    }

    public List<Long> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<Long> productIds) {
        this.productIds = productIds;
    }
}
