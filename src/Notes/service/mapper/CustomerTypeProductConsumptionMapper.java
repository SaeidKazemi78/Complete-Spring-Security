package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeProductConsumptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerTypeProductConsumption and its DTO CustomerTypeProductConsumptionDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerTypeMapper.class, ProductMapper.class, ConsumptionMapper.class})
public interface CustomerTypeProductConsumptionMapper extends EntityMapper<CustomerTypeProductConsumptionDTO, CustomerTypeProductConsumption> {

    @Mapping(source = "customerType.id", target = "customerTypeId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "consumption.id", target = "consumptionId")
    @Mapping(source = "consumption.title", target = "consumptionTitle")
    CustomerTypeProductConsumptionDTO toDto(CustomerTypeProductConsumption customerTypeProductConsumption);

    @Mapping(source = "customerTypeId", target = "customerType")
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "consumptionId", target = "consumption")
    CustomerTypeProductConsumption toEntity(CustomerTypeProductConsumptionDTO customerTypeProductConsumptionDTO);

    default CustomerTypeProductConsumption fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerTypeProductConsumption customerTypeProductConsumption = new CustomerTypeProductConsumption();
        customerTypeProductConsumption.setId(id);
        return customerTypeProductConsumption;
    }
}
