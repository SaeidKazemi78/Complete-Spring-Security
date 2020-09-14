package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.NozzleProductType;

/**
 * A DTO for the NozzleProductCount entity.
 */
public class NozzleProductCountDTO implements Serializable {

    private Long id;

    private NozzleProductType nozzleProductType;

    private Integer nozzleCount;

    private Long customerStationInfoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NozzleProductType getNozzleProductType() {
        return nozzleProductType;
    }

    public void setNozzleProductType(NozzleProductType nozzleProductType) {
        this.nozzleProductType = nozzleProductType;
    }

    public Integer getNozzleCount() {
        return nozzleCount;
    }

    public void setNozzleCount(Integer nozzleCount) {
        this.nozzleCount = nozzleCount;
    }

    public Long getCustomerStationInfoId() {
        return customerStationInfoId;
    }

    public void setCustomerStationInfoId(Long customerStationInfoId) {
        this.customerStationInfoId = customerStationInfoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NozzleProductCountDTO nozzleProductCountDTO = (NozzleProductCountDTO) o;
        if(nozzleProductCountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nozzleProductCountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NozzleProductCountDTO{" +
            "id=" + getId() +
            ", nozzleProductType='" + getNozzleProductType() + "'" +
            ", nozzleCount=" + getNozzleCount() +
            "}";
    }
}
