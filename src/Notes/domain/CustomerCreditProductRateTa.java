package ir.donyapardaz.niopdc.base.domain;

import org.javers.core.metamodel.annotation.ShallowReference;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "customer_credit_product_rate_ta")
public class CustomerCreditProductRateTa extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private String fromDate;
    private String isTarh; // 0
    private String karbordID; //
    private String productCode; // addad
    private String productRateType; // 1 : yaranei,2 : ghare yaranei
    private String toDate;
    private String useTypeCode; // noe masraf


    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private CustomerCreditProductTa customerCreditRateTa;

    @ManyToOne(fetch = FetchType.LAZY)
    @ShallowReference
    private SellContractProduct product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getFromDate() {
        return fromDate;
    }

    public void setFromDate(String fromDate) {
        this.fromDate = fromDate;
    }

    public String getIsTarh() {
        return isTarh;
    }

    public void setIsTarh(String isTarh) {
        this.isTarh = isTarh;
    }

    public String getKarbordID() {
        return karbordID;
    }

    public void setKarbordID(String karbordID) {
        this.karbordID = karbordID;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductRateType() {
        return productRateType;
    }

    public void setProductRateType(String productRateType) {
        this.productRateType = productRateType;
    }

    public String getToDate() {
        return toDate;
    }

    public void setToDate(String toDate) {
        this.toDate = toDate;
    }

    public String getUseTypeCode() {
        return useTypeCode;
    }

    public void setUseTypeCode(String useTypeCode) {
        this.useTypeCode = useTypeCode;
    }

    public SellContractProduct getProduct() {
        return product;
    }

    public void setProduct(SellContractProduct product) {
        this.product = product;
    }

    public CustomerCreditProductTa getCustomerCreditRateTa() {
        return customerCreditRateTa;
    }

    public void setCustomerCreditRateTa(CustomerCreditProductTa customerCreditRateTa) {
        this.customerCreditRateTa = customerCreditRateTa;
    }
}
