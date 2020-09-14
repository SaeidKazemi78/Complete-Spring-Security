package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * A DTO for the Car entity.
 */
public class CarCustomerOfflineDTO implements Serializable {

    private Long id;

    private String registerCode;

    private String movableCode;

    private ZonedDateTime registerDate;

    private Boolean valid = false;

    private String identifyCode;

    private CustomerTypeDTO type;

    private Boolean active;

    private Boolean archive;

    private String plaque;

    private String plaqueTwo;

    private Set<CarTankDTO> carTanks = new HashSet<>();

    private Set<CarRfIdDTO> carRfIds = new HashSet<>();

    private VehicleModelDTO vehicleModel;

    private String plaqueTemplateCode;

    private String plaqueTwoTemplateCode;

    private String carRfId;

    private String countryCode;

    private Long countryId;

    private Long typeId;

    private Long locationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public CustomerTypeDTO getType() {
        return type;
    }

    public void setType(CustomerTypeDTO type) {
        this.type = type;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    public String getPlaque() {
        return plaque;
    }

    public void setPlaque(String plaque) {
        this.plaque = plaque;
    }

    public String getPlaqueTwo() {
        return plaqueTwo;
    }

    public void setPlaqueTwo(String plaqueTwo) {
        this.plaqueTwo = plaqueTwo;
    }

    public Set<CarTankDTO> getCarTanks() {
        return carTanks;
    }

    public void setCarTanks(Set<CarTankDTO> carTanks) {
        this.carTanks = carTanks;
    }

    public Set<CarRfIdDTO> getCarRfIds() {
        return carRfIds;
    }

    public void setCarRfIds(Set<CarRfIdDTO> carRfIds) {
        this.carRfIds = carRfIds;
    }

    public VehicleModelDTO getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(VehicleModelDTO vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getPlaqueTemplateCode() {
        return plaqueTemplateCode;
    }

    public void setPlaqueTemplateCode(String plaqueTemplateCode) {
        this.plaqueTemplateCode = plaqueTemplateCode;
    }

    public String getPlaqueTwoTemplateCode() {
        return plaqueTwoTemplateCode;
    }

    public void setPlaqueTwoTemplateCode(String plaqueTwoTemplateCode) {
        this.plaqueTwoTemplateCode = plaqueTwoTemplateCode;
    }

    public String getCarRfId() {
        return carRfId;
    }

    public void setCarRfId(String carRfId) {
        this.carRfId = carRfId;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public Long getTypeId() {
        return typeId;
    }

    public void setTypeId(Long typeId) {
        this.typeId = typeId;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }
}
