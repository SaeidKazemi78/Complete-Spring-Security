package ir.donyapardaz.niopdc.uaa.config.localization;

import ir.donyapardaz.niopdc.uaa.service.util.LocalizationUtil;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ReadTwiceFilter extends OncePerRequestFilter {

    @Override
    public void destroy() {
    }



    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        ReadTwiceHttpServletRequestWrapper readTwiceHttpServletRequestWrapper = new ReadTwiceHttpServletRequestWrapper(httpServletRequest);


        //String newBody = StringEscapeUtils.unescapeJava(readTwiceHttpServletRequestWrapper.getBody());
        String newBody=readTwiceHttpServletRequestWrapper.getBody();
        newBody = newBody.replace(newBody, LocalizationUtil.ConvertNumberToEnglish(newBody));
        newBody = newBody.replace(newBody, LocalizationUtil.CorrectionYeKe(newBody));

        //newBody = StringEscapeUtils.escapeJava(newBody);
        readTwiceHttpServletRequestWrapper.setBody(newBody);

        filterChain.doFilter(readTwiceHttpServletRequestWrapper, httpServletResponse);
    }


}
