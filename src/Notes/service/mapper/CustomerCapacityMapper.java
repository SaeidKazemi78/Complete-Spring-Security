package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCapacityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerCapacity and its DTO CustomerCapacityDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, ProductGroupMapper.class})
public interface CustomerCapacityMapper extends EntityMapper<CustomerCapacityDTO, CustomerCapacity> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "productGroup.id", target = "productGroupId")
    @Mapping(source = "productGroup.title", target = "productGroupTitle")
    CustomerCapacityDTO toDto(CustomerCapacity customerCapacity);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "productGroupId", target = "productGroup")
    CustomerCapacity toEntity(CustomerCapacityDTO customerCapacityDTO);

    default CustomerCapacity fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerCapacity customerCapacity = new CustomerCapacity();
        customerCapacity.setId(id);
        return customerCapacity;
    }
}
