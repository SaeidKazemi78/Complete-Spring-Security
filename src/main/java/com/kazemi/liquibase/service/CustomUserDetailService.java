package com.kazemi.liquibase.service;

import com.kazemi.liquibase.model.RoleModel;
import com.kazemi.liquibase.model.User;
import com.kazemi.liquibase.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService  implements UserDetailsService {


    public  Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(extractPrincipal(securityContext.getAuthentication()));
    }

    private  String extractPrincipal(Authentication authentication) {
        if (authentication == null) {
            return null;
        } else if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            return (String) authentication.getPrincipal();
        }
        return null;
    }

    @Autowired
    private UserRepository userRepository;


//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        System.out.println(" Found Username is : " + userRepository.findOneByUserName(username).getUserName());
//        System.out.println(" Found Password is : " + userRepository.findOneByUserName(username).getPassword());
//        return  userRepository.findOneByUserName(username)
//                 .map(mappedVal -> createSpringSecurityUser(mappedVal.getUserName(),mappedVal))
//                 .orElse(null);
//
//    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Optional<User> gotUser =userRepository.findOneByUserName(userName);

        User actualUser =gotUser.get();
        if(gotUser == null){
            throw new UsernameNotFoundException("User not Found.");
        }


        Set<GrantedAuthority> grantedAuthorities = actualUser.getRoles()
                .stream()
                .map(mapVal-> new SimpleGrantedAuthority("ROLE_"+ mapVal.getRoleName())).collect(Collectors.toSet());



        //This is important
        for(RoleModel roleModel:actualUser.getRoles()){
            roleModel.getPermissions().stream()
                    .map(p->new SimpleGrantedAuthority(p.getPermissionName()))
                    .forEach(grantedAuthorities::add);
        }


        UserDetails userDetails = new org.springframework.security.core.userdetails.User(gotUser.get().getUserName(),
                gotUser.get().getPassword(), grantedAuthorities);
        return userDetails;
    }


//    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String userName, com.kazemi.liquibase.model.User user){
//        if(!user.isActive()){
//            throw new IllegalStateException("User is not active Now !");
//        }
//
//        System.out.println( " User Roles : " +user.getRoles().stream().findFirst().getRoleName());
//        Set<GrantedAuthority>grantedAuthorities =null;
//        if(user.getRoles().size()>0){
//          grantedAuthorities= user.getRoles()
//                    .stream()
//                    .map(value->new SimpleGrantedAuthority("ROLE_" +value.getRoleName())).collect(Collectors.toSet());
//        }
//
//        return new org.springframework.security.core.userdetails.User(userName,user.getPassword(),grantedAuthorities);
//    }
}
