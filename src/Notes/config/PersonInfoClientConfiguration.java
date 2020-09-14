package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.person.PersonInfoClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

@Configuration
public class PersonInfoClientConfiguration {


    @Value("${remote.person-info.url}")
    String url;
    @Value("${remote.person-info.timeout}")
    Integer timeout;

    @Bean
    public Jaxb2Marshaller personInfoMarshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.person");
		return marshaller;
	}

	@Bean
	public PersonInfoClient personInfoClient(Jaxb2Marshaller personInfoMarshaller) throws Exception {
        PersonInfoClient personInfoClient = new PersonInfoClient();
        personInfoClient.setDefaultUri(url);
        personInfoClient.setMarshaller(personInfoMarshaller);
        personInfoClient.setUnmarshaller(personInfoMarshaller);
        personInfoClient.setMessageSender(personInfoHttpComponentsMessageSender());
        return personInfoClient;
	}

    @Bean
    public HttpComponentsMessageSender personInfoHttpComponentsMessageSender() throws Exception {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);
        return httpComponentsMessageSender;
    }


}
