package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.repository.PersonRepository;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.dto.PersonInquiryDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by abbas on 4/10/17.
 */
@Component
public class PersonValidator implements Validator {


    private PersonRepository personRepository;

    public PersonValidator(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return PersonDTO.class.isAssignableFrom(clazz) ;
    }

    @Override
    public void validate(Object target, Errors errors) {

           PersonDTO personDTO = (PersonDTO) target;

           if (personDTO.getId() == null && personRepository.existsByCode(personDTO.getCode()))
               errors.reject("person.isExist");


           if (personDTO.getPersonality() == Personality.NATURAL) {
               Person person = personRepository.findOneByPostalCode(personDTO.getPostalCode());
               if (person != null && (personDTO.getId() == null || !person.getId().equals(personDTO.getId())))
                   errors.reject("postalCode.isExist");
           }


    }
}
