package ir.donyapardaz.niopdc.base.service.remote.movable;

import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.GetAddressByPostcodeResponse;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.IranStandardAddress;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;

import java.net.URL;

public class MovableClient extends WebServiceGatewaySupport {
    @Value("${remote.postcode.url}")
    String url;
    @Value("${remote.postcode.username}")
    String username;
    @Value("${remote.postcode.password}")
    String password;

    public IranStandardAddress getMovableBySabtNumberResponse(String sabtNumber)  {
        GetShenvarTemplateWithoutEditDate request = new GetShenvarTemplateWithoutEditDate();
        request.setShomareSabt(sabtNumber);
        request.setUsername(username);
        request.setPassword(password);

        try {
            return ((GetAddressByPostcodeResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request)).getGetAddressByPostcodeResult();
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }


}
