package ir.donyapardaz.niopdc.base.service.dto;

import java.util.Set;

public class SmsDTO {
    private Set<String> mobiles;
    private String message;


    public Set<String> getMobiles() {
        return mobiles;
    }

    public void setMobiles(Set<String> mobiles) {
        this.mobiles = mobiles;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
