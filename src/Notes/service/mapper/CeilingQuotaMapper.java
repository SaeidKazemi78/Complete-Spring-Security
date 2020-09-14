package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.CeilingQuotaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity CeilingQuota and its DTO CeilingQuotaDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerCreditMapper.class})
public interface CeilingQuotaMapper extends EntityMapper<CeilingQuotaDTO, CeilingQuota> {

    @Mapping(source = "customerCredit.id", target = "customerCreditId")
    CeilingQuotaDTO toDto(CeilingQuota ceilingQuota);

    @Mapping(source = "customerCreditId", target = "customerCredit")
    CeilingQuota toEntity(CeilingQuotaDTO ceilingQuotaDTO);

    default CeilingQuota fromId(Long id) {
        if (id == null) {
            return null;
        }
        CeilingQuota ceilingQuota = new CeilingQuota();
        ceilingQuota.setId(id);
        return ceilingQuota;
    }
}
