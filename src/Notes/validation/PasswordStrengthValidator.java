package ir.donyapardaz.niopdc.base.validation;

import ir.donyapardaz.niopdc.base.service.feign.client.dto.UserDTO;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class PasswordStrengthValidator implements Validator{

    @Override
    public void validate(Object o, Errors errors) {
        UserDTO userDTO = (UserDTO) o;

    }

    @Override
    public boolean supports(Class<?> aClass) {
        return false;
    }
}
