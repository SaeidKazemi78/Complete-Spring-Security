package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.config.Constants;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.domain.enumeration.StakeholderType;
import ir.donyapardaz.niopdc.base.domain.enumeration.VerifyStatus;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Person entity.
 */
public class PersonListDTO implements Serializable {

    private Long id;

    @Size(min = 5, max = 20)
    private String code;

    @Size(min = 3, max = 42)
    private String fullName;

    @Size(max = 42)
    private String idCode;

    @Size(min = 10, max = 10)
    private String postalCode;

    @Size(min = 1, max = 42)
    private String registerNo;

    @Size(min = 1, max = 20)
    private String creditAccount;

    @Size(min = 12, max = 12)
    private String economicCode;

    @NotNull
    private Personality personality;

    private Integer sharePercent;

    private Long companyId;

    private Long stakeholderId;

    private StakeholderType stakeholderType;

    private VerifyStatus status;

    private int locationSize;

    private boolean invalidData;

    private String transportCode;

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String username;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public String getEconomicCode() {
        return economicCode;
    }

    public void setEconomicCode(String economicCode) {
        this.economicCode = economicCode;
    }

    public Personality getPersonality() {
        return personality;
    }

    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    public Integer getSharePercent() {
        return sharePercent;
    }

    public void setSharePercent(Integer sharePercent) {
        this.sharePercent = sharePercent;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public Long getStakeholderId() {
        return stakeholderId;
    }

    public void setStakeholderId(Long stakeholderId) {
        this.stakeholderId = stakeholderId;
    }

    public StakeholderType getStakeholderType() {
        return stakeholderType;
    }

    public void setStakeholderType(StakeholderType stakeholderType) {
        this.stakeholderType = stakeholderType;
    }

    public VerifyStatus getStatus() {
        return status;
    }

    public void setStatus(VerifyStatus status) {
        this.status = status;
    }

    public int getLocationSize() {
        return locationSize;
    }

    public void setLocationSize(int locationSize) {
        this.locationSize = locationSize;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonListDTO personDTO = (PersonListDTO) o;
        if (personDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), personDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PersonDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", idCode='" + getIdCode() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", registerNo='" + getRegisterNo() + "'" +
            ", creditAccount='" + getCreditAccount() + "'" +
            ", economicCode='" + getEconomicCode() + "'" +
            ", personality='" + getPersonality() + "'" +
            "}";
    }

    public boolean isInvalidData() {
        return invalidData;
    }

    public void setInvalidData(boolean invalidData) {
        this.invalidData = invalidData;
    }

    public String getTransportCode() {
        return transportCode;
    }

    public void setTransportCode(String transportCode) {
        this.transportCode = transportCode;
    }
}
