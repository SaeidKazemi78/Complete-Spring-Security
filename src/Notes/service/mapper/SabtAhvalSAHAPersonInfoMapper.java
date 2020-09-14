package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.CarTank;
import ir.donyapardaz.niopdc.base.domain.SabtAhvalSAHAPersonInfo;
import ir.donyapardaz.niopdc.base.service.dto.CarTankDTO;
import ir.donyapardaz.niopdc.base.service.dto.SabtAhvalSAHAPersonInfoDTO;
import ir.donyapardaz.niopdc.base.service.remote.pperson.SabtAhvalSAHAPersonInfoStract;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity CarTank and its DTO CarTankDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SabtAhvalSAHAPersonInfoMapper extends EntityMapper<SabtAhvalSAHAPersonInfoDTO, SabtAhvalSAHAPersonInfo> {

    SabtAhvalSAHAPersonInfoStract toStract(SabtAhvalSAHAPersonInfo personInfo);

    SabtAhvalSAHAPersonInfo fromStract(SabtAhvalSAHAPersonInfoStract personInfo);

    SabtAhvalSAHAPersonInfoDTO toDto(SabtAhvalSAHAPersonInfo personInfo);

    default SabtAhvalSAHAPersonInfo fromId(String id) {
        if (id == null) {
            return null;
        }
        SabtAhvalSAHAPersonInfo personInfo = new SabtAhvalSAHAPersonInfo();
        personInfo.setNationalCode(id);
        return personInfo;
    }
}
