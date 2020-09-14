package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Route;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "Items")
@XmlAccessorType(XmlAccessType.FIELD)
public class RouteItem {

    @XmlElement(name = "NewItem")
    private List<NewRoute> newRoutes = new ArrayList<>();


    public List<NewRoute> getNewRoutes() {
        return newRoutes;
    }

    public void setNewRoutes(List<NewRoute> newRoutes) {
        this.newRoutes = newRoutes;
    }
}
