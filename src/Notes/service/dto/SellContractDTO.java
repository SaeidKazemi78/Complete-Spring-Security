package ir.donyapardaz.niopdc.base.service.dto;


import java.time.Instant;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.validation.global.DateRange;

/**
 * A DTO for the SellContract entity.
 */
@DateRange(first = "startDate", second = "finishDate")
public class SellContractDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime startDate;

    @NotNull
    private ZonedDateTime finishDate;

    @NotNull
    private ZonedDateTime exportationDate;


    private Instant createdDate;

    @NotNull
    @Size(min = 5, max = 15)
    private String contractNo;

    @Size(min = 3, max = 255)
    private String description;

    private ContractType contractType;

    private Boolean active;

    private Boolean archive;

    private Boolean calculateTax;

    private Set<SellContractCustomerDTO> sellContractCustomers = new HashSet<>();

    private Set<SellContractPersonDTO> sellContractPeople = new HashSet<>();

    private Long locationId;

    private Integer addendumNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public ZonedDateTime getExportationDate() {
        return exportationDate;
    }

    public void setExportationDate(ZonedDateTime exportationDate) {
        this.exportationDate = exportationDate;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    public Set<SellContractCustomerDTO> getSellContractCustomers(){
        return sellContractCustomers;
    }

    public void setSellContractCustomers(Set<SellContractCustomerDTO> sellContractCustomers) {
        this.sellContractCustomers = sellContractCustomers;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public Boolean getCalculateTax() {
        return calculateTax;
    }

    public void setCalculateTax(Boolean calculateTax) {
        this.calculateTax = calculateTax;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractDTO sellContractDTO = (SellContractDTO) o;
        if(sellContractDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", exportationDate='" + getExportationDate() + "'" +
            ", contractNo='" + getContractNo() + "'" +
            ", description='" + getDescription() + "'" +
            ", contractType='" + getContractType() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }

    public Set<SellContractPersonDTO> getSellContractPeople() {
        return sellContractPeople;
    }

    public void setSellContractPeople(Set<SellContractPersonDTO> sellContractPeople) {
        this.sellContractPeople = sellContractPeople;
    }

    public Integer getAddendumNumber() {
        return addendumNumber;
    }

    public void setAddendumNumber(Integer addendumNumber) {
        this.addendumNumber = addendumNumber;
    }
}
