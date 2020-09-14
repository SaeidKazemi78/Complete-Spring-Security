package ir.donyapardaz.niopdc.base.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class IdCodeLocationDTO implements Serializable {
    @NotNull
    private Long id;

    @NotNull
    private String code;

    @NotNull
    private String locationCode;

    @NotNull
    public Long getId() {
        return id;
    }

    public void setId(@NotNull Long id) {
        this.id = id;
    }

    @NotNull
    public String getCode() {
        return code;
    }

    public void setCode(@NotNull String code) {
        this.code = code;
    }

    @NotNull
    public String getLocationCode() {
        return locationCode;
    }

    public void setLocationCode(@NotNull String locationCode) {
        this.locationCode = locationCode;
    }
}
