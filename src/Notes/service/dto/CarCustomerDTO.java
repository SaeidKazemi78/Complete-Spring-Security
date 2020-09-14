package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;

/**
 * A DTO for the Car entity.
 */
public class CarCustomerDTO implements Serializable {

    private Long id;


    private String vehicleModelTitle;

    private String vehicleModelType;

    private String plaque;

    private String plaqueTwo;

    private String carRfId;

    private String typeTitle;

    private Boolean valid;

    private Boolean archive;


    private CustomPlaqueDTO  customPlaque;
    private CustomPlaqueDTO  customPlaqueTwo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleModelType() {
        return vehicleModelType;
    }

    public void setVehicleModelType(String vehicleModelType) {
        this.vehicleModelType = vehicleModelType;
    }

    public String getVehicleModelTitle() {
        return vehicleModelTitle;
    }

    public void setVehicleModelTitle(String vehicleModelTitle) {
        this.vehicleModelTitle = vehicleModelTitle;
    }

    public String getPlaque() {
        return plaque;
    }

    public void setPlaque(String plaque) {
        this.plaque = plaque;
    }

    public String getCarRfId() {
        return carRfId;
    }

    public void setCarRfId(String carRfId) {
        this.carRfId = carRfId;
    }

    public String getPlaqueTwo() {
        return plaqueTwo;
    }

    public void setPlaqueTwo(String plaqueTwo) {
        this.plaqueTwo = plaqueTwo;
    }

    public String getTypeTitle() {
        return typeTitle;
    }

    public void setTypeTitle(String typeTitle) {
        this.typeTitle = typeTitle;
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

    public Boolean getArchive() {
        return archive;
    }

    public void setArchive(Boolean archive) {
        this.archive = archive;
    }

    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }
}
