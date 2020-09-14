package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Car;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "NewCar")
@XmlAccessorType(XmlAccessType.FIELD)
public class NewCar {
    @XmlElement(name = "CarID")
    private Long carId;

    @XmlElement(name = "CarCod")
    private String carCode;

    @XmlElement(name = "CarPlq")
    private String carPlq;

    @XmlElement(name = "CarSer")
    private String carSer;

    @XmlElement(name = "CarSerNo")
    private String carSerNo;

    @XmlElement(name = "CarTypCod")
    private String carTypeCod;

    @XmlElement(name = "CarTnkNo")
    private String carTnkNo;

    @XmlElement(name = "CarCtcCod")
    private String carCtcCod;

    @XmlElement(name = "CarEme")
    private String carEme;

    @XmlElement(name = "CarActTypCod")
    private String carActTypeCod;

    @XmlElement(name = "CarOprTACod")
    private String carOprTACod;

    @XmlElement(name = "CarOwnNatCod")
    private String carOwnNatCod;

    @XmlElement(name = "CarMtrCrdNo")
    private String carMtrCrdNo;

    @XmlElement(name = "CarMtrCrdExpDte")
    private String carMtrCrdExpDte;

    @XmlElement(name = "CarSopExpDte")
    private String carSopExpDte;

    @XmlElement(name = "CarChaNo")
    private String carChaNo;

    @XmlElement(name = "CarOwnTypCod")
    private String carOwnTypCod;

    @XmlElement(name = "CarIsBlk")
    private Boolean carIsBlk;

    @XmlElement(name = "CarVal0")
    private String carVal0;

    @XmlElement(name = "CarVal1")
    private String carVal1;

    @XmlElement(name = "CarVal2")
    private String carVal2;

    @XmlElement(name = "CarVal3")
    private String carVal3;

    @XmlElement(name = "CarVal4")
    private String carVal4;

    @XmlElement(name = "CarRegTypCod")
    private String carRegTypCod;

    @XmlElement(name = "CarRegDte")
    private String carRegDte;

    @XmlElement(name = "CarShaNo")
    private String carShaNo;

    @XmlElement(name = "CarBulDte")
    private String carBulDte;

    @XmlElement(name = "CarTrkTyp")
    private String carTrkType;

    @XmlElement(name = "CarFacID")
    private String carFacId;

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getCarCode() {
        return carCode;
    }

    public void setCarCode(String carCode) {
        this.carCode = carCode;
    }

    public String getCarPlq() {
        return carPlq;
    }

    public void setCarPlq(String carPlq) {
        this.carPlq = carPlq;
    }

    public String getCarSerNo() {
        return carSerNo;
    }

    public void setCarSerNo(String carSerNo) {
        this.carSerNo = carSerNo;
    }

    public String getCarTypeCod() {
        return carTypeCod;
    }

    public void setCarTypeCod(String carTypeCod) {
        this.carTypeCod = carTypeCod;
    }

    public String getCarTnkNo() {
        return carTnkNo;
    }

    public void setCarTnkNo(String carTnkNo) {
        this.carTnkNo = carTnkNo;
    }

    public String getCarCtcCod() {
        return carCtcCod;
    }

    public void setCarCtcCod(String carCtcCod) {
        this.carCtcCod = carCtcCod;
    }

    public String getCarEme() {
        return carEme;
    }

    public void setCarEme(String carEme) {
        this.carEme = carEme;
    }

    public String getCarActTypeCod() {
        return carActTypeCod;
    }

    public void setCarActTypeCod(String carActTypeCod) {
        this.carActTypeCod = carActTypeCod;
    }

    public String getCarOprTACod() {
        return carOprTACod;
    }

    public void setCarOprTACod(String carOprTACod) {
        this.carOprTACod = carOprTACod;
    }

    public String getCarOwnNatCod() {
        return carOwnNatCod;
    }

    public void setCarOwnNatCod(String carOwnNatCod) {
        this.carOwnNatCod = carOwnNatCod;
    }

    public String getCarMtrCrdNo() {
        return carMtrCrdNo;
    }

    public void setCarMtrCrdNo(String carMtrCrdNo) {
        this.carMtrCrdNo = carMtrCrdNo;
    }

    public String getCarMtrCrdExpDte() {
        return carMtrCrdExpDte;
    }

    public void setCarMtrCrdExpDte(String carMtrCrdExpDte) {
        this.carMtrCrdExpDte = carMtrCrdExpDte;
    }

    public String getCarChaNo() {
        return carChaNo;
    }

    public void setCarChaNo(String carChaNo) {
        this.carChaNo = carChaNo;
    }

    public String getCarOwnTypCod() {
        return carOwnTypCod;
    }

    public void setCarOwnTypCod(String carOwnTypCod) {
        this.carOwnTypCod = carOwnTypCod;
    }

    public Boolean getCarIsBlk() {
        return carIsBlk;
    }

    public void setCarIsBlk(Boolean carIsBlk) {
        this.carIsBlk = carIsBlk;
    }

    public String getCarVal0() {
        return carVal0;
    }

    public void setCarVal0(String carVal0) {
        this.carVal0 = carVal0;
    }

    public String getCarVal1() {
        return carVal1;
    }

    public void setCarVal1(String carVal1) {
        this.carVal1 = carVal1;
    }

    public String getCarVal2() {
        return carVal2;
    }

    public void setCarVal2(String carVal2) {
        this.carVal2 = carVal2;
    }

    public String getCarVal3() {
        return carVal3;
    }

    public void setCarVal3(String carVal3) {
        this.carVal3 = carVal3;
    }

    public String getCarVal4() {
        return carVal4;
    }

    public void setCarVal4(String carVal4) {
        this.carVal4 = carVal4;
    }

    public String getCarRegTypCod() {
        return carRegTypCod;
    }

    public void setCarRegTypCod(String carRegTypCod) {
        this.carRegTypCod = carRegTypCod;
    }

    public String getCarRegDte() {
        return carRegDte;
    }

    public void setCarRegDte(String carRegDte) {
        this.carRegDte = carRegDte;
    }

    public String getCarShaNo() {
        return carShaNo;
    }

    public void setCarShaNo(String carShaNo) {
        this.carShaNo = carShaNo;
    }

    public String getCarBulDte() {
        return carBulDte;
    }

    public void setCarBulDte(String carBulDte) {
        this.carBulDte = carBulDte;
    }

    public String getCarTrkType() {
        return carTrkType;
    }

    public void setCarTrkType(String carTrkType) {
        this.carTrkType = carTrkType;
    }

    public String getCarFacId() {
        return carFacId;
    }

    public void setCarFacId(String carFacId) {
        this.carFacId = carFacId;
    }

    public String getCarSer() {
        return carSer;
    }

    public void setCarSer(String carSer) {
        this.carSer = carSer;
    }

    public String getCarSopExpDte() {
        return carSopExpDte;
    }

    public void setCarSopExpDte(String carSopExpDte) {
        this.carSopExpDte = carSopExpDte;
    }
}
