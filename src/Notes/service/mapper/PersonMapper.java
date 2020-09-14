package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.service.dto.PersonDTO;
import ir.donyapardaz.niopdc.base.service.dto.PersonListDTO;
import ir.donyapardaz.niopdc.base.service.remote.person.NiopdcSellInquiry;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionMapper.class, CountryMapper.class, LocationMapper.class, SalesCodeMapper.class})
public interface PersonMapper extends EntityMapper<PersonDTO, Person> {

    @Mapping(source = "birthRegion.id", target = "birthRegionId")
    @Mapping(source = "birthRegion.name", target = "birthRegionName")
    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "region.name", target = "regionName")
    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.name", target = "countryName")
    @Mapping(source = "nationality.id", target = "nationalityId")
    @Mapping(source = "nationality.name", target = "nationalityName")
    @Mapping(source = "personTransport.code", target = "personTransportCode")
    @Mapping(ignore = true, target = "salesCodes")
    @Mapping(source = "locations",target = "locations",qualifiedByName = "toSummarizedDto")
    PersonDTO toDto(Person person);

    @Mapping(source = "salesCodes", target = "salesCodes")
    @Mapping(source = "birthRegionId", target = "birthRegion")
    @Mapping(source = "regionId", target = "region")
    @Mapping(source = "countryId", target = "country")
    @Mapping(source = "nationalityId", target = "nationality")
    @Mapping(target = "sellContractPeople", ignore = true)
    Person toEntity(PersonDTO personDTO);


    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
    @Mapping(source = "postCode", target = "postalCode")
    @Mapping(source = "registerNumber", target = "registerNo")
    PersonDTO toDto(NiopdcSellInquiry personLegal);

    @IterableMapping(elementTargetType = Person.class)
    @Mappings({
        @Mapping(target = "locationSize", expression = "java(person.getLocations().size())"),
        @Mapping(target = "invalidData", expression = "java(person.getInvalidData())"),
        @Mapping(source = "personTransport.code",target ="transportCode"
        )
    })
    PersonListDTO toListDto(Person person);
}
