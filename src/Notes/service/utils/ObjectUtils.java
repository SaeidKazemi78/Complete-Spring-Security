package ir.donyapardaz.niopdc.base.service.utils;

import java.util.Collection;

public class ObjectUtils {
    public static boolean nonEmpty(String obj) {
        return (obj != null) && !obj.equals("");
    }


    public static <T>boolean nonEmpty(Collection<T> ls) {
        return (ls != null) && ls.size() > 0;
    }

    public static boolean isEmpty(String obj) {
        return !ObjectUtils.nonEmpty(obj);
    }

    public static boolean nonNull(Object obj) {
        return (obj != null);
    }
}
