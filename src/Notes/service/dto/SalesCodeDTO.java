package ir.donyapardaz.niopdc.base.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SalesCode entity.
 */
public class SalesCodeDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    private String code;

    private ZonedDateTime receivedDate;

    private Long personId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public ZonedDateTime getReceivedDate() {
        return receivedDate;
    }

    public void setReceivedDate(ZonedDateTime receivedDate) {
        this.receivedDate = receivedDate;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SalesCodeDTO salesCodeDTO = (SalesCodeDTO) o;
        if(salesCodeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesCodeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesCodeDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", receivedDate='" + getReceivedDate() + "'" +
            "}";
    }
}
