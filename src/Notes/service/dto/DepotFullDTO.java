package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Depot entity.
 */
public class DepotFullDTO extends AbstractAuditingDTO implements Serializable {

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

    private Set<ProductDTO> products = new HashSet<>();

    private Set<LocationDTO> locations = new HashSet<>();

    private String motherFinancialCode;

    private String counterPath;

    private String webServiceUrl;


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

    public Set<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductDTO> products) {
        this.products = products;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DepotFullDTO depotDTO = (DepotFullDTO) o;
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

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    public String getMotherFinancialCode() {
        return motherFinancialCode;
    }

    public void setMotherFinancialCode(String motherFinancialCode) {
        this.motherFinancialCode = motherFinancialCode;
    }

    public String getCounterPath() {
        return counterPath;
    }

    public void setCounterPath(String counterPath) {
        this.counterPath = counterPath;
    }

    public String getWebServiceUrl() {
        return webServiceUrl;
    }

    public void setWebServiceUrl(String webServiceUrl) {
        this.webServiceUrl = webServiceUrl;
    }
}
