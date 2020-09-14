package ir.donyapardaz.niopdc.base.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;
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
 * A Depot.
 */
@Entity
@Table(name = "depot")
@Audited
public class Depot extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 42)
    @Column(name = "title", length = 42, nullable = false, unique = true, columnDefinition = "nvarchar(42)")
    private String title;

    @NotNull
    @Size(min = 4, max = 4)
    @Column(name = "code", length = 4, nullable = false, unique = true)
    private String code;

    @Size(min = 4, max = 4)
    @Column(name = "acc_code", length = 4)
    private String accCode;


    @Size(min = 4, max = 256)
    @Column(name = "web_service_url", length = 256)
    private String webServiceUrl;

    @Column(name = "refuel_center_id")
    private Long refuelCenterId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "depot_type", nullable = false)
    private DepotType depotType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @ShallowReference
    private Location location;

    @ManyToMany
    @JoinTable(name = "depot_product",
        joinColumns = @JoinColumn(name = "depots_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "products_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();


    @ManyToMany
    @JoinTable(name = "location_depot",
        joinColumns = @JoinColumn(name = "depots_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "locations_id", referencedColumnName = "id"))
    private Set<Location> locations = new HashSet<>();

    @ManyToMany(mappedBy = "depots")
    @JsonIgnore
    @DiffIgnore
    private Set<SellContractProduct> sellContractProducts = new HashSet<>();

    @Column(name = "counter_path")
    private String counterPath;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Transient
    public boolean isNew() {
        return null == this.getId();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Depot title(String title) {
        this.title = title;
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Depot code(String code) {
        this.code = code;
        return this;
    }

    public String getAccCode() {
        return accCode;
    }

    public void setAccCode(String accCode) {
        this.accCode = accCode;
    }

    public Depot accCode(String accCode) {
        this.accCode = accCode;
        return this;
    }

    public Long getRefuelCenterId() {
        return refuelCenterId;
    }

    public void setRefuelCenterId(Long refuelCenterId) {
        this.refuelCenterId = refuelCenterId;
    }

    public Depot refuelCenterId(Long refuelCenterId) {
        this.refuelCenterId = refuelCenterId;
        return this;
    }

    public DepotType getDepotType() {
        return depotType;
    }

    public void setDepotType(DepotType depotType) {
        this.depotType = depotType;
    }

    public Depot depotType(DepotType depotType) {
        this.depotType = depotType;
        return this;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Depot location(Location location) {
        this.location = location;
        return this;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Depot products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Depot addProduct(Product product) {
        this.products.add(product);
        return this;
    }

    public Depot removeProduct(Product product) {
        this.products.remove(product);
        return this;
    }

    public Set<Location> getLocations() {
        return locations;
    }

    public void setLocations(Set<Location> locations) {
        this.locations = locations;
    }

    public Depot locations(Set<Location> locations) {
        this.locations = locations;
        return this;
    }

    public Depot addLocation(Location location) {
        this.locations.add(location);
        location.getDepots().add(this);
        return this;
    }

    public Depot removeLocation(Location location) {
        this.locations.remove(location);
        location.getDepots().remove(this);
        return this;
    }

    public Set<SellContractProduct> getSellContractProducts() {
        return sellContractProducts;
    }

    public void setSellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
    }

    public Depot sellContractProducts(Set<SellContractProduct> sellContractProducts) {
        this.sellContractProducts = sellContractProducts;
        return this;
    }

    public Depot addSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.add(sellContractProduct);
        sellContractProduct.getDepots().add(this);
        return this;
    }

    public Depot removeSellContractProduct(SellContractProduct sellContractProduct) {
        this.sellContractProducts.remove(sellContractProduct);
        sellContractProduct.getDepots().remove(this);
        return this;
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
        Depot depot = (Depot) o;
        if (depot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), depot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Depot{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", code='" + getCode() + "'" +
            ", accCode='" + getAccCode() + "'" +
            ", refuelCenterId=" + getRefuelCenterId() +
            ", depotType='" + getDepotType() + "'" +
            "}";
    }

    public String getCounterPath() {
        return counterPath;
    }

    public void setCounterPath(String counterPath) {
        this.counterPath = counterPath;
    }

    public String getWebServiceUrl() {
        return webServiceUrl;
    }

    public void setWebServiceUrl(String webServiceUrl) {
        this.webServiceUrl = webServiceUrl;
    }
}
