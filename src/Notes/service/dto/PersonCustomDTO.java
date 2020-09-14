package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;

/**
 * A DTO for the Person entity.
 */
public class PersonCustomDTO extends AbstractAuditingDTO implements Serializable {
    private String name;
    private String economicCode;
    private String registerNo;
    private String region;
    private String state;
    private String city;
    private String postalCode;
    private String address;
    private String telephone;
    private String codeLegal;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEconomicCode() {
        return economicCode;
    }

    public void setEconomicCode(String economicCode) {
        this.economicCode = economicCode;
    }

    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCodeLegal() {
        return codeLegal;
    }

    public void setCodeLegal(String codeLegal) {
        this.codeLegal = codeLegal;
    }
}
