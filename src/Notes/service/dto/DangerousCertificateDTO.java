package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfDangerousCertificateCard;

/**
 * A DTO for the DangerousCertificate entity.
 */
public class DangerousCertificateDTO implements Serializable {

    private Long id;

    private String cardNumber;

    private ZonedDateTime cardExpireDate;

    private TypeOfDangerousCertificateCard type;

    private Long driverId;

    private Long depotId;

    private String depotName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public ZonedDateTime getCardExpireDate() {
        return cardExpireDate;
    }

    public void setCardExpireDate(ZonedDateTime cardExpireDate) {
        this.cardExpireDate = cardExpireDate;
    }

    public TypeOfDangerousCertificateCard getType() {
        return type;
    }

    public void setType(TypeOfDangerousCertificateCard type) {
        this.type = type;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }

    public Long getDepotId() {
        return depotId;
    }

    public void setDepotId(Long depotId) {
        this.depotId = depotId;
    }

    public String getDepotName() {
        return depotName;
    }

    public void setDepotName(String depotName) {
        this.depotName = depotName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DangerousCertificateDTO dangerousCertificateDTO = (DangerousCertificateDTO) o;
        if(dangerousCertificateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dangerousCertificateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DangerousCertificateDTO{" +
            "id=" + getId() +
            ", cardNumber='" + getCardNumber() + "'" +
            ", cardExpireDate='" + getCardExpireDate() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
