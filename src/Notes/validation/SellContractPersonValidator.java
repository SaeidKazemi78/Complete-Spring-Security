package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.repository.SellContractPersonRepository;
import ir.donyapardaz.niopdc.base.service.dto.SellContractPersonDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by abbas on 4/19/17.
 */
@Component
public class SellContractPersonValidator implements Validator {
    private final SellContractPersonRepository sellContractPersonRepository;

    public SellContractPersonValidator(SellContractPersonRepository sellContractPersonRepository) {
        this.sellContractPersonRepository = sellContractPersonRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return SellContractPersonDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        SellContractPersonDTO sellContractPersonDTO = (SellContractPersonDTO) target;
        Integer sum = sellContractPersonRepository.sumSharePercent(
            sellContractPersonDTO.getSellContractId(),
            sellContractPersonDTO.getId()
        );
        if (sellContractPersonDTO.getSharePercent() < 0 ||
            (sum == null ? 0 :sum) + sellContractPersonDTO.getSharePercent() > 100) {
            errors.reject("sharePercent", "customer.is.sharePercent");
        }

    }
}
