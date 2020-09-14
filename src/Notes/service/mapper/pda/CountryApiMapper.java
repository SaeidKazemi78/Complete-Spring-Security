package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Country;
import ir.donyapardaz.niopdc.base.service.dto.pda.CountryApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity Country and its DTO CountryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CountryApiMapper extends EntityMapper<CountryApiDTO, Country> {



    default Country fromId(Long id) {
        if (id == null) {
            return null;
        }
        Country country = new Country();
        country.setId(id);
        return country;
    }
}
