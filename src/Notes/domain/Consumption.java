package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Consumption.
 */
@Entity
@Table(name = "consumption")
@Audited
public class Consumption extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false, unique = true)
    private String title;

    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "code", length = 4, nullable = false, unique = true)
    private String code;

    @Column(name = "manual_quota")
    private Boolean manualQuota;


    @OneToMany(mappedBy = "consumption", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<CustomerTypeProductConsumption> customerTypeProductConsumptions = new HashSet<>();


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

    public Consumption title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCode() {
        return code;
    }

    public Consumption code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
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
        Consumption consumption = (Consumption) o;
        if (consumption.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consumption.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consumption{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }

    public Set<CustomerTypeProductConsumption> getCustomerTypeProductConsumptions() {
        return customerTypeProductConsumptions;
    }

    public void setCustomerTypeProductConsumptions(Set<CustomerTypeProductConsumption> customerTypeProductConsumptions) {
        this.customerTypeProductConsumptions = customerTypeProductConsumptions;
    }
}
