package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.SafetyCardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SafetyCard and its DTO SafetyCardDTO.
 */
@Mapper(componentModel = "spring", uses = {DriverMapper.class, DepotMapper.class})
public interface SafetyCardMapper extends EntityMapper<SafetyCardDTO, SafetyCard> {

    @Mapping(source = "driver.id", target = "driverId")
    @Mapping(source = "depot.id", target = "depotId")
    @Mapping(source = "depot.title", target = "depotName")
    SafetyCardDTO toDto(SafetyCard safetyCard);

    @Mapping(source = "driverId", target = "driver")
    @Mapping(source = "depotId", target = "depot")
    SafetyCard toEntity(SafetyCardDTO safetyCardDTO);

    default SafetyCard fromId(Long id) {
        if (id == null) {
            return null;
        }
        SafetyCard safetyCard = new SafetyCard();
        safetyCard.setId(id);
        return safetyCard;
    }
}
