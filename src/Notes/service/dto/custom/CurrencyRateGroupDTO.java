package ir.donyapardaz.niopdc.base.service.dto.custom;


import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the CurrencyRateGroup entity.
 */
public class CurrencyRateGroupDTO implements Serializable {

    private Long id;

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

        CurrencyRateGroupDTO currencyRateGroupDTO = (CurrencyRateGroupDTO) o;
        if (currencyRateGroupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currencyRateGroupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CurrencyRateGroupDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            "}";
    }
}
