package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.SellContractCustomer;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractCustomerListDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity SellContractCustomer and its DTO SellContractCustomerDTO.
 */
@Mapper(componentModel = "spring", uses = {SellContractMapper.class, CustomerMapper.class, LocationMapper.class})
public interface SellContractCustomerMapper extends EntityMapper<SellContractCustomerDTO, SellContractCustomer> {

    @Mapping(source = "sellContract.id", target = "sellContractId")
    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "customer.registerCode", target = "customerRegCode")
    @Mapping(source = "customer.creditAccount", target = "creditAccount")
    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    @Mapping(source = "customer.type.customerGroup", target = "customerGroup")
    @Mapping(source = "customer.type.id", target = "customerTypeId")
    SellContractCustomerDTO toDto(SellContractCustomer sellContractCustomer);

    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "customer.id", target = "customerId")
    SellContractCustomerListDTO toListDTO(SellContractCustomer sellContractCustomer);

    @Mapping(source = "sellContractId", target = "sellContract")
    @Mapping(source = "customerId", target = "customer.id")
    @Mapping(source = "customerRegCode", target = "customer.registerCode")
    @Mapping(source = "creditAccount", target = "customer.creditAccount")
    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "sellContractProducts", ignore = true)
    SellContractCustomer toEntity(SellContractCustomerDTO sellContractCustomerDTO);

    default SellContractCustomer fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellContractCustomer sellContractCustomer = new SellContractCustomer();
        sellContractCustomer.setId(id);
        return sellContractCustomer;
    }
}
