package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.RegionDTO;

import ir.donyapardaz.niopdc.base.service.dto.RegionListDTO;
import org.mapstruct.*;

import java.util.List;

/**
 * Mapper for the entity Region and its DTO RegionDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class,CountryMapper.class})
public interface RegionMapper extends EntityMapper<RegionDTO, Region> {


    RegionListDTO toListDto(Region region);
    List<RegionListDTO> toListDto(List<Region> region);

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.name", target = "countryName")
    @Mapping(source = "parent.id", target = "parentId")
    @Mapping(source = "parent.name", target = "parentName")
    @Mapping(target= "locations", ignore = true)
    RegionDTO toDto(Region region);

    @Mapping(target = "subRegions", ignore = true)
    @Mapping(source = "countryId", target = "country")
    @Mapping(source = "parentId", target = "parent")
    Region toEntity(RegionDTO regionDTO);

    default Region fromId(Long id) {
        if (id == null) {
            return null;
        }
        Region region = new Region();
        region.setId(id);
        return region;
    }
}
