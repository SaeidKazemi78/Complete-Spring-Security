package ir.donyapardaz.niopdc.base.repository.custom;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.service.dto.PersonCustomDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.ZonedDateTime;
import java.util.List;


public interface PersonRepositoryCustom {

    Page<Person> findAll(String query, Pageable pageable , boolean isTransport);
    Page<Person> findAllSelector(Boolean self, String query, Pageable pageable);
    Page<Person> findAllBySellContractAirplane(String query, Pageable pageable);
//    List<CustomerPerson> findPersonAndCustomer(String username, Long locationId , ZonedDateTime date,List<ContractType> contractTypes);
//    List<CustomerPerson> findPerson(String username, Long locationId , ZonedDateTime date,List<ContractType> contractTypes);
    List<PersonCustomDTO> findPersonForFactor(Long personId);

}
