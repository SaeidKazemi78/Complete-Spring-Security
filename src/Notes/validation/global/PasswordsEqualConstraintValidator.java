package ir.donyapardaz.niopdc.base.validation.global;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;


public class PasswordsEqualConstraintValidator implements ConstraintValidator<PasswordsEqualConstraint, Object> {

    private String firstFieldName;
    private String secondFieldName;

    @Override
    public void initialize(PasswordsEqualConstraint dateRange) {
        firstFieldName = dateRange.first();
        secondFieldName = dateRange.second();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        try {
            Field firstField = org.springframework.util.ReflectionUtils.findField(o.getClass(), firstFieldName);
            org.springframework.util.ReflectionUtils.makeAccessible(firstField);
            String firstObj = (String) firstField.get(o);

            Field secondField = org.springframework.util.ReflectionUtils.findField(o.getClass(), secondFieldName);
            org.springframework.util.ReflectionUtils.makeAccessible(secondField);
            String secondObj = (String) secondField.get(o);

            return firstObj.equals(secondObj);
        } catch (final Exception ignore) {
            return true;
            // ignore
        }
    }
}
