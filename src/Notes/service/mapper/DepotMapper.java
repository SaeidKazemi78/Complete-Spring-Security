package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.DepotDTO;
import ir.donyapardaz.niopdc.base.service.dto.DepotFullDTO;

import org.mapstruct.*;

import java.util.List;

/**
 * Mapper for the entity Depot and its DTO DepotFullDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, LocationMapper.class})
public interface DepotMapper extends EntityMapper<DepotDTO, Depot> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    @Named("toFullDto")
    DepotFullDTO toFullDto(Depot entity);


    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "sellContractProducts", ignore = true)
    Depot toFullEntity(DepotFullDTO depotDTO);

    List<Depot> toFullEntity(List<DepotFullDTO> depotDTO);

    DepotDTO toDto(Depot entity);

    List<DepotDTO> toDto(List<Depot> entity);


    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "sellContractProducts", ignore = true)
    Depot toEntity(DepotDTO depotDTO);


    default Depot fromId(Long id) {
        if (id == null) {
            return null;
        }
        Depot depot = new Depot();
        depot.setId(id);
        return depot;
    }

}
