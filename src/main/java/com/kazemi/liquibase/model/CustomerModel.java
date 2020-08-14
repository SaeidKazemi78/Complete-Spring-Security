package com.kazemi.liquibase.model;

import com.kazemi.liquibase.model.enums.LifeStyle;


import javax.persistence.*;

@Entity
@Table(name="tbl_customer")
public class CustomerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    public CustomerModel() {

    }

    @Column(name = "name")
    private String name;

    @Column(name = "family")
    private String family;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Enumerated(EnumType.STRING)
    private LifeStyle lifeStyle;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "company_id")
    private CompanyModel companyId;

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

    public String getFamily() {
        return family;
    }

    public void setFamily(String family) {
        this.family = family;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
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
