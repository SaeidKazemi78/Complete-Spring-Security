package com.kazemi.liquibase.model;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kazemi.liquibase.model.enums.LifeStyle;
import org.hibernate.annotations.DynamicUpdate;


import javax.persistence.*;
import javax.validation.constraints.Min;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@DynamicUpdate
@Entity
@Table(name = "tbl_users")
public class User implements Serializable {

    @Id@GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "family")
    private String family;

    @Column(name="life_style")
    @Enumerated(EnumType.STRING)
    private LifeStyle lifeStyle;

    @Column(name="username",unique = true)
    private String userName;

    @JsonIgnore
    @Column(name="password")
    private String password;

    @Column(name="is_active")
    private boolean isActive;

    @Column(name="birth_date")
    private ZonedDateTime birthDate;

    @Column(name = "login_count")
    private int loginCount;




    @ManyToMany(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "user_id"),
            @JoinColumn(name = "role_id")
    })
    private Set<RoleModel> roles = new HashSet<>() ;




    public  User(String name, String family,
                LifeStyle lifeStyle, String userName,
                @Min(3) String password,
                boolean isActive, ZonedDateTime birthDate) {
        this.id = id;
        this.name = name;
        this.family = family;
        this.lifeStyle = lifeStyle;
        this.userName = userName;
        this.password = password;
        this.isActive = isActive;
        this.birthDate = birthDate;

    }

    public User() {
    }

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

    public LifeStyle getLifeStyle() {
        return lifeStyle;
    }

    public void setLifeStyle(LifeStyle lifeStyle) {
        this.lifeStyle = lifeStyle;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public Set<RoleModel> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleModel> roles) {
        this.roles = roles;
    }

    public int getLoginCount() {
        return loginCount;
    }

    public void setLoginCount(int loginCount) {
        this.loginCount = loginCount;
    }
}
