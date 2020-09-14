package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerScoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerScore and its DTO CustomerScoreDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CustomerScoreMapper extends EntityMapper<CustomerScoreDTO, CustomerScore> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    CustomerScoreDTO toDto(CustomerScore customerScore);

    @Mapping(source = "customerId", target = "customer")
    CustomerScore toEntity(CustomerScoreDTO customerScoreDTO);
/*
    default CustomerScore fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerScore customerScore = new CustomerScore();
        customerScore.setId(id);
        return customerScore;
    }*/
}
