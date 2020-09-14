package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.PostCodeClient;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

@Configuration
public class PostCodeClientConfiguration {


    @Value("${remote.postcode.url}")
    String url;
    @Value("${remote.postcode.username-base}")
    String username;
    @Value("${remote.postcode.password-base}")
    String password;
    @Value("${remote.postcode.timeout}")
    Integer timeout;

    @Bean
    public Jaxb2Marshaller postCodeMarshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.verify.postcode");
		return marshaller;
	}

	@Bean
	public PostCodeClient postCodeClient(Jaxb2Marshaller postCodeMarshaller) {
        PostCodeClient postCodeClient = new PostCodeClient();
        postCodeClient.setDefaultUri(url);
        postCodeClient.setMarshaller(postCodeMarshaller);
        postCodeClient.setUnmarshaller(postCodeMarshaller);
        postCodeClient.setMessageSender(postCodeHttpComponentsMessageSender());
        return postCodeClient;
	}



    @Bean
    public HttpComponentsMessageSender postCodeHttpComponentsMessageSender() {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials
        httpComponentsMessageSender.setCredentials(postCodeUsernamePasswordCredentials());
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);
        return httpComponentsMessageSender;
    }

    @Bean
    public UsernamePasswordCredentials postCodeUsernamePasswordCredentials() {
        // pass the user name and password to be used
        return new UsernamePasswordCredentials(username, password);
    }
}
