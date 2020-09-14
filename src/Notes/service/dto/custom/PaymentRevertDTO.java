package ir.donyapardaz.niopdc.base.service.dto.custom;


import java.io.Serializable;

/**
 * A DTO for the Payment entity.
 */
public class PaymentRevertDTO implements Serializable {

    private Long id;
    private Double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

}
