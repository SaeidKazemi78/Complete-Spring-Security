package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.VehicleModel;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

/**
 * Mapper for the entity VehicleModel and its DTO VehicleModelDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface VehicleModelMapper extends EntityMapper<VehicleModelDTO, VehicleModel> {


    @Mapping(target = "vehicleCapacities", ignore = true)
    @Mapping(source = "productId", target = "product")
    VehicleModel toEntity(VehicleModelDTO vehicleModelDTO);

    @Mapping(target = "capacityInfo", expression = "java(vehicleModel.getCapacityInfo())")
    @Named("toCustomDto")
    VehicleModelDTO toCustomDto(VehicleModel vehicleModel);

    @Mapping(target = "productId",source  = "product.id")
    VehicleModelDTO toDto(VehicleModel vehicleModel);

    default VehicleModel fromId(Long id) {
        if (id == null) {
            return null;
        }
        VehicleModel vehicleModel = new VehicleModel();
        vehicleModel.setId(id);
        return vehicleModel;
    }
}
