package com.kazemi.liquibase.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class HomeController {

    @RequestMapping("/")
    public String getHome(){
        return " <h1 style='color:red;text-align:center'> Welcome to Spring Security Home Page  </h1>";
    }

    @RequestMapping("/access-denied")
    public String getError(){
        return " <h1 style='color:red;text-align:center'>You dont have access to this page !</h1>";
    }

}
