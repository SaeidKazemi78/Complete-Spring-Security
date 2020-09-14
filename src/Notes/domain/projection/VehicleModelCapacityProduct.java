package ir.donyapardaz.niopdc.base.domain.projection;

import com.querydsl.core.annotations.QueryProjection;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.VehicleCapacity;
import ir.donyapardaz.niopdc.base.domain.VehicleModel;

public class VehicleModelCapacityProduct {
    private VehicleModel vehicleModel;
    private VehicleCapacity vehicleCapacity;
    private Product product;

    @QueryProjection
    public VehicleModelCapacityProduct(VehicleModel vehicleModel, VehicleCapacity vehicleCapacity, Product product) {
        this.vehicleModel = vehicleModel;
        this.vehicleCapacity = vehicleCapacity;
        this.product = product;
    }

    public VehicleModel getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(VehicleModel vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public VehicleCapacity getVehicleCapacity() {
        return vehicleCapacity;
    }

    public void setVehicleCapacity(VehicleCapacity vehicleCapacity) {
        this.vehicleCapacity = vehicleCapacity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
