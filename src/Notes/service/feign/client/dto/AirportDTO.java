package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Airport entity.
 */
public class AirportDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String persianTitle;

    @NotNull
    @Size(min = 3, max = 42)
    private String englishTitle;

    @NotNull
    @Size(min = 3, max = 4)
    private String code;

    @NotNull
    private Long regionId;

    private Set<Long> targetAirportIds = new HashSet<>();
    private Set<AirportDTO> targetAirports = new HashSet<>();
    @NotNull
    private Long countryId;

    private String globalCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPersianTitle() {
        return persianTitle;
    }

    public void setPersianTitle(String persianTitle) {
        this.persianTitle = persianTitle;
    }

    public String getEnglishTitle() {
        return englishTitle;
    }

    public void setEnglishTitle(String englishTitle) {
        this.englishTitle = englishTitle;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public Set<Long> getTargetAirportIds() {
        return targetAirportIds;
    }

    public void setTargetAirportIds(Set<Long> targetAirportIds) {
        this.targetAirportIds = targetAirportIds;
    }

    public Set<AirportDTO> getTargetAirports() {
        return targetAirports;
    }

    public void setTargetAirports(Set<AirportDTO> targetAirports) {
        this.targetAirports = targetAirports;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getGlobalCode() {
        return globalCode;
    }

    public void setGlobalCode(String globalCode) {
        this.globalCode = globalCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AirportDTO airportDTO = (AirportDTO) o;
        if (airportDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airportDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AirportDTO{" +
            "id=" + getId() +
            ", persianTitle='" + getPersianTitle() + "'" +
            ", englishTitle='" + getEnglishTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", regionId=" + getRegionId() +
            ", countryId=" + getCountryId() +
            "}";
    }
}
