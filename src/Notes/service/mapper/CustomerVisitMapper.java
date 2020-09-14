package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerVisitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerVisit and its DTO CustomerVisitDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CustomerVisitMapper extends EntityMapper<CustomerVisitDTO, CustomerVisit> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "createdDate", target = "createdDate")
    CustomerVisitDTO toDto(CustomerVisit customerVisit);

    @Mapping(source = "customerId", target = "customer")
    CustomerVisit toEntity(CustomerVisitDTO customerVisitDTO);

    default CustomerVisit fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerVisit customerVisit = new CustomerVisit();
        customerVisit.setId(id);
        return customerVisit;
    }
}
