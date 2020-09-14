package ir.donyapardaz.niopdc.base.web.rest.util;

import com.ibm.icu.text.DateFormat;
import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;

public class YearMonthDay {
    private Integer year;
    private Integer month;
    private Integer day;
    private String hour;
    private String min;
    private String sec;

    public YearMonthDay() {
    }

    public YearMonthDay(Integer year, Integer month, Integer day) {
        this.year = year;
        this.month = month - 1;
        this.day = day;
    }

    public YearMonthDay(String year, String month, String day) {
        this.year = Integer.parseInt(year);
        this.month = Integer.parseInt(month) - 1;
        this.day = Integer.parseInt(day);
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    @Override
    public String toString() {
        /*if (year == null)
            return null;
        Calendar instance = Calendar.getInstance(new ULocale("fa_IR@calendar=persian"));
        instance.set(year, month, day);
        DateFormat df = DateFormat.getPatternInstance("y MMMM d EEEE", new ULocale("fa_IR@calendar=persian"));
        return df.format(instance);*/
        String result = "";
        result = getYear() + "/" + getMonth() + "/" + getDay() + " " + getHour() + ":" + getMin() + ":" + getSec();
        return result;
    }

    public String getHour() {
        return hour;
    }

    public YearMonthDay setHour(String hour) {
        this.hour = hour;
        return this;
    }

    public String getMin() {
        return min;
    }

    public YearMonthDay setMin(String min) {
        this.min = min;
        return this;
    }

    public String getSec() {
        return sec;
    }

    public YearMonthDay setSec(String sec) {
        this.sec = sec;
        return this;
    }
}
