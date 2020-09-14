package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.CarRfId;
import ir.donyapardaz.niopdc.base.domain.CarTank;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.*;

/**
 * A DTO for the Customer entity.
 */
public class CustomerFullDTO implements Serializable {

    private Long id;

    @Size(min = 3, max = 42)
    private String name;

    @Size(min = 10, max = 10)
    private String postalCode;

    @Size(min = 1, max = 25)
    private String registerCode;

    @Size(min = 1, max = 20)
    private String movableCode;

    @NotNull
    private ZonedDateTime registerDate;

    @NotNull
    private ZonedDateTime startDate;

    private ZonedDateTime finishDate;

    @Size(min = 3, max = 12)
    private String telephone;

    @Size(min = 3, max = 255)
    private String address;

    private Boolean buyOneToMany;

    private Boolean salesPermit;

    private String identifyCode;

    private Boolean valid;

    private Boolean archive;

    @Size(max = 4)
    private String gsId;

    @Size(min = 1, max = 20)
    private String creditAccount;

    private Long typeId;

    private String typeTitle;

    private Long regionId;
    private Long airplaneModelId;
    private Long capacity;

    private String regionName;

    private String customerGroupTitle;

    private Long vehicleModelId;

    private String vehicleModelType;

    private String vehicleModelTitle;

    private Set<LocationDTO> locations = new HashSet<>();

    private Set<Long> refuelCenterIds = new HashSet<>();

    private Boolean active;

    private String plaqueTemplateCode;
    private String plaqueTemplateTitle;

    private String plaqueTwoTemplateCode;
    private String plaqueTwoTemplateTitle;

    private CustomPlaqueDTO customPlaque;
    private CustomPlaqueDTO customPlaqueTwo;

    private Long productId;
    private String productTitle;
    private List<CarTankDTO> carTanks = new ArrayList<>();
    private Set<CarRfIdDTO> carRfIds = new HashSet<>();
    private String carRfId;
    private Long customerStationInfoId;
    private Boolean hasAllowedDays;
    private Boolean used;

    private Boolean iranian;
    private Long countryId;

    private List<PersonCustomerInfoDTO> persons;


    private Set<CustomerCreditAllowedDayDTO> customerCreditAllowedDays = new HashSet<>();



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

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
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

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean isBuyOneToMany() {
        return buyOneToMany;
    }

    public void setBuyOneToMany(Boolean buyOneToMany) {
        this.buyOneToMany = buyOneToMany;
    }

    public Boolean isSalesPermit() {
        return salesPermit;
    }

    public void setSalesPermit(Boolean salesPermit) {
        this.salesPermit = salesPermit;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
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

    public void setTypeId(Long customerTypeId) {
        this.typeId = customerTypeId;
    }

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String customerTypeTitle) {
        this.typeTitle = customerTypeTitle;
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

    public Long getAirplaneModelId() {
        return airplaneModelId;
    }

    public void setAirplaneModelId(Long airplaneModelId) {
        this.airplaneModelId = airplaneModelId;
    }

    public Long getVehicleModelId() {
        return vehicleModelId;
    }

    public void setVehicleModelId(Long vehicleModelId) {
        this.vehicleModelId = vehicleModelId;
    }

    public String getVehicleModelTitle() {
        return vehicleModelTitle;
    }

    public void setVehicleModelTitle(String vehicleModelTitle) {
        this.vehicleModelTitle = vehicleModelTitle;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CustomerFullDTO customerDTO = (CustomerFullDTO) o;
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
            ", postalCode='" + getPostalCode() + "'" +
            ", registerCode='" + getRegisterCode() + "'" +
            ", movableCode='" + getMovableCode() + "'" +
            ", registerDate='" + getRegisterDate() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", finishDate='" + getFinishDate() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", address='" + getAddress() + "'" +
            ", buyOneToMany='" + isBuyOneToMany() + "'" +
            ", salesPermit='" + isSalesPermit() + "'" +
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

    public String getSelfCode() {
        if (getPostalCode() != null && !getPostalCode().isEmpty())
            return getPostalCode();
        else if (getRegisterCode() != null && !getRegisterCode().isEmpty())
            return getRegisterCode();
        else if (getMovableCode() != null && !getMovableCode().isEmpty())
            return getMovableCode();
        return null;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public CustomerFullDTO setProductTitle(String productTitle) {
        this.productTitle = productTitle;
        return this;
    }

    public Long getProductId() {
        return productId;
    }

    public CustomerFullDTO setProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public List<CarTankDTO> getCarTanks() {
        return carTanks;
    }

    public CustomerFullDTO setCarTanks(List<CarTankDTO> carTanks) {
        this.carTanks = carTanks;
        return this;
    }

    public Set<CarRfIdDTO> getCarRfIds() {
        return carRfIds;
    }

    public CustomerFullDTO setCarRfIds(Set<CarRfIdDTO> carRfIds) {
        this.carRfIds = carRfIds;
        return this;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public Set<Long> getRefuelCenterIds() {
        return refuelCenterIds;
    }

    public void setRefuelCenterIds(Set<Long> refuelCenterIds) {
        this.refuelCenterIds = refuelCenterIds;
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

    public String getCarRfId() {
        return carRfId;
    }

    public void setCarRfId(String carRfId) {
        this.carRfId = carRfId;
    }


    public String getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(String vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
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


    public Long getCustomerStationInfoId() {
        return customerStationInfoId;
    }

    public void setCustomerStationInfoId(Long customerStationInfoId) {
        this.customerStationInfoId = customerStationInfoId;
    }

    public Boolean getHasAllowedDays() {
        return hasAllowedDays;
    }

    public void setHasAllowedDays(Boolean hasAllowedDays) {
        this.hasAllowedDays = hasAllowedDays;
    }

    public Set<CustomerCreditAllowedDayDTO> getCustomerCreditAllowedDays() {
        return customerCreditAllowedDays;
    }

    public void setCustomerCreditAllowedDays(Set<CustomerCreditAllowedDayDTO> customerCreditAllowedDays) {
        this.customerCreditAllowedDays = customerCreditAllowedDays;
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

    public void setUsed(Boolean used) {
        this.used = used;
    }

    public Boolean getUsed() {
        return used;
    }

    public Boolean getIranian() {
        return iranian;
    }

    public void setIranian(Boolean iranian) {
        this.iranian = iranian;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public List<PersonCustomerInfoDTO> getPersons() {
        return persons;
    }

    public void setPersons(List<PersonCustomerInfoDTO> persons) {
        this.persons = persons;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }
}
