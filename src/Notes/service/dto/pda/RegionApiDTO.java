package ir.donyapardaz.niopdc.base.service.dto.pda;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Region entity.
 */
public class RegionApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String name;

    @NotNull
    @Size(min = 2, max = 6)
    private String code;

    private Integer level;

    @Size(min = 5, max = 5)
    private String globalCode;

    private Long countryId;

    private String countryName;

    private Set<RegionApiDTO> subRegions = new HashSet<>();

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

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getGlobalCode() {
        return globalCode;
    }

    public void setGlobalCode(String globalCode) {
        this.globalCode = globalCode;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public Set<RegionApiDTO> getSubRegions() {
        return subRegions;
    }

    public void setSubRegions(Set<RegionApiDTO> subRegions) {
        this.subRegions = subRegions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RegionApiDTO regionDTO = (RegionApiDTO) o;
        if(regionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), regionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RegionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", level=" + getLevel() +
            ", globalCode='" + getGlobalCode() + "'" +
            "}";
    }

}
