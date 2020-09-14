package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import org.javers.core.metamodel.annotation.Entity;
import org.javers.core.metamodel.annotation.Id;
import org.javers.core.metamodel.annotation.TypeName;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the RefuelCenter entity.
 */
@TypeName("RefuelCenter")
public class RefuelCenterDTO implements Serializable {

    @Id
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

    private Long locationId;

    private String locationName;

    private String fuelReceiptStartNumber;

    private String fuelReceiptEndNumber;

    private String fuelReceiptCurrentNumber;

    private String wayBillStartNumber;

    private String wayBillEndNumber;

    private String wayBillCurrentNumber;

    @NotNull
    private Long regionId;
    private String regionName;

    private Set<AirportDTO> airports = new HashSet<>();

    private List<Long> depotIds;


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

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getFuelReceiptStartNumber() {
        return fuelReceiptStartNumber;
    }

    public void setFuelReceiptStartNumber(String fuelReceiptStartNumber) {
        this.fuelReceiptStartNumber = fuelReceiptStartNumber;
    }

    public String getFuelReceiptEndNumber() {
        return fuelReceiptEndNumber;
    }

    public void setFuelReceiptEndNumber(String fuelReceiptEndNumber) {
        this.fuelReceiptEndNumber = fuelReceiptEndNumber;
    }

    public String getFuelReceiptCurrentNumber() {
        return fuelReceiptCurrentNumber;
    }

    public void setFuelReceiptCurrentNumber(String fuelReceiptCurrentNumber) {
        this.fuelReceiptCurrentNumber = fuelReceiptCurrentNumber;
    }

    public String getWayBillStartNumber() {
        return wayBillStartNumber;
    }

    public void setWayBillStartNumber(String wayBillStartNumber) {
        this.wayBillStartNumber = wayBillStartNumber;
    }

    public String getWayBillEndNumber() {
        return wayBillEndNumber;
    }

    public void setWayBillEndNumber(String wayBillEndNumber) {
        this.wayBillEndNumber = wayBillEndNumber;
    }

    public String getWayBillCurrentNumber() {
        return wayBillCurrentNumber;
    }

    public void setWayBillCurrentNumber(String wayBillCurrentNumber) {
        this.wayBillCurrentNumber = wayBillCurrentNumber;
    }

    public Set<AirportDTO> getAirports() {
        return airports;
    }

    public void setAirports(Set<AirportDTO> airports) {
        this.airports = airports;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public List<Long> getDepotIds() {
        return depotIds;
    }

    public void setDepotIds(List<Long> depotIds) {
        this.depotIds = depotIds;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RefuelCenterDTO refuelCenterDTO = (RefuelCenterDTO) o;
        if(refuelCenterDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), refuelCenterDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RefuelCenterDTO{" +
            "id=" + getId() +
            ", persianTitle='" + getPersianTitle() + "'" +
            ", englishTitle='" + getEnglishTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", locationId=" + getLocationId() +
            ", fuelReceiptStartNumber='" + getFuelReceiptStartNumber() + "'" +
            ", fuelReceiptEndNumber='" + getFuelReceiptEndNumber() + "'" +
            ", fuelReceiptCurrentNumber='" + getFuelReceiptCurrentNumber() + "'" +
            ", wayBillStartNumber='" + getWayBillStartNumber() + "'" +
            ", wayBillEndNumber='" + getWayBillEndNumber() + "'" +
            ", wayBillCurrentNumber='" + getWayBillCurrentNumber() + "'" +
            "}";
    }
}
