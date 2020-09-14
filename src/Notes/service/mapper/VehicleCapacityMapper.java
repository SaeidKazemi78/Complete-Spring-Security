package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.VehicleCapacityDTO;

import org.mapstruct.*;

import java.util.Set;

/**
 * Mapper for the entity VehicleCapacity and its DTO VehicleCapacityDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleModelMapper.class, ProductMapper.class})
public interface VehicleCapacityMapper extends EntityMapper<VehicleCapacityDTO, VehicleCapacity> {

    @Mapping(source = "vehicleModel.id", target = "vehicleModelId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    VehicleCapacityDTO toDto(VehicleCapacity vehicleCapacity);

    Set<VehicleCapacityDTO> toDto(Set<VehicleCapacity> vehicleCapacity);

    @Mapping(source = "vehicleModelId", target = "vehicleModel")
    @Mapping(source = "productId", target = "product")
    VehicleCapacity toEntity(VehicleCapacityDTO vehicleCapacityDTO);

    default VehicleCapacity fromId(Long id) {
        if (id == null) {
            return null;
        }
        VehicleCapacity vehicleCapacity = new VehicleCapacity();
        vehicleCapacity.setId(id);
        return vehicleCapacity;
    }
}
