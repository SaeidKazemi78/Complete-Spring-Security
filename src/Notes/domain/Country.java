package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Country.
 */
@Entity
@Table(name = "country")
@Audited
public class Country extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "name", length = 42, nullable = false, unique = true, columnDefinition = "nvarchar(42)")
    private String name;

    @Size(min = 3, max = 42)
    @Column(name = "en_name", length = 42, columnDefinition = "nvarchar(42)")
    private String enName;

    @Size(min = 2, max = 2)
    @Column(name = "iso_code", length = 2, columnDefinition = "nvarchar(2)")
    private String isoCode;

    @Size(min = 3, max = 3)
    @Column(name = "iso_code2", length = 3,  columnDefinition = "nvarchar(3)")
    private String isoCode2;

    @NotNull
    @Size(min = 1, max = 4)
    @Column(name = "code", length = 4, nullable = false, unique = true)
    private String code;

    @Column(name = "neighbor")
    private Boolean neighbor;

    @Column(name = "rmto_code")
    private String rmtoCode;

    @Column(name = "check_national_code")
    private Boolean checkNationalCode;

    @OneToMany(mappedBy = "country")
    @DiffIgnore
    private Set<Region> regions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Country name(String name) {
        this.name = name;
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Country code(String code) {
        this.code = code;
        return this;
    }

    public Boolean isCheckNationalCode() {
        return checkNationalCode;
    }

    public Country checkNationalCode(Boolean checkNationalCode) {
        this.checkNationalCode = checkNationalCode;
        return this;
    }

    public void setCheckNationalCode(Boolean checkNationalCode) {
        this.checkNationalCode = checkNationalCode;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Set<Region> getRegions() {
        return regions;
    }

    public void setRegions(Set<Region> regions) {
        this.regions = regions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Country country = (Country) o;
        if (country.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), country.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", checkNationalCode='" + isCheckNationalCode() + "'" +
            "}";
    }

    public String getRmtoCode() {
        return rmtoCode;
    }

    public void setRmtoCode(String rmtoCode) {
        this.rmtoCode = rmtoCode;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getIsoCode2() {
        return isoCode2;
    }

    public void setIsoCode2(String isoCode2) {
        this.isoCode2 = isoCode2;
    }

    public Boolean getNeighbor() {
        return neighbor;
    }

    public void setNeighbor(Boolean neighbor) {
        this.neighbor = neighbor;
    }
}
