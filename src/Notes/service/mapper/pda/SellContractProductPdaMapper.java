package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.service.dto.pda.CostGroupApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.CurrencyApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.SellContractProductApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.HashSet;
import java.util.Set;

/**
 * Mapper for the entity SellContractProduct and its DTO SellContractProductFullDTO.
 */
@Mapper(componentModel = "spring", uses = {DepotApiMapper.class})
public interface SellContractProductPdaMapper extends EntityMapper<SellContractProductApiDTO, SellContractProduct> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "currencyIds", target = "currencies")
    @Mapping(source = "costGroupIds", target = "costGroups")
    SellContractProductApiDTO toDto(SellContractProduct sellContractProduct);


    default Set<CurrencyApiDTO> currencyApiDTOFromId(Set<Long> ids) {
        Set<CurrencyApiDTO> currencyApiDTOS= new HashSet<>();
        if (ids == null) {
            return null;
        }
        else{
            ids.forEach(id ->{
                CurrencyApiDTO currencyApiDTO = new CurrencyApiDTO();
                currencyApiDTO.setId(id);
                currencyApiDTOS.add(currencyApiDTO);
            } );
        }

        return currencyApiDTOS;
    }
    default Set<CostGroupApiDTO> costGroupApiDTOFromId(Set<Long> ids) {
        Set<CostGroupApiDTO> costGroupApiDTOS= new HashSet<>();
        if (ids == null) {
            return null;
        }
        else{
            ids.forEach(id ->{
                CostGroupApiDTO costGroupApiDTO = new CostGroupApiDTO();
                costGroupApiDTO.setId(id);
                costGroupApiDTOS.add(costGroupApiDTO);
            } );
        }

        return costGroupApiDTOS;
    }

}
