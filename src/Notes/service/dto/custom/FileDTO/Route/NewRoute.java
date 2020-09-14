package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Route;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "NewItem")
@XmlAccessorType(XmlAccessType.FIELD)
public class NewRoute {

    @XmlElement(name = "id")
    private Long id;

    @XmlElement(name = "source_code")
    private String sourceCode;

    @XmlElement(name = "source_TADAcode")
    private String sourceTadaCode;

    @XmlElement(name = "source_name")
    private String sourceName;

    @XmlElement(name = "customer_code")
    private String customerCode;

    @XmlElement(name = "dest_code")
    private String destCode;

    @XmlElement(name = "dest_opCode")
    private String destOpCode;

    @XmlElement(name = "dest_name")
    private String destName;

    @XmlElement(name = "IDCode")
    private String idCode;

    @XmlElement(name = "oldCode")
    private String oldCode;

    @XmlElement(name = "isActive")
    private Boolean isActice;

    @XmlElement(name = "CustomerStatus")
    private Long customerStatus;

    @XmlElement(name = "hamlType")
    private Boolean hamlType;

    @XmlElement(name = "customerType")
    private Long customerType;

    @XmlElement(name = "Rate")
    private Long rate;

    @XmlElement(name = "distance_km")
    private Long distanceKm;

    @XmlElement(name = "description")
    private String description;

    @XmlElement(name = "ExecuteDate")
    private String executeDate;

    @XmlElement(name = "F_PathTypeID")
    private Long fPathTypeId;

    @XmlElement(name = "taCode")
    private String taCode;

    @XmlElement(name = "F_CarTypeID")
    private Long fCarTypeId;

    @XmlElement(name = "code")
    private String code;

    @XmlElement(name = "customer_name")
    private String customerName;

    @XmlElement(name = "address")
    private String address;

    @XmlElement(name = "via")
    private Long via;

    @XmlElement(name = "caption")
    private String caption;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSourceCode() {
        return sourceCode;
    }

    public void setSourceCode(String sourceCode) {
        this.sourceCode = sourceCode;
    }

    public String getSourceTadaCode() {
        return sourceTadaCode;
    }

    public void setSourceTadaCode(String sourceTadaCode) {
        this.sourceTadaCode = sourceTadaCode;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getDestCode() {
        return destCode;
    }

    public void setDestCode(String destCode) {
        this.destCode = destCode;
    }

    public String getDestOpCode() {
        return destOpCode;
    }

    public void setDestOpCode(String destOpCode) {
        this.destOpCode = destOpCode;
    }

    public String getDestName() {
        return destName;
    }

    public void setDestName(String destName) {
        this.destName = destName;
    }

    public String getIdCode() {
        return idCode;
    }

    public void setIdCode(String idCode) {
        this.idCode = idCode;
    }

    public String getOldCode() {
        return oldCode;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }

    public Boolean getActice() {
        return isActice;
    }

    public void setActice(Boolean actice) {
        isActice = actice;
    }

    public Long getCustomerStatus() {
        return customerStatus;
    }

    public void setCustomerStatus(Long customerStatus) {
        this.customerStatus = customerStatus;
    }

    public Boolean getHamlType() {
        return hamlType;
    }

    public void setHamlType(Boolean hamlType) {
        this.hamlType = hamlType;
    }

    public Long getCustomerType() {
        return customerType;
    }

    public void setCustomerType(Long customerType) {
        this.customerType = customerType;
    }

    public Long getRate() {
        return rate;
    }

    public void setRate(Long rate) {
        this.rate = rate;
    }

    public Long getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Long distanceKm) {
        this.distanceKm = distanceKm;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExecuteDate() {
        return executeDate;
    }

    public void setExecuteDate(String executeDate) {
        this.executeDate = executeDate;
    }

    public Long getfPathTypeId() {
        return fPathTypeId;
    }

    public void setfPathTypeId(Long fPathTypeId) {
        this.fPathTypeId = fPathTypeId;
    }

    public String getTaCode() {
        return taCode;
    }

    public void setTaCode(String taCode) {
        this.taCode = taCode;
    }

    public Long getfCarTypeId() {
        return fCarTypeId;
    }

    public void setfCarTypeId(Long fCarTypeId) {
        this.fCarTypeId = fCarTypeId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getVia() {
        return via;
    }

    public void setVia(Long via) {
        this.via = via;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}
