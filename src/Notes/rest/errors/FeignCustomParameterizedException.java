package ir.donyapardaz.niopdc.base.web.rest.errors;

import com.netflix.hystrix.exception.HystrixBadRequestException;

public class FeignCustomParameterizedException extends HystrixBadRequestException {
    CustomParameterizedException cause;

    @Override
    public synchronized CustomParameterizedException getCause() {
        return cause;
    }

    public FeignCustomParameterizedException(String message, CustomParameterizedException cause) {
        super(message);
        this.cause = cause;
    }

    public void throwCause() {
        throw cause;
    }
}
