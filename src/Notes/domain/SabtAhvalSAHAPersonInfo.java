package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;

import javax.persistence.*;

@Entity
@Table(name = "aabt_ahval_SAHA_person_info")
public class SabtAhvalSAHAPersonInfo {

    @Id
    private String nationalCode;
    private String birthDate;
    private String city;
    private String deathDate;
    private Integer errorCode;
    private String errorDescription;
    private String fatherName;
    private String firstName;
    private String gender;
    private String identityNo;
    private String identitySerial;
    private String identitySeries;
    private String isLive;
    private String lastName;
    private String supervisorNationalCode;
    private String town;
    private String vilage;


    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(String deathDate) {
        this.deathDate = deathDate;
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorDescription() {
        return errorDescription;
    }

    public void setErrorDescription(String errorDescription) {
        this.errorDescription = errorDescription;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getIdentityNo() {
        return identityNo;
    }

    public void setIdentityNo(String identityNo) {
        this.identityNo = identityNo;
    }

    public String getIdentitySerial() {
        return identitySerial;
    }

    public void setIdentitySerial(String identitySerial) {
        this.identitySerial = identitySerial;
    }

    public String getIdentitySeries() {
        return identitySeries;
    }

    public void setIdentitySeries(String identitySeries) {
        this.identitySeries = identitySeries;
    }

    public String getIsLive() {
        return isLive;
    }

    public void setIsLive(String isLive) {
        this.isLive = isLive;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getSupervisorNationalCode() {
        return supervisorNationalCode;
    }

    public void setSupervisorNationalCode(String supervisorNationalCode) {
        this.supervisorNationalCode = supervisorNationalCode;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getVilage() {
        return vilage;
    }

    public void setVilage(String vilage) {
        this.vilage = vilage;
    }
}
