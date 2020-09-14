package ir.donyapardaz.niopdc.base.service.remote.Shahkar;


import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.remote.Shahkar.dto.ShahkarRequestDTO;
import ir.donyapardaz.niopdc.base.service.remote.Shahkar.dto.ShahkarResponsDTO;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URL;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class ShahkarClient {


    @Value("${remote.shahkar.identification-type}")
    private Integer identificationType;
    @Value("${remote.shahkar.service-type}")
    private Integer serviceType;

    @Value("${remote.shahkar.username}")
    private String username;
    @Value("${remote.shahkar.password}")
    private String password;

    @Value("${remote.shahkar.base-url}")
    private String baseUrl;



    private final RestTemplate restClient;

    public ShahkarClient(RestTemplate restClient) {
        this.restClient = restClient;
    }

    public Boolean isOwnershipMobile(String mobile, String nationalCode) {
        try {
            ShahkarRequestDTO requestDTO = new ShahkarRequestDTO();
            requestDTO.setIdentificationType(identificationType);
            requestDTO.setIdentificationNo(nationalCode);
            requestDTO.setServiceNumber(mobile);
            requestDTO.setRequestId("0552" + ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + "000000");
            requestDTO.setServiceType(serviceType);

            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(baseUrl).queryParam("username", username).queryParam("password", password);
            UriComponents components = builder.build(true);
            URI uri = components.toUri();

            ShahkarResponsDTO response = restClient.postForObject(uri, requestDTO, ShahkarResponsDTO.class);

            if (response.getResponse().intValue() == 200)
                return true;

            return false;
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomParameterizedException(e.getMessage());
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
            healthDTO.setClientName("shahkar");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }
}
