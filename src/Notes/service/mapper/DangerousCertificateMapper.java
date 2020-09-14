package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.DangerousCertificateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity DangerousCertificate and its DTO DangerousCertificateDTO.
 */
@Mapper(componentModel = "spring", uses = {DriverMapper.class, DepotMapper.class})
public interface DangerousCertificateMapper extends EntityMapper<DangerousCertificateDTO, DangerousCertificate> {

    @Mapping(source = "driver.id", target = "driverId")
    @Mapping(source = "depot.id", target = "depotId")
    @Mapping(source = "depot.title", target = "depotName")
    DangerousCertificateDTO toDto(DangerousCertificate dangerousCertificate);

    @Mapping(source = "driverId", target = "driver")
    @Mapping(source = "depotId", target = "depot")
    DangerousCertificate toEntity(DangerousCertificateDTO dangerousCertificateDTO);

    default DangerousCertificate fromId(Long id) {
        if (id == null) {
            return null;
        }
        DangerousCertificate dangerousCertificate = new DangerousCertificate();
        dangerousCertificate.setId(id);
        return dangerousCertificate;
    }
}
