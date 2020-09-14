//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2018.10.28 at 03:52:28 PM IRST 
//


package ir.donyapardaz.niopdc.base.service.dto;


/**
 * <p>Java class for addCustomer complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="addCustomer"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="customerCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="customerType" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="masrafType" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="statusType" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="MType" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="oldCode" type="{http://www.w3.org/2001/XMLSchema}int"/&gt;
 *         &lt;element name="customerName" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="address" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="economicCode" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *         &lt;element name="Pass" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
public class SpecifyRateDTO {

    private String customerCode;
    private int customerType;
    private int masrafType;
    private int statusType;
    private int mType;
    private int oldCode;
    private String customerName;
    private String address;
    private String economicCode;

    /**
     * Gets the value of the customerCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerCode() {
        return customerCode;
    }

    /**
     * Sets the value of the customerCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerCode(String value) {
        this.customerCode = value;
    }

    /**
     * Gets the value of the customerType property.
     * 
     */
    public int getCustomerType() {
        return customerType;
    }

    /**
     * Sets the value of the customerType property.
     * 
     */
    public void setCustomerType(int value) {
        this.customerType = value;
    }

    /**
     * Gets the value of the masrafType property.
     * 
     */
    public int getMasrafType() {
        return masrafType;
    }

    /**
     * Sets the value of the masrafType property.
     * 
     */
    public void setMasrafType(int value) {
        this.masrafType = value;
    }

    /**
     * Gets the value of the statusType property.
     * 
     */
    public int getStatusType() {
        return statusType;
    }

    /**
     * Sets the value of the statusType property.
     * 
     */
    public void setStatusType(int value) {
        this.statusType = value;
    }

    /**
     * Gets the value of the mType property.
     * 
     */
    public int getMType() {
        return mType;
    }

    /**
     * Sets the value of the mType property.
     * 
     */
    public void setMType(int value) {
        this.mType = value;
    }

    /**
     * Gets the value of the oldCode property.
     * 
     */
    public int getOldCode() {
        return oldCode;
    }

    /**
     * Sets the value of the oldCode property.
     * 
     */
    public void setOldCode(int value) {
        this.oldCode = value;
    }

    /**
     * Gets the value of the customerName property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getCustomerName() {
        return customerName;
    }

    /**
     * Sets the value of the customerName property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setCustomerName(String value) {
        this.customerName = value;
    }

    /**
     * Gets the value of the address property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets the value of the address property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setAddress(String value) {
        this.address = value;
    }

    /**
     * Gets the value of the economicCode property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getEconomicCode() {
        return economicCode;
    }

    /**
     * Sets the value of the economicCode property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setEconomicCode(String value) {
        this.economicCode = value;
    }

}