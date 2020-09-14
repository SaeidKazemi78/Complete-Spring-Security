package ir.donyapardaz.niopdc.base.web.rest.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;

/**
 * Utility class for HTTP headers creation.
 */
public final class HeaderUtil {

    private static final Logger log = LoggerFactory.getLogger(HeaderUtil.class);

    private static final String APPLICATION_NAME = "niopdcbaseApp";

    private HeaderUtil() {
    }

    public static HttpHeaders createAlert(String message, String param) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-niopdcbaseApp-alert", message);
        headers.add("X-niopdcbaseApp-params", param);
        return headers;
    }

    public static HttpHeaders createEntityCreationAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".created", param);
    }

    public static HttpHeaders createEntityCreationCarAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".carCreated", param);
    }

    public static HttpHeaders createEntityAreaCreationAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".createdArea", param);
    }

    public static HttpHeaders createEntityZoneCreationAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".createdZone", param);
    }

    public static HttpHeaders createEntityUpdateAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".updated", param);
    }


    public static HttpHeaders createEntityUpdateCarAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".carUpdated", param);
    }


    public static HttpHeaders createEntityAreaUpdateAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".updatedArea", param);
    }

    public static HttpHeaders createEntityZoneUpdateAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".updatedZone", param);
    }

    public static HttpHeaders createEntityDeletionAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".deleted", param);
    }

    public static HttpHeaders createEntityConfirmedAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".confirmed", param);
    }

    public static HttpHeaders createEntityActiveAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".active", param);
    }

    public static HttpHeaders createEntityDeActiveAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".deActive", param);
    }

    public static HttpHeaders createEntityRejectedAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".rejected", param);
    }

    public static HttpHeaders createEntityFailedActiveAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".failedActive", param);
    }

    public static HttpHeaders createEntityAreaDeletionAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".deletedArea", param);
    }

    public static HttpHeaders createEntityZoneDeletionAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".deletedZone", param);
    }

    public static HttpHeaders createEntityOpenAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".open", param);
    }

    public static HttpHeaders createEntityCloseAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".close", param);
    }

    public static HttpHeaders createEntityArchiveAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".archived", param);
    }

    public static HttpHeaders createFailureAlert(String entityName, String errorKey, String defaultMessage) {
        log.error("Entity processing failed, {}", defaultMessage);
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-niopdcbaseApp-error", "error." + errorKey);
        headers.add("X-niopdcbaseApp-params", entityName);
        return headers;
    }

    public static HttpHeaders createEntityUpdateFromExcelAlert(String entityName, String param) {
        return createAlert(APPLICATION_NAME + "." + entityName + ".uploaded", param);
    }
}
