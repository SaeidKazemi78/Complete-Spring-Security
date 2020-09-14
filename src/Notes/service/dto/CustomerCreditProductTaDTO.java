package ir.donyapardaz.niopdc.base.service.dto;

import java.io.Serializable;
import java.util.List;

public class CustomerCreditProductTaDTO implements Serializable {

    private String productCode; // addad
    private String requestNumber; // addad

    private List<CustomerCreditProductRateTaDTO> productRates;

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getRequestNumber() {
        return requestNumber;
    }

    public void setRequestNumber(String requestNumber) {
        this.requestNumber = requestNumber;
    }

    public List<CustomerCreditProductRateTaDTO> getProductRates() {
        return productRates;
    }

    public void setProductRates(List<CustomerCreditProductRateTaDTO> productRates) {
        this.productRates = productRates;
    }
}
