package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.config.Constants;
import ir.donyapardaz.niopdc.base.domain.SalesCode;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.domain.enumeration.StakeholderType;
import ir.donyapardaz.niopdc.base.domain.enumeration.VerifyStatus;
import ir.donyapardaz.niopdc.base.service.dto.custom.BankAccountDTO;
import ir.donyapardaz.niopdc.base.validation.global.PasswordsEqualConstraint;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Person entity.
 */
@PasswordsEqualConstraint(first = "password", second = "confirmPassword")
public class PersonDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @Size(min = 3, max = 42)
    private String name;

    @Size(min = 3, max = 42)
    private String firstName;

    @Size(min = 3, max = 42)
    private String lastName;

    @Size(min = 5, max = 20)
    private String code;

    @Size(min = 3, max = 42)
    private String fatherName;

    @Size(max = 42)
    private String idCode;

    @Size(min = 3, max = 12)
    private String telephone;

    @Size(min = 3, max = 15)
    private String cellphone;

    @Size(min = 5, max = 42)
    @Email
    private String email;

    @Size(min = 10, max = 10)
    private String postalCode;

    @Size(min = 1, max = 42)
    private String registerNo;

    @Size(min = 5, max = 5)
    private String creditAccount;

    @Size(min = 3, max = 80)
    private String address;

    private ZonedDateTime birthday;

    @Size(min = 12, max = 12)
    private String economicCode;

    @NotNull
    private Personality personality;


    private Long birthRegionId;

    private String birthRegionName;

    private Long regionId;

    private String regionName;

    private Long countryId;

    private String countryName;

    private Long nationalityId;

    private String nationalityName;

    private Set<LocationDTO> locations = new HashSet<>();

    private Set<SalesCode> salesCodes = new HashSet<>();

    private Integer sharePercent;

    private Long companyId;

    private Long stakeholderId;

    private StakeholderType stakeholderType;

    private VerifyStatus status;
    private Set<BankAccountDTO> bankAccounts = new HashSet<>();

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String username;

    @Size(min = 4, max = 100)
    private String password;

    @Size(min = 4, max = 100)
    private String confirmPassword;

    private PersonGroup personGroup;

    private String personTransportCode;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public ZonedDateTime getBirthday() {
        return birthday;
    }

    public void setBirthday(ZonedDateTime birthday) {
        this.birthday = birthday;
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

    public Long getBirthRegionId() {
        return birthRegionId;
    }

    public void setBirthRegionId(Long regionId) {
        this.birthRegionId = regionId;
    }

    public String getBirthRegionName() {
        return birthRegionName;
    }

    public void setBirthRegionName(String regionName) {
        this.birthRegionName = regionName;
    }

    public Long getRegionId() {
        return regionId;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }

    public String getRegionName() {
        return regionName;
    }

    public void setRegionName(String regionName) {
        this.regionName = regionName;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public Long getNationalityId() {
        return nationalityId;
    }

    public void setNationalityId(Long countryId) {
        this.nationalityId = countryId;
    }

    public String getNationalityName() {
        return nationalityName;
    }

    public void setNationalityName(String countryName) {
        this.nationalityName = countryName;
    }

    public Set<LocationDTO> getLocations() {
        return locations;
    }

    public void setLocations(Set<LocationDTO> locations) {
        this.locations = locations;
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

    public String getFullName() {
        return personality == Personality.LEGAL ? name : firstName + " " + lastName;
    }

    public VerifyStatus getStatus() {
        return status;
    }

    public void setStatus(VerifyStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PersonDTO personDTO = (PersonDTO) o;
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
            ", name='" + getName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", code='" + getCode() + "'" +
            ", fatherName='" + getFatherName() + "'" +
            ", idCode='" + getIdCode() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", cellphone='" + getCellphone() + "'" +
            ", email='" + getEmail() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", registerNo='" + getRegisterNo() + "'" +
            ", creditAccount='" + getCreditAccount() + "'" +
            ", address='" + getAddress() + "'" +
            ", birthday='" + getBirthday() + "'" +
            ", economicCode='" + getEconomicCode() + "'" +
            ", personality='" + getPersonality() + "'" +
            "}";
    }

    public Set<SalesCode> getSalesCodes() {
        return salesCodes;
    }

    public void setSalesCodes(Set<SalesCode> salesCodes) {
        this.salesCodes = salesCodes;
    }

    public Set<BankAccountDTO> getBankAccounts() {
        return bankAccounts;
    }

    public void setBankAccounts(Set<BankAccountDTO> bankAccounts) {
        this.bankAccounts = bankAccounts;
    }

    public PersonGroup getPersonGroup() {
        return personGroup;
    }

    public void setPersonGroup(PersonGroup personGroup) {
        this.personGroup = personGroup;
    }

    public String getPersonTransportCode() {
        return personTransportCode;
    }

    public PersonDTO setPersonTransportCode(String personTransportCode) {
        this.personTransportCode = personTransportCode;
        return this;
    }
}
