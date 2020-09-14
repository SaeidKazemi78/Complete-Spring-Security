package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.person.NaturalPersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.supplychannel.SupplyChannelClient;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;
@Configuration
public class SupplyChannelClientConfiguration {
    @Value("${remote.supply-channel.url}")
    String url;

    @Bean
    public Jaxb2Marshaller supplyChannelMarshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.supplychannel");
        return marshaller;
    }

    @Bean
    public SupplyChannelClient supplyChannelClient(Jaxb2Marshaller supplyChannelMarshaller) throws Exception {
        SupplyChannelClient supplyChannelClient = new SupplyChannelClient();
        supplyChannelClient.setDefaultUri(url);
        supplyChannelClient.setMarshaller(supplyChannelMarshaller);
        supplyChannelClient.setUnmarshaller(supplyChannelMarshaller);
        supplyChannelClient.setMessageSender(supplyChannelHttpComponentsMessageSender());
        return supplyChannelClient;
    }

    @Bean
    public HttpComponentsMessageSender supplyChannelHttpComponentsMessageSender() throws Exception {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials

        return httpComponentsMessageSender;
    }




}
