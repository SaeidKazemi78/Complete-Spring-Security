package ir.donyapardaz.niopdc.base.web.rest.errors;

import ir.donyapardaz.niopdc.base.web.rest.util.HeaderUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import static org.hibernate.id.IdentifierGenerator.ENTITY_NAME;

/**
 * Created by abbas on 4/12/17.
 */
public final class ValidationResponseEntityGenerator {
    public static ResponseEntity getBadRequest(BindingResult validation) {
        return ResponseEntity.
            badRequest().
            headers(
                HeaderUtil.createFailureAlert(
                    ENTITY_NAME,
                    validation.getGlobalError().getCode(),
                    validation.getGlobalError().getDefaultMessage()
                )
            ).body(null);
    }

    public static void badRequest(BindingResult validation) {
        throw new CustomParameterizedException("error." + validation.getGlobalError().getCode());
    }
}
