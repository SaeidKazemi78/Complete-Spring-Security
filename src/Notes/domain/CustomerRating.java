package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A CustomerRating.
 */
@Entity
@Table(name = "customer_rating")
@Audited
public class CustomerRating extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "jhi_level", nullable = false)
    private Integer level;

    @NotNull
    @Column(name = "from_date", nullable = false)
    private ZonedDateTime fromDate;

    @NotNull
    @Column(name = "to_date", nullable = false)
    private ZonedDateTime toDate;

    @NotNull
    @Column(name = "from_score", nullable = false)
    private Double fromScore;

    @NotNull
    @Column(name = "to_score", nullable = false)
    private Double toScore;

    @ManyToMany
    @JoinTable(name = "customer_rating_location",
               joinColumns = @JoinColumn(name="customer_ratings_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="locations_id", referencedColumnName="id"))
    private Set<Location> locations = new HashSet<>();

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

    public CustomerRating title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getLevel() {
        return level;
    }

    public CustomerRating level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public CustomerRating fromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public CustomerRating toDate(ZonedDateTime toDate) {
        this.toDate = toDate;
        return this;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public Double getFromScore() {
        return fromScore;
    }

    public CustomerRating fromScore(Double fromScore) {
        this.fromScore = fromScore;
        return this;
    }

    public void setFromScore(Double fromScore) {
        this.fromScore = fromScore;
    }

    public Double getToScore() {
        return toScore;
    }

    public CustomerRating toScore(Double toScore) {
        this.toScore = toScore;
        return this;
    }

    public void setToScore(Double toScore) {
        this.toScore = toScore;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public CustomerRating locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public CustomerRating addLocation(Location location) {
        this.locations.add(location);
        return this;
    }

    public CustomerRating removeLocation(Location location) {
        this.locations.remove(location);
        return this;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
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
        CustomerRating customerRating = (CustomerRating) o;
        if (customerRating.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerRating.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerRating{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", level=" + getLevel() +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            ", fromScore=" + getFromScore() +
            ", toScore=" + getToScore() +
            "}";
    }
}
