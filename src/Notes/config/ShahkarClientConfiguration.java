package ir.donyapardaz.niopdc.base.config;


import ir.donyapardaz.niopdc.base.service.remote.Shahkar.ShahkarClient;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.IOUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.protocol.HttpContext;
import org.apache.http.ssl.SSLContextBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.util.ResourceUtils;

import javax.net.ssl.SSLContext;
import java.io.*;
import java.nio.charset.Charset;


@Configuration
public class ShahkarClientConfiguration {

    final static Logger log = LoggerFactory.getLogger(ShahkarClientConfiguration.class);
    @Value("${remote.shahkar.base-url}")
    private String baseUrl ;
    @Value("${remote.shahkar.username-basic}")
    private String username;
    @Value("${remote.shahkar.password-basic}")
    private String password ;
    @Value("${remote.shahkar.timeout}")
    private int timeout;
    @Value("${remote.shahkar.dns}")
    private String dnsIp;
    @Value("${remote.shahkar.trust-store-password}")
    private String trustStorePassword;
    @Value("${remote.shahkar.trust-store}")
    private Resource trustStore;
   // private String trustPath ;


    @Bean
    public ShahkarClient shahkarClient(RestTemplateBuilder builder)throws Exception{
        return new ShahkarClient(builder

           .basicAuthorization(username,password)
            .additionalInterceptors((HttpRequest request, byte[] body, ClientHttpRequestExecution execution)->{
                ClientHttpResponse response = execution.execute(request, body);
                log.info("===========================request begin================================================");
                log.debug("URI         : {}", request.getURI());
                log.debug("Method      : {}", request.getMethod());
                log.debug("Headers     : {}", request.getHeaders() );
                log.debug("Request body: {}", new String(body, "UTF-8"));
                log.info("==========================request end================================================");
                return response;
            })
            .requestFactory(new HttpComponentsClientHttpRequestFactory(httpClient()))
            .build());
    }

    private SSLContext sslContext() throws Exception {
        /*return SSLContextBuilder.create()
            .loadTrustMaterial(ResourceUtils.getFile(trustPath), trustStorePassword.toCharArray()).build();*/

        File file = new File("trust1.jks") ;
        try(OutputStream outputStream = new FileOutputStream(file)){
            IOUtils.copy(trustStore.getInputStream(), outputStream);
        } catch (FileNotFoundException e) {
            // handle exception here
        } catch (IOException e) {
            // handle exception here
        }

        return SSLContextBuilder.create()
            .loadTrustMaterial(file, trustStorePassword.toCharArray()).build();
    }


    private RequestConfig requestConfig(){
        return RequestConfig.custom()
            .setConnectTimeout(timeout)
            .setSocketTimeout(timeout)
            .build();
    }

    private HttpClient httpClient()throws Exception{
        return HttpClients.custom()
            .setSSLContext(sslContext())
            .setDefaultRequestConfig(requestConfig())
            .build();
    }

}
