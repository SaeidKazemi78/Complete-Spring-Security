package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;
import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "customer_credit_product_ta")
public class CustomerCreditProductTa extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String productCode; // addad
    private String requestNumber; // addad


    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private CustomerCreditTa customerCreditTa;

    @OneToMany(mappedBy = "customerCreditRateTa", cascade = CascadeType.ALL)
    private List<CustomerCreditProductRateTa> productRates = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public CustomerCreditTa getCustomerCreditTa() {
        return customerCreditTa;
    }

    public void setCustomerCreditTa(CustomerCreditTa customerCreditTa) {
        this.customerCreditTa = customerCreditTa;
    }

    public List<CustomerCreditProductRateTa> getProductRates() {
        return productRates;
    }

    public void setProductRates(List<CustomerCreditProductRateTa> productRates) {
        this.productRates = productRates;
    }
}
