package ir.donyapardaz.niopdc.base.service.dto.custom;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the BankTransactionRef entity.
 */
public class BankTransactionRefDTO implements Serializable {

    private Long id;

    private Long orderId;

    private Long personId;

    private Long customerId;

    private Double amount;

    private Long bankTransactionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getBankTransactionId() {
        return bankTransactionId;
    }

    public void setBankTransactionId(Long bankTransactionId) {
        this.bankTransactionId = bankTransactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankTransactionRefDTO bankTransactionRefDTO = (BankTransactionRefDTO) o;
        if(bankTransactionRefDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankTransactionRefDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankTransactionRefDTO{" +
            "id=" + getId() +
            ", orderId=" + getOrderId() +
            ", personId=" + getPersonId() +
            ", customerId=" + getCustomerId() +
            ", amount=" + getAmount() +
            "}";
    }
}
