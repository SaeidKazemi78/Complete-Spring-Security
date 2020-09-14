package ir.donyapardaz.niopdc.base.service.dto;

public class ProductCapacityDTO {
    private  String capacity;
    private  String productGroup;

    public ProductCapacityDTO capacity(String capacity) {
        this.capacity = capacity;
        return this;
    }

    public ProductCapacityDTO productGroup(String productGroup){
        this.productGroup = productGroup;
        return this;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getProductGroup() {
        return productGroup;
    }

    public void setProductGroup(String productGroup) {
        this.productGroup = productGroup;
    }
}

