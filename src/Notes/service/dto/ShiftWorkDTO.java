package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkRefuelCenterType;
import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkType;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.OrderNumberDTO;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ShiftWork entity.
 */
public class ShiftWorkDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime fromDate;

    private ZonedDateTime toDate;

    private Long locationId;

    private String locationName;

    private boolean canOpen;

    private ShiftWorkType type;

    private OrderNumberDTO orderNumber;

    private ShiftWorkRefuelCenterType shiftType;

    private Long refuelCenterId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ShiftWorkDTO shiftWorkDTO = (ShiftWorkDTO) o;
        if(shiftWorkDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), shiftWorkDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ShiftWorkDTO{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            "}";
    }

    public void setCanOpen(boolean canOpen) {
        this.canOpen = canOpen;
    }

    public boolean isCanOpen() {
        return canOpen;
    }

    public ShiftWorkType getType() {
        return type;
    }

    public void setType(ShiftWorkType type) {
        this.type = type;
    }

    public ShiftWorkDTO type(ShiftWorkType type) {
        this.type = type;
        return this;
    }

    public OrderNumberDTO getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(OrderNumberDTO orderNumber) {
        this.orderNumber = orderNumber;
    }
    public ShiftWorkDTO orderNumber(OrderNumberDTO orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public ShiftWorkRefuelCenterType getShiftType() {
        return shiftType;
    }

    public void setShiftType(ShiftWorkRefuelCenterType shiftType) {
        this.shiftType = shiftType;
    }

    public Long getRefuelCenterId() {
        return refuelCenterId;
    }

    public void setRefuelCenterId(Long refuelCenterId) {
        this.refuelCenterId = refuelCenterId;
    }
}
