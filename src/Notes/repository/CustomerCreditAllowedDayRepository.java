package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerCreditAllowedDay;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the CustomerCredit entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerCreditAllowedDayRepository extends JpaRepository<CustomerCreditAllowedDay, Long> {
    void deleteAllByCustomerCredit_Id(Long customerCreditId);
}
