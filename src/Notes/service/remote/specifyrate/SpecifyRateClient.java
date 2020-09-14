package ir.donyapardaz.niopdc.base.service.remote.specifyrate;

import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.dto.SpecifyRateDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SpecifyRateMapper;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;

// تعیین نرخ
public class SpecifyRateClient extends WebServiceGatewaySupport {

    @Autowired
    SpecifyRateMapper specifyRateMapper;

    private static final Logger log = LoggerFactory.getLogger(SpecifyRateClient.class);

    @Value("${remote.specify-rate.password}")
    String password;
    @Value("${remote.specify-rate.action}")
    String actionUrl;

    @Value("${remote.specify-rate.url}")
    String baseUrl;

    public Boolean addCustomer(SpecifyRateDTO specifyRateDTO) {
        try {
            CustomerWSStub.AddCustomer request = specifyRateMapper.toEntity(specifyRateDTO);
            request.setPass(password);

            String result = ((CustomerWSStub.AddCustomerResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionUrl))).get_return();

            log.debug(result);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
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
            healthDTO.setClientName("specify-rate");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }

}
