package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Driver entity.
 */
public class DriverDTO implements Serializable {

    private Long id;

    private String firstName;

    private String lastName;

    private String birthCertificateNumber;

    private String drivingLicenseTypeCode;

    private String drivingLicenseNumber;

    private ZonedDateTime drivingLicenseIssueDate;

    private ZonedDateTime drivingLicenseExpireDate;

    private ZonedDateTime expireViolationDate;

    private String smartCardNumber;

    private Boolean active;

    private Boolean mainDriver;

    private String description;

    @Lob
    private byte[] picture;
    private String pictureContentType;

    private Float satisfactionWeight;

    private Float desiredLengthWeight;

    private Float behaviourWeight;

    private Long birthCityId;

    private String birthCityName;

    private Long carId;

    private String carTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBirthCertificateNumber() {
        return birthCertificateNumber;
    }

    public void setBirthCertificateNumber(String birthCertificateNumber) {
        this.birthCertificateNumber = birthCertificateNumber;
    }

    public String getDrivingLicenseTypeCode() {
        return drivingLicenseTypeCode;
    }

    public void setDrivingLicenseTypeCode(String drivingLicenseTypeCode) {
        this.drivingLicenseTypeCode = drivingLicenseTypeCode;
    }

    public String getDrivingLicenseNumber() {
        return drivingLicenseNumber;
    }

    public void setDrivingLicenseNumber(String drivingLicenseNumber) {
        this.drivingLicenseNumber = drivingLicenseNumber;
    }

    public ZonedDateTime getDrivingLicenseIssueDate() {
        return drivingLicenseIssueDate;
    }

    public void setDrivingLicenseIssueDate(ZonedDateTime drivingLicenseIssueDate) {
        this.drivingLicenseIssueDate = drivingLicenseIssueDate;
    }

    public ZonedDateTime getDrivingLicenseExpireDate() {
        return drivingLicenseExpireDate;
    }

    public void setDrivingLicenseExpireDate(ZonedDateTime drivingLicenseExpireDate) {
        this.drivingLicenseExpireDate = drivingLicenseExpireDate;
    }

    public ZonedDateTime getExpireViolationDate() {
        return expireViolationDate;
    }

    public void setExpireViolationDate(ZonedDateTime expireViolationDate) {
        this.expireViolationDate = expireViolationDate;
    }

    public String getSmartCardNumber() {
        return smartCardNumber;
    }

    public void setSmartCardNumber(String smartCardNumber) {
        this.smartCardNumber = smartCardNumber;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isMainDriver() {
        return mainDriver;
    }

    public void setMainDriver(Boolean mainDriver) {
        this.mainDriver = mainDriver;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public Float getSatisfactionWeight() {
        return satisfactionWeight;
    }

    public void setSatisfactionWeight(Float satisfactionWeight) {
        this.satisfactionWeight = satisfactionWeight;
    }

    public Float getDesiredLengthWeight() {
        return desiredLengthWeight;
    }

    public void setDesiredLengthWeight(Float desiredLengthWeight) {
        this.desiredLengthWeight = desiredLengthWeight;
    }

    public Float getBehaviourWeight() {
        return behaviourWeight;
    }

    public void setBehaviourWeight(Float behaviourWeight) {
        this.behaviourWeight = behaviourWeight;
    }

    public Long getBirthCityId() {
        return birthCityId;
    }

    public void setBirthCityId(Long regionId) {
        this.birthCityId = regionId;
    }

    public String getBirthCityName() {
        return birthCityName;
    }

    public void setBirthCityName(String regionName) {
        this.birthCityName = regionName;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getCarTitle() {
        return carTitle;
    }

    public void setCarTitle(String carTitle) {
        this.carTitle = carTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DriverDTO driverDTO = (DriverDTO) o;
        if(driverDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driverDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DriverDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthCertificateNumber='" + getBirthCertificateNumber() + "'" +
            ", drivingLicenseTypeCode='" + getDrivingLicenseTypeCode() + "'" +
            ", drivingLicenseNumber='" + getDrivingLicenseNumber() + "'" +
            ", drivingLicenseIssueDate='" + getDrivingLicenseIssueDate() + "'" +
            ", drivingLicenseExpireDate='" + getDrivingLicenseExpireDate() + "'" +
            ", expireViolationDate='" + getExpireViolationDate() + "'" +
            ", smartCardNumber='" + getSmartCardNumber() + "'" +
            ", active='" + isActive() + "'" +
            ", mainDriver='" + isMainDriver() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", satisfactionWeight=" + getSatisfactionWeight() +
            ", desiredLengthWeight=" + getDesiredLengthWeight() +
            ", behaviourWeight=" + getBehaviourWeight() +
            "}";
    }
}
