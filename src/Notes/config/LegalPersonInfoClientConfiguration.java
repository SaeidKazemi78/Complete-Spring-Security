package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.person.LegalPersonInfoClient;
import org.apache.commons.io.IOUtils;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.HttpClient;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.ssl.SSLContextBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.core.io.Resource;
import org.springframework.ws.transport.http.HttpComponentsMessageSender;

import javax.net.ssl.SSLContext;
import javax.security.cert.CertificateException;
import javax.security.cert.X509Certificate;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;


@Configuration
public class LegalPersonInfoClientConfiguration {

    @Value("${remote.legal-person-info.url}")
    String url;
    @Value("${remote.legal-person-info.username-base}")
    String username;
    @Value("${remote.legal-person-info.password-base}")
    String password;

    @Value("${remote.natural-person-info.timeout}")
    Integer timeout;
    @Value("${remote.natural-person-info.trust-store}")
    Resource trustStore;

    @Value("${remote.natural-person-info.trust-store-password}")
    private String trustStorePassword;

    @Bean
    public Jaxb2Marshaller legalPersonInfoMarshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        marshaller.setContextPath("ir.donyapardaz.niopdc.base.service.remote.lperson");
        return marshaller;
    }

    @Bean
    public LegalPersonInfoClient legalPersonInfoClient(Jaxb2Marshaller legalPersonInfoMarshaller) throws Exception {
        LegalPersonInfoClient personInfoClient = new LegalPersonInfoClient();
        personInfoClient.setDefaultUri(url);
        personInfoClient.setMarshaller(legalPersonInfoMarshaller);
        personInfoClient.setUnmarshaller(legalPersonInfoMarshaller);
        personInfoClient.setMessageSender(legalPersonInfoHttpComponentsMessageSender());
        return personInfoClient;
    }

    @Bean
    public HttpComponentsMessageSender legalPersonInfoHttpComponentsMessageSender() throws Exception {
        HttpComponentsMessageSender httpComponentsMessageSender = new HttpComponentsMessageSender();
        // set the basic authorization credentials
        httpComponentsMessageSender.setConnectionTimeout(timeout);
        // when you have a connection, timeout the read blocks for
        httpComponentsMessageSender.setReadTimeout(timeout);

        httpComponentsMessageSender.setHttpClient(httpClient());
        return httpComponentsMessageSender;
    }



    private HttpClient httpClient() throws Exception {

        AuthScope authScope;
        try {
            URL curl = new URL(url);
            String host = curl.getHost();
            int port = curl.getPort();
            authScope = new AuthScope(host, port);
        } catch (MalformedURLException e) {
//            log.error("Cannot parse the URL!!" + url);
            throw e;
        }
        UsernamePasswordCredentials creds = new UsernamePasswordCredentials(username, password);

        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
            authScope,
            creds);


        return HttpClientBuilder.create()
            .setSSLSocketFactory(sslConnectionSocketFactory())
            .setDefaultCredentialsProvider(credsProvider)
            .setSSLHostnameVerifier(new NoopHostnameVerifier())
            .addInterceptorFirst(new HttpComponentsMessageSender.RemoveSoapHeadersInterceptor())
            .build();
    }

     private SSLConnectionSocketFactory sslConnectionSocketFactory() throws Exception {
        // NoopHostnameVerifier essentially turns hostname verification off as otherwise following error
        // is thrown: java.security.cert.CertificateException: No name matching localhost found
        return new SSLConnectionSocketFactory(sslContext(), NoopHostnameVerifier.INSTANCE);
    }

    private SSLContext sslContext() throws Exception {
        File file = new File("trust.jks") ;
        try(OutputStream outputStream = new FileOutputStream(file)){
            IOUtils.copy(trustStore.getInputStream(), outputStream);
        } catch (FileNotFoundException e) {
            // handle exception here
        } catch (IOException e) {
            // handle exception here
        }

        return SSLContextBuilder.create()
            .loadTrustMaterial(file, trustStorePassword.toCharArray(),new TrustStrategy() {
                @Override
                public boolean isTrusted(java.security.cert.X509Certificate[] x509Certificates, String s) {
                    return true;
                }
            }).build();
    }
}


