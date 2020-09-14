package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.service.dto.StakeholderDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Stakeholder and its DTO StakeholderDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class})
public interface StakeholderMapper extends EntityMapper<StakeholderDTO, Stakeholder> {

    @Mapping(source = "company.id", target = "companyId")
    @Mapping(source = "company.name", target = "companyName")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "person.name", target = "personName")
    StakeholderDTO toDto(Stakeholder stakeholder);

    @Mapping(source = "companyId", target = "company")
    @Mapping(source = "personId", target = "person")
    Stakeholder toEntity(StakeholderDTO stakeholderDTO);

    default Stakeholder fromId(Long id) {
        if (id == null) {
            return null;
        }
        Stakeholder stakeholder = new Stakeholder();
        stakeholder.setId(id);
        return stakeholder;
    }
}
