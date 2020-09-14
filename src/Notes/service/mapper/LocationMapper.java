package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.LocationDTO;
import ir.donyapardaz.niopdc.base.service.dto.LocationFullDTO;

import ir.donyapardaz.niopdc.base.service.dto.LocationWithCountryDTO;
import org.mapstruct.*;

import java.util.List;

/**
 * Mapper for the entity Location and its DTO LocationFullDTO.
 */
@Mapper(componentModel = "spring", uses = {DepotMapper.class, RegionMapper.class})
public interface LocationMapper extends FullEntityMapper<LocationDTO, LocationFullDTO, Location> {


    @Mapping(source = "location.farCountry", target = "farCountry")
    @Mapping(source = "location.pumpBeforeControl", target = "pumpBeforeControl")
    @Named("toDtoWithCountry")
    LocationWithCountryDTO toDtoWithCountry(Location location);
    List<LocationWithCountryDTO> toDtoWithCountry(List<Location> location);

    @Mapping(source = "locationParent.id", target = "locationId")
    @Mapping(source = "locationParent.locationParent.id", target = "parentLocationId")
    @Mapping(source = "locationParent.name", target = "parentName")
    @Mapping(target = "depots", ignore = true)
    @Named("toFullDto")
    LocationFullDTO toFullDto(Location location);
    List<LocationFullDTO> toFullDto(List<Location> location);

    @Mapping(source = "locationId", target = "locationParent")
    @Mapping(target = "people", ignore = true)
    @Mapping(target = "customers", ignore = true)
    @Mapping(target = "depots", ignore = true)
    @Mapping(target = "news", ignore = true)
    @Mapping(target = "customerDeactiveRules", ignore = true)
    Location toFullEntity(LocationFullDTO locationDTO);
    List<Location> toFullEntity(List<LocationFullDTO> locationDTO);

    @Mapping(source = "country.id",target = "countryId")
    LocationDTO toDto(Location location);

    Location toEntity(LocationDTO locationDTO);
    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
