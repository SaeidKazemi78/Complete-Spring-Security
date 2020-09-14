package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.SellContractPersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SellContractPerson and its DTO SellContractPersonDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class,SellContractMapper.class})
public interface SellContractPersonMapper extends EntityMapper<SellContractPersonDTO, SellContractPerson> {

    @Mapping(source = "sellContract.id", target = "sellContractId")
    @Mapping(source = "sellContract.contractNo", target = "sellContractContractNo")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.fullName", target = "personFullName")
    SellContractPersonDTO toDto(SellContractPerson sellContractPerson);

    @Mapping(source = "sellContractId", target = "sellContract")
    @Mapping(source = "personId", target = "person")
    SellContractPerson toEntity(SellContractPersonDTO sellContractPersonDTO);
    default SellContractPerson fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellContractPerson sellContractPerson = new SellContractPerson();
        sellContractPerson.setId(id);
        return sellContractPerson;
    }
}
