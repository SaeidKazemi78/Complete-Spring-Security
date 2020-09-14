package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.ConfigType;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.*;

/**
 * A NiopdcConfig.
 */
@Entity
@Table(name = "niopdc_config")
@Audited
public class NiopdcConfig extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "finish_date")
    private ZonedDateTime finishDate;

    @Column(name = "boundary_currency_rate_group_id")
    private Integer boundaryCurrencyRateGroupId;

    @Column(name = "transfer_type_id")
    private Long transferTypeId;

    @Column(nullable = false)
    @ElementCollection
    private Set<Long> boundaryCurrencies = new HashSet<>();

    @Column(nullable = false)
    @ElementCollection
    private List<Long> transferTypeContaminateIds = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "config_Type")
    private ConfigType configType;

    @Column(name="invoice_counter_offset")
    private Long invoiceCounterOffset;



    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public NiopdcConfig startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public NiopdcConfig finishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public Integer getBoundaryCurrencyRateGroupId() {
        return boundaryCurrencyRateGroupId;
    }

    public void setBoundaryCurrencyRateGroupId(Integer boundaryCurrencyRateGroupId) {
        this.boundaryCurrencyRateGroupId = boundaryCurrencyRateGroupId;
    }

    public NiopdcConfig boundaryCurrencyRateGroupId(Integer boundaryCurrencyRateGroupId) {
        this.boundaryCurrencyRateGroupId = boundaryCurrencyRateGroupId;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NiopdcConfig niopdcConfig = (NiopdcConfig) o;
        if (niopdcConfig.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), niopdcConfig.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NiopdcConfig{" +
            "id=" + getId() +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", boundaryCurrencyRateGroupId=" + getBoundaryCurrencyRateGroupId() +
            "}";
    }

    public Set<Long> getBoundaryCurrencies() {
        return boundaryCurrencies;
    }

    public NiopdcConfig setBoundaryCurrencies(Set<Long> boundaryCurrencies) {
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

    public Long getInvoiceCounterOffset() {
        return invoiceCounterOffset;
    }

    public void setInvoiceCounterOffset(Long invoiceCounterOffset) {
        this.invoiceCounterOffset = invoiceCounterOffset;
    }
}
