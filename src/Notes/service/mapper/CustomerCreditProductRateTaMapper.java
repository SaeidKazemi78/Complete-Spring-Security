package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerCreditProductRateTa;
import ir.donyapardaz.niopdc.base.domain.CustomerCreditProductTa;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditProductRateTaDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditProductTaDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity CustomerCredit and its DTO CustomerCreditDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CustomerCreditProductRateTaMapper extends EntityMapper<CustomerCreditProductRateTaDTO, CustomerCreditProductRateTa> {

    CustomerCreditProductRateTaDTO toDto(CustomerCreditProductRateTa customerCredit);

    CustomerCreditProductRateTa toEntity(CustomerCreditProductRateTaDTO customerCreditDTO);

    default CustomerCreditProductRateTa fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerCreditProductRateTa customerCredit = new CustomerCreditProductRateTa();
        customerCredit.setId(id);
        return customerCredit;
    }
}
