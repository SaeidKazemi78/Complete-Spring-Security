package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Car.
 */
@Entity
@Table(name = "car")
@Audited
public class Car extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "plaque_number")
    private String plaqueNumber;

    @Column(name = "serial")
    private String serial;

    @Column(name = "serial_number")
    private String serialNumber;

    @Column(name = "bak_number")
    private String bakNumber;

    @Column(name = "owner_national_id")
    private String ownerNationalId;

    @Column(name = "card_no")
    private String cardNo;

    @Column(name = "card_date")
    private ZonedDateTime cardDate;

    @Column(name = "valve_date")
    private ZonedDateTime valveDate;

    @Column(name = "is_block")
    private Boolean isBlock;

    @Column(name = "block_reason")
    private String blockReason;

    @Column(name = "start_block_date")
    private ZonedDateTime startBlockDate;

    @Column(name = "finish_block_date")
    private ZonedDateTime finishBlockDate;

    @Column(name = "description")
    private String description;

    @Column(name = "permit_date")
    private ZonedDateTime permitDate;

    @Column(name = "register_date")
    private ZonedDateTime registerDate;

    @Column(name = "chassis_number")
    private String chassisNumber;

    @Column(name = "build_date", columnDefinition = "nvarchar(42)")
    private String buildDate;

    @Column(name = "confirm_date")
    private ZonedDateTime confirmDate;

    @Column(name = "confirm_by")
    private String confirmBy;

    @Column(name = "deleted")
    private Boolean deleted;

    @Column(name = "delete_date")
    private ZonedDateTime deleteDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Person person;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
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

    public Car title(String title) {
        this.title = title;
        return this;
    }

    public String getPlaqueNumber() {
        return plaqueNumber;
    }

    public void setPlaqueNumber(String plaqueNumber) {
        this.plaqueNumber = plaqueNumber;
    }

    public Car plaqueNumber(String plaqueNumber) {
        this.plaqueNumber = plaqueNumber;
        return this;
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public Car serial(String serial) {
        this.serial = serial;
        return this;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Car serialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
        return this;
    }

    public String getBakNumber() {
        return bakNumber;
    }

    public void setBakNumber(String bakNumber) {
        this.bakNumber = bakNumber;
    }

    public Car bakNumber(String bakNumber) {
        this.bakNumber = bakNumber;
        return this;
    }

    public String getOwnerNationalId() {
        return ownerNationalId;
    }

    public void setOwnerNationalId(String ownerNationalId) {
        this.ownerNationalId = ownerNationalId;
    }

    public Car ownerNationalId(String ownerNationalId) {
        this.ownerNationalId = ownerNationalId;
        return this;
    }

    public String getCardNo() {
        return cardNo;
    }

    public void setCardNo(String cardNo) {
        this.cardNo = cardNo;
    }

    public Car cardNo(String cardNo) {
        this.cardNo = cardNo;
        return this;
    }

    public ZonedDateTime getCardDate() {
        return cardDate;
    }

    public void setCardDate(ZonedDateTime cardDate) {
        this.cardDate = cardDate;
    }

    public Car cardDate(ZonedDateTime cardDate) {
        this.cardDate = cardDate;
        return this;
    }

    public ZonedDateTime getValveDate() {
        return valveDate;
    }

    public void setValveDate(ZonedDateTime valveDate) {
        this.valveDate = valveDate;
    }

    public Car valveDate(ZonedDateTime valveDate) {
        this.valveDate = valveDate;
        return this;
    }

    public Boolean isIsBlock() {
        return isBlock;
    }

    public Car isBlock(Boolean isBlock) {
        this.isBlock = isBlock;
        return this;
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

    public Car blockReason(String blockReason) {
        this.blockReason = blockReason;
        return this;
    }

    public ZonedDateTime getStartBlockDate() {
        return startBlockDate;
    }

    public void setStartBlockDate(ZonedDateTime startBlockDate) {
        this.startBlockDate = startBlockDate;
    }

    public Car startBlockDate(ZonedDateTime startBlockDate) {
        this.startBlockDate = startBlockDate;
        return this;
    }

    public ZonedDateTime getFinishBlockDate() {
        return finishBlockDate;
    }

    public void setFinishBlockDate(ZonedDateTime finishBlockDate) {
        this.finishBlockDate = finishBlockDate;
    }

    public Car finishBlockDate(ZonedDateTime finishBlockDate) {
        this.finishBlockDate = finishBlockDate;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Car description(String description) {
        this.description = description;
        return this;
    }

    public ZonedDateTime getPermitDate() {
        return permitDate;
    }

    public void setPermitDate(ZonedDateTime permitDate) {
        this.permitDate = permitDate;
    }

    public Car permitDate(ZonedDateTime permitDate) {
        this.permitDate = permitDate;
        return this;
    }

    public ZonedDateTime getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
    }

    public Car registerDate(ZonedDateTime registerDate) {
        this.registerDate = registerDate;
        return this;
    }

    public String getChassisNumber() {
        return chassisNumber;
    }

    public void setChassisNumber(String chassisNumber) {
        this.chassisNumber = chassisNumber;
    }

    public Car chassisNumber(String chassisNumber) {
        this.chassisNumber = chassisNumber;
        return this;
    }

    public String getBuildDate() {
        return buildDate;
    }

    public void setBuildDate(String buildDate) {
        this.buildDate = buildDate;
    }

    public Car buildDate(String buildDate) {
        this.buildDate = buildDate;
        return this;
    }

    public ZonedDateTime getConfirmDate() {
        return confirmDate;
    }

    public void setConfirmDate(ZonedDateTime confirmDate) {
        this.confirmDate = confirmDate;
    }

    public Car confirmDate(ZonedDateTime confirmDate) {
        this.confirmDate = confirmDate;
        return this;
    }

    public String getConfirmBy() {
        return confirmBy;
    }

    public void setConfirmBy(String confirmBy) {
        this.confirmBy = confirmBy;
    }

    public Car confirmBy(String confirmBy) {
        this.confirmBy = confirmBy;
        return this;
    }

    public Boolean isDeleted() {
        return deleted;
    }

    public Car deleted(Boolean deleted) {
        this.deleted = deleted;
        return this;
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

    public Car deleteDate(ZonedDateTime deleteDate) {
        this.deleteDate = deleteDate;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Car person(Person person) {
        this.person = person;
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Car car = (Car) o;
        if (car.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), car.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Car{" +
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
}
