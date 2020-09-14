package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Depot;
import ir.donyapardaz.niopdc.base.service.dto.pda.DepotApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Depot and its DTO DepotFullDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductApiMapper.class, LocationApiMapper.class})
public interface DepotApiMapper extends EntityMapper<DepotApiDTO, Depot> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    DepotApiDTO toDto(Depot entity);
    default Depot fromId(Long id) {
        if (id == null) {
            return null;
        }
        Depot depot = new Depot();
        depot.setId(id);
        return depot;
    }
}
