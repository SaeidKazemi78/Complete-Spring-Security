package ir.donyapardaz.niopdc.base.service.dto;

import java.util.Set;

public class EmailDTO {
    private String subject;
    private String username;
    private String message;
    private String langKey;
    private String templateName;
    private Set<String>  addressList;

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    public String getTemplateName() {
        return templateName;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public Set<String> getAddressList() {
        return addressList;
    }

    public void setAddressList(Set<String> addressList) {
        this.addressList = addressList;
    }
}
