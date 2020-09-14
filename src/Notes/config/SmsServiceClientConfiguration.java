package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.sms.ServiceStub;
import ir.donyapardaz.niopdc.base.service.remote.sms.SmsClient;
import org.apache.axis2.AxisFault;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SmsServiceClientConfiguration {
    @Value("${remote.sms.url}")
    String url;
    @Value("${remote.sms.timeout}")
    Integer timeout;


    @Bean
    public ServiceStub serviceStub() throws AxisFault {
        ServiceStub serviceStub = new ServiceStub();

        return  serviceStub;
    }

}
