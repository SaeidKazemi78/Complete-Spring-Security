package ir.donyapardaz.niopdc.base.service.dto.pda;


import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeEffect;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the BuyType entity.
 */
public class BuyTypeApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BuyTypeApiDTO buyTypeDTO = (BuyTypeApiDTO) o;
        if(buyTypeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), buyTypeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BuyTypeDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
