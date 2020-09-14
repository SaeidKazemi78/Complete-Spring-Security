package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueRuleDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PlaqueRule and its DTO PlaqueRuleDTO.
 */
@Mapper(componentModel = "spring", uses = {PlaqueMapper.class})
public interface PlaqueRuleMapper extends EntityMapper<PlaqueRuleDTO, PlaqueRule> {

    @Mapping(source = "plaque.id", target = "plaqueId")
    @Mapping(source = "plaque.title", target = "plaqueTitle")
    PlaqueRuleDTO toDto(PlaqueRule plaqueRule);

    @Mapping(source = "plaqueId", target = "plaque")
    PlaqueRule toEntity(PlaqueRuleDTO plaqueRuleDTO);

    default PlaqueRule fromId(Long id) {
        if (id == null) {
            return null;
        }
        PlaqueRule plaqueRule = new PlaqueRule();
        plaqueRule.setId(id);
        return plaqueRule;
    }
}
