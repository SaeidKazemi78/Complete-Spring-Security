package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.service.dto.SpecifyRateDTO;
import ir.donyapardaz.niopdc.base.service.remote.specifyrate.CustomerWSStub;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity SpecifyRate and its DTO SpecifyRateDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SpecifyRateMapper extends EntityMapper<SpecifyRateDTO, CustomerWSStub.AddCustomer> {

}
