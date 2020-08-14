package com.kazemi.liquibase.config.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static com.kazemi.liquibase.config.JwtConstants.*;

public class JwtVerifierFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
                                    HttpServletResponse httpServletResponse,
                                    FilterChain filterChain) throws ServletException, IOException {
//
        System.out.println(" Here is filter chain Number 2");
//        filterChain.doFilter(httpServletRequest,httpServletResponse);

        String token = httpServletRequest.getHeader(JWT_HEADER);
        System.out.println(" Token : " + token);

        if (token == null || !token.startsWith(JWT_PREFIX)) {
            filterChain.doFilter(httpServletRequest, httpServletResponse);
            return;
        }


        Jws<Claims> claimsJws = Jwts.parser()
                .setSigningKey(Keys.hmacShaKeyFor(JWT_SECRET.getBytes()))
                .parseClaimsJws(token.replace(JWT_PREFIX, ""));
//
        Claims myClaim = claimsJws.getBody();
        System.out.println(" **************** UserName got by Toke : " + myClaim.getSubject());
//
        String username = myClaim.getSubject();
        List<Map<String, String>> authorities = (List<Map<String, String>>) myClaim.get("authorities");

        Set<SimpleGrantedAuthority> simpleGrantedAuthorities = authorities.stream()
                .map(mapVal -> new SimpleGrantedAuthority(mapVal.get("authority"))).collect(Collectors.toSet());

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                username, null, simpleGrantedAuthorities
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(httpServletRequest, httpServletResponse);


    }
}
