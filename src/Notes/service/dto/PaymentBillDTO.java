package ir.donyapardaz.niopdc.base.service.dto;




import ir.donyapardaz.niopdc.base.domain.enumeration.SpentType;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A DTO for the PaymentBill entity.
 */
public class PaymentBillDTO implements Serializable {

    private Long id;

    @NotNull
    private ZonedDateTime spentDate;

    private Double amount;

    private Long customerId;

    private Long personId;

    private SpentType type;

    private Long billId;

    private Long paymentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getSpentDate() {
        return spentDate;
    }

    public void setSpentDate(ZonedDateTime spentDate) {
        this.spentDate = spentDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public SpentType getType() {
        return type;
    }

    public void setType(SpentType type) {
        this.type = type;
    }

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentBillDTO paymentBillDTO = (PaymentBillDTO) o;
        if(paymentBillDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentBillDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentBillDTO{" +
            "id=" + getId() +
            ", spentDate='" + getSpentDate() + "'" +
            ", amount=" + getAmount() +
            ", customerId=" + getCustomerId() +
            ", personId=" + getPersonId() +
            ", type='" + getType() + "'" +
            ", billId=" + getBillId() +
            "}";
    }
}
