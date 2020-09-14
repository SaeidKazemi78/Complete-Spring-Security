package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.projection.CurrencyRateGroup;
import ir.donyapardaz.niopdc.base.service.dto.custom.CurrencyRateGroupDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity CurrencyRateGroup and its DTO CurrencyRateGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CurrencyRateGroupMapper extends EntityMapper<CurrencyRateGroupDTO, CurrencyRateGroup> {


    default CurrencyRateGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        CurrencyRateGroup currencyRateGroup = new CurrencyRateGroup();
        currencyRateGroup.setId(id);
        return currencyRateGroup;
    }
}
