package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CarDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Car and its DTO CarDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class,})
public interface CarMapper extends EntityMapper<CarDTO, Car> {

    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.name", target = "personName")
    CarDTO toDto(Car entity);

    @Mapping(source = "personId", target = "person")
    Car toEntity(CarDTO dto);

    default Car fromId(Long id) {
        if (id == null) {
            return null;
        }
        Car car = new Car();
        car.setId(id);
        return car;
    }
}
