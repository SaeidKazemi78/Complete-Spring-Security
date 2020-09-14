package ir.donyapardaz.niopdc.base.config;


import ir.donyapardaz.niopdc.base.service.remote.movable.MovableClient;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

@Configuration
public class MovableClientConfiguration {
    @Value("${remote.movable.url}")
    String url;
    @Value("${remote.movable.timeout}")
    Integer timeout;

    @Bean
    public Jaxb2Marshaller movableMarshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.movable");
        return marshaller;
    }

    @Bean
    public MovableClient movableClient(Jaxb2Marshaller movableMarshaller) {
        MovableClient movableClient = new MovableClient();
        movableClient.setDefaultUri(url);
        movableClient.setMarshaller(movableMarshaller);
        movableClient.setUnmarshaller(movableMarshaller);
        movableClient.setMessageSender(movableHttpComponentsMessageSender());
        return movableClient;
    }

    @Bean
    public HttpComponentsMessageSender movableHttpComponentsMessageSender() {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);
        return httpComponentsMessageSender;
    }


}
