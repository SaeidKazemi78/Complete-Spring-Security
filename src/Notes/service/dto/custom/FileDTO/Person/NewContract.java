package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Person;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "NewContract")
@XmlAccessorType(XmlAccessType.FIELD)
public class NewContract {

    @XmlElement(name = "CtcID")
    private Long ctcId;

    @XmlElement(name = "CtcCod")
    private String ctcCode;

    @XmlElement(name = "CtcTit")
    private String ctcTit;

    @XmlElement(name = "CtcNam")
    private String ctcNam;

    @XmlElement(name = "CtcFam")
    private String ctcFam;

    @XmlElement(name = "CtcTypCod")
    private Long ctcTypCod;

    @XmlElement(name = "CtcOpcCod")
    private Long ctcOpcCod;

    @XmlElement(name = "CtcOpcNam")
    private String ctcOpcNam;

    @XmlElement(name = "CtcParTypCod")
    private Long ctcParTypCod;

    @XmlElement(name = "CtcFinCod")
    private String ctcFinCod;

    @XmlElement(name = "CtcFinNam")
    private String ctcFinNam;

    @XmlElement(name = "CtcPhoNo")
    private String ctcPhoNo;

    @XmlElement(name = "CtcMobNo")
    private String ctcMobNo;

    @XmlElement(name = "CtcEcoCod")
    private String ctcEcoCod;

    @XmlElement(name = "CtcNatCod")
    private String ctcNatCod;

    @XmlElement(name = "CtcAdr")
    private String ctcAds;

    @XmlElement(name = "CtcDte")
    private String ctcDte;

    @XmlElement(name = "CtcParNo")
    private String ctcParNo;

    @XmlElement(name = "CtcExpDte")
    private String ctcExpDte;

    @XmlElement(name = "CtcIsBlk")
    private String ctcIsBlk;

    @XmlElement(name = "CtcDirNam")
    private String ctcDirNam;

    @XmlElement(name = "CtcDirFam")
    private String ctcDirFam;


    public Long getCtcId() {
        return ctcId;
    }

    public void setCtcId(Long ctcId) {
        this.ctcId = ctcId;
    }

    public String getCtcCode() {
        return ctcCode;
    }

    public void setCtcCode(String ctcCode) {
        this.ctcCode = ctcCode;
    }

    public String getCtcNam() {
        return ctcNam;
    }

    public void setCtcNam(String ctcNam) {
        this.ctcNam = ctcNam;
    }

    public String getCtcFam() {
        return ctcFam;
    }

    public void setCtcFam(String ctcFam) {
        this.ctcFam = ctcFam;
    }

    public Long getCtcTypCod() {
        return ctcTypCod;
    }

    public void setCtcTypCod(Long ctcTypCod) {
        this.ctcTypCod = ctcTypCod;
    }

    public Long getCtcOpcCod() {
        return ctcOpcCod;
    }

    public void setCtcOpcCod(Long ctcOpcCod) {
        this.ctcOpcCod = ctcOpcCod;
    }

    public String getCtcOpcNam() {
        return ctcOpcNam;
    }

    public void setCtcOpcNam(String ctcOpcNam) {
        this.ctcOpcNam = ctcOpcNam;
    }

    public Long getCtcParTypCod() {
        return ctcParTypCod;
    }

    public void setCtcParTypCod(Long ctcParTypCod) {
        this.ctcParTypCod = ctcParTypCod;
    }

    public String getCtcFinCod() {
        return ctcFinCod;
    }

    public void setCtcFinCod(String ctcFinCod) {
        this.ctcFinCod = ctcFinCod;
    }

    public String getCtcFinNam() {
        return ctcFinNam;
    }

    public void setCtcFinNam(String ctcFinNam) {
        this.ctcFinNam = ctcFinNam;
    }

    public String getCtcPhoNo() {
        return ctcPhoNo;
    }

    public void setCtcPhoNo(String ctcPhoNo) {
        this.ctcPhoNo = ctcPhoNo;
    }

    public String getCtcMobNo() {
        return ctcMobNo;
    }

    public void setCtcMobNo(String ctcMobNo) {
        this.ctcMobNo = ctcMobNo;
    }

    public String getCtcEcoCod() {
        return ctcEcoCod;
    }

    public void setCtcEcoCod(String ctcEcoCod) {
        this.ctcEcoCod = ctcEcoCod;
    }

    public String getCtcNatCod() {
        return ctcNatCod;
    }

    public void setCtcNatCod(String ctcNatCod) {
        this.ctcNatCod = ctcNatCod;
    }

    public String getCtcAds() {
        return ctcAds;
    }

    public void setCtcAds(String ctcAds) {
        this.ctcAds = ctcAds;
    }

    public String getCtcDte() {
        return ctcDte;
    }

    public void setCtcDte(String ctcDte) {
        this.ctcDte = ctcDte;
    }

    public String getCtcParNo() {
        return ctcParNo;
    }

    public void setCtcParNo(String ctcParNo) {
        this.ctcParNo = ctcParNo;
    }

    public String getCtcExpDte() {
        return ctcExpDte;
    }

    public void setCtcExpDte(String ctcExpDte) {
        this.ctcExpDte = ctcExpDte;
    }

    public String getCtcIsBlk() {
        return ctcIsBlk;
    }

    public void setCtcIsBlk(String ctcIsBlk) {
        this.ctcIsBlk = ctcIsBlk;
    }

    public String getCtcDirNam() {
        return ctcDirNam;
    }

    public void setCtcDirNam(String ctcDirNam) {
        this.ctcDirNam = ctcDirNam;
    }

    public String getCtcDirFam() {
        return ctcDirFam;
    }

    public void setCtcDirFam(String ctcDirFam) {
        this.ctcDirFam = ctcDirFam;
    }

    public String getCtcTit() {
        return ctcTit;
    }

    public void setCtcTit(String ctcTit) {
        this.ctcTit = ctcTit;
    }
}
