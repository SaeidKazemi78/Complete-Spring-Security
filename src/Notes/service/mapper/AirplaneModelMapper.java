package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.AirplaneModelDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AirplaneModel and its DTO AirplaneModelDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface AirplaneModelMapper extends EntityMapper<AirplaneModelDTO, AirplaneModel> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    AirplaneModelDTO toDto(AirplaneModel airplaneModel);

    @Mapping(source = "productId", target = "product")
    AirplaneModel toEntity(AirplaneModelDTO airplaneModelDTO);

    default AirplaneModel fromId(Long id) {
        if (id == null) {
            return null;
        }
        AirplaneModel airplaneModel = new AirplaneModel();
        airplaneModel.setId(id);
        return airplaneModel;
    }
}
