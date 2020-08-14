package com.kazemi.liquibase.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
public class DateTimeConfig {

    @Bean
    public SimpleDateFormat getZonedDateTime(){
        return new SimpleDateFormat("yyyy-MM-dd");
    }

}
