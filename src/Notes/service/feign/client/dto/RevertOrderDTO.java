package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;
import java.util.List;

public class RevertOrderDTO implements Serializable{
    private List<RevertCreditDTO> revertCreditDTOS;

    public List<RevertCreditDTO> getRevertCreditDTOS() {
        return revertCreditDTOS;
    }

    public void setRevertCreditDTOS(List<RevertCreditDTO> revertCreditDTOS) {
        this.revertCreditDTOS = revertCreditDTOS;
    }
}
