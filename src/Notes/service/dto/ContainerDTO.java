package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Container entity.
 */
public class ContainerDTO extends AbstractAuditingDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    private String code;

    @NotNull
    private Integer capacity;

    private Long productUnitId;

    private String productUnitTitle;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Long getProductUnitId() {
        return productUnitId;
    }

    public void setProductUnitId(Long productUnitId) {
        this.productUnitId = productUnitId;
    }

    public String getProductUnitTitle() {
        return productUnitTitle;
    }

    public void setProductUnitTitle(String productUnitTitle) {
        this.productUnitTitle = productUnitTitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContainerDTO containerDTO = (ContainerDTO) o;
        if(containerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), containerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContainerDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", capacity=" + getCapacity() +
            "}";
    }
}
