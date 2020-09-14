package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerRatingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerRating and its DTO CustomerRatingDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface CustomerRatingMapper extends EntityMapper<CustomerRatingDTO, CustomerRating> {



    default CustomerRating fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerRating customerRating = new CustomerRating();
        customerRating.setId(id);
        return customerRating;
    }
}
