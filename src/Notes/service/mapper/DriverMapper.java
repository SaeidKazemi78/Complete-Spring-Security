package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.DriverDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Driver and its DTO DriverDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionMapper.class, CarMapper.class})
public interface DriverMapper extends EntityMapper<DriverDTO, Driver> {

    @Mapping(source = "birthCity.id", target = "birthCityId")
    @Mapping(source = "birthCity.name", target = "birthCityName")
    @Mapping(source = "car.id", target = "carId")
    @Mapping(source = "car.title", target = "carTitle")
    DriverDTO toDto(Driver driver);

    @Mapping(source = "birthCityId", target = "birthCity")
    @Mapping(source = "carId", target = "car")
    Driver toEntity(DriverDTO driverDTO);

    default Driver fromId(Long id) {
        if (id == null) {
            return null;
        }
        Driver driver = new Driver();
        driver.setId(id);
        return driver;
    }
}
