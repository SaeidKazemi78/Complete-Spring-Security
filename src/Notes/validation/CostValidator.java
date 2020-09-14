package ir.donyapardaz.niopdc.base.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;


/**
 * Created by abbas on 4/19/17.
 */
@Component
public class CostValidator /* implements Validator*/ {

//    @Override
//    public boolean supports(Class<?> clazz) {
//        return ExpenseIncomeDTO.class.isAssignableFrom(clazz);
//    }
//
//    @Override
//    public void validate(Object target, Errors errors) {
//        ExpenseIncomeDTO expenseIncomeDTO = (ExpenseIncomeDTO) target;
//        if ((expenseIncomeDTO.getEffects() == Effects.EFFECTLESS) && (expenseIncomeDTO.getPayType() == null || expenseIncomeDTO.getPayType()!= PayType.WITH_ORDER))
//           errors.reject("payType", "effects.is.EFFECTLESS");
//    }
}
