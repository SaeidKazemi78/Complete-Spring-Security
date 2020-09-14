package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.specifyrate.SpecifyRateClient;
import ir.donyapardaz.niopdc.base.service.remote.transportation.TransportationClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

@Configuration
public class TransportationClientConfiguration {


    @Value("${remote.transportation.url}")
    String url;
    @Value("${remote.transportation.timeout}")
    Integer timeout;

    @Bean
    public Jaxb2Marshaller transportationMarshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.transportation");
		return marshaller;
	}

	@Bean
	public TransportationClient transportationClient(Jaxb2Marshaller transportationMarshaller) {
        TransportationClient transportationClient = new TransportationClient();
        transportationClient.setDefaultUri(url);
        transportationClient.setMarshaller(transportationMarshaller);
        transportationClient.setUnmarshaller(transportationMarshaller);
        transportationClient.setMessageSender(transportationHttpComponentsMessageSender());
        return transportationClient;
	}

    @Bean
    public HttpComponentsMessageSender transportationHttpComponentsMessageSender() {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);
        return httpComponentsMessageSender;
    }

}
