package ir.donyapardaz.niopdc.base.service.dto;

import java.io.Serializable;
import java.util.List;

public class CustomerCreditTaDTO implements Serializable {

    private String customerCode;
    private String economicCode;
    private String nationalCode;
    private String type;
    private String isNew; // 0, 1
    private String customerType; // 1.0002

    private List<CustomerCreditProductTaDTO> products;

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getEconomicCode() {
        return economicCode;
    }

    public void setEconomicCode(String economicCode) {
        this.economicCode = economicCode;
    }


    public String getNationalCode() {
        return nationalCode;
    }

    public void setNationalCode(String nationalCode) {
        this.nationalCode = nationalCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsNew() {
        return isNew;
    }

    public void setIsNew(String isNew) {
        this.isNew = isNew;
    }

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

    public List<CustomerCreditProductTaDTO> getProducts() {
        return products;
    }

    public void setProducts(List<CustomerCreditProductTaDTO> products) {
        this.products = products;
    }
}
