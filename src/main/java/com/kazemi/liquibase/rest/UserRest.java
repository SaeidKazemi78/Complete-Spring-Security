package com.kazemi.liquibase.rest;

import com.kazemi.liquibase.model.User;
import com.kazemi.liquibase.repository.UserRepository;
import com.kazemi.liquibase.service.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserRest {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CustomUserDetailService customUserDetailService;


    @GetMapping("/get")
    public ResponseEntity<List<User>> getUsers(){
        return  new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }


    @RequestMapping("/current")
    public ResponseEntity<String> getCurrentsUser(){
        return  new ResponseEntity<>(customUserDetailService.getCurrentUserLogin().get(),HttpStatus.OK);
    }


    @RequestMapping("{id}")
    public ResponseEntity<Optional<User>>findById(@PathVariable Long id){
        return  new ResponseEntity<>(userRepository.findById(id),HttpStatus.OK);
    }
}
