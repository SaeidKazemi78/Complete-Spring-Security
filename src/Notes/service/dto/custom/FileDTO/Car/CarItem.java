package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Car;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "CarItems")
@XmlAccessorType(XmlAccessType.FIELD)
public class CarItem {
    @XmlElement(name = "NewCar")
    private List<NewCar> newCars = new ArrayList<>();

    public List<NewCar> getNewCars() {
        return newCars;
    }

    public void setNewCars(List<NewCar> newCars) {
        this.newCars = newCars;
    }
}
