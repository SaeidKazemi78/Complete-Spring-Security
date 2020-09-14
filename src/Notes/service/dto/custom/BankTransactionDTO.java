package ir.donyapardaz.niopdc.base.service.dto.custom;



import ir.donyapardaz.niopdc.base.domain.enumeration.BankTransactionState;
import ir.donyapardaz.niopdc.base.domain.enumeration.SpentType;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.Set;


/**
 * A DTO for the BankTransaction entity.
 */
public class BankTransactionDTO implements Serializable {

    private Long id;

    private String identifier;

    private String username;

    private ZonedDateTime requestDate;

    private BankTransactionState bankTransactionState;

    private SpentType type;

    private String responseBody;

    private ZonedDateTime responseDate;

    private String error;

    private String redirectUrl;

    private Set<BankTransactionRefDTO> bankTransactionRefs;

    private Double amount;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ZonedDateTime getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(ZonedDateTime requestDate) {
        this.requestDate = requestDate;
    }

    public BankTransactionState getBankTransactionState() {
        return bankTransactionState;
    }

    public void setBankTransactionState(BankTransactionState bankTransactionState) {
        this.bankTransactionState = bankTransactionState;
    }

    public SpentType getType() {
        return type;
    }

    public void setType(SpentType type) {
        this.type = type;
    }

    public String getResponseBody() {
        return responseBody;
    }

    public void setResponseBody(String responseBody) {
        this.responseBody = responseBody;
    }

    public ZonedDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(ZonedDateTime responseDate) {
        this.responseDate = responseDate;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        if (error != null && error.length() > 1000)
            error = error.substring(0, 1000);

        this.error = error;
    }

    public String getRedirectUrl() {
        return redirectUrl;
    }

    public void setRedirectUrl(String redirectUrl) {
        this.redirectUrl = redirectUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BankTransactionDTO bankTransactionDTO = (BankTransactionDTO) o;
        if(bankTransactionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bankTransactionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BankTransactionDTO{" +
            "id=" + getId() +
            ", identifier='" + getIdentifier() + "'" +
            ", username='" + getUsername() + "'" +
            ", requestDate='" + getRequestDate() + "'" +
            ", bankTransactionState='" + getBankTransactionState() + "'" +
            ", type='" + getType() + "'" +
            ", responseBody='" + getResponseBody() + "'" +
            ", responseDate='" + getResponseDate() + "'" +
            ", error='" + getError() + "'" +
            "}";
    }


    public Set<BankTransactionRefDTO> getBankTransactionRefs() {
        return bankTransactionRefs;
    }

    public void setBankTransactionRefs(Set<BankTransactionRefDTO> bankTransactionRefs) {
        this.bankTransactionRefs = bankTransactionRefs;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Double getAmount() {
        return amount;
    }
}
