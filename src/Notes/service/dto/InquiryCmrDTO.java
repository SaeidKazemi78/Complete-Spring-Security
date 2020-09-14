package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the BoundaryDiscount entity.
 */
public class InquiryCmrDTO implements Serializable {
    private Long destinationCountryCode;
    private String driverFirstName;
    private String driverLastName;
    private BoundaryDiscountDTO boundaryDiscount;
    private CountryDTO country;

    public BoundaryDiscountDTO getBoundaryDiscount() {
        return boundaryDiscount;
    }

    public void setBoundaryDiscount(BoundaryDiscountDTO boundaryDiscount) {
        this.boundaryDiscount = boundaryDiscount;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }

    public Long getDestinationCountryCode() {
        return destinationCountryCode;
    }

    public void setDestinationCountryCode(Long destinationCountryCode) {
        this.destinationCountryCode = destinationCountryCode;
    }

    public String getDriverFirstName() {
        return driverFirstName;
    }

    public void setDriverFirstName(String driverFirstName) {
        this.driverFirstName = driverFirstName;
    }

    public String getDriverLastName() {
        return driverLastName;
    }

    public void setDriverLastName(String driverLastName) {
        this.driverLastName = driverLastName;
    }
}
