package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.domain.enumeration.StakeholderType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Person entity.
 */
public class PersonApiDTO implements Serializable {

    private Long id;

    @Size(min = 3, max = 42)
    private String name;


    @Size(min = 5, max = 20)
    private String code;

    @Size(min = 3, max = 12)
    private String telephone;

    @Size(min = 3, max = 15)
    private String cellphone;

    @Size(min = 5, max = 42)
    private String email;

    @Size(min = 10, max = 10)
    private String postalCode;

    @Size(min = 3, max = 42)
    private String registerNo;

    @Size(min = 3, max = 80)
    private String address;

    @Size(min = 12, max = 12)
    private String economicCode;

    @NotNull
    private Personality personality;

    private Long regionId;

    private String regionName;

    private Long countryId;

    private String countryName;

    private Set<LocationWithoutRelApiDTO> locations = new HashSet<>();

    private Set<SellContractApiDTO> sellContracts = new HashSet<>();

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

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEconomicCode() {
        return economicCode;
    }

    public void setEconomicCode(String economicCode) {
        this.economicCode = economicCode;
    }

    public Personality getPersonality() {
        return personality;
    }

    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
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

    public Set<LocationWithoutRelApiDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationWithoutRelApiDTO> locations) {
        this.locations = locations;
    }

    public Set<SellContractApiDTO> getSellContracts() {
        return sellContracts;
    }

    public void setSellContracts(Set<SellContractApiDTO> sellContracts) {
        this.sellContracts = sellContracts;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonApiDTO personDTO = (PersonApiDTO) o;
        if(personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", cellphone='" + getCellphone() + "'" +
            ", email='" + getEmail() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", registerNo='" + getRegisterNo() + "'" +
            ", address='" + getAddress() + "'" +
            ", economicCode='" + getEconomicCode() + "'" +
            ", personality='" + getPersonality() + "'" +
            "}";
    }


}
