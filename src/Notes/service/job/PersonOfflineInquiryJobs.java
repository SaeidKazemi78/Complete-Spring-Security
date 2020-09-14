package ir.donyapardaz.niopdc.base.service.job;


import ir.donyapardaz.niopdc.base.service.PersonService;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry.PersonOfflineInquiryClient;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PersonOfflineInquiryJobs {

private final PersonService personService;
    private final PersonOfflineInquiryClient client;
    public PersonOfflineInquiryJobs(PersonService personService, PersonOfflineInquiryClient client) {
        this.personService = personService;
        this.client = client;
    }

    @Scheduled(initialDelayString = "${scheduler.inquiry.response.configurationInitialDelay}", fixedRateString = "${scheduler.inquiry.response.configurationLoadRate}")
    public void inquiryResponse() throws Exception{
     //enable after fix service
      // client.getPersonInfo();
    }

    @Scheduled(initialDelayString = "${scheduler.inquiry.request.configurationInitialDelay}", fixedRateString = "${scheduler.inquiry.request.configurationLoadRate}")
    public void inquiryRequest() throws Exception {
        //enable after fix service
        //client.sendPersonInfo();
    }

    @Scheduled(initialDelayString = "${scheduler.inquiry.retry.configurationInitialDelay}", fixedRateString = "${scheduler.inquiry.retry.configurationLoadRate}")
    public void inquiryRetry() throws Exception {
        //enable after fix service
        //client.resendFailedRequest();
    }

    @Scheduled(cron = "0 59 23 * * *",zone = "Asia/Tehran")
    public void getPersonFromTransportation() {
        personService.getPersonFromTransportation();
    }
}
