package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.TagRateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity TagRate and its DTO TagRateDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface TagRateMapper extends EntityMapper<TagRateDTO, TagRate> {

    @Mapping(source = "location.id", target = "locationId")
    @Mapping(source = "location.name", target = "locationName")
    TagRateDTO toDto(TagRate tagRate);

    @Mapping(source = "locationId", target = "location")
    TagRate toEntity(TagRateDTO tagRateDTO);

    default TagRate fromId(Long id) {
        if (id == null) {
            return null;
        }
        TagRate tagRate = new TagRate();
        tagRate.setId(id);
        return tagRate;
    }
}
