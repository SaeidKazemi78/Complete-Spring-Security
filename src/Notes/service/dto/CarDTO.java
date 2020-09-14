package ir.donyapardaz.niopdc.base.service.dto;


import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the Car entity.
 */
public class CarDTO implements Serializable {

    private Long id;

    private String title;

    private String plaqueNumber;

    private String serial;

    private String serialNumber;

    private String bakNumber;

    private String ownerNationalId;

    private String cardNo;

    private ZonedDateTime cardDate;

    private ZonedDateTime valveDate;

    private Boolean isBlock;

    private String blockReason;

    private ZonedDateTime startBlockDate;

    private ZonedDateTime finishBlockDate;

    private String description;

    private ZonedDateTime permitDate;

    private ZonedDateTime registerDate;

    private String chassisNumber;

    private String buildDate;

    private ZonedDateTime confirmDate;

    private String confirmBy;

    private Boolean deleted;

    private ZonedDateTime deleteDate;

    private String personName;
    private Long personId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPlaqueNumber() {
        return plaqueNumber;
    }

    public void setPlaqueNumber(String plaqueNumber) {
        this.plaqueNumber = plaqueNumber;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getBakNumber() {
        return bakNumber;
    }

    public void setBakNumber(String bakNumber) {
        this.bakNumber = bakNumber;
    }

    public String getOwnerNationalId() {
        return ownerNationalId;
    }

    public void setOwnerNationalId(String ownerNationalId) {
        this.ownerNationalId = ownerNationalId;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public ZonedDateTime getCardDate() {
        return cardDate;
    }

    public void setCardDate(ZonedDateTime cardDate) {
        this.cardDate = cardDate;
    }

    public ZonedDateTime getValveDate() {
        return valveDate;
    }

    public void setValveDate(ZonedDateTime valveDate) {
        this.valveDate = valveDate;
    }

    public Boolean isIsBlock() {
        return isBlock;
    }

    public void setIsBlock(Boolean isBlock) {
        this.isBlock = isBlock;
    }

    public String getBlockReason() {
        return blockReason;
    }

    public void setBlockReason(String blockReason) {
        this.blockReason = blockReason;
    }

    public ZonedDateTime getStartBlockDate() {
        return startBlockDate;
    }

    public void setStartBlockDate(ZonedDateTime startBlockDate) {
        this.startBlockDate = startBlockDate;
    }

    public ZonedDateTime getFinishBlockDate() {
        return finishBlockDate;
    }

    public void setFinishBlockDate(ZonedDateTime finishBlockDate) {
        this.finishBlockDate = finishBlockDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getPermitDate() {
        return permitDate;
    }

    public void setPermitDate(ZonedDateTime permitDate) {
        this.permitDate = permitDate;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public void setChassisNumber(String chassisNumber) {
        this.chassisNumber = chassisNumber;
    }

    public String getBuildDate() {
        return buildDate;
    }

    public void setBuildDate(String buildDate) {
        this.buildDate = buildDate;
    }

    public ZonedDateTime getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(ZonedDateTime confirmDate) {
        this.confirmDate = confirmDate;
    }

    public String getConfirmBy() {
        return confirmBy;
    }

    public void setConfirmBy(String confirmBy) {
        this.confirmBy = confirmBy;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public ZonedDateTime getDeleteDate() {
        return deleteDate;
    }

    public void setDeleteDate(ZonedDateTime deleteDate) {
        this.deleteDate = deleteDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CarDTO carDTO = (CarDTO) o;
        if (carDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), carDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CarDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", plaqueNumber='" + getPlaqueNumber() + "'" +
            ", serial='" + getSerial() + "'" +
            ", serialNumber='" + getSerialNumber() + "'" +
            ", bakNumber='" + getBakNumber() + "'" +
            ", ownerNationalId='" + getOwnerNationalId() + "'" +
            ", cardNo='" + getCardNo() + "'" +
            ", cardDate='" + getCardDate() + "'" +
            ", valveDate='" + getValveDate() + "'" +
            ", isBlock='" + isIsBlock() + "'" +
            ", blockReason='" + getBlockReason() + "'" +
            ", startBlockDate='" + getStartBlockDate() + "'" +
            ", finishBlockDate='" + getFinishBlockDate() + "'" +
            ", description='" + getDescription() + "'" +
            ", permitDate='" + getPermitDate() + "'" +
            ", registerDate='" + getRegisterDate() + "'" +
            ", chassisNumber='" + getChassisNumber() + "'" +
            ", buildDate='" + getBuildDate() + "'" +
            ", confirmDate='" + getConfirmDate() + "'" +
            ", confirmBy='" + getConfirmBy() + "'" +
            ", deleted='" + isDeleted() + "'" +
            ", deleteDate='" + getDeleteDate() + "'" +
            "}";
    }

    public String getPersonName() {
        return personName;
    }

    public void setPersonName(String personName) {
        this.personName = personName;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }
}
