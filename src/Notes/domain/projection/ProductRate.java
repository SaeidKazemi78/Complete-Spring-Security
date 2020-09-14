package ir.donyapardaz.niopdc.base.domain.projection;

import ir.donyapardaz.niopdc.base.config.Profiles;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Customer.
 */
@Entity
@Table(catalog = "niopdcrate_" + Profiles.activeProfile, schema = "dbo", name = "productRate")
//@Table(catalog = "niopdcrate_demo",schema = "dbo",name = "productRate")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class ProductRate implements Serializable {
    @Id
    private Long id;
    private Long productId;

    @ManyToOne(fetch = FetchType.LAZY)
    private RateGroup rateGroup;

    private ZonedDateTime finishDate;
    private ZonedDateTime startDate;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public ProductRate setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public ZonedDateTime getFinishDate() {
        return finishDate;
    }

    public ProductRate setFinishDate(ZonedDateTime finishDate) {
        this.finishDate = finishDate;
        return this;
    }

    public RateGroup getRateGroup() {
        return rateGroup;
    }

    public ProductRate setRateGroup(RateGroup rateGroup) {
        this.rateGroup = rateGroup;
        return this;
    }
}
