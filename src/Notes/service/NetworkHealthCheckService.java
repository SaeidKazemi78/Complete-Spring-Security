package ir.donyapardaz.niopdc.base.service;


import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.remote.Shahkar.ShahkarClient;
import ir.donyapardaz.niopdc.base.service.remote.person.LegalPersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.person.NaturalPersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.person.PersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.gsb.SabteahvalGsbClient;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry.PersonOfflineInquiryClient;
import ir.donyapardaz.niopdc.base.service.remote.sms.SmsClient;
import ir.donyapardaz.niopdc.base.service.remote.specifyrate.SpecifyRateClient;
import ir.donyapardaz.niopdc.base.service.remote.supplychannel.SupplyChannelClient;
import ir.donyapardaz.niopdc.base.service.remote.transportation.TransportationClient;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.PostCodeClient;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class NetworkHealthCheckService {
    @Value("${remote.specify-rate.url}")
    String specifyRateUrl;

    private String cmrUrl = "http://cmr.rmto.ir";

    private final LegalPersonInfoClient legalPersonInfoClient;
    private final NaturalPersonInfoClient naturalPersonInfoClient;
    private final PersonInfoClient personInfoClient;
    private final SabteahvalGsbClient sabteahvalGsbClient;

    private final ShahkarClient shahkarClient;
    private final SmsClient smsClient;
    private final SupplyChannelClient supplyChannelClient;
    private final TransportationClient transportationClient;
    private final PostCodeClient postCodeClient;

    public NetworkHealthCheckService(LegalPersonInfoClient legalPersonInfoClient, NaturalPersonInfoClient naturalPersonInfoClient, PersonInfoClient personInfoClient, SabteahvalGsbClient sabteahvalGsbClient, ShahkarClient shahkarClient, SmsClient smsClient, SupplyChannelClient supplyChannelClient, TransportationClient transportationClient, PostCodeClient postCodeClient) {
        this.legalPersonInfoClient = legalPersonInfoClient;
        this.naturalPersonInfoClient = naturalPersonInfoClient;
        this.personInfoClient = personInfoClient;
        this.sabteahvalGsbClient = sabteahvalGsbClient;
        this.shahkarClient = shahkarClient;
        this.smsClient = smsClient;
        this.supplyChannelClient = supplyChannelClient;
        this.transportationClient = transportationClient;
        this.postCodeClient = postCodeClient;
    }

    public List<HealthDTO> getHealth(){
        List<HealthDTO> healthDTOS = new ArrayList<>();
        healthDTOS.add(legalPersonInfoClient.checkHealth());
        healthDTOS.add(naturalPersonInfoClient.checkHealth());
        healthDTOS.add(personInfoClient.checkHealth());
        healthDTOS.add(sabteahvalGsbClient.checkHealth());
        healthDTOS.add(shahkarClient.checkHealth());
        healthDTOS.add(smsClient.checkHealth());
        healthDTOS.add(checkSpecifyRate());
        healthDTOS.add(supplyChannelClient.checkHealth());
        healthDTOS.add(transportationClient.checkHealth());
        healthDTOS.add(postCodeClient.checkHealth());
        healthDTOS.add(checkCmr());

        return healthDTOS;

    }


    private HealthDTO checkSpecifyRate(){
        HealthDTO healthDTO = new HealthDTO();
        try {
            URL mUrl = new URL(specifyRateUrl);
            healthDTO.setServiceName("NIOPDC_BASE_SERVICE");
            healthDTO.setUrl(NetUtils.getBaseUrl(specifyRateUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setTelnet(NetUtils.sendPing(NetUtils.getBaseUrl(specifyRateUrl)));
            healthDTO.setPing(NetUtils.telnet(mUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setClientName("specify-rate");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }

    private HealthDTO checkCmr(){
        HealthDTO healthDTO = new HealthDTO();
        try {
            URL mUrl = new URL(cmrUrl);
            healthDTO.setServiceName("NIOPDC_BASE_SERVICE");
            healthDTO.setUrl(NetUtils.getBaseUrl(cmrUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setTelnet(NetUtils.sendPing(NetUtils.getBaseUrl(cmrUrl)));
            healthDTO.setPing(NetUtils.telnet(mUrl));
            healthDTO.setConnection(NetUtils.isConnect(mUrl));
            healthDTO.setClientName("cmr");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }
}
