package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the CustomerRating entity.
 */
public class CustomerRatingDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Integer level;

    @NotNull
    private ZonedDateTime fromDate;

    @NotNull
    private ZonedDateTime toDate;

    @NotNull
    private Double fromScore;

    @NotNull
    private Double toScore;

    private Set<LocationDTO> locations = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public Double getFromScore() {
        return fromScore;
    }

    public void setFromScore(Double fromScore) {
        this.fromScore = fromScore;
    }

    public Double getToScore() {
        return toScore;
    }

    public void setToScore(Double toScore) {
        this.toScore = toScore;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerRatingDTO customerRatingDTO = (CustomerRatingDTO) o;
        if(customerRatingDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerRatingDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerRatingDTO{" +
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
