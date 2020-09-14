package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.ShiftWorkRepository;
import ir.donyapardaz.niopdc.base.service.dto.ShiftWorkDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class ShiftWorkValidator implements Validator {

    private final ShiftWorkRepository shiftWorkRepository;

    public ShiftWorkValidator(ShiftWorkRepository shiftWorkRepository) {
        this.shiftWorkRepository = shiftWorkRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return ShiftWorkDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ShiftWorkDTO shiftWorkDTO = (ShiftWorkDTO) target;
        Long check = shiftWorkRepository.checkForConflict(shiftWorkDTO.getId(), shiftWorkDTO.getLocationId(), shiftWorkDTO.getFromDate(), shiftWorkDTO.getToDate());
        if (check > 0) {
            errors.reject("conflictDateTime");
        }
    }


}
