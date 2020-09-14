package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.PassCardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PassCard and its DTO PassCardDTO.
 */
@Mapper(componentModel = "spring", uses = {DriverMapper.class})
public interface PassCardMapper extends EntityMapper<PassCardDTO, PassCard> {

    @Mapping(source = "driver.id", target = "driverId")
    PassCardDTO toDto(PassCard passCard);

    @Mapping(source = "driverId", target = "driver")
    PassCard toEntity(PassCardDTO passCardDTO);

    default PassCard fromId(Long id) {
        if (id == null) {
            return null;
        }
        PassCard passCard = new PassCard();
        passCard.setId(id);
        return passCard;
    }
}
