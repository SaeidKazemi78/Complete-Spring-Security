package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the CarInfo entity.
 */
public class CarInfoDTO implements Serializable {

    private Long id;

    private String physicalInsuranceNo;

    private ZonedDateTime physicalInsuranceExpireDate;

    private String thirdPartyInsuranceNo;

    private ZonedDateTime thirdPartyInsuranceExpireDate;

    private ZonedDateTime registerDate;

    private String wayBillCardSerial;

    private ZonedDateTime fromDate;

    private ZonedDateTime toDate;

    private Long carId;

    private String carTitle;

    private Long capacity;

    private Long sealNumber;

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

    public ZonedDateTime getPhysicalInsuranceExpireDate() {
        return physicalInsuranceExpireDate;
    }

    public void setPhysicalInsuranceExpireDate(ZonedDateTime physicalInsuranceExpireDate) {
        this.physicalInsuranceExpireDate = physicalInsuranceExpireDate;
    }

    public String getThirdPartyInsuranceNo() {
        return thirdPartyInsuranceNo;
    }

    public void setThirdPartyInsuranceNo(String thirdPartyInsuranceNo) {
        this.thirdPartyInsuranceNo = thirdPartyInsuranceNo;
    }

    public ZonedDateTime getThirdPartyInsuranceExpireDate() {
        return thirdPartyInsuranceExpireDate;
    }

    public void setThirdPartyInsuranceExpireDate(ZonedDateTime thirdPartyInsuranceExpireDate) {
        this.thirdPartyInsuranceExpireDate = thirdPartyInsuranceExpireDate;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public String getWayBillCardSerial() {
        return wayBillCardSerial;
    }

    public void setWayBillCardSerial(String wayBillCardSerial) {
        this.wayBillCardSerial = wayBillCardSerial;
    }

    public ZonedDateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(ZonedDateTime fromDate) {
        this.fromDate = fromDate;
    }

    public ZonedDateTime getToDate() {
        return toDate;
    }

    public void setToDate(ZonedDateTime toDate) {
        this.toDate = toDate;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getCarTitle() {
        return carTitle;
    }

    public void setCarTitle(String carTitle) {
        this.carTitle = carTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarInfoDTO carInfoDTO = (CarInfoDTO) o;
        if (carInfoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carInfoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarInfoDTO{" +
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
