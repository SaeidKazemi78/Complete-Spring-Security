package ir.donyapardaz.niopdc.base.service.dto;


import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Product entity.
 */
public class ProductListDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 6, max = 6)
    private String code;

    @NotNull
    @Size(min = 3, max = 42)
    private String title;

    private Boolean hasContainer;

    private Boolean calculateContainerPrice;

    private Long productGroupId;
    private String productGroupTitle;

    private Long productUnitId;
    private String productUnitTitle;

    private String productColor;

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

    public Boolean isCalculateContainerPrice() {
        return calculateContainerPrice;
    }

    public void setCalculateContainerPrice(Boolean calculateContainerPrice) {
        this.calculateContainerPrice = calculateContainerPrice;
    }

    public Long getProductGroupId() {
        return productGroupId;
    }

    public void setProductGroupId(Long productGroupId) {
        this.productGroupId = productGroupId;
    }

    public Long getProductUnitId() {
        return productUnitId;
    }

    public void setProductUnitId(Long productUnitId) {
        this.productUnitId = productUnitId;
    }

    public String getProductColor() {
        return productColor;
    }

    public void setProductColor(String productColor) {
        this.productColor = productColor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductListDTO productDTO = (ProductListDTO) o;
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
            ", calculateContainerPrice='" + isCalculateContainerPrice() + "'" +
            "}";
    }

    public String getProductGroupTitle() {
        return productGroupTitle;
    }

    public void setProductGroupTitle(String productGroupTitle) {
        this.productGroupTitle = productGroupTitle;
    }

    public String getProductUnitTitle() {
        return productUnitTitle;
    }

    public void setProductUnitTitle(String productUnitTitle) {
        this.productUnitTitle = productUnitTitle;
    }

}
