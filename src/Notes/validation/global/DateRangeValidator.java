package ir.donyapardaz.niopdc.base.validation.global;



import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;
import java.time.ZonedDateTime;

/**
 * Created by mehrabi-s on 16/04/2017.
 */
public class DateRangeValidator implements ConstraintValidator<DateRange, Object> {

    private String firstFieldName;
    private String secondFieldName;

    @Override
    public void initialize(DateRange dateRange) {
        firstFieldName = dateRange.first();
        secondFieldName = dateRange.second();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        try {
            Field firstField = org.springframework.util.ReflectionUtils.findField(o.getClass(), firstFieldName);
            org.springframework.util.ReflectionUtils.makeAccessible(firstField);
            ZonedDateTime firstObj = (ZonedDateTime) firstField.get(o);

            Field secondField = org.springframework.util.ReflectionUtils.findField(o.getClass(), secondFieldName);
            org.springframework.util.ReflectionUtils.makeAccessible(secondField);
            ZonedDateTime secondObj = (ZonedDateTime) secondField.get(o);

            boolean before = firstObj.toLocalDateTime().isBefore(secondObj.toLocalDateTime());
            return before;

        } catch (final Exception ignore) {

            // ignore
        }
        return true;
    }
}
