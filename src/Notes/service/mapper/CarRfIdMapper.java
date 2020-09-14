package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CarRfIdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CarRfId and its DTO CarRfIdDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, TagRateMapper.class})
public interface CarRfIdMapper extends EntityMapper<CarRfIdDTO, CarRfId> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    CarRfIdDTO toDto(CarRfId carRfId);

    @Mapping(source = "customerId", target = "customer")
    CarRfId toEntity(CarRfIdDTO carRfIdDTO);

    default CarRfId fromId(Long id) {
        if (id == null) {
            return null;
        }
        CarRfId carRfId = new CarRfId();
        carRfId.setId(id);
        return carRfId;
    }
}
