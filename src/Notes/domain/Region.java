package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Region.
 */
@Entity
@Table(name = "region")
@Audited
public class Region extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 1, max = 80)
    @Column(name = "name", length = 80, nullable = false)
    private String name;

    @NotNull
    @Size(min = 2, max = 24)
    @Column(name = "code", length = 24, unique = true)
    private String code;

    @Column(name = "jhi_level")
    private Integer level;

    @Size(min = 5, max = 5)
    @Column(name = "global_code", length = 5)
    private String globalCode;

    @OneToMany(mappedBy = "parent")
    @DiffIgnore
    private Set<Region> subRegions = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @ShallowReference
    @DiffIgnore
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region parent;


    @ManyToMany(mappedBy = "regions")
    @ShallowReference
    @JsonIgnore
    private Set<Location> locations = new HashSet<>();

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

    public Region name(String name) {
        this.name = name;
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Region code(String code) {
        this.code = code;
        return this;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Region level(Integer level) {
        this.level = level;
        return this;
    }

    public String getGlobalCode() {
        return globalCode;
    }

    public void setGlobalCode(String globalCode) {
        this.globalCode = globalCode;
    }

    public Region globalCode(String globalCode) {
        this.globalCode = globalCode;
        return this;
    }

    public Set<Region> getSubRegions() {
        return subRegions;
    }

    public void setSubRegions(Set<Region> regions) {
        this.subRegions = regions;
    }

    public Region subRegions(Set<Region> regions) {
        this.subRegions = regions;
        return this;
    }

    public Region addSubRegion(Region region) {
        this.subRegions.add(region);
        region.setParent(this);
        return this;
    }

    public Region removeSubRegion(Region region) {
        this.subRegions.remove(region);
        region.setParent(null);
        return this;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Region country(Country country) {
        this.country = country;
        return this;
    }

    public Region getParent() {
        return parent;
    }

    public void setParent(Region region) {
        this.parent = region;
    }

    public Region parent(Region region) {
        this.parent = region;
        return this;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Region locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Region addLocation(Location location) {
        this.locations.add(location);
        location.getRegions().add(this);
        return this;
    }

    public Region removeLocation(Location location) {
        this.locations.remove(location);
        location.getRegions().remove(this);
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
        Region region = (Region) o;
        if (region.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), region.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Region{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", level=" + getLevel() +
            ", globalCode='" + getGlobalCode() + "'" +
            "}";
    }
}
