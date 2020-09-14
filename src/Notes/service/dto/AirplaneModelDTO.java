package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AirplaneModel entity.
 */
public class AirplaneModelDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Long capacity;

    private Long productId;

    private String productTitle;

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

    public Long getCapacity() {
        return capacity;
    }

    public void setCapacity(Long capacity) {
        this.capacity = capacity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AirplaneModelDTO airplaneModelDTO = (AirplaneModelDTO) o;
        if(airplaneModelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airplaneModelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AirplaneModelDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", capacity=" + getCapacity() +
            "}";
    }
}
