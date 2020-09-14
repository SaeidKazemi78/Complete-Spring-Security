package ir.donyapardaz.niopdc.base.service.feign.client.dto;

public class AddCustomerDTO {

    private String customerCode;
    private int customerType;
    private int masrafType;
    private int statusType;
    private int mType;
    private int oldCode;
    private String customerName;
    private String address;
    private String economicCode;
    private String pass;

    /**
     * Gets the value of the customerCode property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getCustomerCode() {
        return customerCode;
    }

    /**
     * Sets the value of the customerCode property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setCustomerCode(String value) {
        this.customerCode = value;
    }

    /**
     * Gets the value of the customerType property.
     */
    public int getCustomerType() {
        return customerType;
    }

    /**
     * Sets the value of the customerType property.
     */
    public void setCustomerType(int value) {
        this.customerType = value;
    }

    /**
     * Gets the value of the masrafType property.
     */
    public int getMasrafType() {
        return masrafType;
    }

    /**
     * Sets the value of the masrafType property.
     */
    public void setMasrafType(int value) {
        this.masrafType = value;
    }

    /**
     * Gets the value of the statusType property.
     */
    public int getStatusType() {
        return statusType;
    }

    /**
     * Sets the value of the statusType property.
     */
    public void setStatusType(int value) {
        this.statusType = value;
    }

    /**
     * Gets the value of the mType property.
     */
    public int getMType() {
        return mType;
    }

    /**
     * Sets the value of the mType property.
     */
    public void setMType(int value) {
        this.mType = value;
    }

    /**
     * Gets the value of the oldCode property.
     */
    public int getOldCode() {
        return oldCode;
    }

    /**
     * Sets the value of the oldCode property.
     */
    public void setOldCode(int value) {
        this.oldCode = value;
    }

    /**
     * Gets the value of the customerName property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getCustomerName() {
        return customerName;
    }

    /**
     * Sets the value of the customerName property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setCustomerName(String value) {
        this.customerName = value;
    }

    /**
     * Gets the value of the address property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getAddress() {
        return address;
    }

    /**
     * Sets the value of the address property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setAddress(String value) {
        this.address = value;
    }

    /**
     * Gets the value of the economicCode property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getEconomicCode() {
        return economicCode;
    }

    /**
     * Sets the value of the economicCode property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setEconomicCode(String value) {
        this.economicCode = value;
    }

    /**
     * Gets the value of the pass property.
     *
     * @return possible object is
     * {@link String }
     */
    public String getPass() {
        return pass;
    }

    /**
     * Sets the value of the pass property.
     *
     * @param value allowed object is
     *              {@link String }
     */
    public void setPass(String value) {
        this.pass = value;
    }


    @Override
    public String toString() {
        return "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
            "\t<s:Body>\n" +
            "\t\t<addCustomer \n" +
            "\t\t\t\txmlns=\"http://customer.ta/\" \n" +
            "\t\t\txmlns:i=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
            "\t\t\t<customerCode xmlns=\"\">" + customerCode + "</customerCode>\n" +
            "\t\t\t<customerType xmlns=\"\">" + customerType + "</customerType>\n" +
            "\t\t\t<masrafType xmlns=\"\">" + masrafType + "</masrafType>\n" +
            "\t\t\t<statusType xmlns=\"\">" + statusType + "</statusType>\n" +
            "\t\t\t<MType xmlns=\"\">" + mType + "</MType>\n" +
            "\t\t\t<oldCode xmlns=\"\">" + oldCode + "</oldCode>\n" +
            "\t\t\t<customerName xmlns=\"\">" + customerName + "</customerName>\n" +
            "\t\t\t<address xmlns=\"\">" + address + "</address>\n" +
            "\t\t\t<economicCode xmlns=\"\">" + economicCode + "</economicCode>\n" +
            "\t\t\t<Pass xmlns=\"\">" + pass + "</Pass>\n" +
            "\t\t</addCustomer>\n" +
            "\t</s:Body>\n" +
            "</s:Envelope>";
    }
}
