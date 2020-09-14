package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.NiopdcConfigDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NiopdcConfig and its DTO NiopdcConfigDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NiopdcConfigMapper extends EntityMapper<NiopdcConfigDTO, NiopdcConfig> {



    default NiopdcConfig fromId(Long id) {
        if (id == null) {
            return null;
        }
        NiopdcConfig niopdcConfig = new NiopdcConfig();
        niopdcConfig.setId(id);
        return niopdcConfig;
    }
}
