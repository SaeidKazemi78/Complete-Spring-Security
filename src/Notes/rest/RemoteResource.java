package ir.donyapardaz.niopdc.base.web.rest;


import ir.donyapardaz.niopdc.base.service.EmailService;
import ir.donyapardaz.niopdc.base.service.RemoteService;
import ir.donyapardaz.niopdc.base.service.SmsService;
import ir.donyapardaz.niopdc.base.service.dto.AddressDTO;
import ir.donyapardaz.niopdc.base.service.dto.EmailDTO;
import ir.donyapardaz.niopdc.base.service.dto.SmsDTO;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RemoteResource {

    private final Logger log = LoggerFactory.getLogger(RemoteResource.class);
    private final RemoteService remoteService;
    private final SmsService smsService;
    private final EmailService emailService;

    public RemoteResource(RemoteService remoteService, SmsService smsService, EmailService emailService) {
        this.remoteService = remoteService;
        this.smsService = smsService;
        this.emailService = emailService;
    }

    @GetMapping("/api/postcode/address/{postcode}")
    public ResponseEntity getAddressByPostcode(@PathVariable("postcode") String postcode){
        try {
            AddressDTO addressByPostcode = remoteService.findAddressByPostcode(postcode);
            return new ResponseEntity<>(addressByPostcode, HttpStatus.OK);
        } catch (NullPointerException e){
                throw new CustomParameterizedException("error.postcode.server");
        }
    }

    @PostMapping("/pr/api/sms/send")
    public ResponseEntity sendSms(@RequestBody SmsDTO smsDTO){
         smsService.sendSMS(smsDTO);
         return  ResponseEntity.ok().body(null);
    }

    @PostMapping("/pr/api/email/send")
    public ResponseEntity sendEmail(@RequestBody EmailDTO emailDTO){
        emailService.sendEmail(emailDTO);
        return  ResponseEntity.ok().body(null);
    }

    @GetMapping("/pr/api/ownership-mobile")
    public ResponseEntity<Boolean> isOwnershipMobile(@RequestParam("nationalCode") String nationalCode,@RequestParam("mobile")String mobile){
        return  ResponseEntity.ok().body( remoteService.isOwnershipMobile(mobile,nationalCode));
    }

}
