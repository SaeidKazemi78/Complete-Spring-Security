package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;
import ir.donyapardaz.niopdc.base.service.dto.BuyTypeDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class BuyTypeValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return BuyTypeDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        BuyTypeDTO buyTypeDTO = (BuyTypeDTO) target;

        if ((buyTypeDTO.isSellLimit() != null && buyTypeDTO.isSellLimit() || buyTypeDTO.getEffectDate() != null) && (buyTypeDTO.getEffectDate() == null || buyTypeDTO.getEffectDate() < 0 || buyTypeDTO.getEffectDate() > 9999))
           errors.reject("effectDate");


    }


}
