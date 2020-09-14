package ir.donyapardaz.niopdc.base.service.dto.custom;


import ir.donyapardaz.niopdc.base.domain.enumeration.CostType;

public class CostResponseDTO {
    private String costGroupTitle;
    private Double price;
    private CostType costType;
    private Long costId;


    public void setCostId(Long costId) {
        this.costId = costId;
    }

    public Long getCostId() {
        return costId;
    }

    public String getCostGroupTitle() {
        return costGroupTitle;
    }

    public void setCostGroupTitle(String costGroupTitle) {
        this.costGroupTitle = costGroupTitle;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public CostType getCostType() {
        return costType;
    }

    public void setCostType(CostType costType) {
        this.costType = costType;
    }
}
