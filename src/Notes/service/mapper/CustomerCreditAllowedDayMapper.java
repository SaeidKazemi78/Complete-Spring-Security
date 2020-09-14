package ir.donyapardaz.niopdc.base.service.mapper;


import ir.donyapardaz.niopdc.base.domain.CustomerCreditAllowedDay;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditAllowedDayDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {CustomerCreditMapper.class})
public interface CustomerCreditAllowedDayMapper extends EntityMapper<CustomerCreditAllowedDayDTO, CustomerCreditAllowedDay> {

    @Mapping(source = "customerCreditId", target = "customerCredit")
    CustomerCreditAllowedDay toEntity(CustomerCreditAllowedDayDTO dto);


    @Mapping(source = "customerCredit.id", target = "customerCreditId")
    CustomerCreditAllowedDayDTO toDto(CustomerCreditAllowedDay entity);
}
