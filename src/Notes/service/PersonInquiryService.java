package ir.donyapardaz.niopdc.base.service;


import ir.donyapardaz.niopdc.base.domain.PersonInquiry;
import ir.donyapardaz.niopdc.base.domain.PersonInquiryRequest;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonInquiryStatus;
import ir.donyapardaz.niopdc.base.repository.PersonInquiryRepository;
import ir.donyapardaz.niopdc.base.repository.PersonInquiryRequestRepository;
import ir.donyapardaz.niopdc.base.service.dto.PersonInquiryDTO;
import ir.donyapardaz.niopdc.base.service.mapper.PersonInquiryMapper;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry.PersonOfflineInquiryClient;
import ir.donyapardaz.niopdc.base.service.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class PersonInquiryService {

    private final Logger log = LoggerFactory.getLogger(PersonInquiryService.class);

    private final PersonInquiryRepository inquiryRepository;
    private final PersonInquiryRequestRepository personInquiryRequestRepository;
    private final PersonInquiryMapper inquiryMapper;

    public PersonInquiryService(PersonInquiryRepository inquiryRepository,
                                PersonInquiryMapper inquiryMapper,PersonInquiryRequestRepository personInquiryRequestRepository) {

        this.inquiryRepository = inquiryRepository;
        this.inquiryMapper = inquiryMapper;
        this.personInquiryRequestRepository = personInquiryRequestRepository;
    }


    public List<PersonInquiryDTO> inquiry(List<PersonInquiryDTO> inquiryDTOList) {
        List<PersonInquiryDTO> result = new ArrayList<>();


        Set<PersonInquiry> personList = inquiryDTOList.stream().filter(dto -> {
            List<PersonInquiry> personInquiries = inquiryRepository.findAll(dto.getNationalCode(), dto.getConsecutive(), dto.getIdCode(),
                dto.getClassified(), dto.getAlphabetClassified(), ObjectUtils.nonNull(dto.getBirthday()) ? dto.getBirthday().toInstant().truncatedTo(ChronoUnit.DAYS) : null, dto.getFirstName(), dto.getLastName(),
                dto.getFatherName());
            if (ObjectUtils.<PersonInquiry>nonEmpty(personInquiries)) {
                result.addAll(inquiryMapper.toDto(personInquiries));

                return false;
            }

            return true;

        }).map(dto -> {
            PersonInquiry personInquiry = inquiryMapper.toEntity(dto);
            personInquiry.setStatus(PersonInquiryStatus.REQUEST);

            return personInquiry;
        }).collect(Collectors.toSet());

        if (ObjectUtils.<PersonInquiry>nonEmpty(personList)) {
            inquiryRepository.save(personList);
        }

        return result;
    }

    public Set<PersonInquiry> findAllPersonByRequestStatus(List<PersonInquiryStatus> inquiryStatus ) {

       return  inquiryRepository.findAllByPersonInquiryStatus(inquiryStatus);
    }


    public PersonInquiryRequest saveRequest( PersonInquiryRequest personInquiryRequest){
       return this.personInquiryRequestRepository.save(personInquiryRequest);
    }

    public List<PersonInquiryRequest> getAllFailedPersonInquiryRequest(){
        return this.personInquiryRequestRepository.findAllByFailed(true);
    }

    public void updateAllPersonInquiry(Set<PersonInquiry> personInquiries) {
        inquiryRepository.save(personInquiries);
    }

    public List<PersonInquiryRequest> findAllWaitAfter30m() {
        return this.personInquiryRequestRepository.findAllWaitAfter30m(ZonedDateTime.now().minusMinutes(30));
    }

    public List<PersonInquiryRequest> findAllWaitRequest() {
        return this.personInquiryRequestRepository.findAllWaitRequest();
    }

    public void saveAll(Set<PersonInquiry> personInquiryList) {
        this.inquiryRepository.save(personInquiryList);
    }
}
