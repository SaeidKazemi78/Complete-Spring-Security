package ir.donyapardaz.niopdc.base.web.rest;

import com.codahale.metrics.annotation.Timed;
import ir.donyapardaz.niopdc.base.service.PersonInquiryService;
import ir.donyapardaz.niopdc.base.service.dto.PersonInquiryDTO;
import ir.donyapardaz.niopdc.base.service.remote.sabteahval.offlineinquiry.PersonOfflineInquiryClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class PersonInquiryResource {

    private PersonInquiryService personInquiryService;

    private final PersonOfflineInquiryClient client;


    public PersonInquiryResource(PersonInquiryService personInquiryService, PersonOfflineInquiryClient client) {
        this.personInquiryService = personInquiryService;
        this.client = client;
    }

    @PostMapping("/pr/api/people/inquiry/offline")
    @Timed
    public ResponseEntity<List<PersonInquiryDTO>> prOfflineInquiry(@RequestBody List<PersonInquiryDTO> inquiryDTOList) throws IOException {
      /*  log.debug("REST request to save Person : {}", personDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);*/

        List<PersonInquiryDTO> result =  personInquiryService.inquiry(inquiryDTOList);

        return new ResponseEntity<>(result, HttpStatus.OK);


    }

    @PostMapping("/api/people/inquiry/offline")
    @Timed
    public ResponseEntity<List<PersonInquiryDTO>> offlineInquiry(@RequestBody List<PersonInquiryDTO> inquiryDTOList) throws IOException {
      /*  log.debug("REST request to save Person : {}", personDTO);
        if (validation.hasErrors())
            return ValidationResponseEntityGenerator.getBadRequest(validation);*/

        List<PersonInquiryDTO> result =  personInquiryService.inquiry(inquiryDTOList);

        return new ResponseEntity<>(result, HttpStatus.OK);


    }


    @GetMapping("/api/people/inquiry/offline/test")
    @Timed
    public ResponseEntity<List<PersonInquiryDTO>> offlineInquiryTest() throws IOException {
        client.test();

        return  ResponseEntity.ok(null);


    }

}
