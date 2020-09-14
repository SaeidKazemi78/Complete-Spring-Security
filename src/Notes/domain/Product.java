package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.DiffIgnore;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Audited
public class Product extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 6, max = 6)
    @Column(name = "code", length = 6, nullable = false, unique = true)
    private String code;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false, unique = true, columnDefinition = "nvarchar(42)")
    private String title;

    @Column(name = "has_container")
    private Boolean hasContainer;

    @Column(name = "calculate_container_price")
    private Boolean calculateContainerPrice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private ProductGroup productGroup;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private ProductUnit productUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private Container container;

    @OneToMany(mappedBy = "product")
    @DiffIgnore
    private Set<ProductSrc> productSrcs = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    @DiffIgnore
    private Set<SellContractProduct> sellContractProducts = new HashSet<>();

    @ElementCollection(targetClass = CustomerGroup.class)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<CustomerGroup> customerGroups = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Product code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitle() {
        return title;
    }

    public Product title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isHasContainer() {
        return hasContainer;
    }

    public Product hasContainer(Boolean hasContainer) {
        this.hasContainer = hasContainer;
        return this;
    }

    public void setHasContainer(Boolean hasContainer) {
        this.hasContainer = hasContainer;
    }

    public Boolean isCalculateContainerPrice() {
        return calculateContainerPrice;
    }

    public Product calculateContainerPrice(Boolean calculateContainerPrice) {
        this.calculateContainerPrice = calculateContainerPrice;
        return this;
    }

    public void setCalculateContainerPrice(Boolean calculateContainerPrice) {
        this.calculateContainerPrice = calculateContainerPrice;
    }

    public ProductGroup getProductGroup() {
        return productGroup;
    }

    public Product productGroup(ProductGroup productGroup) {
        this.productGroup = productGroup;
        return this;
    }

    public void setProductGroup(ProductGroup productGroup) {
        this.productGroup = productGroup;
    }

    public ProductUnit getProductUnit() {
        return productUnit;
    }

    public Product productUnit(ProductUnit productUnit) {
        this.productUnit = productUnit;
        return this;
    }

    public void setProductUnit(ProductUnit productUnit) {
        this.productUnit = productUnit;
    }

    public Container getContainer() {
        return container;
    }

    public Product container(Container container) {
        this.container = container;
        return this;
    }

    public void setContainer(Container container) {
        this.container = container;
    }

    public Set<ProductSrc> getProductSrcs() {
        return productSrcs;
    }

    public Product productSrcs(Set<ProductSrc> productSrcs) {
        this.productSrcs = productSrcs;
        return this;
    }

    public Product addProductSrc(ProductSrc productSrc) {
        this.productSrcs.add(productSrc);
        productSrc.setProduct(this);
        return this;
    }

    public Product removeProductSrc(ProductSrc productSrc) {
        this.productSrcs.remove(productSrc);
        productSrc.setProduct(null);
        return this;
    }

    public void setProductSrcs(Set<ProductSrc> productSrcs) {
        this.productSrcs = productSrcs;
    }

    public Set<SellContractProduct> getSellContractProducts() {
        return sellContractProducts;
    }

    public Product sellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
        return this;
    }

    public Product addSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.add(sellContractProduct);
        sellContractProduct.setProduct(this);
        return this;
    }

    public Product removeSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.remove(sellContractProduct);
        sellContractProduct.setProduct(null);
        return this;
    }

    public void setSellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", title='" + getTitle() + "'" +
            ", hasContainer='" + isHasContainer() + "'" +
            ", calculateContainerPrice='" + isCalculateContainerPrice() + "'" +
            "}";
    }

    public Set<CustomerGroup> getCustomerGroups() {
        return customerGroups;
    }

    public void setCustomerGroups(Set<CustomerGroup> customerGroups) {
        this.customerGroups = customerGroups;
    }
}
