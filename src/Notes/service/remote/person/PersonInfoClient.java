package ir.donyapardaz.niopdc.base.service.remote.person;

import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;


public class PersonInfoClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(PersonInfoClient.class);

    @Value("${remote.person-info.action-legal-url}")
    String actionLegalUrl;
    @Value("${remote.person-info.url}")
    String url;
    @Value("${remote.person-info.action-natural-url}")
    String actionNaturalUrl;
    @Value("${remote.person-info.username}")
    String username;
    @Value("${remote.person-info.password}")
    String password;

    public NiopdcSellInquiry getPersonLegal(String national) {
        try {
            NiopdcConnectionString connectionString = new NiopdcConnectionString();
            connectionString.setUserId(username);
            connectionString.setPassword(password);

            PersonInfoLegal request = new PersonInfoLegal();
            request.setConnectionString(connectionString);
            request.setNational(national);
            OutputSellInquiry personInfoLegal = ((PersonInfoLegalResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionLegalUrl)))
                .getPersonInfoLegalResult();

            if (personInfoLegal.getId() == 200)
                return personInfoLegal.getSellInquiry();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public OutputPersonInfo getPersonNatural(NiopdcPersonInfoNew person) {
        try {
            NiopdcConnectionString connectionString = new NiopdcConnectionString();
            connectionString.setUserId(username);
            connectionString.setPassword(password);

            PersonInfoNatural request = new PersonInfoNatural();
            request.setConnectionString(connectionString);
            request.setPerson(person);
            OutputPersonInfo offlineInquiryResult = ((PersonInfoNaturalResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionNaturalUrl)))
                .getPersonInfoNaturalResult();

            return offlineInquiryResult;
        } catch (Exception e) {
            return null;
        }
    }


    public HealthDTO checkHealth(){
        HealthDTO healthDTO = new HealthDTO();
        try {
            URL mUrl = new URL(url);
            healthDTO.setServiceName("NIOPDC_BASE_SERVICE");
            healthDTO.setUrl(NetUtils.getBaseUrl(url));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setTelnet(NetUtils.sendPing(NetUtils.getBaseUrl(url)));
            healthDTO.setPing(NetUtils.telnet(mUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setClientName("person-info");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }


}
