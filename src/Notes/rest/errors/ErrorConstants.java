package ir.donyapardaz.niopdc.base.web.rest.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String ERR_CONCURRENCY_FAILURE = "error.concurrencyFailure";
    public static final String ERR_VALIDATION = "error.validation";
    public static final URI DEFAULT_TYPE = URI.create("problem-with-message");
    public static final URI CONSTRAINT_VIOLATION_TYPE = URI.create("constraint-violation");
    public static final URI PARAMETERIZED_TYPE = URI.create("parameterized");
    public static final URI INVALID_PASSWORD_TYPE = URI.create("invalid-password");
    public static final URI EMAIL_ALREADY_USED_TYPE = URI.create("email-already-used");
    public static final URI LOGIN_ALREADY_USED_TYPE = URI.create("login-already-used");
    public static final URI EMAIL_NOT_FOUND_TYPE = URI.create("email-not-found");
    public static final String ERR_UNIQUE_KEY_VIOLATION_ERROR = "error.unique.key.violation";
    public static final String ERR_DELETE_STATEMENT_CONFLICTED_ERROR = "error.delete.statement.conflicted";
    public static final String ERR_INTERNAL_SERVER_ERROR = "internal.server.error";

    private ErrorConstants() {
    }
}
