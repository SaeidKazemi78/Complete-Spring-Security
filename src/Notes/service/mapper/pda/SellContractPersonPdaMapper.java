package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.domain.SellContractPerson;
import ir.donyapardaz.niopdc.base.service.dto.SellContractDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.PersonApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.SellContractApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractCustomerMapper;
import ir.donyapardaz.niopdc.base.service.mapper.SellContractPersonMapper;
import ir.donyapardaz.niopdc.base.service.mapper.decorator.SellContractMapperDecorator;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity SellContract and its DTO SellContractDTO.
 */
@Mapper(componentModel = "spring", uses = { SellContractCustomerPdaMapper.class})
public interface SellContractPersonPdaMapper extends EntityMapper <SellContractApiDTO, SellContractPerson> {

    @Mapping(source = "sellContract.startDate", target = "startDate")
    @Mapping(source = "sellContract.finishDate", target = "finishDate")
    @Mapping(source = "sellContract.exportationDate", target = "exportationDate")
    @Mapping(source = "sellContract.contractNo", target = "contractNo")
    @Mapping(source = "sellContract.description", target = "description")
    @Mapping(source = "sellContract.contractType", target = "contractType")
    @Mapping(source = "sellContract.active", target = "active")
    @Mapping(source = "sellContract.sellContractCustomers", target = "customers")
    @Mapping(source = "sellContract.id", target = "id")
    @Mapping(source = "sharePercent", target = "sharePercent")
    SellContractApiDTO toDto(SellContractPerson sellContractPerson);


}
