package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.service.dto.pda.CostGroupApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.CurrencyApiDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.PersonApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CountryMapper;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.ArrayList;
import java.util.List;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {CountryMapper.class, ProductApiMapper.class, SellContractPersonPdaMapper.class})
public interface PersonApiMapper extends EntityMapper<PersonApiDTO, Person> {

    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "region.name", target = "regionName")
    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.name", target = "countryName")
    @Mapping(source = "sellContractPeople", target = "sellContracts")
    PersonApiDTO toDto(Person person);

    @Mapping(target = "sellContractPeople", ignore = true)
    Person toEntity(PersonApiDTO personDTO);

    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
