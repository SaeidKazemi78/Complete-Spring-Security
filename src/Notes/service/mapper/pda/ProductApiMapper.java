package ir.donyapardaz.niopdc.base.service.mapper.pda;

import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ContainerMapper;
import ir.donyapardaz.niopdc.base.service.mapper.EntityMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductGroupMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductUnitMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductApiMapper extends EntityMapper<ProductDTO, Product> {


    ProductDTO toDto(Product product);

}
