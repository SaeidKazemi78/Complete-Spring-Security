package com.kazemi.liquibase.model;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tbl_permissions")
public class Permissions implements Serializable {

    public Permissions() {
    }

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permission_name")
    private String permissionName;

    @Column(name = "persian_name")
    private String persianName;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;


    public Permissions(String permissionName, ZonedDateTime creationDate,String persianName) {
        this.permissionName = permissionName;
        this.creationDate = creationDate;
        this.persianName=persianName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

}
