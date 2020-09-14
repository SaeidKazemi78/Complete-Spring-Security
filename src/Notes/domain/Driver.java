package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Driver.
 */
@Entity
@Table(name = "driver")
@Audited
public class Driver extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "birth_certificate_number")
    private String birthCertificateNumber;

    @Column(name = "driving_license_type_code")
    private String drivingLicenseTypeCode;

    @Column(name = "driving_license_number")
    private String drivingLicenseNumber;

    @Column(name = "driving_license_issue_date")
    private ZonedDateTime drivingLicenseIssueDate;

    @Column(name = "driving_license_expire_date")
    private ZonedDateTime drivingLicenseExpireDate;

    @Column(name = "expire_violation_date")
    private ZonedDateTime expireViolationDate;

    @Column(name = "smart_card_number")
    private String smartCardNumber;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "main_driver")
    private Boolean mainDriver;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "picture")
    private byte[] picture;

    @Column(name = "picture_content_type")
    private String pictureContentType;

    @Column(name = "satisfaction_weight")
    private Float satisfactionWeight;

    @Column(name = "desired_length_weight")
    private Float desiredLengthWeight;

    @Column(name = "behaviour_weight")
    private Float behaviourWeight;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Region birthCity;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Car car;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Driver firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Driver lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getBirthCertificateNumber() {
        return birthCertificateNumber;
    }

    public void setBirthCertificateNumber(String birthCertificateNumber) {
        this.birthCertificateNumber = birthCertificateNumber;
    }

    public Driver birthCertificateNumber(String birthCertificateNumber) {
        this.birthCertificateNumber = birthCertificateNumber;
        return this;
    }

    public String getDrivingLicenseTypeCode() {
        return drivingLicenseTypeCode;
    }

    public void setDrivingLicenseTypeCode(String drivingLicenseTypeCode) {
        this.drivingLicenseTypeCode = drivingLicenseTypeCode;
    }

    public Driver drivingLicenseTypeCode(String drivingLicenseTypeCode) {
        this.drivingLicenseTypeCode = drivingLicenseTypeCode;
        return this;
    }

    public String getDrivingLicenseNumber() {
        return drivingLicenseNumber;
    }

    public void setDrivingLicenseNumber(String drivingLicenseNumber) {
        this.drivingLicenseNumber = drivingLicenseNumber;
    }

    public Driver drivingLicenseNumber(String drivingLicenseNumber) {
        this.drivingLicenseNumber = drivingLicenseNumber;
        return this;
    }

    public ZonedDateTime getDrivingLicenseIssueDate() {
        return drivingLicenseIssueDate;
    }

    public void setDrivingLicenseIssueDate(ZonedDateTime drivingLicenseIssueDate) {
        this.drivingLicenseIssueDate = drivingLicenseIssueDate;
    }

    public Driver drivingLicenseIssueDate(ZonedDateTime drivingLicenseIssueDate) {
        this.drivingLicenseIssueDate = drivingLicenseIssueDate;
        return this;
    }

    public ZonedDateTime getDrivingLicenseExpireDate() {
        return drivingLicenseExpireDate;
    }

    public void setDrivingLicenseExpireDate(ZonedDateTime drivingLicenseExpireDate) {
        this.drivingLicenseExpireDate = drivingLicenseExpireDate;
    }

    public Driver drivingLicenseExpireDate(ZonedDateTime drivingLicenseExpireDate) {
        this.drivingLicenseExpireDate = drivingLicenseExpireDate;
        return this;
    }

    public ZonedDateTime getExpireViolationDate() {
        return expireViolationDate;
    }

    public void setExpireViolationDate(ZonedDateTime expireViolationDate) {
        this.expireViolationDate = expireViolationDate;
    }

    public Driver expireViolationDate(ZonedDateTime expireViolationDate) {
        this.expireViolationDate = expireViolationDate;
        return this;
    }

    public String getSmartCardNumber() {
        return smartCardNumber;
    }

    public void setSmartCardNumber(String smartCardNumber) {
        this.smartCardNumber = smartCardNumber;
    }

    public Driver smartCardNumber(String smartCardNumber) {
        this.smartCardNumber = smartCardNumber;
        return this;
    }

    public Boolean isActive() {
        return active;
    }

    public Driver active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean isMainDriver() {
        return mainDriver;
    }

    public Driver mainDriver(Boolean mainDriver) {
        this.mainDriver = mainDriver;
        return this;
    }

    public void setMainDriver(Boolean mainDriver) {
        this.mainDriver = mainDriver;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Driver description(String description) {
        this.description = description;
        return this;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public Driver picture(byte[] picture) {
        this.picture = picture;
        return this;
    }

    public String getPictureContentType() {
        return pictureContentType;
    }

    public void setPictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
    }

    public Driver pictureContentType(String pictureContentType) {
        this.pictureContentType = pictureContentType;
        return this;
    }

    public Float getSatisfactionWeight() {
        return satisfactionWeight;
    }

    public void setSatisfactionWeight(Float satisfactionWeight) {
        this.satisfactionWeight = satisfactionWeight;
    }

    public Driver satisfactionWeight(Float satisfactionWeight) {
        this.satisfactionWeight = satisfactionWeight;
        return this;
    }

    public Float getDesiredLengthWeight() {
        return desiredLengthWeight;
    }

    public void setDesiredLengthWeight(Float desiredLengthWeight) {
        this.desiredLengthWeight = desiredLengthWeight;
    }

    public Driver desiredLengthWeight(Float desiredLengthWeight) {
        this.desiredLengthWeight = desiredLengthWeight;
        return this;
    }

    public Float getBehaviourWeight() {
        return behaviourWeight;
    }

    public void setBehaviourWeight(Float behaviourWeight) {
        this.behaviourWeight = behaviourWeight;
    }

    public Driver behaviourWeight(Float behaviourWeight) {
        this.behaviourWeight = behaviourWeight;
        return this;
    }

    public Region getBirthCity() {
        return birthCity;
    }

    public void setBirthCity(Region region) {
        this.birthCity = region;
    }

    public Driver birthCity(Region region) {
        this.birthCity = region;
        return this;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Driver car(Car car) {
        this.car = car;
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
        Driver driver = (Driver) o;
        if (driver.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), driver.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Driver{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", birthCertificateNumber='" + getBirthCertificateNumber() + "'" +
            ", drivingLicenseTypeCode='" + getDrivingLicenseTypeCode() + "'" +
            ", drivingLicenseNumber='" + getDrivingLicenseNumber() + "'" +
            ", drivingLicenseIssueDate='" + getDrivingLicenseIssueDate() + "'" +
            ", drivingLicenseExpireDate='" + getDrivingLicenseExpireDate() + "'" +
            ", expireViolationDate='" + getExpireViolationDate() + "'" +
            ", smartCardNumber='" + getSmartCardNumber() + "'" +
            ", active='" + isActive() + "'" +
            ", mainDriver='" + isMainDriver() + "'" +
            ", description='" + getDescription() + "'" +
            ", picture='" + getPicture() + "'" +
            ", pictureContentType='" + getPictureContentType() + "'" +
            ", satisfactionWeight=" + getSatisfactionWeight() +
            ", desiredLengthWeight=" + getDesiredLengthWeight() +
            ", behaviourWeight=" + getBehaviourWeight() +
            "}";
    }
}
