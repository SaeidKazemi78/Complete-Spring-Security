package com.kazemi.liquibase.config.filters;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kazemi.liquibase.config.JwtConstants;
import com.kazemi.liquibase.config.UsernameAndPasswordAuthRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import static com.kazemi.liquibase.config.JwtConstants.*;
import java.time.LocalDate;
import java.util.Date;


public class JwtUsernameAndPasswordAuthenticationFilter  extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    public JwtUsernameAndPasswordAuthenticationFilter() {
        super();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        UsernameAndPasswordAuthRequest usernameAndPasswordAuthRequest =  usernameAndPasswordAuthRequest = new UsernameAndPasswordAuthRequest();;
        usernameAndPasswordAuthRequest.setUsername(request.getParameter("username"));
        usernameAndPasswordAuthRequest.setPassword(request.getParameter("password"));

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                    usernameAndPasswordAuthRequest.getUsername(),usernameAndPasswordAuthRequest.getPassword()
            );

        System.out.println( " Username : " +usernameAndPasswordAuthRequest.getUsername());
        System.out.println( " Password : " +usernameAndPasswordAuthRequest.getPassword());
           return authenticationManager.authenticate(authentication);

    }


    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request,
                                              HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        response.setHeader(JWT_HEADER,"BAD_CREDENTIALS_ENTERED");
        throw new BadCredentialsException(" BAD_CREDENTIALS_ENTERED ");
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
         String actualToken= Jwts.builder()
                .setSubject(authResult.getName())
                .claim("authorities",authResult.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(1)))
                .signWith(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                .compact();
        System.out.println("\n ************************* User Authenticated : token :" +actualToken);

         response.setHeader(JWT_HEADER,JWT_PREFIX+actualToken);

    }
}
