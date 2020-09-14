package ir.donyapardaz.niopdc.base.service.remote.person;

import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.remote.lperson.*;
import ir.donyapardaz.niopdc.base.service.remote.pperson.GetPersonInfoSAHA96M;
import ir.donyapardaz.niopdc.base.service.remote.pperson.GetPersonInfoSAHA96MResponse;
import ir.donyapardaz.niopdc.base.service.remote.pperson.SabtAhvalSAHAPersonInfoStract;
import ir.donyapardaz.niopdc.base.service.utils.LocalizationUtil;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.WebServiceIOException;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;
import java.text.ParseException;

public class LegalPersonInfoClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(PersonInfoClient.class);

    @Value("${remote.legal-person-info.action-url}")
    String actionLegalUrl;
    @Value("${remote.legal-person-info.url}")
    String url;

    public PersonDTO getPersonInfo(String nationalCode) throws WebServiceIOException {
        InquiryByNationalCode request = new InquiryByNationalCode();
        Parameter value = new Parameter();
        value.setNationalCode(nationalCode);
        request.setParameter(value);

        try {
            Result result = ((InquiryByNationalCodeResponse) getWebServiceTemplate()
                .marshalSendAndReceive(request,
                    webServiceMessage -> ((SoapMessage) webServiceMessage)
                        .setSoapAction(actionLegalUrl))).getInquiryByNationalCodeResult();

            PersonDTO personDTO = new PersonDTO();
            if (!result.isSuccessful())
                throw new CustomParameterizedException("error.error.person-legal-not-find");
            if (result.isIsBreakUp())
                throw new CustomParameterizedException("error.person-is-breakUp");

            personDTO.setName(LocalizationUtil.normalizePersianCharacters(result.getName()));
            personDTO.setPostalCode(result.getPostCode());
            personDTO.setAddress(LocalizationUtil.normalizePersianCharacters(result.getAddress()));
            personDTO.setPersonality(Personality.LEGAL);
            personDTO.setRegisterNo(result.getRegisterNumber());
            personDTO.setCode(nationalCode);
            YearMonthDay yearMonthDay = new YearMonthDay(
                result.getEstablishmentDate().substring(0, 4),
                result.getEstablishmentDate().substring(5, 7),
                result.getEstablishmentDate().substring(8, 10));

            log.debug(yearMonthDay.toString());
            personDTO.setBirthday(DateUtil.convertToGeorgian(yearMonthDay));

            return personDTO;
        } catch (WebServiceIOException e) {
            e.printStackTrace();
            throw new WebServiceIOException("error.person-legal-service-is-down");
        }
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
          healthDTO.setClientName("legal-person-info");

      }catch (Exception e){
          healthDTO.setException(e.getMessage());
      }

        return healthDTO;
    }

}
