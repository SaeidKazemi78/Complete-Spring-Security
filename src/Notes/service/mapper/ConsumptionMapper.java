package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ConsumptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Consumption and its DTO ConsumptionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ConsumptionMapper extends EntityMapper<ConsumptionDTO, Consumption> {


    Consumption toEntity(ConsumptionDTO consumptionDTO);

    default Consumption fromId(Long id) {
        if (id == null) {
            return null;
        }
        Consumption consumption = new Consumption();
        consumption.setId(id);
        return consumption;
    }
}
