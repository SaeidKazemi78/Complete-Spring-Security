package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.service.dto.RegionListDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionSelectorDTO;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * Mapper for the entity Region and its DTO RegionDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionListMapper.class})
public interface RegionSelectorMapper extends EntityMapper<RegionSelectorDTO, Region> {

    default Region fromId(Long id) {
        if (id == null) {
            return null;
        }
        Region region = new Region();
        region.setId(id);
        return region;
    }
}
