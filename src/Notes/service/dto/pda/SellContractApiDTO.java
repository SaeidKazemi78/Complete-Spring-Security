package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the SellContract entity.
 */
public class SellContractApiDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime startDate;

    @NotNull
    private ZonedDateTime finishDate;

    @NotNull
    private ZonedDateTime exportationDate;

    @NotNull
    @Size(min = 5, max = 15)
    private String contractNo;

    @Size(min = 3, max = 255)
    private String description;

    private ContractType contractType;

    private Boolean active;

    private Set<CustomerApiDTO> customers = new HashSet<>();



    private Integer sharePercent;


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

    public Set<CustomerApiDTO> getCustomers() {
        return customers;
    }

    public void setCustomers(Set<CustomerApiDTO> customers) {
        this.customers = customers;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractApiDTO sellContractDTO = (SellContractApiDTO) o;
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

}
