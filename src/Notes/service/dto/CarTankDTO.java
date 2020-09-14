package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.TankType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CarTank entity.
 */
public class CarTankDTO implements Serializable {

    private Long id;

    private Double longitude;

    private Double latitude;

    @NotNull
    private Double height;

    private Double radius;

    @NotNull
    private TankType tankType;

    private Long customerId;

    private String customerName;

    private String plaque;

    private String tankNo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    public TankType getTankType() {
        return tankType;
    }

    public void setTankType(TankType tankType) {
        this.tankType = tankType;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarTankDTO carTankDTO = (CarTankDTO) o;
        if (carTankDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carTankDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarTankDTO{" +
            "id=" + getId() +
            ", longitude=" + getLongitude() +
            ", latitude=" + getLatitude() +
            ", height=" + getHeight() +
            ", radius=" + getRadius() +
            ", tankType='" + getTankType() + "'" +
            "}";
    }

    public String getTankNo() {
        return tankNo;
    }

    public CarTankDTO setTankNo(String tankNo) {
        this.tankNo = tankNo;
        return this;
    }

    public String getPlaque() {
        return plaque;
    }

    public void setPlaque(String plaque) {
        this.plaque = plaque;
    }
}
