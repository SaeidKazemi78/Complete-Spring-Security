package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerOrderCapacity;
import ir.donyapardaz.niopdc.base.domain.CustomerRating;
import ir.donyapardaz.niopdc.base.service.dto.CustomerOrderCapacityDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerRatingDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerRating and its DTO CustomerRatingDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CustomerOrderCapacityMapper extends EntityMapper<CustomerOrderCapacityDTO, CustomerOrderCapacity> {

    @Mapping(source = "customerId", target = "customer")
    CustomerOrderCapacity toEntity(CustomerOrderCapacityDTO customerOrderCapacityDTO);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "productGroup.title", target = "productGroupTitle")
    CustomerOrderCapacityDTO toDto(CustomerOrderCapacity customerOrderCapacity);

    default CustomerRating fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerRating customerRating = new CustomerRating();
        customerRating.setId(id);
        return customerRating;
    }
}
