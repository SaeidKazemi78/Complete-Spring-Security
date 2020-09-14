package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.UserDataAccessDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserDataAccess and its DTO UserDataAccessDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, RegionMapper.class, PersonMapper.class, CustomerMapper.class, CustomerTypeMapper.class})
public interface UserDataAccessMapper extends EntityMapper<UserDataAccessDTO, UserDataAccess> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "region.name", target = "regionName")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.fullName", target = "personName")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "customerType.id", target = "customerTypeId")
    @Mapping(source = "customerType.title", target = "customerTypeTitle")
    UserDataAccessDTO toDto(UserDataAccess userDataAccess);

    @Mapping(source = "locationId", target = "location")
    @Mapping(source = "regionId", target = "region")
    @Mapping(source = "personId", target = "person")
    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "customerTypeId", target = "customerType")
    UserDataAccess toEntity(UserDataAccessDTO userDataAccessDTO);

    default UserDataAccess fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserDataAccess userDataAccess = new UserDataAccess();
        userDataAccess.setId(id);
        return userDataAccess;
    }
}
