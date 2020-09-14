package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.mapper.decorator.CustomerMapperDecorator;
import ir.donyapardaz.niopdc.base.service.mapper.decorator.SellContractMapperDecorator;
import org.mapstruct.DecoratedWith;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

/**
 * Mapper for the entity Customer and its DTO CustomerFullDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerStationInfoMapper.class,PlaqueMapper.class, CarRfIdMapper.class,CarTankMapper.class, CountryMapper.class, CustomerTypeMapper.class, RegionMapper.class,PersonMapper.class, VehicleModelMapper.class, LocationMapper.class, AirplaneModelMapper.class, ProductMapper.class, CountryMapper.class})
@DecoratedWith(CustomerMapperDecorator.class)
public interface CustomerMapper extends EntityMapper<CustomerFullDTO, Customer> {


    @Mapping(source = "type.id", target = "typeId")
    @Mapping(source = "type.title", target = "typeTitle")
    @Mapping(source = "region.id", target = "regionId")
//    @Mapping(source = "airplaneModel.id", target = "airplaneModelId")
//    @Mapping(source = "airplaneModel.capacity", target = "capacity")
    @Mapping(source = "region.name", target = "regionName")
    @Mapping(source = "type.customerGroup", target = "customerGroupTitle")
    @Mapping(source = "vehicleModel.product.id", target = "productId")
    @Mapping(source = "vehicleModel.product.title", target = "productTitle")
    @Mapping(source = "vehicleModel.id", target = "vehicleModelId")
    @Mapping(source = "vehicleModel.title", target = "vehicleModelTitle")
    @Mapping(source = "type.vehicleModelType", target = "vehicleModelType")
    @Mapping(source = "type.iranian", target = "iranian")
    @Mapping(source  = "country.id", target = "countryId")
    @Mapping(source  = "archive", target = "archive")


    @Mapping( target= "customPlaque", expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaque(),customer.getPlaqueTemplateCode()))")
    @Mapping( target = "customPlaqueTwo",expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaqueTwo(),customer.getPlaqueTwoTemplateCode()))")
    CustomerFullDTO toDto(Customer customer);



    @Mapping(target = "customerVisits", ignore = true)
    @Mapping(source = "typeId", target = "type")
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "regionId", target = "region")
//    @Mapping(source = "airplaneModelId", target = "airplaneModel")
    @Mapping(source = "vehicleModelId", target = "vehicleModel")
    @Mapping(target = "sellContractCustomers", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(source = "carTanks", target = "carTanks")
    @Mapping(source = "carRfIds", target = "carRfIds")
    @Mapping(target = "customerCapacities", ignore = true)
    @Mapping(source = "carRfId", target = "carRfId")
    @Mapping(source = "countryId", target = "country")

    @Mapping(source = "customPlaque.plaque", target = "plaque")
    @Mapping(source = "customPlaque.plaqueCode", target = "plaqueTemplateCode")
    @Mapping(source = "customPlaqueTwo.plaque", target = "plaqueTwo")
    @Mapping(source = "customPlaqueTwo.plaqueCode", target = "plaqueTwoTemplateCode")
    Customer toEntity(CustomerFullDTO customerDTO);

    default Customer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Customer customer = new Customer();
        customer.setId(id);
        return customer;
    }

    @Mapping(source = "type.title", target = "typeTitle")
    @Mapping(source = "region.name", target = "regionName")
    @Mapping(source = "type.customerGroup", target = "customerGroupTitle")
    @Mapping(source = "vehicleModel.title", target = "vehicleModelTitle")
    @Mapping(source = "locations", target = "locations", qualifiedByName = "toSummarizedDto")
    @Mapping(source  = "archive", target = "archive")
    @Mapping( target= "customPlaque", expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaque(),customer.getPlaqueTemplateCode()))")
    @Mapping( target = "customPlaqueTwo",expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaqueTwo(),customer.getPlaqueTwoTemplateCode()))")
    CustomerDTO toListDto(Customer customer);
    @Mapping(source  = "archive", target = "archive")
    @Mapping(source = "vehicleModel.title", target = "vehicleModelTitle")
    @Mapping(source = "vehicleModel.vehicleModelType", target = "vehicleModelType")
    @Mapping(source = "type.title", target = "typeTitle")
    @Mapping( target= "customPlaque", expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaque(),customer.getPlaqueTemplateCode()))")
    @Mapping( target = "customPlaqueTwo",expression = "java(new ir.donyapardaz.niopdc.base.service.dto.CustomPlaqueDTO(customer.getPlaqueTwo(),customer.getPlaqueTwoTemplateCode()))")
    CarCustomerDTO toCarDto(Customer customer);

    @Mapping(source = "type", target = "type")
    @Mapping(source = "carTanks", target = "carTanks")
    @Mapping(source = "carRfIds", target = "carRfIds")
    @Mapping(source = "vehicleModel", target = "vehicleModel")
    @Mapping(source = "vehicleModel.product.code", target = "vehicleModel.productCode")
    @Mapping(source = "vehicleModel.product.title", target = "vehicleModel.productTitle")
    @Mapping(source = "vehicleModel.product.id", target = "vehicleModel.productId")
    @Mapping(source = "country.code", target = "countryCode")
    @Mapping(source = "country.id", target = "countryId")
    CarCustomerOfflineDTO toCarOfflineDTO(Customer customer);

    Customer toCustomerFromOffline(CarCustomerOfflineDTO dto);

}
