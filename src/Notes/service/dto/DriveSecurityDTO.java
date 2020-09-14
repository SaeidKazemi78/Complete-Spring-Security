package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.Religion;
import ir.donyapardaz.niopdc.base.domain.enumeration.Education;
import ir.donyapardaz.niopdc.base.domain.enumeration.MaritalStatus;
import ir.donyapardaz.niopdc.base.domain.enumeration.MilitaryStatus;

/**
 * A DTO for the DriveSecurity entity.
 */
public class DriveSecurityDTO implements Serializable {

    private Long id;

    private ZonedDateTime birthDate;

    private Long height;

    private Long weight;

    private String eyeColor;

    private String hairColor;

    private String nationalId;

    private String fatherName;

    private Religion religion;

    private Education education;

    private MaritalStatus maritalStatus;

    private MilitaryStatus militaryStatus;

    private String exemptMilitaryReason;

    private Boolean haveCriminal;

    private Boolean criminalReason;

    private String address;

    @Size(min = 10, max = 10)
    private String postalCode;

    private String mobileNumber;

    private String phoneNumber;

    private String fileName;

    private String description;

    private String inCompleteDocument;

    private String serial;

    private Boolean isGuest;

    private Long driverId;

    private Long nationalityId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Religion getReligion() {
        return religion;
    }

    public void setReligion(Religion religion) {
        this.religion = religion;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public MilitaryStatus getMilitaryStatus() {
        return militaryStatus;
    }

    public void setMilitaryStatus(MilitaryStatus militaryStatus) {
        this.militaryStatus = militaryStatus;
    }

    public String getExemptMilitaryReason() {
        return exemptMilitaryReason;
    }

    public void setExemptMilitaryReason(String exemptMilitaryReason) {
        this.exemptMilitaryReason = exemptMilitaryReason;
    }

    public Boolean isHaveCriminal() {
        return haveCriminal;
    }

    public void setHaveCriminal(Boolean haveCriminal) {
        this.haveCriminal = haveCriminal;
    }

    public Boolean isCriminalReason() {
        return criminalReason;
    }

    public void setCriminalReason(Boolean criminalReason) {
        this.criminalReason = criminalReason;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInCompleteDocument() {
        return inCompleteDocument;
    }

    public void setInCompleteDocument(String inCompleteDocument) {
        this.inCompleteDocument = inCompleteDocument;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Boolean isIsGuest() {
        return isGuest;
    }

    public void setIsGuest(Boolean isGuest) {
        this.isGuest = isGuest;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public Long getNationalityId() {
        return nationalityId;
    }

    public void setNationalityId(Long countryId) {
        this.nationalityId = countryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DriveSecurityDTO driveSecurityDTO = (DriveSecurityDTO) o;
        if(driveSecurityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driveSecurityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DriveSecurityDTO{" +
            "id=" + getId() +
            ", birthDate='" + getBirthDate() + "'" +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", eyeColor='" + getEyeColor() + "'" +
            ", hairColor='" + getHairColor() + "'" +
            ", nationalId='" + getNationalId() + "'" +
            ", fatherName='" + getFatherName() + "'" +
            ", religion='" + getReligion() + "'" +
            ", education='" + getEducation() + "'" +
            ", maritalStatus='" + getMaritalStatus() + "'" +
            ", militaryStatus='" + getMilitaryStatus() + "'" +
            ", exemptMilitaryReason='" + getExemptMilitaryReason() + "'" +
            ", haveCriminal='" + isHaveCriminal() + "'" +
            ", criminalReason='" + isCriminalReason() + "'" +
            ", address='" + getAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", description='" + getDescription() + "'" +
            ", inCompleteDocument='" + getInCompleteDocument() + "'" +
            ", serial='" + getSerial() + "'" +
            ", isGuest='" + isIsGuest() + "'" +
            "}";
    }
}
