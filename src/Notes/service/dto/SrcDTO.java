package ir.donyapardaz.niopdc.base.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Src entity.
 */
public class SrcDTO implements Serializable {

    private Long id;

    @NotNull
    private String src;

    private Boolean active;

    private Long productId;

    private String productTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
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

        SrcDTO srcDTO = (SrcDTO) o;
        if (srcDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), srcDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SrcDTO{" +
            "id=" + getId() +
            ", src='" + getSrc() + "'" +
            ", active='" + isActive() + "'" +
            ", product=" + getProductId() +
            ", product='" + getProductTitle() + "'" +
            "}";
    }
}
