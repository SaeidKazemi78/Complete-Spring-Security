package ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Person;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "ContractItems")
@XmlAccessorType(XmlAccessType.FIELD)
public class ContractItem {
    @XmlElement(name = "NewContract")
    private List<NewContract> newContract = new ArrayList<>();

    public List<NewContract> getNewContract() {
        return newContract;
    }

    public void setNewContract(List<NewContract> newContract) {
        this.newContract = newContract;
    }
}
