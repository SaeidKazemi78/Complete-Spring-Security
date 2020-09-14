package ir.donyapardaz.niopdc.base.config;

import org.springframework.core.convert.converter.Converter;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

class ZonedDateTimeConverter implements Converter<String, ZonedDateTime> {
    private final ZoneId zoneId;

    public ZonedDateTimeConverter(ZoneId zoneId) {
        this.zoneId = zoneId;
    }

    @Override
    public ZonedDateTime convert(String source) {
        try {
            long startTime = Long.parseLong(source);
            return Instant.ofEpochSecond(startTime).atZone(zoneId);
        } catch (Exception e) {
            return ZonedDateTime.parse(source);
        }
    }
}
