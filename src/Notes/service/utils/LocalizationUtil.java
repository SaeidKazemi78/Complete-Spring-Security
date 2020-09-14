package ir.donyapardaz.niopdc.base.service.utils;

public class LocalizationUtil
{
    public static String ConvertNumberToEnglish(String str)
    {
        return str.replace('۰', '0')
                  .replace('۱', '1')
                  .replace('۲', '2')
                  .replace('۳', '3')
                  .replace('۴', '4')
                  .replace('۵', '5')
                  .replace('۶', '6')
                  .replace('۷', '7')
                  .replace('۸', '8')
                  .replace('۹', '9')
                  .replace('٠', '0')
                  .replace('١', '1')
                  .replace('٢', '2')
                  .replace('٣', '3')
                  .replace('٤', '4')
                  .replace('٥', '5')
                  .replace('٦', '6')
                  .replace('٧', '7')
                  .replace('٨', '8')
                  .replace('٩', '9');



    }

    public static String CorrectionYeKe(String str)
    {
        return str.replace('ي', 'ی').replace('ك', 'ک');
    }

    public static String normalizePersianCharacters(String inputStr){
        return (inputStr.replace('ي', 'ی')).replace('ك', 'ک');
    }
}
