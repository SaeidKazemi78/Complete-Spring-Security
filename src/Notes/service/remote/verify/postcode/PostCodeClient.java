package ir.donyapardaz.niopdc.base.service.remote.verify.postcode;

import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class PostCodeClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(PostCodeClient.class);

    @Value("${remote.postcode.url}")
    String url;
    @Value("${remote.postcode.username}")
    String username;
    @Value("${remote.postcode.password}")
    String password;
    @Value("${remote.postcode.action-url}")
    String actionUrl;

    public IranStandardAddress getAddressByPostcodeResponse(String postcode) {
        GetAddressByPostcode request = new GetAddressByPostcode();
        request.setPostcode(postcode);
        request.setRegionCode(0);
        request.setNodeCode(0);
        request.setUsername(username);
        request.setMessageHash(
            SecurityUtils.sha1(password + "#" +
                request.postcode + "#" +
                new SimpleDateFormat("yyyyMMdd")
                    .format(Calendar.getInstance(Locale.ROOT).getTime())));
        try {
            return ((GetAddressByPostcodeResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionUrl))).getGetAddressByPostcodeResult();
        } catch (Exception e) {
            e.printStackTrace();
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
            healthDTO.setClientName("postcode");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }


}
