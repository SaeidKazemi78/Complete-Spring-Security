package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.Country;
import ir.donyapardaz.niopdc.base.domain.enumeration.TranshipType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.*;

/**
 * A DTO for the Location entity.
 */
public class LocationFullDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String name;

    private String parentName;

    @NotNull
//    @Size(min = 2, max = 4)
    private String code;

    private String rmtoCode;

    //    @Size(min = 4, max = 4)
    private String financialCode;

    @Size(min = 5, max = 20)
    private String costAccount;

    private Integer level;

    private Long locationId;

    private Boolean docForParentLocation;

    private Set<DepotFullDTO> depots = new HashSet<>();

    private Set<RegionDTO> regions = new HashSet<RegionDTO>();

    private Long parentLocationId;
    private ZonedDateTime day;

    private Boolean haveBoundarySell;

    private TranshipType transhipType;

    private Country country;

    private Boolean beforeControl;

    private Boolean beforeControlTranship;

    private Boolean canOpen;
    private Boolean canClose;

    private Boolean farCountry;
    private Boolean pumpBeforeControl;

    private Long tolerance;


    private String stateCode;

    private Boolean hasDepot;

    private String checkbookAccountNumber;

    private Long boundaryExemption;

    private List<Long> bankAccountTypeIds = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFinancialCode() {
        return financialCode;
    }

    public void setFinancialCode(String financialCode) {
        this.financialCode = financialCode;
    }

    public String getCostAccount() {
        return costAccount;
    }

    public void setCostAccount(String costAccount) {
        this.costAccount = costAccount;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Set<DepotFullDTO> getDepots() {
        return depots;
    }

    public void setDepots(Set<DepotFullDTO> depots) {
        this.depots = depots;
    }

    public Set<RegionDTO> getRegions() {
        return regions;
    }

    public void setRegions(Set<RegionDTO> regions) {
        this.regions = regions;
    }

    public Long getParentLocationId() {
        return parentLocationId;
    }

    public void setParentLocationId(Long parentLocationId) {
        this.parentLocationId = parentLocationId;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

    public ZonedDateTime getDay() {
        return day;
    }

    public void setDay(ZonedDateTime day) {
        this.day = day;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LocationFullDTO locationDTO = (LocationFullDTO) o;
        if (locationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), locationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LocationFullDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", financialCode='" + getFinancialCode() + "'" +
            ", costAccount='" + getCostAccount() + "'" +
            ", level=" + getLevel() +
            "}";
    }

    public Boolean getHaveBoundarySell() {
        return haveBoundarySell;
    }

    public void setHaveBoundarySell(Boolean haveBoundarySell) {
        this.haveBoundarySell = haveBoundarySell;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Boolean getBeforeControl() {
        return beforeControl;
    }

    public void setBeforeControl(Boolean beforeControl) {
        this.beforeControl = beforeControl;
    }

    public Boolean getBeforeControlTranship() {
        return beforeControlTranship;
    }

    public void setBeforeControlTranship(Boolean beforeControlTranship) {
        this.beforeControlTranship = beforeControlTranship;
    }

    public TranshipType getTranshipType() {
        return transhipType;
    }

    public void setTranshipType(TranshipType transhipType) {
        this.transhipType = transhipType;
    }

    public Boolean getCanOpen() {
        return canOpen;
    }

    public void setCanOpen(Boolean canOpen) {
        this.canOpen = canOpen;
    }

    public Boolean getCanClose() {
        return canClose;
    }

    public void setCanClose(Boolean canClose) {
        this.canClose = canClose;
    }

    public Boolean getFarCountry() {
        return farCountry;
    }

    public void setFarCountry(Boolean farCountry) {
        this.farCountry = farCountry;
    }

    public Boolean getPumpBeforeControl() {
        return pumpBeforeControl;
    }

    public void setPumpBeforeControl(Boolean pumpBeforeControl) {
        this.pumpBeforeControl = pumpBeforeControl;
    }

    public Long getTolerance() {
        return tolerance;
    }

    public void setTolerance(Long tolerance) {
        this.tolerance = tolerance;
    }

    public Boolean getHasDepot() {
        return hasDepot;
    }

    public void setHasDepot(Boolean hasDepot) {
        this.hasDepot = hasDepot;
    }

    public String getCheckbookAccountNumber() {
        return checkbookAccountNumber;
    }

    public void setCheckbookAccountNumber(String checkbookAccountNumber) {
        this.checkbookAccountNumber = checkbookAccountNumber;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public List<Long> getBankAccountTypeIds() {
        return bankAccountTypeIds;
    }

    public void setBankAccountTypeIds(List<Long> bankAccountTypeIds) {
        this.bankAccountTypeIds = bankAccountTypeIds;
    }

    public Long getBoundaryExemption() {
        return boundaryExemption;
    }

    public void setBoundaryExemption(Long boundaryExemption) {
        this.boundaryExemption = boundaryExemption;
    }

    public String getRmtoCode() {
        return rmtoCode;
    }

    public void setRmtoCode(String rmtoCode) {
        this.rmtoCode = rmtoCode;
    }

    public Boolean getDocForParentLocation() {
        return docForParentLocation;
    }

    public void setDocForParentLocation(Boolean docForParentLocation) {
        this.docForParentLocation = docForParentLocation;
    }
}
