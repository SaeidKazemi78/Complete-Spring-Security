package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.CustomerRatingRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerRatingDTO;
import ir.donyapardaz.niopdc.base.service.dto.LocationDTO;
import ir.donyapardaz.niopdc.base.service.dto.LocationFullDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Set;
import java.util.stream.Collectors;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class CustomerRatingValidator implements Validator {

    private final CustomerRatingRepository customerRatingRepository;

    public CustomerRatingValidator(CustomerRatingRepository customerRatingRepository) {
        this.customerRatingRepository = customerRatingRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return CustomerRatingDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CustomerRatingDTO dto = (CustomerRatingDTO) target;
        Set<Long> ids = dto.getLocations().stream().map(LocationDTO::getId).collect(Collectors.toSet());
        Long count = customerRatingRepository.checkConflict(dto.getId(),ids, dto.getFromDate(), dto.getToDate());
        if (count > 0)
            errors.reject("conflict.location.date");
    }
}



