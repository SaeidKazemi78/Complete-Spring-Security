package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerCreditListDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CustomerCredit and its DTO CustomerCreditDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerCreditAllowedDayMapper.class, CustomerMapper.class, BuyTypeMapper.class, PersonMapper.class, SellContractProductMapper.class})
public interface CustomerCreditMapper extends EntityMapper<CustomerCreditDTO, CustomerCredit> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "parentBuyType.id", target = "parentBuyTypeId")
    @Mapping(source = "parentBuyType.title", target = "parentBuyTypeTitle")
    @Mapping(source = "parentBuyType.buyGroup", target = "parentBuyGroup")
    @Mapping(source = "parentBuyType.typeEffect", target = "parentTypeEffect")
    @Mapping(source = "parentBuyType.buyTypeUsage", target = "parentBuyTypeUsage")
    @Mapping(source = "parentBuyType.minCredit", target = "parentBuyTypeMinCredit")
    @Mapping(source = "parentBuyType.minAmount", target = "parentBuyTypeMinAmount")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.name", target = "personName")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.product.title", target = "productTitle")
    CustomerCreditDTO toDto(CustomerCredit customerCredit);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "parentBuyTypeId", target = "parentBuyType")
    @Mapping(source = "personId", target = "person")
    @Mapping(source = "productId", target = "product")
    CustomerCredit toEntity(CustomerCreditDTO customerCreditDTO);

    @Mapping(source = "parentBuyType.buyGroup", target = "parentBuyGroup")
    @Mapping(source = "parentBuyType.title", target = "parentBuyTypeTitle")
    @Mapping(source = "product.sellContract.contractNo", target = "sellContractNo")
    CustomerCreditListDTO toListDto(CustomerCredit customerCredit);

    default CustomerCredit fromId(Long id) {
        if (id == null) {
            return null;
        }
        CustomerCredit customerCredit = new CustomerCredit();
        customerCredit.setId(id);
        return customerCredit;
    }
}
