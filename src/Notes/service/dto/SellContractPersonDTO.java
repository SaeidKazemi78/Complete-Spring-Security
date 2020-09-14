package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SellContractPerson entity.
 */
public class SellContractPersonDTO implements Serializable {

    private Long id;

    private Integer sharePercent;

    @Size(min = 1, max = 20)
    private String creditAccount;

    private Long sellContractId;

    private String sellContractContractNo;

    private Long personId;

    private String personFullName;

    private Boolean main;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }


    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public Long getSellContractId() {
        return sellContractId;
    }

    public void setSellContractId(Long sellContractId) {
        this.sellContractId = sellContractId;
    }

    public String getSellContractContractNo() {
        return sellContractContractNo;
    }

    public void setSellContractContractNo(String sellContractContractNo) {
        this.sellContractContractNo = sellContractContractNo;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getPersonFullName() {
        return personFullName;
    }

    public void setPersonFullName(String personFullName) {
        this.personFullName = personFullName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SellContractPersonDTO sellContractPersonDTO = (SellContractPersonDTO) o;
        if(sellContractPersonDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sellContractPersonDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SellContractPersonDTO{" +
            "id=" + getId() +
            ", sharePercent=" + getSharePercent() +
            ", creditAccount='" + getCreditAccount() + "'" +
            "}";
    }

    public Boolean getMain() {
        return main;
    }

    public SellContractPersonDTO setMain(Boolean main) {
        this.main = main;
        return this;
    }
}
