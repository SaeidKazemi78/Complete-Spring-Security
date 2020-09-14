package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;

import ir.donyapardaz.niopdc.base.service.dto.ProductListDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductGroupMapper.class, ProductUnitMapper.class, ContainerMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "productGroup.id", target = "productGroupId")
    @Mapping(source = "productGroup.title", target = "productGroupTitle")
    @Mapping(source = "productUnit.id", target = "productUnitId")
    @Mapping(source = "productUnit.title", target = "productUnitTitle")
    @Mapping(source = "container.id", target = "containerId")
    @Mapping(source = "container.title", target = "containerTitle")
    @Mapping(source = "productGroup.color", target = "productColor")
    ProductDTO toDto(Product product);

    @Mapping(source = "productGroupId", target = "productGroup")
    @Mapping(source = "productUnitId", target = "productUnit")
    @Mapping(source = "containerId", target = "container")
    @Mapping(target = "productSrcs", ignore = true)
    @Mapping(target = "sellContractProducts", ignore = true)
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }

    @Mapping(source = "productGroup.title", target = "productGroupTitle")
    @Mapping(source = "productUnit.title", target = "productUnitTitle")
    @Mapping(source = "productGroup.color", target = "productColor")
    ProductListDTO toListDto(Product product);
}
