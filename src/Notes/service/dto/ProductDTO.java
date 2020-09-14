package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

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

    private Long containerId;
    private String containerTitle;

    private String productColor;


    private Set<CustomerGroup> customerGroups = new HashSet<>();

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

    public Long getContainerId() {
        return containerId;
    }

    public void setContainerId(Long containerId) {
        this.containerId = containerId;
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

        ProductDTO productDTO = (ProductDTO) o;
        if (productDTO.getId() == null || getId() == null) {
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
            ", productGroup=" + getProductGroupId() +
            ", productUnit=" + getProductUnitId() +
            ", container=" + getContainerId() +
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

    public String getContainerTitle() {
        return containerTitle;
    }

    public void setContainerTitle(String containerTitle) {
        this.containerTitle = containerTitle;
    }

    public Set<CustomerGroup> getCustomerGroups() {
        return customerGroups;
    }

    public void setCustomerGroups(Set<CustomerGroup> customerGroups) {
        this.customerGroups = customerGroups;
    }
}
