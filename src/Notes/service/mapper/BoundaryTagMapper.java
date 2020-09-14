package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryTagDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BoundaryTag and its DTO BoundaryTagDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface BoundaryTagMapper extends EntityMapper<BoundaryTagDTO, BoundaryTag> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    BoundaryTagDTO toDto(BoundaryTag boundaryTag);

    @Mapping(source = "locationId", target = "location")
    BoundaryTag toEntity(BoundaryTagDTO boundaryTagDTO);

    default BoundaryTag fromId(Long id) {
        if (id == null) {
            return null;
        }
        BoundaryTag boundaryTag = new BoundaryTag();
        boundaryTag.setId(id);
        return boundaryTag;
    }
}
