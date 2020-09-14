package ir.donyapardaz.niopdc.base.domain;

import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cmr_log")
@Audited
public class CmrLog  extends AbstractAuditingEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "cmr",length = 20,nullable = false)
    private String cmr;
    @Column(name="destination_country_code")
    private Long destinationCountryCode;
    @ElementCollection
    private Set<Long> sourceCountryCodes  = new HashSet<>();
    @ElementCollection
    private Set<Long> destinationCountryCodes  = new HashSet<>();
    @Column(name ="location_rmto_code")
    private Long locationRmtoCode;
    @Column(name ="iranian")
    private Boolean iranian;
    @Column(name ="transit_no")
    private String transitNo;
    @Column(name ="truck_no")
    private String truckNo;
    @Column(name ="customer_id")
    private Long customerId;
    @Column(name ="order_location_id")
    private Long orderLocationId;
    @Column(name ="discount_amount")
    private Long  discountAmount;
    @Column(name ="discount_id")
    private Long  discountId;
    @Column(name ="exception",length = 100)
    private String exception;
    @Column(name="issue_date")
    private Instant issueDate;

    @Column(name="driver_first_name",length = 50)
    private String driverFirstName;
    @Column(name="driver_last_name",length = 50)
    private String driverLastName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getCmr() {
        return cmr;
    }

    public void setCmr(String cmr) {
        this.cmr = cmr;
    }

    public Set<Long> getSourceCountryCodes() {
        return sourceCountryCodes;
    }

    public void setSourceCountryCodes(Set<Long> sourceCountryCodes) {
        this.sourceCountryCodes = sourceCountryCodes;
    }

    public Set<Long> getDestinationCountryCodes() {
        return destinationCountryCodes;
    }

    public void setDestinationCountryCodes(Set<Long> destinationCountryCodes) {
        this.destinationCountryCodes = destinationCountryCodes;
    }

    public Long getLocationRmtoCode() {
        return locationRmtoCode;
    }

    public void setLocationRmtoCode(Long locationRmtoCode) {
        this.locationRmtoCode = locationRmtoCode;
    }

    public Boolean getIranian() {
        return iranian;
    }

    public void setIranian(Boolean iranian) {
        this.iranian = iranian;
    }

    public String getTransitNo() {
        return transitNo;
    }

    public void setTransitNo(String transitNo) {
        this.transitNo = transitNo;
    }

    public String getTruckNo() {
        return truckNo;
    }

    public void setTruckNo(String truckNo) {
        this.truckNo = truckNo;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getOrderLocationId() {
        return orderLocationId;
    }

    public void setOrderLocationId(Long orderLocationId) {
        this.orderLocationId = orderLocationId;
    }

    public Long getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Long discountAmount) {
        this.discountAmount = discountAmount;
    }

    public String getException() {
        return exception;
    }

    public void setException(String exception) {
        this.exception = exception;
    }

    public Long getDiscountId() {
        return discountId;
    }

    public void setDiscountId(Long discountId) {
        this.discountId = discountId;
    }

    public Long getDestinationCountryCode() {
        return destinationCountryCode;
    }

    public void setDestinationCountryCode(Long destinationCountryCode) {
        this.destinationCountryCode = destinationCountryCode;
    }

    public Instant getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(Instant issueDate) {
        this.issueDate = issueDate;
    }

    public String getDriverFirstName() {
        return driverFirstName;
    }

    public void setDriverFirstName(String driverFirstName) {
        this.driverFirstName = driverFirstName;
    }

    public String getDriverLastName() {
        return driverLastName;
    }

    public void setDriverLastName(String driverLastName) {
        this.driverLastName = driverLastName;
    }
}
