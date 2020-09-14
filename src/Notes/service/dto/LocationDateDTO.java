package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Location entity.
 */
public class LocationDateDTO extends AbstractAuditingDTO implements Serializable {
    private ZonedDateTime serverDate;
    private ZonedDateTime locationDay;
    private Boolean isDay;

    public ZonedDateTime getServerDate() {
        return serverDate;
    }

    public void setServerDate(ZonedDateTime serverDate) {
        this.serverDate = serverDate;
    }

    public ZonedDateTime getLocationDay() {
        return locationDay;
    }

    public void setLocationDay(ZonedDateTime locationDay) {
        this.locationDay = locationDay;
    }

    public Boolean getDay() {
        return isDay;
    }

    public void setDay(Boolean day) {
        isDay = day;
    }
}
