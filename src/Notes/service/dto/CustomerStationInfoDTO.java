package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.NozzleProductCount;
import ir.donyapardaz.niopdc.base.domain.enumeration.StationType;

/**
 * A DTO for the CustomerStationInfo entity.
 */
public class CustomerStationInfoDTO implements Serializable {

    private Long id;

    private StationType stationType;

    private Boolean hasDispatching;

    private Boolean hasKahab;

    private Boolean hasCanopy;

    private Boolean hasBodyPump;

    private Boolean hasWorkClothes;

    private Boolean hasColumns;
    private Set<NozzleProductCount> nozzleProductCounts = new HashSet<>();

    private Long customerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StationType getStationType() {
        return stationType;
    }

    public void setStationType(StationType stationType) {
        this.stationType = stationType;
    }

    public Boolean isHasDispatching() {
        return hasDispatching;
    }

    public void setHasDispatching(Boolean hasDispatching) {
        this.hasDispatching = hasDispatching;
    }

    public Boolean isHasKahab() {
        return hasKahab;
    }

    public void setHasKahab(Boolean hasKahab) {
        this.hasKahab = hasKahab;
    }

    public Boolean isHasCanopy() {
        return hasCanopy;
    }

    public void setHasCanopy(Boolean hasCanopy) {
        this.hasCanopy = hasCanopy;
    }

    public Boolean isHasBodyPump() {
        return hasBodyPump;
    }

    public void setHasBodyPump(Boolean hasBodyPump) {
        this.hasBodyPump = hasBodyPump;
    }

    public Boolean isHasWorkClothes() {
        return hasWorkClothes;
    }

    public void setHasWorkClothes(Boolean hasWorkClothes) {
        this.hasWorkClothes = hasWorkClothes;
    }

    public Boolean isHasColumns() {
        return hasColumns;
    }

    public void setHasColumns(Boolean hasColumns) {
        this.hasColumns = hasColumns;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerStationInfoDTO customerStationInfoDTO = (CustomerStationInfoDTO) o;
        if(customerStationInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerStationInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerStationInfoDTO{" +
            "id=" + getId() +
            ", stationType='" + getStationType() + "'" +
            ", hasDispatching='" + isHasDispatching() + "'" +
            ", hasKahab='" + isHasKahab() + "'" +
            ", hasCanopy='" + isHasCanopy() + "'" +
            ", hasBodyPump='" + isHasBodyPump() + "'" +
            ", hasWorkClothes='" + isHasWorkClothes() + "'" +
            ", hasColumns='" + isHasColumns() + "'" +
            "}";
    }

    public Set<NozzleProductCount> getNozzleProductCounts() {
        return nozzleProductCounts;
    }

    public void setNozzleProductCounts(Set<NozzleProductCount> nozzleProductCounts) {
        this.nozzleProductCounts = nozzleProductCounts;
    }
}
