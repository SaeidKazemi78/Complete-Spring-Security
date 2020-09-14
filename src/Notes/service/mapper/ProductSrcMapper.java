package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ProductSrcDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductSrc and its DTO ProductSrcDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface ProductSrcMapper extends EntityMapper<ProductSrcDTO, ProductSrc> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productTitle")
    ProductSrcDTO toDto(ProductSrc productSrc);

    @Named("toDtoList")
    ProductSrcDTO toDtoList(ProductSrc productSrc);

    @Mapping(source = "productId", target = "product")
    ProductSrc toEntity(ProductSrcDTO productSrcDTO);

    default ProductSrc fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductSrc productSrc = new ProductSrc();
        productSrc.setId(id);
        return productSrc;
    }
}
