package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.service.dto.LocationSelectorDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity Location and its DTO LocationFullDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LocationSelectorMapper extends EntityMapper<LocationSelectorDTO, Location> {

    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }


}
