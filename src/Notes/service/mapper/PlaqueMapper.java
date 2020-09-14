package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Plaque and its DTO PlaqueDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PlaqueMapper extends EntityMapper<PlaqueDTO, Plaque> {



    default Plaque fromId(Long id) {
        if (id == null) {
            return null;
        }
        Plaque plaque = new Plaque();
        plaque.setId(id);
        return plaque;
    }
}
