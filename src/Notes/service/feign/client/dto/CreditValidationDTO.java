package ir.donyapardaz.niopdc.base.service.feign.client.dto;

import java.io.Serializable;
import java.util.List;

public class CreditValidationDTO implements Serializable{
    private List<CreditQuotaDTO> creditQuotaDTOS;
    private Boolean validation;

    public List<CreditQuotaDTO> getCreditQuotaDTOS() {
        return creditQuotaDTOS;
    }

    public void setCreditQuotaDTOS(List<CreditQuotaDTO> creditQuotaDTOS) {
        this.creditQuotaDTOS = creditQuotaDTOS;
    }

    public Boolean getValidation() {
        return validation;
    }

    public void setValidation(Boolean validation) {
        this.validation = validation;
    }
}
