package com.kazemi.liquibase;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LiquibaseApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(LiquibaseApplication.class, args);
    }

    Logger LOGGER = LoggerFactory.getLogger(LiquibaseApplication.class);


    @Override
    public void run(String... args) throws Exception {
        LOGGER.info(" \n Application started successfully !");
    }
}
