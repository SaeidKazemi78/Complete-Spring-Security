package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.projection.SellContractProductCurrencyRateGroup;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.SellContractProductFullDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.ArrayList;
import java.util.List;

/**
 * Mapper for the entity SellContractProduct and its DTO SellContractProductFullDTO.
 */
@Mapper(componentModel = "spring", uses = {ConsumptionMapper.class, ProductMapper.class, SellContractCustomerMapper.class, SellContractMapper.class, DepotMapper.class, BuyTypeMapper.class})
public interface SellContractProductMapper extends EntityMapper<SellContractProductDTO, SellContractProduct> {

    @Mapping(source = "consumption.id", target = "consumptionId")
    @Mapping(source = "consumption.title", target = "consumptionTitle")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.productGroup.id", target = "productGroupId")
    @Mapping(source = "product.hasContainer", target = "hasContainer")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "product.productGroup.color", target = "productColor")
    @Mapping(source = "sellContractCustomer.id", target = "sellContractCustomerId")
    @Mapping(source = "sellContractCustomer.customer.name", target = "customerName")
    @Mapping(source = "sellContract.contractNo", target = "sellContractNumber")
    @Mapping(source = "sellContract.id", target = "sellContractId")
    @Mapping(target = "manualQuota", expression = "java(" +
        "            sellContractProduct.getSellContractCustomer() != null &&" +
        "                sellContractProduct.getSellContractCustomer().getCustomer() != null &&" +
        "                sellContractProduct.getSellContractCustomer().getCustomer().getType() != null &&" +
        "                (" +
        "                    (" +
        "                        sellContractProduct.getSellContractCustomer().getCustomer().getType().getCustomerGroup() != ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup.SELLER &&" +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getCustomerGroup() != ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup.MAJOR_CONSUMER" +
        "                    ) || (" +
        "                        sellContractProduct.getConsumption().getManualQuota() != null && sellContractProduct.getConsumption().getManualQuota() &&" +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getManualQuota() != null && " +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getManualQuota()" +
        "                    )" +
        "                ))")
    @Mapping(target = "costGroupIds", ignore = true)
    SellContractProductDTO toDto (SellContractProduct sellContractProduct);

    @Mapping(source = "consumption.id", target = "consumptionId")
    @Mapping(source = "consumption.title", target = "consumptionTitle")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.productGroup.id", target = "productGroupId")
    @Mapping(source = "product.hasContainer", target = "hasContainer")
    @Mapping(source = "product.calculateContainerPrice", target = "calculateContainerPrice")
    @Mapping(source = "product.container.id", target = "containerId")
    @Mapping(source = "product.container.capacity", target = "containerCapacity")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "product.productGroup.color", target = "productColor")
    @Mapping(source = "sellContractCustomer.id", target = "sellContractCustomerId")
    @Mapping(source = "sellContractCustomer.customer.name", target = "customerName")
    @Mapping(source = "sellContract.contractNo", target = "sellContractNumber")
    @Mapping(source = "sellContract.id", target = "sellContractId")
    @Named("toDtoForOrderFind")
    SellContractProductDTO toDtoForOrderFind(SellContractProduct sellContractProduct);

    default List<SellContractProductDTO> toDtoForOrderFind (List<SellContractProduct> sellContractProducts){
        List<SellContractProductDTO> sellContractProductsDtos = new ArrayList<>();
        for (SellContractProduct sellContractProduct : sellContractProducts) {
            sellContractProductsDtos.add(toDtoForOrderFind(sellContractProduct));
        }
        return sellContractProductsDtos;
    }


    @Mapping(source = "consumption.id", target = "consumptionId")
    @Mapping(source = "consumption.title", target = "consumptionTitle")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.productGroup.id", target = "productGroupId")
    @Mapping(source = "product.title", target = "productTitle")
    @Mapping(source = "product.productGroup.color", target = "productColor")
    @Mapping(source = "sellContractCustomer.id", target = "sellContractCustomerId")
    @Mapping(source = "sellContractCustomer.customer.name", target = "customerName")
    @Mapping(source = "sellContract.contractNo", target = "sellContractNumber")
    @Mapping(source = "sellContract.id", target = "sellContractId")
    @Mapping(source="depots",target = "depots" ,qualifiedByName = "toSummarizedDto")
    @Mapping(target = "manualQuota", expression = "java(" +
        "            sellContractProduct.getSellContractCustomer() != null &&" +
        "                sellContractProduct.getSellContractCustomer().getCustomer() != null &&" +
        "                sellContractProduct.getSellContractCustomer().getCustomer().getType() != null &&" +
        "                (" +
        "                    (" +
        "                        sellContractProduct.getSellContractCustomer().getCustomer().getType().getCustomerGroup() != ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup.SELLER &&" +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getCustomerGroup() != ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup.MAJOR_CONSUMER" +
        "                    ) || (" +
        "                        sellContractProduct.getConsumption().getManualQuota() != null && sellContractProduct.getConsumption().getManualQuota() &&" +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getManualQuota() != null && " +
        "                            sellContractProduct.getSellContractCustomer().getCustomer().getType().getManualQuota()" +
        "                    )" +
        "                ))")
    @Named("toFullDto")
    SellContractProductFullDTO toFullDto (SellContractProduct sellContractProduct);

    @Mapping(source = "consumptionId", target = "consumption")
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "sellContractCustomerId", target = "sellContractCustomer")
    @Mapping(source = "sellContractId", target = "sellContract")
    SellContractProduct toEntity(SellContractProductFullDTO sellContractProductFullDTO);

    default SellContractProduct fromId(Long id) {
        if (id == null) {
            return null;
        }
        SellContractProduct sellContractProduct = new SellContractProduct();
        sellContractProduct.setId(id);
        return sellContractProduct;
    }

    @Mapping(source = "sellContractProduct.id", target = "id")
    @Mapping(source = "sellContractProduct.consumption.id", target = "consumptionId")
    @Mapping(source = "sellContractProduct.consumption.title", target = "consumptionTitle")
    @Mapping(source = "sellContractProduct.product.id", target = "productId")
    @Mapping(source = "sellContractProduct.product.title", target = "productTitle")
    @Mapping(source = "sellContractProduct.sellContractCustomer.id", target = "sellContractCustomerId")
    @Mapping(source = "sellContractProduct.sellContractCustomer.customer.name", target = "customerName")
    @Mapping(source = "sellContractProduct.depots", target = "depots")
    @Mapping(source = "sellContractProduct.buyTypes", target = "buyTypes")
    @Mapping(source = "sellContractProduct.costGroupIds", target = "costGroupIds")
    @Mapping(source = "sellContractProduct.currencyIds", target = "currencyIds")
    @Mapping(source = "sellContractProduct.sellContractCustomer.sellContract.id", target = "sellContractId")
    @Mapping(source = "sellContractProduct.sellContractCustomer.sellContract.contractNo", target = "sellContractNumber")
    @Mapping(source = "currencyRateGroup.id", target = "currencyRateGroupId")
    @Mapping(source = "currencyRateGroup.title", target = "currencyRateGroupTitle")
    @Mapping(source = "rateGroup.id", target = "rateGroupId")
    @Mapping(source = "rateGroup.title", target = "rateGroupTitle")
    SellContractProductFullDTO customToDto(SellContractProductCurrencyRateGroup sellContractProductCurrencyRateGroup);
}
