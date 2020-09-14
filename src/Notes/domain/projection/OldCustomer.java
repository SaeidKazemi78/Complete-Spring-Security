package ir.donyapardaz.niopdc.base.domain.projection;


import ir.donyapardaz.niopdc.base.domain.AbstractAuditingEntity;
import org.hibernate.envers.Audited;

import javax.persistence.*;


@Entity
@Table(catalog = "niopdc_old_sell", schema = "dbo", name = "old_customer")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Audited
public class OldCustomer extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private double id;
    private String code;
    private String customerName;
    private double fCustomerTypeId;
    private double fCustomerStatusId;
    private double fBuyTypeId;
    private double fPersonId;
    private String hamlCode;
    private double fLocationId;
    private String etebarAccountNo;
    private String isOutCity;
    private String phone;
    private String address;
    private String registerNo;
    private double fLocationIdNahieh;
    private String hasTransport;
    private String hasAggrement;
    private String safPassword;
    private String safOrderNo;
    private String oldCode;
    private double fUserid;
    private String postCode;
    private double fCustomerMasraftypeid;
    private String sabtDate;
    private String mellatPayerId;
    private String sabtno;
    private String parvanehno;
    private double fCountryDivitionId;
    private String ischangeabilityBuytype;
    private java.sql.Timestamp autostamp;
    private String bankpayerid;
    private String isHard;
    private String isOneToMany;
    private String codeMeli;
    private String codeEghtesadi;
    private String shenaseMeli;
    private String isReal;
    private double fNationalityId;
    private double fOrganizationTypeId;
    private String isHavalehBaje;
    private double fParentId;
    private double gsId;
    private double maliatStatus;
    private double fCustomerBrandId;
    private String nahieh;


    public double getId() {
        return id;
    }

    public void setId(double id) {
        this.id = id;
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


    public double getFCustomerTypeId() {
        return fCustomerTypeId;
    }

    public void setFCustomerTypeId(double fCustomerTypeId) {
        this.fCustomerTypeId = fCustomerTypeId;
    }


    public double getFCustomerStatusId() {
        return fCustomerStatusId;
    }

    public void setFCustomerStatusId(double fCustomerStatusId) {
        this.fCustomerStatusId = fCustomerStatusId;
    }


    public double getFBuyTypeId() {
        return fBuyTypeId;
    }

    public void setFBuyTypeId(double fBuyTypeId) {
        this.fBuyTypeId = fBuyTypeId;
    }


    public double getFPersonId() {
        return fPersonId;
    }

    public void setFPersonId(double fPersonId) {
        this.fPersonId = fPersonId;
    }


    public String getHamlCode() {
        return hamlCode;
    }

    public void setHamlCode(String hamlCode) {
        this.hamlCode = hamlCode;
    }


    public double getFLocationId() {
        return fLocationId;
    }

    public void setFLocationId(double fLocationId) {
        this.fLocationId = fLocationId;
    }


    public String getEtebarAccountNo() {
        return etebarAccountNo;
    }

    public void setEtebarAccountNo(String etebarAccountNo) {
        this.etebarAccountNo = etebarAccountNo;
    }


    public String getIsOutCity() {
        return isOutCity;
    }

    public void setIsOutCity(String isOutCity) {
        this.isOutCity = isOutCity;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getRegisterNo() {
        return registerNo;
    }

    public void setRegisterNo(String registerNo) {
        this.registerNo = registerNo;
    }


    public double getFLocationIdNahieh() {
        return fLocationIdNahieh;
    }

    public void setFLocationIdNahieh(double fLocationIdNahieh) {
        this.fLocationIdNahieh = fLocationIdNahieh;
    }


    public String getHasTransport() {
        return hasTransport;
    }

    public void setHasTransport(String hasTransport) {
        this.hasTransport = hasTransport;
    }


    public String getHasAggrement() {
        return hasAggrement;
    }

    public void setHasAggrement(String hasAggrement) {
        this.hasAggrement = hasAggrement;
    }


    public String getSafPassword() {
        return safPassword;
    }

    public void setSafPassword(String safPassword) {
        this.safPassword = safPassword;
    }


    public String getSafOrderNo() {
        return safOrderNo;
    }

    public void setSafOrderNo(String safOrderNo) {
        this.safOrderNo = safOrderNo;
    }


    public String getOldCode() {
        return oldCode;
    }

    public void setOldCode(String oldCode) {
        this.oldCode = oldCode;
    }


    public double getFUserid() {
        return fUserid;
    }

    public void setFUserid(double fUserid) {
        this.fUserid = fUserid;
    }


    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }


    public double getFCustomerMasraftypeid() {
        return fCustomerMasraftypeid;
    }

    public void setFCustomerMasraftypeid(double fCustomerMasraftypeid) {
        this.fCustomerMasraftypeid = fCustomerMasraftypeid;
    }


    public String getSabtDate() {
        return sabtDate;
    }

    public void setSabtDate(String sabtDate) {
        this.sabtDate = sabtDate;
    }


    public String getMellatPayerId() {
        return mellatPayerId;
    }

    public void setMellatPayerId(String mellatPayerId) {
        this.mellatPayerId = mellatPayerId;
    }


    public String getSabtno() {
        return sabtno;
    }

    public void setSabtno(String sabtno) {
        this.sabtno = sabtno;
    }


    public String getParvanehno() {
        return parvanehno;
    }

    public void setParvanehno(String parvanehno) {
        this.parvanehno = parvanehno;
    }


    public double getFCountryDivitionId() {
        return fCountryDivitionId;
    }

    public void setFCountryDivitionId(double fCountryDivitionId) {
        this.fCountryDivitionId = fCountryDivitionId;
    }


    public String getIschangeabilityBuytype() {
        return ischangeabilityBuytype;
    }

    public void setIschangeabilityBuytype(String ischangeabilityBuytype) {
        this.ischangeabilityBuytype = ischangeabilityBuytype;
    }


    public java.sql.Timestamp getAutostamp() {
        return autostamp;
    }

    public void setAutostamp(java.sql.Timestamp autostamp) {
        this.autostamp = autostamp;
    }


    public String getBankpayerid() {
        return bankpayerid;
    }

    public void setBankpayerid(String bankpayerid) {
        this.bankpayerid = bankpayerid;
    }


    public String getIsHard() {
        return isHard;
    }

    public void setIsHard(String isHard) {
        this.isHard = isHard;
    }


    public String getIsOneToMany() {
        return isOneToMany;
    }

    public void setIsOneToMany(String isOneToMany) {
        this.isOneToMany = isOneToMany;
    }


    public String getCodeMeli() {
        return codeMeli;
    }

    public void setCodeMeli(String codeMeli) {
        this.codeMeli = codeMeli;
    }


    public String getCodeEghtesadi() {
        return codeEghtesadi;
    }

    public void setCodeEghtesadi(String codeEghtesadi) {
        this.codeEghtesadi = codeEghtesadi;
    }


    public String getShenaseMeli() {
        return shenaseMeli;
    }

    public void setShenaseMeli(String shenaseMeli) {
        this.shenaseMeli = shenaseMeli;
    }


    public String getIsReal() {
        return isReal;
    }

    public void setIsReal(String isReal) {
        this.isReal = isReal;
    }


    public double getFNationalityId() {
        return fNationalityId;
    }

    public void setFNationalityId(double fNationalityId) {
        this.fNationalityId = fNationalityId;
    }


    public double getFOrganizationTypeId() {
        return fOrganizationTypeId;
    }

    public void setFOrganizationTypeId(double fOrganizationTypeId) {
        this.fOrganizationTypeId = fOrganizationTypeId;
    }


    public String getIsHavalehBaje() {
        return isHavalehBaje;
    }

    public void setIsHavalehBaje(String isHavalehBaje) {
        this.isHavalehBaje = isHavalehBaje;
    }


    public double getFParentId() {
        return fParentId;
    }

    public void setFParentId(double fParentId) {
        this.fParentId = fParentId;
    }


    public double getGsId() {
        return gsId;
    }

    public void setGsId(double gsId) {
        this.gsId = gsId;
    }


    public double getMaliatStatus() {
        return maliatStatus;
    }

    public void setMaliatStatus(double maliatStatus) {
        this.maliatStatus = maliatStatus;
    }


    public double getFCustomerBrandId() {
        return fCustomerBrandId;
    }

    public void setFCustomerBrandId(double fCustomerBrandId) {
        this.fCustomerBrandId = fCustomerBrandId;
    }


    public String getNahieh() {
        return nahieh;
    }

    public void setNahieh(String nahieh) {
        this.nahieh = nahieh;
    }

}
