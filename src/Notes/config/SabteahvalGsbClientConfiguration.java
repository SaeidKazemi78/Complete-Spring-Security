package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb.SabteahvalGsbClient;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.PostCodeClient;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

@Configuration
public class SabteahvalGsbClientConfiguration {


    @Value("${remote.sabteahval.gsb.url}")
    String url;
    @Value("${remote.sabteahval.gsb.username_base}")
    String username;
    @Value("${remote.sabteahval.gsb.password_base}")
    String password;
    @Value("${remote.sabteahval.gsb.timeout}")
    Integer timeout;

    @Bean
    public Jaxb2Marshaller sabteahvalGsbMarshaller() {
		Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
		marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb");
		return marshaller;
	}

	@Bean
	public SabteahvalGsbClient sabteahvalGsbClient(Jaxb2Marshaller sabteahvalGsbMarshaller) {
        SabteahvalGsbClient gsbClient = new SabteahvalGsbClient();
        gsbClient.setDefaultUri(url);
        gsbClient.setMarshaller(sabteahvalGsbMarshaller);
        gsbClient.setUnmarshaller(sabteahvalGsbMarshaller);
        gsbClient.setMessageSender(postCodeHttpComponentsMessageSender());
        return gsbClient;
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
