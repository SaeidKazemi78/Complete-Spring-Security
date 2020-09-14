package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeListDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity CustomerType and its DTO CustomerTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {VehicleModelMapper.class})
public interface CustomerTypeMapper extends EntityMapper<CustomerTypeDTO, CustomerType> {

    CustomerTypeListDTO toListDto(CustomerType customerType);

    List<CustomerTypeListDTO> toListDto(List<CustomerType> customerType);

    CustomerType toEntity(CustomerTypeDTO customerTypeDTO);

    default CustomerType fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerType customerType = new CustomerType();
        customerType.setId(id);
        return customerType;
    }

}
