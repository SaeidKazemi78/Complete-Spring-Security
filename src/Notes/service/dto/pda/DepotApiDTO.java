package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.*;

/**
 * A DTO for the Depot entity.
 */
public class DepotApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    @Size(min = 4, max = 4)
    private String accCode;

    private Boolean active;

    @NotNull
    private DepotType depotType;

    private Long locationId;
    private Long refuelCenterId;
    private String refuelCenterTitle;

    private String locationName;



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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public DepotType getDepotType() {
        return depotType;
    }

    public void setDepotType(DepotType depotType) {
        this.depotType = depotType;
    }

    public Boolean getActive() {
        return active;
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

    public Long getRefuelCenterId() {
        return refuelCenterId;
    }

    public void setRefuelCenterId(Long refuelCenterId) {
        this.refuelCenterId = refuelCenterId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DepotApiDTO depotDTO = (DepotApiDTO) o;
        if (depotDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), depotDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DepotFullDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", accCode='" + getAccCode() + "'" +
            ", active='" + isActive() + "'" +
            ", depotType='" + getDepotType() + "'" +
            "}";
    }


    public String getRefuelCenterTitle() {
        return refuelCenterTitle;
    }

    public void setRefuelCenterTitle(String refuelCenterTitle) {
        this.refuelCenterTitle = refuelCenterTitle;
    }
}
