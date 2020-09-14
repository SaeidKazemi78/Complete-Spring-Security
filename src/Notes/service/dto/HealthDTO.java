package ir.donyapardaz.niopdc.base.service.dto;

public class HealthDTO {
    private String url;
    private String serviceName;
    private String clientName;
    private String  domain;
    private Boolean telnet;
    private Boolean ping;
    private Boolean connection;
    private String exception;


    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public Boolean getTelnet() {
        return telnet;
    }

    public void setTelnet(Boolean telnet) {
        this.telnet = telnet;
    }

    public Boolean getPing() {
        return ping;
    }

    public void setPing(Boolean ping) {
        this.ping = ping;
    }

    public Boolean getConnection() {
        return connection;
    }

    public void setConnection(Boolean connection) {
        this.connection = connection;
    }


}
