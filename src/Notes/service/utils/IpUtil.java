package ir.donyapardaz.niopdc.base.service.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class IpUtil {

    public static String getClientIp() {

        String ip = "";

        try {
            HttpServletRequest curRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

            if (curRequest != null) {
                ip = curRequest.getHeader("X-Forwarded-For");
                if (ip == null || "".equals(ip)) {
                    ip = curRequest.getRemoteAddr();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ip;
    }
}
