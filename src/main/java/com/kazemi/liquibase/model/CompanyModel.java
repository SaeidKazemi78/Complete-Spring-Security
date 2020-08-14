package com.kazemi.liquibase.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="tbl_company")
public class CompanyModel {

    public CompanyModel() {

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "final_address")
    private String finalAddress;

    @Column(name = "identifier")
    private Integer identifier;

    @JsonIgnore
    @OneToMany(mappedBy = "companyId")
    private Set<CustomerModel>customerModels = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Integer getIdentifier() {
        return identifier;
    }

    public void setIdentifier(Integer identifier) {
        this.identifier = identifier;
    }

    public Set<CustomerModel> getCustomerModels() {
        return customerModels;
    }

    public void setCustomerModels(Set<CustomerModel> customerModels) {
        this.customerModels = customerModels;
    }
}
