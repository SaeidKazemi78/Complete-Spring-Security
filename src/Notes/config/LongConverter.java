package ir.donyapardaz.niopdc.base.config;

import org.springframework.core.convert.converter.Converter;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

class LongConverter implements Converter<String, Long> {

    @Override
    public Long convert(String source) {
        try {
            Long aLong = Long.valueOf(source);
            return aLong;
        } catch (Exception e) {
            return null;
        }
    }
}
