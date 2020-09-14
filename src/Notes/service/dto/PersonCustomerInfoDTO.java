package ir.donyapardaz.niopdc.base.service.dto;

public class PersonCustomerInfoDTO {
    private String personName;
    private String personCode;
    private String sellContractCode;

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getPersonCode() {
        return personCode;
    }

    public void setPersonCode(String personCode) {
        this.personCode = personCode;
    }

    public String getSellContractCode() {
        return sellContractCode;
    }

    public void setSellContractCode(String sellContractCode) {
        this.sellContractCode = sellContractCode;
    }
}
