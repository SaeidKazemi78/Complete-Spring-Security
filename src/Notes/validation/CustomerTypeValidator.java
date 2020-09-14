package ir.donyapardaz.niopdc.base.validation;


import ir.donyapardaz.niopdc.base.repository.CustomerRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeDTO;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * Created by mehrabi-s on 10/05/2017.
 */
@Component
public class CustomerTypeValidator implements Validator {

    private final CustomerRepository customerRepository;

    CustomerTypeValidator(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        if (CustomerTypeDTO.class.isAssignableFrom(aClass)) {
            return CustomerTypeDTO.class.isAssignableFrom(aClass);
        } else {
            return true;
        }
    }

    @Override
    public void validate(Object o, Errors errors) {
        if (o instanceof CustomerTypeDTO) {
            CustomerTypeDTO customerTypeDTO = (CustomerTypeDTO) o;
            if (customerTypeDTO.getId() != null) {
                if (customerRepository.existsByType_Id(customerTypeDTO.getId())) {
                    errors.reject("customerGroup.canNotChange", "customerGroup.canNotChange");
                }
            }
        }
    }
}
