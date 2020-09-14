package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.service.dto.SmsDTO;
import ir.donyapardaz.niopdc.base.service.remote.sms.SmsClient;
import org.springframework.stereotype.Service;

@Service
public class SmsService {

    private  final SmsClient  smsClient;

    public SmsService(SmsClient smsClient) {
        this.smsClient = smsClient;
    }


    public Boolean sendSMS(SmsDTO smsDTO){
       return smsClient.sendSMS(smsDTO);
    }
}
