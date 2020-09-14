package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Depot entity.
 */
public class CustomerAccountingDTO implements Serializable {

    private Long id;

    private Long personId;
    private Long customerId;
    private Long bankAccountId;

    @Size(max = 5)
    private String creditAccountPerson;
    @Size(max = 5)
    private String creditAccountCustomer;

    private ContractType contractType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getBankAccountId() {
        return bankAccountId;
    }

    public void setBankAccountId(Long bankAccountId) {
        this.bankAccountId = bankAccountId;
    }

    public String getCreditAccountPerson() {
        return creditAccountPerson;
    }

    public void setCreditAccountPerson(String creditAccountPerson) {
        this.creditAccountPerson = creditAccountPerson;
    }

    public String getCreditAccountCustomer() {
        return creditAccountCustomer;
    }

    public void setCreditAccountCustomer(String creditAccountCustomer) {
        this.creditAccountCustomer = creditAccountCustomer;
    }

    public ContractType getContractType() {
        return contractType;
    }

    public void setContractType(ContractType contractType) {
        this.contractType = contractType;
    }
}
