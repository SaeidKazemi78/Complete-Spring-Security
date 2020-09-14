package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.DriveSecurityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DriveSecurity and its DTO DriveSecurityDTO.
 */
@Mapper(componentModel = "spring", uses = {DriverMapper.class, CountryMapper.class})
public interface DriveSecurityMapper extends EntityMapper<DriveSecurityDTO, DriveSecurity> {

    @Mapping(source = "driver.id", target = "driverId")
    @Mapping(source = "nationality.id", target = "nationalityId")
    DriveSecurityDTO toDto(DriveSecurity driveSecurity);

    @Mapping(source = "driverId", target = "driver")
    @Mapping(source = "nationalityId", target = "nationality")
    DriveSecurity toEntity(DriveSecurityDTO driveSecurityDTO);

    default DriveSecurity fromId(Long id) {
        if (id == null) {
            return null;
        }
        DriveSecurity driveSecurity = new DriveSecurity();
        driveSecurity.setId(id);
        return driveSecurity;
    }
}
