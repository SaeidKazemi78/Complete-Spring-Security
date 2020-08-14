package com.kazemi.liquibase;

import com.kazemi.liquibase.helper.CrudUtils;
import com.kazemi.liquibase.model.Permissions;
import com.kazemi.liquibase.model.RoleModel;
import com.kazemi.liquibase.model.User;
import com.kazemi.liquibase.repository.*;
import org.junit.jupiter.api.Test;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@RunWith(JUnitPlatform.class)
public class CustomerTest {


    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;


    @Autowired
    private CrudUtils crudUtils;

    @Autowired
    private CompanyRepository companyRepository;

    @Test
    public void Test1() {

        assertNotNull(customerRepository, "Customer repository is null !");
        if (userRepository.findAll().size() < crudUtils.generateDummyUsers().size()) {
            for (User user : crudUtils.generateDummyUsers()) {
                if (!userRepository.findOneByUserName(user.getUserName()).isPresent()) {
                    userRepository.save(user);
                }
            }
        }

        if (roleRepository.findAll().size() < crudUtils.generateDummyRole().size()) {

            for (RoleModel role : crudUtils.generateDummyRole()) {
                if (!roleRepository.findByRoleName(role.getRoleName()).isPresent()) {
                    roleRepository.save(role);
                }
            }

        }

//        permissionRepository.deleteAll();
        if (permissionRepository.findAll().size() < crudUtils.generateDummyPermission().size()) {
            for (Permissions permissions : crudUtils.generateDummyPermission()) {
                if (!permissionRepository.findByPermissionName(permissions.getPermissionName()).isPresent()) {
                    permissionRepository.save(permissions);
                }
            }
        }

        User Saeid = userRepository.findOneByUserName("saeid20").get();
        User ali100 = userRepository.findOneByUserName("ali100").get();
        User h22 = userRepository.findOneByUserName("hh_22").get();
        User mahnaz_2 = userRepository.findOneByUserName("mahnaz_2").get();
        User abbas = userRepository.findOneByUserName("abbas").get();


        RoleModel roleAdmin = roleRepository.findByRoleName("ADMIN").get();
        RoleModel roleUser = roleRepository.findByRoleName("User").get();
        RoleModel roleOperator = roleRepository.findByRoleName("Operator").get();
        RoleModel roleSell = roleRepository.findByRoleName("SELL").get();
        RoleModel roleIt = roleRepository.findByRoleName("IT_MAN").get();

        List<User> optionalUsers = Arrays.asList(
                Saeid, ali100, h22, mahnaz_2, abbas
        );


        List<RoleModel> optionalRoles = Arrays.asList(
                roleAdmin, roleUser, roleOperator, roleSell, roleIt
        );


        List<Permissions> myPermissionsList =permissionRepository.findAll();


        myPermissionsList.stream().forEach((val)->{System.out.println("Permission  Name : " + val.getPermissionName() + " Id : " +val.getId());});

        optionalRoles.stream().forEach((value)->System.out.println(" RoleName : " +value.getRoleName() + " Id : " +value.getId()));


        if (!userRepository.findAll().stream().findAny().isPresent()) {
            for (User currentUser : optionalUsers) {

                if (currentUser.getUserName() != null) {
                    System.out.println(" \n Found UserName : " + currentUser.getUserName());
                    switch (currentUser.getUserName()) {
                        case "saeid20":
                            if (!userRepository.isExistsInManyToManyUserRole(currentUser.getId(), roleAdmin.getId())) {
                                currentUser.getRoles().add(roleAdmin);
                                userRepository.save(currentUser);
                            }
                            break;
                        case "ali100":
                            if (!userRepository.isExistsInManyToManyUserRole(currentUser.getId(), roleUser.getId())) {
                                currentUser.getRoles().add(roleUser);
                                userRepository.save(currentUser);
                            }
                            break;

                        case "h_22":
                            if (!userRepository.isExistsInManyToManyUserRole(currentUser.getId(), roleOperator.getId())) {
                                currentUser.getRoles().add(roleOperator);
                                userRepository.save(currentUser);
                            }
                            break;
                        case "mahnaz_2":
                            if (!userRepository.isExistsInManyToManyUserRole(currentUser.getId(), roleSell.getId())) {
                                currentUser.getRoles().add(roleSell);
                                userRepository.save(currentUser);
                            }
                            break;

                        case "abbas":
                            if (!userRepository.isExistsInManyToManyUserRole(currentUser.getId(), roleIt.getId())) {
                                currentUser.getRoles().add(roleIt);
                                userRepository.save(currentUser);
                            }
                            break;
                    }
                }

            }
        }

        System.out.println(" Everything looks great  ! ");

    }

}
