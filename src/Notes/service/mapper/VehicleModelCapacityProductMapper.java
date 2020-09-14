package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.projection.VehicleModelCapacityProduct;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring",uses = {VehicleModelMapper.class,VehicleCapacityMapper.class,ProductMapper.class})
public interface VehicleModelCapacityProductMapper {



    @Mapping(source = "vehicleModel.id", target = "id")
    @Mapping(source = "vehicleModel.title", target = "title")
    @Mapping(source = "vehicleModel.customerGroup", target = "customerGroup")
    @Mapping(source = "vehicleModel.vehicleModelType", target = "vehicleModelType")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "vehicleCapacity.capacity", target = "capacity")
    VehicleModelDTO toDto(VehicleModelCapacityProduct vehicleModelCapacityProduct);
}
