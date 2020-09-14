package ir.donyapardaz.niopdc.base.service.dto.pda;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Country entity.
 */
public class CountryApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String name;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    private Boolean checkNationalCode;

    private Set<RegionApiDTO> regions = new HashSet<>();


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

    public Set<RegionApiDTO> getRegions() {
        return regions;
    }

    public void setRegions(Set<RegionApiDTO> regions) {
        this.regions = regions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CountryApiDTO countryDTO = (CountryApiDTO) o;
        if(countryDTO.getId() == null || getId() == null) {
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
}
