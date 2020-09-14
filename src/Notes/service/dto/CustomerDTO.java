package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Customer entity.
 */
public class CustomerDTO implements Serializable {

    private Long id;

    @Size(min = 3, max = 42)
    private String name;

    @NotNull
    @Size(min = 10, max = 10)
    private String code;

    @Size(min = 10, max = 10)
    private String postalCode;

    @Size(min = 1, max = 25)
    private String registerCode;

    @Size(min = 1, max = 20)
    private String movableCode;

    private String identifyCode;

    @Size(max = 4)
    private String gsId;

    @Size(min = 1, max = 20)
    private String creditAccount;

    private Long typeId;

    private String typeTitle;

    private Set<LocationDTO> locations = new HashSet<>();

    private String regionName;

    private String customerGroupTitle;

    private String vehicleModelTitle;

    private Boolean active;

    private Boolean valid;

    private Boolean archive;


    private String plaqueTemplateCode;
    private String plaqueTemplateTitle;

    private String plaqueTwoTemplateCode;
    private String plaqueTwoTemplateTitle;

    private CustomPlaqueDTO  customPlaque;
    private CustomPlaqueDTO  customPlaqueTwo;

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

    @NotNull
    public String getCode() {
        return code;
    }

    public void setCode(@NotNull String code) {
        this.code = code;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getRegisterCode() {
        return registerCode;
    }

    public void setRegisterCode(String registerCode) {
        this.registerCode = registerCode;
    }

    public String getMovableCode() {
        return movableCode;
    }

    public void setMovableCode(String movableCode) {
        this.movableCode = movableCode;
    }

    public String getIdentifyCode() {
        return identifyCode;
    }

    public void setIdentifyCode(String identifyCode) {
        this.identifyCode = identifyCode;
    }

    public String getGsId() {
        return gsId;
    }

    public void setGsId(String gsId) {
        this.gsId = gsId;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String typeTitle) {
        this.typeTitle = typeTitle;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public String getVehicleModelTitle() {
        return vehicleModelTitle;
    }

    public void setVehicleModelTitle(String vehicleModelTitle) {
        this.vehicleModelTitle = vehicleModelTitle;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerDTO customerDTO = (CustomerDTO) o;
        if (customerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerFullDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", code='" + getCode() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", registerCode='" + getRegisterCode() + "'" +
            ", movableCode='" + getMovableCode() + "'" +
            ", identifyCode='" + getIdentifyCode() + "'" +
            ", gsId='" + getGsId() + "'" +
            "}";
    }

    public String getCustomerGroupTitle() {
        return customerGroupTitle;
    }

    public void setCustomerGroupTitle(String customerGroupTitle) {
        this.customerGroupTitle = customerGroupTitle;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }

    public String getPlaqueTemplateCode() {
        return plaqueTemplateCode;
    }

    public void setPlaqueTemplateCode(String plaqueTemplateCode) {
        this.plaqueTemplateCode = plaqueTemplateCode;
    }

    public String getPlaqueTemplateTitle() {
        return plaqueTemplateTitle;
    }

    public void setPlaqueTemplateTitle(String plaqueTemplateTitle) {
        this.plaqueTemplateTitle = plaqueTemplateTitle;
    }

    public String getPlaqueTwoTemplateCode() {
        return plaqueTwoTemplateCode;
    }

    public void setPlaqueTwoTemplateCode(String plaqueTwoTemplateCode) {
        this.plaqueTwoTemplateCode = plaqueTwoTemplateCode;
    }

    public String getPlaqueTwoTemplateTitle() {
        return plaqueTwoTemplateTitle;
    }

    public void setPlaqueTwoTemplateTitle(String plaqueTwoTemplateTitle) {
        this.plaqueTwoTemplateTitle = plaqueTwoTemplateTitle;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    public CustomPlaqueDTO getCustomPlaque() {
        return customPlaque;
    }

    public void setCustomPlaque(CustomPlaqueDTO customPlaque) {
        this.customPlaque = customPlaque;
    }

    public CustomPlaqueDTO getCustomPlaqueTwo() {
        return customPlaqueTwo;
    }

    public void setCustomPlaqueTwo(CustomPlaqueDTO customPlaqueTwo) {
        this.customPlaqueTwo = customPlaqueTwo;
    }
}
