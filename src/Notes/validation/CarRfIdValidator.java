package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.CarRfIdRepository;
import ir.donyapardaz.niopdc.base.service.dto.CarRfIdDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by abbas on 4/10/17.
 */
@Component
public class CarRfIdValidator implements Validator {

    private final CarRfIdRepository carRfIdRepository;

    public CarRfIdValidator(CarRfIdRepository carRfIdRepository) {
        this.carRfIdRepository = carRfIdRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return CarRfIdDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CarRfIdDTO carRfIdDTO = (CarRfIdDTO) target;

        if (carRfIdRepository.existCode(carRfIdDTO.getId(), carRfIdDTO.getCode()) > 0) {
            errors.reject("rfIdIsExist");
        }
    }
}
