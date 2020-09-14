package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.repository.CeilingQuotaRepository;
import ir.donyapardaz.niopdc.base.repository.CustomerCreditRepository;
import ir.donyapardaz.niopdc.base.service.dto.CeilingQuotaDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by mehrabi-s on 17/04/2017.
 */
@Component
public class CeilingQuotaValidator implements Validator {

    private final CeilingQuotaRepository ceilingQuotaRepository;
    private final CustomerCreditRepository customerCreditRepository;

    public CeilingQuotaValidator(CeilingQuotaRepository ceilingQuotaRepository, CustomerCreditRepository customerCreditRepository) {
        this.ceilingQuotaRepository = ceilingQuotaRepository;
        this.customerCreditRepository = customerCreditRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return CeilingQuotaDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CeilingQuotaDTO ceilingQuotaDTO = (CeilingQuotaDTO) target;

        if (ceilingQuotaRepository.checkConflict(ceilingQuotaDTO.getId(), ceilingQuotaDTO.getStartDate(), ceilingQuotaDTO.getFinishDate()) > 0)
            errors.reject("conflictDateTime");
        CustomerCredit customerCredit = customerCreditRepository.findOne(ceilingQuotaDTO.getCustomerCreditId());
        if (ceilingQuotaDTO.getStartDate().isBefore(customerCredit.getStartDate()))
            errors.reject("start.date.smaller.than.customer.credit");
        if (ceilingQuotaDTO.getFinishDate().isAfter(customerCredit.getFinishDate()))
            errors.reject("finish.date.bigger.than.customer.credit");
    }
}




