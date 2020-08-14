//package com.kazemi.liquibase.model.enums;
//
//import static com.kazemi.liquibase.model.enums.Permissions.*;
//import com.google.common.collect.Sets;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//import java.util.HashSet;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//public enum Role {
//
//    ADMIN(Sets.newHashSet(COURSE_READ,COURSE_WRITE)),
//
//    USER(Sets.newHashSet(COURSE_READ)),
//
//    SUPER_ADMIN(Sets.newHashSet(COURSE_READ,COURSE_WRITE,STUDENT_READ,STUDENT_WRITE));
//
//    private final Set<Permissions> permissions ;
//
//
//    private Role(Set<Permissions> permissions){
//        this.permissions =permissions;
//    }
//
//    private Set<Permissions> getPermissions(){
//        return permissions;
//    }
//
//    public Set<SimpleGrantedAuthority> getSimpleGrantedAuthorities(){
//        Set<SimpleGrantedAuthority> permissions=getPermissions()
//                .stream().map(permission-> new SimpleGrantedAuthority(permission.getPermission())).collect(Collectors.toSet());
//        permissions.add(new SimpleGrantedAuthority("ROLE_"+this.name()));
//        return permissions;
//    }
//}
