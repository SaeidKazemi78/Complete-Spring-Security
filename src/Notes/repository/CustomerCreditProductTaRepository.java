package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerCreditProductTa;
import ir.donyapardaz.niopdc.base.domain.CustomerCreditTa;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the CustomerCredit entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerCreditProductTaRepository extends JpaRepository<CustomerCreditProductTa, Long>{


    CustomerCreditProductTa findOneByRequestNumberAndCustomerCreditTa_IsNew(String requestNumber, String isNew);
}
