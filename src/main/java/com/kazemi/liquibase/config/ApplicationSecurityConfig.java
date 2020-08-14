package com.kazemi.liquibase.config;

import com.kazemi.liquibase.config.filters.JwtUsernameAndPasswordAuthenticationFilter;
import com.kazemi.liquibase.config.filters.JwtVerifierFilter;
import com.kazemi.liquibase.service.CustomUserDetailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {


    Logger LOGGER = LoggerFactory.getLogger(ApplicationSecurityConfig.class);

    @Autowired
    private CustomUserDetailService customUserDetailService;


    @Override
    protected void configure(HttpSecurity http) throws Exception, IOException {
        http
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager()))
                .addFilterAfter(new JwtVerifierFilter(),JwtUsernameAndPasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/", "index", "/css/**", "/js/*")
                .permitAll()
                .antMatchers("/users/**").hasAuthority("edit_image")
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .and()
                .exceptionHandling()
                .accessDeniedHandler(getCustomAccessDeniedHandler());

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public AccessDeniedHandler getCustomAccessDeniedHandler(){
        return new CustomAccessDeniedHandler();
    }

//    @Bean
//    @Override
//    protected UserDetailsService userDetailsService() {
//
//        UserDetails saeed = User.builder()
//                .username("saeid")
//                .password(passwordEncoder.encode("password"))
//                .roles(USER.name())
//                .authorities(USER.getSimpleGrantedAuthorities())
//                .build();
//
//        UserDetails ali = User.builder()
//                .username("ali")
//                .password(passwordEncoder.encode("password123"))
//                .roles(Role.SUPER_ADMIN.name())
//                .authorities(RoleSUPER_ADMIN.getSimpleGrantedAuthorities())
//                .build();
//
//        return new InMemoryUserDetailsManager(saeed, ali);
//
//    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        LOGGER.info(" Password encoder was initialized !");
        return new BCryptPasswordEncoder();
    }


//    @Bean
//    public DaoAuthenticationProvider authenticationProvider(){
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(passwordEncoder());
//        provider.setUserDetailsService(userDetailsService());
//        return provider;
//    }
}
