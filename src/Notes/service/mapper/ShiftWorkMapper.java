package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ShiftWorkDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ShiftWork and its DTO ShiftWorkDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface ShiftWorkMapper extends EntityMapper<ShiftWorkDTO, ShiftWork> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    ShiftWorkDTO toDto(ShiftWork shiftWork);

    @Mapping(source = "locationId", target = "location")
    ShiftWork toEntity(ShiftWorkDTO shiftWorkDTO);

    default ShiftWork fromId(Long id) {
        if (id == null) {
            return null;
        }
        ShiftWork shiftWork = new ShiftWork();
        shiftWork.setId(id);
        return shiftWork;
    }
}
