package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the BoundaryTag entity.
 */
public class BoundaryTagDTO implements Serializable {

    private Long id;

    @NotNull
    private Long amount;
    private Long currentAmount;


    @NotNull
    private Double buyPrice;

    private ZonedDateTime buyDate;

    private Long locationId;

    private String locationName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Double getBuyPrice() {
        return buyPrice;
    }

    public void setBuyPrice(Double buyPrice) {
        this.buyPrice = buyPrice;
    }

    public ZonedDateTime getBuyDate() {
        return buyDate;
    }

    public void setBuyDate(ZonedDateTime buyDate) {
        this.buyDate = buyDate;
    }

    public Long getLocationId() {
        return locationId;
    }

    public void setLocationId(Long locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BoundaryTagDTO boundaryTagDTO = (BoundaryTagDTO) o;
        if (boundaryTagDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), boundaryTagDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BoundaryTagDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", buyPrice=" + getBuyPrice() +
            ", buyDate='" + getBuyDate() + "'" +
            "}";
    }

    public Long getCurrentAmount() {
        return currentAmount;
    }

    public void setCurrentAmount(Long currentAmount) {
        this.currentAmount = currentAmount;
    }
}
