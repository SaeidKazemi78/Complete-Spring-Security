package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.CustomerCreditTa;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditListDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditTaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerCredit and its DTO CustomerCreditDTO.
 */
@Mapper(componentModel = "spring", uses = {SellContractProductMapper.class})
public interface CustomerCreditTaMapper extends EntityMapper<CustomerCreditTaDTO, CustomerCreditTa> {

    CustomerCreditTaDTO toDto(CustomerCreditTa customerCredit);

    CustomerCreditTa toEntity(CustomerCreditTaDTO customerCreditDTO);

    default CustomerCreditTa fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerCreditTa customerCredit = new CustomerCreditTa();
        customerCredit.setId(id);
        return customerCredit;
    }
}
