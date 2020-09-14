package ir.donyapardaz.niopdc.base.service.dto;


import ir.donyapardaz.niopdc.base.domain.enumeration.SpentType;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

public class EPaymentListDTO implements Serializable {

    public EPaymentListDTO() {
    }

    public EPaymentListDTO(List<EPaymentDTO> ePaymentListDTOS, Set<Long> orderIds, SpentType type) {
        this.ePaymentListDTOS = ePaymentListDTOS;
        this.orderIds = orderIds;
        this.type = type;
    }

    private List<EPaymentDTO> ePaymentListDTOS;
    private Set<Long> orderIds;
    private SpentType type;

    public List<EPaymentDTO> getePaymentListDTOS() {
        return ePaymentListDTOS;
    }

    public void setePaymentListDTOS(List<EPaymentDTO> ePaymentListDTOS) {
        this.ePaymentListDTOS = ePaymentListDTOS;
    }

    public Set<Long> getOrderIds() {
        return orderIds;
    }

    public void setOrderIds(Set<Long> orderIds) {
        this.orderIds = orderIds;
    }

    public SpentType getType() {
        return type;
    }

    public void setType(SpentType type) {
        this.type = type;
    }
}
