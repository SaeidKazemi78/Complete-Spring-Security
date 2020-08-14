package com.kazemi.liquibase.model.dto;

import com.kazemi.liquibase.model.CompanyModel;
import com.kazemi.liquibase.model.enums.LifeStyle;
import lombok.Data;

import javax.persistence.*;

public class JoinObjectDto {


    public JoinObjectDto(String title, String finalAddress, Long phoneNumber, LifeStyle lifeStyle, CompanyModel companyId) {
        this.title = title;
        this.finalAddress = finalAddress;
        this.phoneNumber = phoneNumber;
        this.lifeStyle = lifeStyle;
        this.companyId = companyId;
    }

    private String title;

    private String finalAddress;

    private Long phoneNumber;

    private LifeStyle lifeStyle;

    private CompanyModel companyId;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFinalAddress() {
        return finalAddress;
    }

    public void setFinalAddress(String finalAddress) {
        this.finalAddress = finalAddress;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LifeStyle getLifeStyle() {
        return lifeStyle;
    }

    public void setLifeStyle(LifeStyle lifeStyle) {
        this.lifeStyle = lifeStyle;
    }

    public CompanyModel getCompanyId() {
        return companyId;
    }

    public void setCompanyId(CompanyModel companyId) {
        this.companyId = companyId;
    }
}
