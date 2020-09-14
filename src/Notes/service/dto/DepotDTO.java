package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.RefuelCenterDTO;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Depot entity.
 */
public class DepotDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    @Size(min = 4, max = 4)
    private String accCode;

    private Long refuelCenterId;

    @NotNull
    private DepotType depotType;

    private Long locationId;

    private String locationName;

    private RefuelCenterDTO refuelCenter;

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

    public Long getRefuelCenterId() {
        return refuelCenterId;
    }

    public void setRefuelCenterId(Long refuelCenterId) {
        this.refuelCenterId = refuelCenterId;
    }

    public DepotType getDepotType() {
        return depotType;
    }

    public void setDepotType(DepotType depotType) {
        this.depotType = depotType;
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

        DepotDTO depotDTO = (DepotDTO) o;
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
            ", refuelCenterId=" + getRefuelCenterId() +
            ", depotType='" + getDepotType() + "'" +
            "}";
    }

    public void setRefuelCenter(RefuelCenterDTO refuelCenter) {
        this.refuelCenter = refuelCenter;
    }

    public RefuelCenterDTO getRefuelCenter() {
        return refuelCenter;
    }
}
