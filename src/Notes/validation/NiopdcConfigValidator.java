package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.NiopdcConfigRepository;
import ir.donyapardaz.niopdc.base.service.dto.NiopdcConfigDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class NiopdcConfigValidator implements Validator {


    private final NiopdcConfigRepository niopdcConfigRepository;

    public NiopdcConfigValidator(NiopdcConfigRepository niopdcConfigRepository) {
        this.niopdcConfigRepository = niopdcConfigRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return NiopdcConfigDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        NiopdcConfigDTO niopdcConfigDTO = (NiopdcConfigDTO) target;

        if (niopdcConfigRepository.checkConflict(niopdcConfigDTO.getId(),
            niopdcConfigDTO.getConfigType(),
            niopdcConfigDTO.getStartDate(),
            niopdcConfigDTO.getFinishDate()) > 0) {
            errors.reject("conflictDateTime");
        }

    }


}
