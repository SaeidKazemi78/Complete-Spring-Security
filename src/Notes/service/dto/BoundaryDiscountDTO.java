package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the BoundaryDiscount entity.
 */
public class BoundaryDiscountDTO implements Serializable {

    private Long id;

    @NotNull
    private Long liter;

    private ZonedDateTime startDate;

    private String startDateStr;

    private ZonedDateTime finishDate;

    private String finishDateStr;

    private LocationDTO location ;

    private CountryDTO country ;

    private VehicleModelType vehicleModelType;

    private String locationTitle;

    private String countryTitle;

    private Long transitHourLimit;
    private String message;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLiter() {
        return liter;
    }

    public void setLiter(Long liter) {
        this.liter = liter;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BoundaryDiscountDTO boundaryDiscountDTO = (BoundaryDiscountDTO) o;
        if (boundaryDiscountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), boundaryDiscountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BoundaryDiscountDTO{" +
            "id=" + getId() +
            ", liter=" + getLiter() +
            "}";
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public LocationDTO getLocation() {
        return location;
    }

    public void setLocation(LocationDTO location) {
        this.location = location;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    public VehicleModelType getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(VehicleModelType vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public String getLocationTitle() {
        return locationTitle;
    }

    public void setLocationTitle(String locationTitle) {
        this.locationTitle = locationTitle;
    }

    public String getCountryTitle() {
        return countryTitle;
    }

    public void setCountryTitle(String countryTitle) {
        this.countryTitle = countryTitle;
    }
    

    public String getStartDateStr() {
        return startDateStr;
    }

    public void setStartDateStr(String startDateStr) {
        this.startDateStr = startDateStr;
    }

    public String getFinishDateStr() {
        return finishDateStr;
    }

    public void setFinishDateStr(String finishDateStr) {
        this.finishDateStr = finishDateStr;
    }

    public Long getTransitHourLimit() {
        return transitHourLimit;
    }

    public void setTransitHourLimit(Long transitHourLimit) {
        this.transitHourLimit = transitHourLimit;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
