package ir.donyapardaz.niopdc.base.validation.global;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;
import java.util.regex.Pattern;

/**
 * Created by abbas on 4/12/17.
 */
public class NationalCodeConstraintValidator implements ConstraintValidator<NationalCode, String> {


    @Override
    public void initialize(NationalCode nationalCode) {

    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return isValidNationalCode(s);
    }
    private static Boolean isValidNationalCode(String nationalCode) {
        if (nationalCode.isEmpty())
            return false;
        if (nationalCode.length() != 10)
            return false;
        Pattern pattern = Pattern.compile("\\d{10}");
        if (!pattern.matcher(nationalCode).matches())
            return false;
        String[] allDigitEqual = new String[]{"0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"};
        if (Arrays.asList(allDigitEqual).contains(nationalCode))
            return false;
        char[] chArray = nationalCode.toCharArray();
        Integer num0 = Integer.parseInt(String.valueOf(chArray[0])) * 10;
        Integer num2 = Integer.parseInt(String.valueOf(chArray[1])) * 9;
        Integer num3 = Integer.parseInt(String.valueOf(chArray[2])) * 8;
        Integer num4 = Integer.parseInt(String.valueOf(chArray[3])) * 7;
        Integer num5 = Integer.parseInt(String.valueOf(chArray[4])) * 6;
        Integer num6 = Integer.parseInt(String.valueOf(chArray[5])) * 5;
        Integer num7 = Integer.parseInt(String.valueOf(chArray[6])) * 4;
        Integer num8 = Integer.parseInt(String.valueOf(chArray[7])) * 3;
        Integer num9 = Integer.parseInt(String.valueOf(chArray[8])) * 2;
        Integer a = Integer.parseInt(String.valueOf(chArray[9]));
        Integer b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
        Integer c = b % 11;
        return (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)));
    }


}
