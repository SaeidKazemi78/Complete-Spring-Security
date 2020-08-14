package com.kazemi.liquibase.model;

import com.kazemi.liquibase.model.enums.RoleLevel;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "tbl_roles")
public class RoleModel implements Serializable {

    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    @Column(length = 50,name = "role_name")
    private String roleName;


    @Column(length = 50,name = "persian_name")
    private String persianName;

    @Column(name = "level")
    @Enumerated(EnumType.STRING)
    private RoleLevel level;

    @ManyToMany(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "role_id"),
            @JoinColumn(name = "permission_id")
    })
    private Set<Permissions> permissions = new HashSet<>();


    public RoleModel(){
    }

    public RoleModel(@NotNull @Size(max = 50) String roleName, RoleLevel level,String persianName) {
        this.level=level;
        this.roleName = roleName;
//        this.persianName=persianName;
    }



    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
//
//    public String getPersianName() {
//        return persianName;
//    }
//
//    public void setPersianName(String persianName) {
//        this.persianName = persianName;
//    }

    public RoleLevel getLevel() {
        return level;
    }

    public void setLevel(RoleLevel level) {
        this.level = level;
    }

    public Set<Permissions> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<Permissions> permissions) {
        this.permissions = permissions;
    }
}
