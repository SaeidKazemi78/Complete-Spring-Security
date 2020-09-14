package ir.donyapardaz.niopdc.base.service.remote.person;

import ir.donyapardaz.niopdc.base.domain.SabtAhvalSAHAPersonInfo;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.repository.SabtAhvalSAHAPersonInfoRepository;
import ir.donyapardaz.niopdc.base.service.dto.HealthDTO;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.mapper.SabtAhvalSAHAPersonInfoMapper;
import ir.donyapardaz.niopdc.base.service.remote.pperson.GetPersonInfoSAHA96M;
import ir.donyapardaz.niopdc.base.service.remote.pperson.GetPersonInfoSAHA96MResponse;
import ir.donyapardaz.niopdc.base.service.remote.pperson.SabtAhvalSAHAPersonInfoStract;
import ir.donyapardaz.niopdc.base.service.utils.LocalizationUtil;
import ir.donyapardaz.niopdc.base.service.utils.NetUtils;
import ir.donyapardaz.niopdc.base.service.utils.ObjectUtils;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ws.client.WebServiceIOException;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.SoapMessage;

import java.net.URL;
import java.util.Objects;

public class NaturalPersonInfoClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(PersonInfoClient.class);

    @Value("${remote.natural-person-info.action-url}")
    String actionUrl;

    @Value("${remote.natural-person-info.url}")
    String url;


    @Autowired
    private SabtAhvalSAHAPersonInfoMapper sabtAhvalSAHAPersonInfoMapper;
    @Autowired
    private SabtAhvalSAHAPersonInfoRepository sabtAhvalSAHAPersonInfoRepository;


    public SabtAhvalSAHAPersonInfo getFullPersonInfo(String postcode) throws WebServiceIOException {
        try {

            return sabtAhvalSAHAPersonInfoMapper.fromStract(getSabtAhvalSAHAPersonInfoStract(postcode));
        } catch (WebServiceIOException e) {
            throw new WebServiceIOException("error.person-natural-service-is-down");
        }
    }

    public PersonDTO getPersonInfo(String postcode) throws WebServiceIOException {
        try {
            SabtAhvalSAHAPersonInfoStract result = getSabtAhvalSAHAPersonInfoStract(postcode);

            PersonDTO personDTO = new PersonDTO();


            personDTO.setFirstName(LocalizationUtil.normalizePersianCharacters(result.getFirstName()));
            personDTO.setLastName(LocalizationUtil.normalizePersianCharacters(result.getLastName()));
            personDTO.setFatherName(LocalizationUtil.normalizePersianCharacters(result.getFatherName()));
            personDTO.setCode(postcode);

            YearMonthDay yearMonthDay = null;


         if(Objects.nonNull(result.getBirthDate()) && !result.getBirthDate().equals("")){
                yearMonthDay= new YearMonthDay(
                    result.getBirthDate().substring(0, 4),
                    result.getBirthDate().substring(4, 6),
                    result.getBirthDate().substring(6, 8));
                log.debug(yearMonthDay.toString());
                personDTO.setBirthday(DateUtil.convertToGeorgian(yearMonthDay));
            }


            personDTO.setIdCode(result.getIdentityNo());
            personDTO.setPersonality(Personality.NATURAL);

            return personDTO;
        } catch (WebServiceIOException e) {
            e.printStackTrace();
            throw new WebServiceIOException("error.person-natural-service-is-down");
        }
    }

    private SabtAhvalSAHAPersonInfoStract getSabtAhvalSAHAPersonInfoStract(String postcode) {
        GetPersonInfoSAHA96M request = new GetPersonInfoSAHA96M();
        request.setNationalCode(postcode);
        SabtAhvalSAHAPersonInfoStract result = ((GetPersonInfoSAHA96MResponse) getWebServiceTemplate()
            .marshalSendAndReceive(request,
                webServiceMessage -> ((SoapMessage) webServiceMessage)
                    .setSoapAction(actionUrl))).getGetPersonInfoSAHA96MResult();


        if (result.getErrorCode() != 0)
            throw new CustomParameterizedException("error.person-not-find");

        sabtAhvalSAHAPersonInfoRepository.save(sabtAhvalSAHAPersonInfoMapper.fromStract(result));
        return result;
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
            healthDTO.setClientName("natural-person-info");

        }catch (Exception e){
            healthDTO.setException(e.getMessage());
        }

        return healthDTO;
    }


}
