package ir.donyapardaz.niopdc.base.service.remote.transportation;

import ir.donyapardaz.niopdc.base.domain.enumeration.CapacityType;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SpecifyRateMapper;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;
import java.time.ZonedDateTime;
import java.util.List;

public class TransportationClient extends WebServiceGatewaySupport {

    @Autowired
    SpecifyRateMapper transportationMapper;

    private static final Logger log = LoggerFactory.getLogger(TransportationClient.class);

    @Value("${remote.transportation.get-pyman-list-from-navgan-action}")
    String actionUrlPerson;

    @Value("${remote.transportation.get-data-from-navgan-action-with-type}")
    String actionUrlCapacity;

    @Value("${remote.transportation.url}")
    String baseUrl;

    public List<DataComplexTypeGetDataNavganPymanSell> getPersonFromTransportation() {
        try {
            GetPymanListFromNavgan request = new GetPymanListFromNavgan();
            request.setFromDate(/*"1397/01/01"*/DateUtil.convertToPersianByFormat(ZonedDateTime.now(), "yyyy/MM/dd"));

            List<DataComplexTypeGetDataNavganPymanSell> result = ((GetPymanListFromNavganResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionUrlPerson))).getGetPymanListFromNavganResult().getDataComplexTypeGetDataNavganPymanSell();

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    public List<DataComplexTypePymanResult> getCapacity(String code, CapacityType type) {
        try {
            GetDataFromNavganWithType request = new GetDataFromNavganWithType();
            request.setCode(code);
            request.setType(type == CapacityType.PERSON_TRANSPOR ? "1" : "2");

            List<DataComplexTypePymanResult> result = ((GetDataFromNavganWithTypeResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionUrlCapacity))).getGetDataFromNavganWithTypeResult().getDataComplexTypePymanResult();

            return result;
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
            healthDTO.setClientName("transportation");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }

}
