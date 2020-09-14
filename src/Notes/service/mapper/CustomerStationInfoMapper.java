package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CustomerStationInfoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CustomerStationInfo and its DTO CustomerStationInfoDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface CustomerStationInfoMapper extends EntityMapper<CustomerStationInfoDTO, CustomerStationInfo> {

    @Mapping(source = "customer.id", target = "customerId")
    CustomerStationInfoDTO toDto(CustomerStationInfo customerStationInfo);

    @Mapping(source = "customerId", target = "customer")
    CustomerStationInfo toEntity(CustomerStationInfoDTO customerStationInfoDTO);

    default CustomerStationInfo fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerStationInfo customerStationInfo = new CustomerStationInfo();
        customerStationInfo.setId(id);
        return customerStationInfo;
    }
}
