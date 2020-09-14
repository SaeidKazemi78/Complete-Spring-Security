package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerVisit;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerVisit entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Long> , QueryDslPredicateExecutor<CustomerVisit> {

    Page<CustomerVisit> findByCustomer_Id(Long id, Pageable pageable);
}
