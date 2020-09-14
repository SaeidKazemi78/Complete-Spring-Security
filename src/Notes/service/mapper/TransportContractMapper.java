package ir.donyapardaz.niopdc.base.service.mapper;

import ir.donyapardaz.niopdc.base.domain.TransportContract;
import ir.donyapardaz.niopdc.base.service.dto.TransportContractDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity TransportContract and its DTO TransportContractDTO.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, PersonMapper.class})
public interface TransportContractMapper extends EntityMapper<TransportContractDTO, TransportContract> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "customer.name", target = "customerName")
    @Mapping(source = "person.id", target = "personId")
    @Mapping(expression = "java(transportContract.getPerson().getPersonality() == ir.donyapardaz.niopdc.base.domain.enumeration.Personality.LEGAL ? transportContract.getPerson().getName(): transportContract.getPerson().getFirstName() +\" \"+ transportContract.getPerson().getLastName())", target = "personName")
    TransportContractDTO toDto(TransportContract transportContract);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "personId", target = "person")
    TransportContract toEntity(TransportContractDTO transportContractDTO);
    /*default TransportContract fromId(Long id) {
        if (id == null) {
            return null;
        }
        TransportContract transportContract = new TransportContract();
        transportContract.setId(id);
        return transportContract;
    }*/
}
