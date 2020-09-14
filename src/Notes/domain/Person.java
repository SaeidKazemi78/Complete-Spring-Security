package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.domain.enumeration.VerifyStatus;
import org.hibernate.annotations.Formula;
import org.hibernate.envers.Audited;
import org.hibernate.envers.NotAudited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


/**
 * A Person.
 */
@Entity
@Table(name = "person")
@Audited
public class Person extends AbstractAuditingEntity implements Serializable {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "company")
    @ShallowReference
    Set<Stakeholder> stakeholders;

    @ManyToMany
        @JoinTable(name = "person_location",
        joinColumns = @JoinColumn(name = "people_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    @ShallowReference
    private Set<Location> locations = new HashSet<>();

    @OneToMany(mappedBy = "person")
    @JsonIgnore
        @ShallowReference
    private Set<SellContractPerson> sellContractPeople = new HashSet<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonIgnore
        @ShallowReference
    private Set<SalesCode> salesCodes = new HashSet<>();


    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @Size(max = 42)
    @Column(name = "first_name", length = 42)
    private String firstName;

    @Size(max = 42)
    @Column(name = "last_name", length = 42)
    private String lastName;

    @Column(name = "code", length = 20)
    private String code;

    @Size(min = 3, max = 42)
    @Column(name = "father_name", length = 42)
    private String fatherName;

    @Size(max = 42)
    @Column(name = "id_code", length = 42)
    private String idCode;

    @Size(max = 12)
    @Column(name = "telephone", length = 12)
    private String telephone;

    @Size(max = 15)
    @Column(name = "cellphone", length = 15)
    private String cellphone;

    @Size(max = 42)
    @Column(name = "email", length = 42)
    private String email;

    @Size(max = 42)
    @Column(name = "register_no", length = 42)
    private String registerNo;

    @Size(min = 1, max = 20)
    @Column(name = "credit_account", length = 20)
    private String creditAccount;

    @Size(max = 512)
    @Column(name = "address", length = 512)
    private String address;

    @Size(min = 10, max = 10)
    @Column(name = "postalCode", length = 10)
    private String postalCode;

    @Column(name = "birthday")
    private ZonedDateTime birthday;

    @Size(max = 12)
    @Column(name = "economic_code", length = 12)
    private String economicCode;

    @Size(min = 1, max = 50)
    @Column(name = "user_name", length = 50)
    private String username;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "personality", nullable = false)
    private Personality personality;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region birthRegion;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region region;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Country nationality;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private VerifyStatus status;


    @OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
    private PersonTransport personTransport;


    @Formula(value =
        "case " +
            " when" +
            " name is null" +
            " then first_name + ' ' + last_name" +
            " else name" +
         " end"
    )
    @NotAudited
    private String fullName;

    @Enumerated(EnumType.STRING)
    @Column(name = "person_group")
    private PersonGroup personGroup;

    public boolean getInvalidData() {
        if (personality == Personality.LEGAL) {
            return (country == null || code == null || code.isEmpty() || code.length() != 11 || birthday == null ||
                registerNo == null || registerNo.isEmpty() ||
                name == null || name.isEmpty() || postalCode == null || postalCode.isEmpty() || postalCode.length() != 10 ||
                telephone == null || telephone.isEmpty() || cellphone == null || cellphone.isEmpty() ||
                economicCode == null || economicCode.isEmpty());
        } else {
            return (nationality == null || code == null || code.isEmpty() || code.length() != 10 ||
                firstName == null || firstName.isEmpty() || lastName == null || lastName.isEmpty() ||
                fatherName == null || fatherName.isEmpty() || birthday == null || postalCode == null || postalCode.isEmpty() ||
                postalCode.length() != 10 || idCode == null || idCode.isEmpty() || cellphone == null || cellphone.isEmpty() ||
                telephone == null || telephone.isEmpty());
        }
    }


    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove

   /* @Formula(value = "")
    public String getFullName() {
        if (personality == Personality.LEGAL) return (name != null) ? name : "";
        return ((firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "")).trim();
    }*/

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public String getRegisterNo() {
        return registerNo;
    }


    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }

    public String getCreditAccount() {
        return creditAccount;
    }

    public Person creditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
        return this;
    }

    public void setCreditAccount(String creditAccount) {
        this.creditAccount = creditAccount;
    }

    public String getAddress() {
        return address;
    }


    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Personality getPersonality() {
        return personality;
    }


    public void setPersonality(Personality personality) {
        this.personality = personality;
    }

    public Region getBirthRegion() {
        return birthRegion;
    }


    public void setBirthRegion(Region region) {
        this.birthRegion = region;
    }

    public Region getRegion() {
        return region;
    }


    public void setRegion(Region region) {
        this.region = region;
    }

    public Country getCountry() {
        return country;
    }


    public void setCountry(Country country) {
        this.country = country;
    }

    public Country getNationality() {
        return nationality;
    }


    public void setNationality(Country country) {
        this.nationality = country;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove


    public VerifyStatus getStatus() {
        return status;
    }

    public void setStatus(VerifyStatus status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Stakeholder> getStakeholders() {
        return stakeholders;
    }

    public void setStakeholders(Set<Stakeholder> stakeholders) {
        this.stakeholders = stakeholders;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Set<SellContractPerson> getSellContractPeople() {
        return sellContractPeople;
    }

    public void setSellContractPeople(Set<SellContractPerson> sellContractPeople) {
        this.sellContractPeople = sellContractPeople;
    }

    public Set<SalesCode> getSalesCodes() {
        return salesCodes;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Person{" +
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
            ", status='" + getStatus() + "'" +
            "}";
    }


    public PersonTransport getPersonTransport() {
        return personTransport;
    }

    public void setPersonTransport(PersonTransport personTransport) {
        this.personTransport = personTransport;
    }

    public PersonGroup getPersonGroup() {
        return personGroup;
    }

    public void setPersonGroup(PersonGroup personGroup) {
        this.personGroup = personGroup;
    }
}
