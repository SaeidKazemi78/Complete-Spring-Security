package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.TagRateRepository;
import ir.donyapardaz.niopdc.base.service.dto.TagRateDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class TagRateValidator implements Validator {

    private final TagRateRepository tagRateRepository;

    public TagRateValidator(TagRateRepository tagRateRepository) {
        this.tagRateRepository = tagRateRepository;
    }


    @Override
    public boolean supports(Class<?> clazz) {
        return TagRateDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        TagRateDTO tagRateDTO = (TagRateDTO) target;
        if (tagRateRepository.checkConflict(tagRateDTO.getLocationId(),tagRateDTO.getId(), tagRateDTO.getStartDate(), tagRateDTO.getFinishDate()) > 0) {
            errors.reject("conflictDateTime");
        }

    }
}
