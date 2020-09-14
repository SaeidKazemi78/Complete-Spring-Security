package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.BuyTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BuyType and its DTO BuyTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BuyTypeMapper extends EntityMapper<BuyTypeDTO, BuyType> {


    @Mapping(target = "sellContractProducts", ignore = true)
    BuyType toEntity(BuyTypeDTO buyTypeDTO);


    default BuyType fromId(Long id) {
        if (id == null) {
            return null;
        }
        BuyType buyType = new BuyType();
        buyType.setId(id);
        return buyType;
    }
}
