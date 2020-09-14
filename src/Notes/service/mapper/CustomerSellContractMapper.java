package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.projection.CustomerSellContract;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerSellContractDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerTypepersonConsumption and its DTO CustomerTypepersonConsumptionDTO.
 */
@Mapper(componentModel = "spring")
public interface CustomerSellContractMapper extends EntityMapper<CustomerSellContractDTO, CustomerSellContract>{

}
