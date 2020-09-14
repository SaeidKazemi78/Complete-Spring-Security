package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.CustomerCreditProductTa;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditListDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditProductTaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerCredit and its DTO CustomerCreditDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerCreditProductTaMapper extends EntityMapper<CustomerCreditProductTaDTO, CustomerCreditProductTa> {

    CustomerCreditProductTaDTO toDto(CustomerCreditProductTa customerCredit);

    CustomerCreditProductTa toEntity(CustomerCreditProductTaDTO customerCreditDTO);

    default CustomerCreditProductTa fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerCreditProductTa customerCredit = new CustomerCreditProductTa();
        customerCredit.setId(id);
        return customerCredit;
    }
}
