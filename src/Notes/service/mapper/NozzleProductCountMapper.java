package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.NozzleProductCountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity NozzleProductCount and its DTO NozzleProductCountDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerStationInfoMapper.class})
public interface NozzleProductCountMapper extends EntityMapper<NozzleProductCountDTO, NozzleProductCount> {

    @Mapping(source = "customerStationInfo.id", target = "customerStationInfoId")
    NozzleProductCountDTO toDto(NozzleProductCount nozzleProductCount);

    @Mapping(source = "customerStationInfoId", target = "customerStationInfo")
    NozzleProductCount toEntity(NozzleProductCountDTO nozzleProductCountDTO);

    default NozzleProductCount fromId(Long id) {
        if (id == null) {
            return null;
        }
        NozzleProductCount nozzleProductCount = new NozzleProductCount();
        nozzleProductCount.setId(id);
        return nozzleProductCount;
    }
}
