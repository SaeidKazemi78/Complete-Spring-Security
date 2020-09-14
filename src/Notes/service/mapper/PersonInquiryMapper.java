package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.PersonInquiry;
import ir.donyapardaz.niopdc.base.service.dto.PersonInquiryDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface PersonInquiryMapper extends EntityMapper<PersonInquiryDTO, PersonInquiry> {

    PersonInquiryDTO toDto(PersonInquiry personInquiry);

    PersonInquiry toEntity(PersonInquiryDTO personInquiryDTO);

    default PersonInquiry fromId(Long id) {
        if (id == null) {
            return null;
        }
        PersonInquiry personInquiry = new PersonInquiry();
        personInquiry.setId(id);
        return personInquiry;
    }
}
