package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import ir.donyapardaz.niopdc.base.domain.enumeration.Parts;

/**
 * A DTO for the AccountNumberItems entity.
 */
public class AccountNumberItemsDTO implements Serializable {

    private Long id;

    @NotNull
    private Parts part;

    private String content;

    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Parts getPart() {
        return part;
    }

    public void setPart(Parts part) {
        this.part = part;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AccountNumberItemsDTO accountNumberItemsDTO = (AccountNumberItemsDTO) o;
        if(accountNumberItemsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountNumberItemsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountNumberItemsDTO{" +
            "id=" + getId() +
            ", part='" + getPart() + "'" +
            ", content='" + getContent() + "'" +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
