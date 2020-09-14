package ir.donyapardaz.niopdc.base.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.codec.ErrorDecoder;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.errors.FeignCustomParameterizedException;
import org.apache.commons.io.IOUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignErrorDecoderConfiguration {
    @Bean
    public ErrorDecoder errorDecoder() {
        return (methodKey, response) -> {
            int status = response.status();
            if (status == 400) {
                try {
                    String body = IOUtils.toString(response.body().asReader());
                    ObjectMapper objectMapper = new ObjectMapper();
                    CustomParameterizedException customParameterizedException = objectMapper.readValue(body, CustomParameterizedException.class);
                    return new FeignCustomParameterizedException(customParameterizedException.getMessage(), customParameterizedException);
                } catch (Exception ignored) {
                    return new RuntimeException("Response Code " + status);
                }
            } else {
                return new RuntimeException("Response Code " + status);
            }
        };
    }
}
