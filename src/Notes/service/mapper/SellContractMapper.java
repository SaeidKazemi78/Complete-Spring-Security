package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.service.dto.SellContractDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractSummarizedDTO;
import ir.donyapardaz.niopdc.base.service.mapper.decorator.SellContractMapperDecorator;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.HashSet;
import java.util.Set;

/**
 * Mapper for the entity SellContract and its DTO SellContractDTO.
 */
@Mapper(componentModel = "spring", uses = {SellContractPersonMapper.class, SellContractCustomerMapper.class, LocationMapper.class, CustomerDeactiveRuleMapper.class})
@DecoratedWith(SellContractMapperDecorator.class)
public interface SellContractMapper extends EntityMapper<SellContractDTO, SellContract> {

    default Long locationsToLocationId(Set<Location> locations) {
        return locations.stream().map(Location::getId).findFirst().orElse(null);
    }

    default Set<Location> locationIdToLocations(Long locationId) {
        HashSet<Location> locations = new HashSet<>();
        if (locationId != null) {
            Location location = new Location();
            location.setId(locationId);
            locations.add(location);
        }
        return locations;
    }

    @Mapping(source = "locationId", target = "locations")
    SellContract toEntity(SellContractDTO sellContractDTO);

    SellContractSummarizedDTO toDSummarizedDo(SellContract sellContract);

    default SellContract fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellContract sellContract = new SellContract();
        sellContract.setId(id);
        return sellContract;
    }


    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "locations", target = "locationId")
    SellContractDTO toDto(SellContract entity);


}
