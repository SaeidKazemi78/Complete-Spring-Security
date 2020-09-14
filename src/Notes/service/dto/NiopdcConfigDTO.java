package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.ConfigType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.*;

/**
 * A DTO for the NiopdcConfig entity.
 */
public class NiopdcConfigDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    private Integer boundaryCurrencyRateGroupId;

    private Set<Long> boundaryCurrencies = new HashSet<>();
    private List<Long> transferTypeContaminateIds;


    private ConfigType configType;

    private Long transferTypeId;

    private Long invoiceCounterOffset;

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

    public Integer getBoundaryCurrencyRateGroupId() {
        return boundaryCurrencyRateGroupId;
    }

    public void setBoundaryCurrencyRateGroupId(Integer boundaryCurrencyRateGroupId) {
        this.boundaryCurrencyRateGroupId = boundaryCurrencyRateGroupId;
    }

    public Long getInvoiceCounterOffset() {
        return invoiceCounterOffset;
    }

    public void setInvoiceCounterOffset(Long invoiceCounterOffset) {
        this.invoiceCounterOffset = invoiceCounterOffset;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        NiopdcConfigDTO niopdcConfigDTO = (NiopdcConfigDTO) o;
        if (niopdcConfigDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niopdcConfigDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NiopdcConfigDTO{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", boundaryCurrencyRateGroupId=" + getBoundaryCurrencyRateGroupId() +
            "}";
    }

    public Set<Long> getBoundaryCurrencies() {
        return boundaryCurrencies;
    }

    public NiopdcConfigDTO setBoundaryCurrencies(Set<Long> boundaryCurrencies) {
        this.boundaryCurrencies = boundaryCurrencies;
        return this;
    }

    public ConfigType getConfigType() {
        return configType;
    }

    public void setConfigType(ConfigType configType) {
        this.configType = configType;
    }

    public Long getTransferTypeId() {
        return transferTypeId;
    }

    public void setTransferTypeId(Long transferTypeId) {
        this.transferTypeId = transferTypeId;
    }

    public List<Long> getTransferTypeContaminateIds() {
        return transferTypeContaminateIds;
    }

    public void setTransferTypeContaminateIds(List<Long> transferTypeContaminateIds) {
        this.transferTypeContaminateIds = transferTypeContaminateIds;
    }
}
