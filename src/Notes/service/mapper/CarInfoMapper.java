package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CarInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CarInfo and its DTO CarInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {CarMapper.class})
public interface CarInfoMapper extends EntityMapper<CarInfoDTO, CarInfo> {

    @Mapping(source = "car.id", target = "carId")
    @Mapping(source = "car.title", target = "carTitle")
    CarInfoDTO toDto(CarInfo carInfo);

    @Mapping(source = "carId", target = "car")
    CarInfo toEntity(CarInfoDTO carInfoDTO);

    default CarInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        CarInfo carInfo = new CarInfo();
        carInfo.setId(id);
        return carInfo;
    }
}
