package ir.donyapardaz.niopdc.base.service.remote.sms;

import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.dto.SmsDTO;
import ir.donyapardaz.niopdc.base.service.utils.LocalizationUtil;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import java.net.URL;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;


@Service
public class SmsClient extends WebServiceGatewaySupport {
    @Value("${remote.sms.action-url}")
    String actionLegalUrl;
    @Value("${remote.sms.url}")
    String baseUrl;
    @Value("${remote.sms.app-code}")
    String applicationCode;
    @Value("${remote.sms.username}")
    String username;
    @Value("${remote.sms.password}")
    String password;
    private final ServiceStub serviceStub;

    public SmsClient(ServiceStub serviceStub) {
        this.serviceStub = serviceStub;
    }

    public Boolean sendSMS(SmsDTO smsDTO) {
        ServiceStub.InsertMessage message = new ServiceStub.InsertMessage();
        Boolean result = false;

        message.setApplicationCode(applicationCode);
        message.setStartDate(ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        message.setEndDate(ZonedDateTime.now().plusMinutes(20).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        message.setMessage(LocalizationUtil.normalizePersianCharacters(smsDTO.getMessage()));
        message.setPriority("1");
        message.setUserName(username);
        message.setPassword(password);
        try {
            for (String mobile : smsDTO.getMobiles()) {
                message.setMobile(mobile);

                serviceStub.startinsertMessage(message, new ServiceCallbackHandler() {
                    @Override
                    public void receiveResultinsertMessage(ServiceStub.InsertMessageResponse result) {
                        super.receiveResultinsertMessage(result);
                    }

                    @Override
                    public void receiveErrorinsertMessage(Exception e) {
                        super.receiveErrorinsertMessage(e);
                    }
                });

            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomParameterizedException(e.getMessage());
        }

        return result;

    }


    public HealthDTO checkHealth(){
        HealthDTO healthDTO = new HealthDTO();
        try {
            URL mUrl = new URL(baseUrl);
            healthDTO.setServiceName("NIOPDC_BASE_SERVICE");
            healthDTO.setUrl(NetUtils.getBaseUrl(baseUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setTelnet(NetUtils.sendPing(NetUtils.getBaseUrl(baseUrl)));
            healthDTO.setPing(NetUtils.telnet(mUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setClientName("sms");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }

}
