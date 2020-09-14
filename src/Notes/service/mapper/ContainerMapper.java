package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ContainerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Container and its DTO ContainerDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductUnitMapper.class})
public interface ContainerMapper extends EntityMapper<ContainerDTO, Container> {

    @Mapping(source = "productUnit.id", target = "productUnitId")
    @Mapping(source = "productUnit.title", target = "productUnitTitle")
    ContainerDTO toDto(Container container);

    @Mapping(source = "productUnitId", target = "productUnit")
    Container toEntity(ContainerDTO containerDTO);

    default Container fromId(Long id) {
        if (id == null) {
            return null;
        }
        Container container = new Container();
        container.setId(id);
        return container;
    }
}
