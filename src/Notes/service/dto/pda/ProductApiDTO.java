package ir.donyapardaz.niopdc.base.service.dto.pda;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Product entity.
 */
public class ProductApiDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 6, max = 6)
    private String code;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    private Boolean hasContainer;

    private ProductGroupApiDTO productGroup;

    private ProductUnitApiDTO productUnit;

    private ContainerApiDTO container;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isHasContainer() {
        return hasContainer;
    }

    public void setHasContainer(Boolean hasContainer) {
        this.hasContainer = hasContainer;
    }

    public Boolean getHasContainer() {
        return hasContainer;
    }

    public ProductGroupApiDTO getProductGroup() {
        return productGroup;
    }

    public void setProductGroup(ProductGroupApiDTO productGroup) {
        this.productGroup = productGroup;
    }

    public ProductUnitApiDTO getProductUnit() {
        return productUnit;
    }

    public void setProductUnit(ProductUnitApiDTO productUnit) {
        this.productUnit = productUnit;
    }

    public ContainerApiDTO getContainer() {
        return container;
    }

    public void setContainer(ContainerApiDTO container) {
        this.container = container;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductApiDTO productDTO = (ProductApiDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", title='" + getTitle() + "'" +
            ", hasContainer='" + isHasContainer() + "'" +
            "}";
    }
}
