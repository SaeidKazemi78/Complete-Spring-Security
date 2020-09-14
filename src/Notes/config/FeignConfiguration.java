package ir.donyapardaz.niopdc.base.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "ir.donyapardaz.niopdc.base")
public class FeignConfiguration {

}
