package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Country entity.
 */
public class CountryDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String name;

    @NotNull
    @Size(min = 1, max = 4)
    private String code;

    private String rmtoCode;

    private Boolean neighbor;

    private String enName;

    private String isoCode;

    private String isoCode2;

    private Boolean checkNationalCode;

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

    public Boolean isCheckNationalCode() {
        return checkNationalCode;
    }

    public void setCheckNationalCode(Boolean checkNationalCode) {
        this.checkNationalCode = checkNationalCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CountryDTO countryDTO = (CountryDTO) o;
        if (countryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), countryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CountryDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", checkNationalCode='" + isCheckNationalCode() + "'" +
            "}";
    }

    public String getRmtoCode() {
        return rmtoCode;
    }

    public void setRmtoCode(String rmtoCode) {
        this.rmtoCode = rmtoCode;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getIsoCode2() {
        return isoCode2;
    }

    public void setIsoCode2(String isoCode2) {
        this.isoCode2 = isoCode2;
    }

    public Boolean getNeighbor() {
        return neighbor;
    }

    public void setNeighbor(Boolean neighbor) {
        this.neighbor = neighbor;
    }

    public Boolean getCheckNationalCode() {
        return checkNationalCode;
    }
}
