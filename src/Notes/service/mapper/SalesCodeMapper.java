package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.SalesCodeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SalesCode and its DTO SalesCodeDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface SalesCodeMapper extends EntityMapper<SalesCodeDTO, SalesCode> {

    @Mapping(source = "person.id", target = "personId")
    SalesCodeDTO toDto(SalesCode salesCode);

    @Mapping(source = "personId", target = "person")
    SalesCode toEntity(SalesCodeDTO salesCodeDTO);

    default SalesCode fromId(Long id) {
        if (id == null) {
            return null;
        }
        SalesCode salesCode = new SalesCode();
        salesCode.setId(id);
        return salesCode;
    }
}
