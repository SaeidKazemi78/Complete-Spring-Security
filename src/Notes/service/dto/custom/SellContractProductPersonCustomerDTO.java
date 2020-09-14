package ir.donyapardaz.niopdc.base.service.dto.custom;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductDTO;

import java.io.Serializable;
import java.util.List;

/**
 * A DTO for the get rate product .
 */
public class SellContractProductPersonCustomerDTO implements Serializable {

    private List<SellContractProductDTO> sellContractProducts;

    private String personFullName;

    private String customerName;

    private String customerCode;

    private String depotTitle;

    private CustomerGroup customerGroup;

    public List<SellContractProductDTO> getSellContractProducts() {
        return sellContractProducts;
    }

    public void setSellContractProducts(List<SellContractProductDTO> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
    }

    public String getPersonFullName() {
        return personFullName;
    }

    public void setPersonFullName(String personFullName) {
        this.personFullName = personFullName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerDTO) {
        this.customerName = customerDTO;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public void setDepotTitle(String depotTitle) {
        this.depotTitle = depotTitle;
    }

    public String getDepotTitle() {
        return depotTitle;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }
}
