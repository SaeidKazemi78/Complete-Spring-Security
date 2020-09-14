package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.service.dto.LocationSelectorDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.LocationApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Location and its DTO LocationFullDTO.
 */
@Mapper(componentModel = "spring")
public interface LocationApiMapper extends EntityMapper<LocationApiDTO, Location> {

    LocationApiDTO toDto(Location location);

    @Mapping(target = "people", ignore = true)
    @Mapping(target = "customers", ignore = true)
    @Mapping(target = "depots", ignore = true)
    Location toEntity(LocationApiDTO locationDTO);
    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
