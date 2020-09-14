package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.DigitType;

/**
 * A DTO for the PlaqueRule entity.
 */
public class PlaqueRuleDTO implements Serializable {

    private Long id;

    @NotNull
    private Integer digit;

    @NotNull
    private Integer priority;

    @NotNull
    private DigitType digitType;

    private Long plaqueId;

    private String plaqueTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDigit() {
        return digit;
    }

    public void setDigit(Integer digit) {
        this.digit = digit;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public DigitType getDigitType() {
        return digitType;
    }

    public void setDigitType(DigitType digitType) {
        this.digitType = digitType;
    }

    public Long getPlaqueId() {
        return plaqueId;
    }

    public void setPlaqueId(Long plaqueId) {
        this.plaqueId = plaqueId;
    }

    public String getPlaqueTitle() {
        return plaqueTitle;
    }

    public void setPlaqueTitle(String plaqueTitle) {
        this.plaqueTitle = plaqueTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlaqueRuleDTO plaqueRuleDTO = (PlaqueRuleDTO) o;
        if(plaqueRuleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plaqueRuleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaqueRuleDTO{" +
            "id=" + getId() +
            ", digit=" + getDigit() +
            ", priority=" + getPriority() +
            ", digitType='" + getDigitType() + "'" +
            "}";
    }
}
