package ir.donyapardaz.niopdc.base.service.dto.custom;

import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.OrderType;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;

public class CustomerPersonDTO {
    private String customerName;
    private CustomerGroup customerGroup;
    private String customerCode;
    private String personCode;
    private Long customerId;
    private String personName;
    private String personFirstName;
    private String personLastName;
    private Long personId;
    private Long sellContractId;
    private String contractNo;
    private Personality personality;
    private OrderType orderType;
    private String rateGroupTitle;
    private String vehicleModelTitle;
    private String productTitle;

    public CustomerPersonDTO() {
    }

    public CustomerPersonDTO(String customerName, CustomerGroup customerGroup, String customerCode, String personCode, Long customerId, String personName, String personFirstName, String personLastName, Long personId, Long sellContractId, String contractNo, Personality personality) {
        this.customerName = customerName;
        this.customerGroup = customerGroup;
        this.customerCode = customerCode;
        this.personCode = personCode;
        this.customerId = customerId;
        this.personName = personName;
        this.personFirstName = personFirstName;
        this.personLastName = personLastName;
        this.personId = personId;
        this.sellContractId = sellContractId;
        this.contractNo = contractNo;
        this.personality = personality;
    }

    public CustomerPersonDTO(String customerName, CustomerGroup customerGroup, String customerCode, String personCode, Long customerId, String personName, String personFirstName, String personLastName, Long personId, Long sellContractId, String contractNo, Personality personality, String rateGroupTitle, String vehicleModelTitle, String productTitle) {
        this.customerName = customerName;
        this.customerGroup = customerGroup;
        this.customerCode = customerCode;
        this.personCode = personCode;
        this.customerId = customerId;
        this.personName = personName;
        this.personFirstName = personFirstName;
        this.personLastName = personLastName;
        this.personId = personId;
        this.sellContractId = sellContractId;
        this.contractNo = contractNo;
        this.personality = personality;
        this.rateGroupTitle = rateGroupTitle;
        this.vehicleModelTitle = vehicleModelTitle;
        this.productTitle = productTitle;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public String getPersonFirstName() {
        return personFirstName;
    }

    public void setPersonFirstName(String personFirstName) {
        this.personFirstName = personFirstName;
    }

    public String getPersonLastName() {
        return personLastName;
    }

    public void setPersonLastName(String personLastName) {
        this.personLastName = personLastName;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Personality getPersonality() {
        return personality;
    }

    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getFullName() {
        if (this.personality.equals(Personality.NATURAL))
            return this.personFirstName + " " + this.personLastName;
        else
            return this.personName;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }

    public CustomerGroup getCustomerGroup() {
        return customerGroup;
    }

    public void setCustomerGroup(CustomerGroup customerGroup) {
        this.customerGroup = customerGroup;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public String getPersonCode() {
        return personCode;
    }

    public void setPersonCode(String personCode) {
        this.personCode = personCode;
    }

    public String getRateGroupTitle() {
        return rateGroupTitle;
    }

    public CustomerPersonDTO setRateGroupTitle(String rateGroupTitle) {
        this.rateGroupTitle = rateGroupTitle;
        return this;
    }

    public String getVehicleModelTitle() {
        return vehicleModelTitle;
    }

    public CustomerPersonDTO setVehicleModelTitle(String vehicleModelTitle) {
        this.vehicleModelTitle = vehicleModelTitle;
        return this;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public CustomerPersonDTO setProductTitle(String productTitle) {
        this.productTitle = productTitle;
        return this;
    }
}
