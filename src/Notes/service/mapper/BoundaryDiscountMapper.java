package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BoundaryDiscount and its DTO BoundaryDiscountDTO.
 */
@Mapper(componentModel = "spring", uses = { LocationMapper.class, CountryMapper.class})
public interface BoundaryDiscountMapper extends EntityMapper<BoundaryDiscountDTO, BoundaryDiscount> {


    BoundaryDiscountDTO toDto(BoundaryDiscount boundaryDiscount);

    BoundaryDiscount toEntity(BoundaryDiscountDTO boundaryDiscountDTO);

    default BoundaryDiscount fromId(Long id) {
        if (id == null) {
            return null;
        }
        BoundaryDiscount boundaryDiscount = new BoundaryDiscount();
        boundaryDiscount.setId(id);
        return boundaryDiscount;
    }
}
