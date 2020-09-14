package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.SellContractCustomer;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.CustomerApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerMapper;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import ir.donyapardaz.niopdc.base.service.mapper.LocationMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity SellContractCustomer and its DTO SellContractCustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {SellContractProductPdaMapper.class})
public interface SellContractCustomerPdaMapper extends EntityMapper<CustomerApiDTO, SellContractCustomer> {


    @Mapping(source = "customer.id", target = "id")
    @Mapping(source = "customer.name", target = "name")
    @Mapping(source = "customer.identifyCode", target = "identifyCode")
    @Mapping(source = "customer.registerDate", target = "registerDate")
    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "sellContractProducts", target = "sellContractProducts")
    CustomerApiDTO toDto(SellContractCustomer sellContractCustomer);

}
