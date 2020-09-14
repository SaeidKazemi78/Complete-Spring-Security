package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A CarInfo.
 */
@Entity
@Table(name = "car_info")
@Audited
public class CarInfo extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "physical_insurance_no")
    private String physicalInsuranceNo;

    @Column(name = "physical_insurance_expire_date")
    private ZonedDateTime physicalInsuranceExpireDate;

    @Column(name = "third_party_insurance_no")
    private String thirdPartyInsuranceNo;

    @Column(name = "third_party_insurance_expire_date")
    private ZonedDateTime thirdPartyInsuranceExpireDate;

    @Column(name = "register_date")
    private ZonedDateTime registerDate;

    @Column(name = "way_bill_card_serial")
    private String wayBillCardSerial;

    @Column(name = "seal_number")
    private Long sealNumber;

    @Column(name = "capacity")
    private Long capacity;

    @Column(name = "from_date")
    private ZonedDateTime fromDate;

    @Column(name = "to_date")
    private ZonedDateTime toDate;

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

    public String getPhysicalInsuranceNo() {
        return physicalInsuranceNo;
    }

    public void setPhysicalInsuranceNo(String physicalInsuranceNo) {
        this.physicalInsuranceNo = physicalInsuranceNo;
    }

    public CarInfo physicalInsuranceNo(String physicalInsuranceNo) {
        this.physicalInsuranceNo = physicalInsuranceNo;
        return this;
    }

    public ZonedDateTime getPhysicalInsuranceExpireDate() {
        return physicalInsuranceExpireDate;
    }

    public void setPhysicalInsuranceExpireDate(ZonedDateTime physicalInsuranceExpireDate) {
        this.physicalInsuranceExpireDate = physicalInsuranceExpireDate;
    }

    public CarInfo physicalInsuranceExpireDate(ZonedDateTime physicalInsuranceExpireDate) {
        this.physicalInsuranceExpireDate = physicalInsuranceExpireDate;
        return this;
    }

    public String getThirdPartyInsuranceNo() {
        return thirdPartyInsuranceNo;
    }

    public void setThirdPartyInsuranceNo(String thirdPartyInsuranceNo) {
        this.thirdPartyInsuranceNo = thirdPartyInsuranceNo;
    }

    public CarInfo thirdPartyInsuranceNo(String thirdPartyInsuranceNo) {
        this.thirdPartyInsuranceNo = thirdPartyInsuranceNo;
        return this;
    }

    public ZonedDateTime getThirdPartyInsuranceExpireDate() {
        return thirdPartyInsuranceExpireDate;
    }

    public void setThirdPartyInsuranceExpireDate(ZonedDateTime thirdPartyInsuranceExpireDate) {
        this.thirdPartyInsuranceExpireDate = thirdPartyInsuranceExpireDate;
    }

    public CarInfo thirdPartyInsuranceExpireDate(ZonedDateTime thirdPartyInsuranceExpireDate) {
        this.thirdPartyInsuranceExpireDate = thirdPartyInsuranceExpireDate;
        return this;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public CarInfo registerDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public String getWayBillCardSerial() {
        return wayBillCardSerial;
    }

    public void setWayBillCardSerial(String wayBillCardSerial) {
        this.wayBillCardSerial = wayBillCardSerial;
    }

    public CarInfo wayBillCardSerial(String wayBillCardSerial) {
        this.wayBillCardSerial = wayBillCardSerial;
        return this;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public CarInfo fromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
        return this;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public CarInfo toDate(ZonedDateTime toDate) {
        this.toDate = toDate;
        return this;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public CarInfo car(Car car) {
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
        CarInfo carInfo = (CarInfo) o;
        if (carInfo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carInfo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarInfo{" +
            "id=" + getId() +
            ", physicalInsuranceNo='" + getPhysicalInsuranceNo() + "'" +
            ", physicalInsuranceExpireDate='" + getPhysicalInsuranceExpireDate() + "'" +
            ", thirdPartyInsuranceNo='" + getThirdPartyInsuranceNo() + "'" +
            ", thirdPartyInsuranceExpireDate='" + getThirdPartyInsuranceExpireDate() + "'" +
            ", registerDate='" + getRegisterDate() + "'" +
            ", wayBillCardSerial='" + getWayBillCardSerial() + "'" +
            ", fromDate='" + getFromDate() + "'" +
            ", toDate='" + getToDate() + "'" +
            "}";
    }

    public Long getSealNumber() {
        return sealNumber;
    }

    public void setSealNumber(Long sealNumber) {
        this.sealNumber = sealNumber;
    }

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }
}
