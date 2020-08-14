//package com.kazemi.liquibase.model;
//
//import lombok.Data;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;
//
//
//
//public class UserPrincipal implements UserDetails{
//
//    private User user;
//
//    public UserPrincipal(User user) {
//        this.user = user;
//    }
//
//
//
//    public Collection<? extends GrantedAuthority> getAuthorities(Collection<RoleModel> roleModels) {
//
//        List<SimpleGrantedAuthority> simpleGrantedAuthorities = new ArrayList<>();
//        for (RoleModel role:roleModels) {
//            simpleGrantedAuthorities.add(new SimpleGrantedAuthority(role.getRoleName()));
//            role.getPermissions().stream()
//                    .map(p -> new SimpleGrantedAuthority(p.getPermissionName()))
//                    .forEach(simpleGrantedAuthorities::add);
//        }
//        return simpleGrantedAuthorities;
//
//    }
//
//    @Override
//    public String getPassword() {
//        return user.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return user.getUserName();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
