package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ProductGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductGroup and its DTO ProductGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductGroupMapper extends EntityMapper<ProductGroupDTO, ProductGroup> {



    default ProductGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductGroup productGroup = new ProductGroup();
        productGroup.setId(id);
        return productGroup;
    }
}
