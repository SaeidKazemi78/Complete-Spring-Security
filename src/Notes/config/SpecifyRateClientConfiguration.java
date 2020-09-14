package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.specifyrate.CustomerWSStub;
import org.apache.axis2.AxisFault;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;
import ir.donyapardaz.niopdc.base.service.remote.specifyrate.SpecifyRateClient;

@Configuration
public class SpecifyRateClientConfiguration {


    @Value("${remote.specify-rate.url}")
    String url;
    @Value("${remote.specify-rate.timeout}")
    Integer timeout;
/*

    @Bean
    public Jaxb2Marshaller specifyRateMarshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.specifyrate");
		return marshaller;
	}

	@Bean
	public SpecifyRateClient specifyRateClient(Jaxb2Marshaller specifyRateMarshaller) {
        SpecifyRateClient specifyRateClient = new SpecifyRateClient();
        specifyRateClient.setDefaultUri(url);
        specifyRateClient.setMarshaller(specifyRateMarshaller);
        specifyRateClient.setUnmarshaller(specifyRateMarshaller);
        specifyRateClient.setMessageSender(specifyRateHttpComponentsMessageSender());
        return specifyRateClient;
	}

    @Bean
    public HttpComponentsMessageSender specifyRateHttpComponentsMessageSender() {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);
        return httpComponentsMessageSender;
    }
*/


    @Bean
    public CustomerWSStub specifyRateClient() throws AxisFault {
        CustomerWSStub customerWSStub = new CustomerWSStub();
              return customerWSStub;
    }


}
