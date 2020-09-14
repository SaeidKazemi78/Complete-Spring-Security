package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.repository.LocationRepository;
import ir.donyapardaz.niopdc.base.service.dto.LocationFullDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by abbas on 4/19/17.
 */
@Component
public class LocationValidator implements Validator {


    private final LocationRepository locationRepository;

    public LocationValidator(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return LocationFullDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        LocationFullDTO locationDTO = (LocationFullDTO) target;
        /*if (locationDTO.getStartOrderNumber() != null &&
            locationDTO.getCurrentOrderNumber() != null &&
            locationDTO.getEndOrderNumber() != null) {
            if (locationDTO.getStartOrderNumber().length() > 8 ||
                locationDTO.getCurrentOrderNumber().length() > 8 ||
                locationDTO.getEndOrderNumber().length() > 8) {
                errors.reject("location.orderNumbersOverflow");
            }
        }*/
      /*  if (locationDTO.getLevel() == 2 || locationDTO.getLevel() == 3) {
            if (locationDTO.getStartOrderNumber() != null && locationDTO.getEndOrderNumber() != null) {
                Long result = locationRepository.isConflictOrderNumbers(locationDTO.getId(), locationDTO.getLocationId(),locationDTO.getStartOrderNumber(), locationDTO.getEndOrderNumber());
                if (result > 0)
                    errors.reject("location.conflict.orderNumbers");
            }
        }*/

      /*  if (locationDTO.getId() != null) {
            Location oldLocation = locationRepository.findOne(locationDTO.getId());
            if (oldLocation.getLevel() == 1) {
                if (locationDTO.getStartOrderNumber() != null || locationDTO.getEndOrderNumber() != null || locationDTO.getCurrentOrderNumber() != null){

                }
//                    errors.reject("location.orderNumbers.notNull");
            } else if (oldLocation.getLevel() != 1) {
                if (oldLocation.getCurrentOrderNumber() != null && locationDTO.getStartOrderNumber() != null && locationDTO.getEndOrderNumber() != null) {
                    if (!oldLocation.getCurrentOrderNumber().equals(oldLocation.getStartOrderNumber()))
                        if (!oldLocation.getStartOrderNumber().equals(locationDTO.getStartOrderNumber()))
                            errors.reject("location.difference.startOrderNumber");
                }
            }

        }*/

    }
}
