package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.config.oauth2.OAuth2JwtAccessTokenConverter;
import ir.donyapardaz.niopdc.base.config.oauth2.OAuth2Properties;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.security.oauth2.OAuth2SignatureVerifierClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cloud.client.loadbalancer.RestTemplateCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.web.client.RestTemplate;

@Configuration
@EnableResourceServer
public class MicroserviceSecurityConfiguration extends ResourceServerConfigurerAdapter {
    private final OAuth2Properties oAuth2Properties;

    public MicroserviceSecurityConfiguration(OAuth2Properties oAuth2Properties) {
        this.oAuth2Properties = oAuth2Properties;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
            .disable()
            .headers()
            .frameOptions()
            .disable()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/niopdcbase/pr/**").permitAll()
            .antMatchers("/api/profile-info").permitAll()
            .antMatchers("/api/news/remain-time/*").permitAll()
            .antMatchers("/api/person/register/**").permitAll()
            .antMatchers(HttpMethod.GET, "/testwcfservice/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/countries/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/customers/old-customer/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/regions/**").permitAll()
            .antMatchers("/api/locations/**").permitAll()
            .antMatchers(HttpMethod.GET, "/api/people/exist-national-code/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/people/base-info/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/people/register").permitAll()
            .antMatchers(HttpMethod.GET, "/api/postcode/address/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/regions/recursive-to-up").permitAll()
            .antMatchers("/api/regions/load-excel/*").permitAll()
            .antMatchers("/api/**").authenticated()
            .antMatchers("/management/health").permitAll()
            .antMatchers("/management/**").hasAuthority(AuthoritiesConstants.ADMIN)
            .antMatchers("/swagger-resources/configuration/ui").permitAll()
            .antMatchers(HttpMethod.POST, "/api/customers/exist/**").permitAll();
    }

    @Bean
    public TokenStore tokenStore(JwtAccessTokenConverter jwtAccessTokenConverter) {
        return new JwtTokenStore(jwtAccessTokenConverter);
    }

    @Bean
    public JwtAccessTokenConverter jwtAccessTokenConverter(OAuth2SignatureVerifierClient signatureVerifierClient) {
        return new OAuth2JwtAccessTokenConverter(oAuth2Properties, signatureVerifierClient);
    }

    @Bean
    @Qualifier("loadBalancedRestTemplate")
    public RestTemplate loadBalancedRestTemplate(RestTemplateCustomizer customizer) {
        RestTemplate restTemplate = new RestTemplate();
        customizer.customize(restTemplate);
        return restTemplate;
    }

    @Bean
    @Qualifier("vanillaRestTemplate")
    public RestTemplate vanillaRestTemplate() {
        return new RestTemplate();
    }
}
