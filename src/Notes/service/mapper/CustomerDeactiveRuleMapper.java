package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import ir.donyapardaz.niopdc.base.service.dto.CustomerDeactiveRuleDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerDeactiveRule and its DTO CustomerDeactiveRuleDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, CustomerTypeMapper.class,CustomerMapper.class})
public interface CustomerDeactiveRuleMapper extends EntityMapper<CustomerDeactiveRuleDTO, CustomerDeactiveRule> {
    @Mapping(source = "customerId", target = "customer")
    CustomerDeactiveRule toEntity(CustomerDeactiveRuleDTO customerDeactiveRuleDTO);

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "customer.identifyCode", target = "customerCode")
    CustomerDeactiveRuleDTO toDto(CustomerDeactiveRule customerDeactiveRule);

    default CustomerDeactiveRule fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerDeactiveRule customerDeactiveRule = new CustomerDeactiveRule();
        customerDeactiveRule.setId(id);
        return customerDeactiveRule;
    }
}
