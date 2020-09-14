package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Consumption entity.
 */
public class ConsumptionDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 1, max = 4)
    private String code;

    private Boolean manualQuota;


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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ConsumptionDTO consumptionDTO = (ConsumptionDTO) o;
        if(consumptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consumptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConsumptionDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }

    public Boolean getManualQuota() {
        return manualQuota;
    }

    public void setManualQuota(Boolean manualQuota) {
        this.manualQuota = manualQuota;
    }
}
