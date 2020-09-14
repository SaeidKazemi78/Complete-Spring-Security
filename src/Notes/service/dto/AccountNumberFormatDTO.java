package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AccountNumberFormat entity.
 */
public class AccountNumberFormatDTO implements Serializable {

    private Long id;

    @NotNull
    private String part1;

    @NotNull
    private String part2;

    @NotNull
    private String part3;

    @NotNull
    private String part4;

    private String title;

    @NotNull
    private String format;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPart1() {
        return part1;
    }

    public void setPart1(String part1) {
        this.part1 = part1;
    }

    public String getPart2() {
        return part2;
    }

    public void setPart2(String part2) {
        this.part2 = part2;
    }

    public String getPart3() {
        return part3;
    }

    public void setPart3(String part3) {
        this.part3 = part3;
    }

    public String getPart4() {
        return part4;
    }

    public void setPart4(String part4) {
        this.part4 = part4;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AccountNumberFormatDTO accountNumberFormatDTO = (AccountNumberFormatDTO) o;
        if(accountNumberFormatDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountNumberFormatDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountNumberFormatDTO{" +
            "id=" + getId() +
            ", part1='" + getPart1() + "'" +
            ", part2='" + getPart2() + "'" +
            ", part3='" + getPart3() + "'" +
            ", part4='" + getPart4() + "'" +
            ", title='" + getTitle() + "'" +
            ", format='" + getFormat() + "'" +
            "}";
    }
}
