package ir.donyapardaz.niopdc.base.service.dto;

import ir.donyapardaz.niopdc.base.domain.enumeration.PersonInquiryStatus;


import java.time.ZonedDateTime;

public class PersonInquiryDTO {
    private Long id;

    private String firstName;

    private String lastName;

    private String nationalCode;

    private String idCode;

    private String fatherName;

    private Boolean isAlive;

    private ZonedDateTime birthday;

    private String description;

    private String alphabetClassified;

    private String classified;

    private String consecutive;

    private PersonInquiryStatus status;

    private ZonedDateTime  inquiryTime;

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

    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public Boolean getAlive() {
        return isAlive;
    }

    public void setAlive(Boolean alive) {
        isAlive = alive;
    }

    public ZonedDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(ZonedDateTime birthday) {
        this.birthday = birthday;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAlphabetClassified() {
        return alphabetClassified;
    }

    public void setAlphabetClassified(String alphabetClassified) {
        this.alphabetClassified = alphabetClassified;
    }

    public String getClassified() {
        return classified;
    }

    public void setClassified(String classified) {
        this.classified = classified;
    }

    public String getConsecutive() {
        return consecutive;
    }

    public void setConsecutive(String consecutive) {
        this.consecutive = consecutive;
    }

    public PersonInquiryStatus getStatus() {
        return status;
    }

    public void setStatus(PersonInquiryStatus status) {
        this.status = status;
    }

    public ZonedDateTime getInquiryTime() {
        return inquiryTime;
    }

    public void setInquiryTime(ZonedDateTime inquiryTime) {
        this.inquiryTime = inquiryTime;
    }
}
