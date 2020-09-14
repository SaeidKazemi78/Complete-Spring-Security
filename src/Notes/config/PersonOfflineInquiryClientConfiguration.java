package ir.donyapardaz.niopdc.base.config;

import ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry.FileTransferStub;
import org.apache.axis2.AxisFault;


import org.apache.axis2.transport.http.HTTPConstants;
import org.apache.axis2.transport.http.impl.httpclient3.HttpTransportPropertiesImpl;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.auth.AuthPolicy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class PersonOfflineInquiryClientConfiguration {
    @Value("${remote.sabteahval.offlineinquiry.url}")
    String url;
    @Value("${remote.sabteahval.offlineinquiry.username_base}")
    String username;
    @Value("${remote.sabteahval.offlineinquiry.password_base}")
    String password;
    @Value("${remote.sabteahval.offlineinquiry.timeout}")
    Integer timeout;




    @Bean
    public FileTransferStub fileTransferStub() throws AxisFault {

        FileTransferStub fileTransferStub =new FileTransferStub();
        HttpClient client = new HttpClient();
        client.getParams().setAuthenticationPreemptive(true);
        fileTransferStub._getServiceClient().getServiceContext().getConfigurationContext().setProperty(HTTPConstants.CACHED_HTTP_CLIENT, client);
        HttpTransportPropertiesImpl.Authenticator auth = new HttpTransportPropertiesImpl.Authenticator();
        List<String> authpref = new ArrayList<>();
        authpref.add(AuthPolicy.BASIC);
        auth.setUsername(username);
        auth.setPassword(password);
        auth.setPreemptiveAuthentication(true);
        fileTransferStub._getServiceClient().getOptions().setProperty(org.apache.axis2.transport.http.HTTPConstants.AUTHENTICATE, auth);
        fileTransferStub._getServiceClient().getOptions().setManageSession(true);



        return fileTransferStub;
    }




}
