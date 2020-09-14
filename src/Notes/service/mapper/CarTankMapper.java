package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CarTank;
import ir.donyapardaz.niopdc.base.service.dto.CarTankDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CarTank and its DTO CarTankDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CarTankMapper extends EntityMapper<CarTankDTO, CarTank> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(expression = "java(carTank.getCustomer().getPlaque() + \"+\" + carTank.getCustomer().getPlaqueTwo())", target = "plaque")
    CarTankDTO toDto(CarTank carTank);

    @Mapping(source = "customerId", target = "customer")
    CarTank toEntity(CarTankDTO carTankDTO);

    default CarTank fromId(Long id) {
        if (id == null) {
            return null;
        }
        CarTank carTank = new CarTank();
        carTank.setId(id);
        return carTank;
    }
}
