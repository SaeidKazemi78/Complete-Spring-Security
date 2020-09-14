package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CarBakDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CarBak and its DTO CarBakDTO.
 */
@Mapper(componentModel = "spring", uses = {CarMapper.class, ProductMapper.class})
public interface CarBakMapper extends EntityMapper<CarBakDTO, CarBak> {

    @Mapping(source = "car.id", target = "carId")
    @Mapping(source = "car.title", target = "carTitle")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    CarBakDTO toDto(CarBak carBak);

    @Mapping(source = "carId", target = "car")
    @Mapping(source = "productId", target = "product")
    CarBak toEntity(CarBakDTO carBakDTO);

    default CarBak fromId(Long id) {
        if (id == null) {
            return null;
        }
        CarBak carBak = new CarBak();
        carBak.setId(id);
        return carBak;
    }
}
