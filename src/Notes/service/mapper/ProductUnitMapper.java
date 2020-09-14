package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.ProductUnitDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductUnit and its DTO ProductUnitDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductUnitMapper extends EntityMapper<ProductUnitDTO, ProductUnit> {



    default ProductUnit fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductUnit productUnit = new ProductUnit();
        productUnit.setId(id);
        return productUnit;
    }
}
