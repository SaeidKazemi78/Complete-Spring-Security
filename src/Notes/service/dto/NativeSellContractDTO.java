package ir.donyapardaz.niopdc.base.service.dto;

public class NativeSellContractDTO {
    private Long id;
    private String contractNo;
    private String peoples;
    private String customers;
    private Boolean active;
    private Integer addendumNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getPeoples() {
        return peoples;
    }

    public void setPeoples(String peoples) {
        this.peoples = peoples;
    }

    public String getCustomers() {
        return customers;
    }

    public void setCustomers(String customers) {
        this.customers = customers;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getAddendumNumber() {
        return addendumNumber;
    }

    public void setAddendumNumber(Integer addendumNumber) {
        this.addendumNumber = addendumNumber;
    }
}
