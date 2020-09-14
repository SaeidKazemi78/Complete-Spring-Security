package ir.donyapardaz.niopdc.base.web.rest.util;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.text.SimpleDateFormat;
import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;

import java.text.ParseException;
import java.text.ParsePosition;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

public class DateUtil {


    public static YearMonthDay convertToPersian(ZonedDateTime date) {
        Calendar instance = Calendar.getInstance(new ULocale("fa_IR@calendar=persian"));
        instance.clear();
        instance.setTime(Date.from(date.toInstant()));
        YearMonthDay persianDate = new YearMonthDay();
        persianDate.setYear(instance.get(Calendar.YEAR));
        persianDate.setMonth(instance.get(Calendar.MONTH));
        persianDate.setDay(instance.get(Calendar.DAY_OF_MONTH));
        return persianDate;
    }

    public static String convertToPersianByFormat(ZonedDateTime date, String format) {
        Calendar instance = Calendar.getInstance(new ULocale("@calendar=english"));
        instance.setTime(Date.from(date.toInstant()));
        return new SimpleDateFormat(format,new ULocale("@calendar=persian")).format(instance);
    }

   public static ZonedDateTime convertToGeorgian(YearMonthDay date) {
       Calendar instance = Calendar.getInstance(new ULocale("@calendar=persian"));
       instance.set(date.getYear(),date.getMonth(),date.getDay(),0,0,0);
       Instant instant=instance.getTime().toInstant();
       return instant.atZone(ZoneId.systemDefault());
   }
/*
    public static ZonedDateTime convertToGeorgianFromFormat(String date, String format)  {
        Calendar instance = Calendar.getInstance(new ULocale("fa_IR@calendar=persian"));
        instance.set(Integer.parseInt(date.substring(0,4)),Integer.parseInt(date.substring(3,5))-1,Integer.parseInt(date.substring(5,7)));
        Instant instant=instance.getTime().toInstant();
        return instant.atZone(ZoneId.systemDefault());

    }*/
}
