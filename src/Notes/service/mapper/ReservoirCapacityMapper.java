package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ReservoirCapacityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ReservoirCapacity and its DTO ReservoirCapacityDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, PersonMapper.class})
public interface ReservoirCapacityMapper extends EntityMapper<ReservoirCapacityDTO, ReservoirCapacity> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.name", target = "personName")
    ReservoirCapacityDTO toDto(ReservoirCapacity reservoirCapacity);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "personId", target = "person")
    ReservoirCapacity toEntity(ReservoirCapacityDTO reservoirCapacityDTO);

    default ReservoirCapacity fromId(Long id) {
        if (id == null) {
            return null;
        }
        ReservoirCapacity reservoirCapacity = new ReservoirCapacity();
        reservoirCapacity.setId(id);
        return reservoirCapacity;
    }
}
