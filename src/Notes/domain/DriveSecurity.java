package ir.donyapardaz.niopdc.base.domain;

import ir.donyapardaz.niopdc.base.domain.enumeration.Education;
import ir.donyapardaz.niopdc.base.domain.enumeration.MaritalStatus;
import ir.donyapardaz.niopdc.base.domain.enumeration.MilitaryStatus;
import ir.donyapardaz.niopdc.base.domain.enumeration.Religion;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DriveSecurity.
 */
@Entity
@Table(name = "drive_security")
@Audited
public class DriveSecurity extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "birth_date")
    private ZonedDateTime birthDate;

    @Column(name = "height")
    private Long height;

    @Column(name = "weight")
    private Long weight;

    @Column(name = "eye_color")
    private String eyeColor;

    @Column(name = "hair_color")
    private String hairColor;

    @Column(name = "national_id")
    private String nationalId;

    @Column(name = "father_name")
    private String fatherName;

    @Enumerated(EnumType.STRING)
    @Column(name = "religion")
    private Religion religion;

    @Enumerated(EnumType.STRING)
    @Column(name = "education")
    private Education education;

    @Enumerated(EnumType.STRING)
    @Column(name = "marital_status")
    private MaritalStatus maritalStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "military_status")
    private MilitaryStatus militaryStatus;

    @Column(name = "exempt_military_reason")
    private String exemptMilitaryReason;

    @Column(name = "have_criminal")
    private Boolean haveCriminal;

    @Column(name = "criminal_reason")
    private Boolean criminalReason;

    @Column(name = "address")
    private String address;

    @Size(min = 10, max = 10)
    @Column(name = "postal_code", length = 10)
    private String postalCode;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "description")
    private String description;

    @Column(name = "in_complete_document")
    private String inCompleteDocument;

    @Column(name = "serial")
    private String serial;

    @Column(name = "is_guest")
    private Boolean isGuest;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    @ShallowReference
    private Driver driver;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Country nationality;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public DriveSecurity birthDate(ZonedDateTime birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public Long getHeight() {
        return height;
    }

    public void setHeight(Long height) {
        this.height = height;
    }

    public DriveSecurity height(Long height) {
        this.height = height;
        return this;
    }

    public Long getWeight() {
        return weight;
    }

    public void setWeight(Long weight) {
        this.weight = weight;
    }

    public DriveSecurity weight(Long weight) {
        this.weight = weight;
        return this;
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
    }

    public DriveSecurity eyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
        return this;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public DriveSecurity hairColor(String hairColor) {
        this.hairColor = hairColor;
        return this;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public DriveSecurity nationalId(String nationalId) {
        this.nationalId = nationalId;
        return this;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public DriveSecurity fatherName(String fatherName) {
        this.fatherName = fatherName;
        return this;
    }

    public Religion getReligion() {
        return religion;
    }

    public void setReligion(Religion religion) {
        this.religion = religion;
    }

    public DriveSecurity religion(Religion religion) {
        this.religion = religion;
        return this;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public DriveSecurity education(Education education) {
        this.education = education;
        return this;
    }

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    public DriveSecurity maritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
        return this;
    }

    public MilitaryStatus getMilitaryStatus() {
        return militaryStatus;
    }

    public void setMilitaryStatus(MilitaryStatus militaryStatus) {
        this.militaryStatus = militaryStatus;
    }

    public DriveSecurity militaryStatus(MilitaryStatus militaryStatus) {
        this.militaryStatus = militaryStatus;
        return this;
    }

    public String getExemptMilitaryReason() {
        return exemptMilitaryReason;
    }

    public void setExemptMilitaryReason(String exemptMilitaryReason) {
        this.exemptMilitaryReason = exemptMilitaryReason;
    }

    public DriveSecurity exemptMilitaryReason(String exemptMilitaryReason) {
        this.exemptMilitaryReason = exemptMilitaryReason;
        return this;
    }

    public Boolean isHaveCriminal() {
        return haveCriminal;
    }

    public DriveSecurity haveCriminal(Boolean haveCriminal) {
        this.haveCriminal = haveCriminal;
        return this;
    }

    public void setHaveCriminal(Boolean haveCriminal) {
        this.haveCriminal = haveCriminal;
    }

    public Boolean isCriminalReason() {
        return criminalReason;
    }

    public DriveSecurity criminalReason(Boolean criminalReason) {
        this.criminalReason = criminalReason;
        return this;
    }

    public void setCriminalReason(Boolean criminalReason) {
        this.criminalReason = criminalReason;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public DriveSecurity address(String address) {
        this.address = address;
        return this;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public DriveSecurity postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public DriveSecurity mobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        return this;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public DriveSecurity phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public DriveSecurity fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DriveSecurity description(String description) {
        this.description = description;
        return this;
    }

    public String getInCompleteDocument() {
        return inCompleteDocument;
    }

    public void setInCompleteDocument(String inCompleteDocument) {
        this.inCompleteDocument = inCompleteDocument;
    }

    public DriveSecurity inCompleteDocument(String inCompleteDocument) {
        this.inCompleteDocument = inCompleteDocument;
        return this;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public DriveSecurity serial(String serial) {
        this.serial = serial;
        return this;
    }

    public Boolean isIsGuest() {
        return isGuest;
    }

    public DriveSecurity isGuest(Boolean isGuest) {
        this.isGuest = isGuest;
        return this;
    }

    public void setIsGuest(Boolean isGuest) {
        this.isGuest = isGuest;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public DriveSecurity driver(Driver driver) {
        this.driver = driver;
        return this;
    }

    public Country getNationality() {
        return nationality;
    }

    public void setNationality(Country country) {
        this.nationality = country;
    }

    public DriveSecurity nationality(Country country) {
        this.nationality = country;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        DriveSecurity driveSecurity = (DriveSecurity) o;
        if (driveSecurity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driveSecurity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DriveSecurity{" +
            "id=" + getId() +
            ", birthDate='" + getBirthDate() + "'" +
            ", height=" + getHeight() +
            ", weight=" + getWeight() +
            ", eyeColor='" + getEyeColor() + "'" +
            ", hairColor='" + getHairColor() + "'" +
            ", nationalId='" + getNationalId() + "'" +
            ", fatherName='" + getFatherName() + "'" +
            ", religion='" + getReligion() + "'" +
            ", education='" + getEducation() + "'" +
            ", maritalStatus='" + getMaritalStatus() + "'" +
            ", militaryStatus='" + getMilitaryStatus() + "'" +
            ", exemptMilitaryReason='" + getExemptMilitaryReason() + "'" +
            ", haveCriminal='" + isHaveCriminal() + "'" +
            ", criminalReason='" + isCriminalReason() + "'" +
            ", address='" + getAddress() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", mobileNumber='" + getMobileNumber() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", fileName='" + getFileName() + "'" +
            ", description='" + getDescription() + "'" +
            ", inCompleteDocument='" + getInCompleteDocument() + "'" +
            ", serial='" + getSerial() + "'" +
            ", isGuest='" + isIsGuest() + "'" +
            "}";
    }
}
