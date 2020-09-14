package ir.donyapardaz.niopdc.uaa.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "ir.donyapardaz.niopdc.uaa")
public class FeignConfiguration {

}
