package ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb;

import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb.*;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb.dto.PersonValidateDTO;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;


public class SabteahvalGsbClient extends WebServiceGatewaySupport {

    @Value("${remote.sabteahval.gsb.url}")
    String url;
    /**
     * nationalCode and birthday validate request
     * @param person
     * @return
     */
    public PersonValidateDTO isPersonInfoValid(PersonDTO person) {
        PersonValidateDTO validate = null;
        try {
            Estelam11Request personInfo  = new Estelam11Request();
            YearMonthDay birthday = DateUtil.convertToPersian(person.getBirthday());
            personInfo.setBirthDate(Integer.valueOf((birthday.getYear()+""+birthday.getMonth()+""+birthday.getDay())));
            personInfo.setNin(Long.parseLong(person.getIdCode()));
            GetEstelam11 request = new GetEstelam11();

            request.setArg4(personInfo);

            EstelamResult11 result = ((GetEstelam11Response) getWebServiceTemplate()
                .marshalSendAndReceive(request)).getReturn();
            validate = new PersonValidateDTO();
            validate.setValid(result.isResult());
            validate.setMsg(result.getMessage());
            return validate;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return validate;
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
            healthDTO.setClientName("sabteahval.gsb");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }
}
