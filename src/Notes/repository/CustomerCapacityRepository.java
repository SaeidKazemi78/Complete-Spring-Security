package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerCapacity;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerCapacity entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerCapacityRepository extends JpaRepository<CustomerCapacity, Long>, QueryDslPredicateExecutor<CustomerCapacity> {

    Page<CustomerCapacity> findByCustomer_Id(Long id, Pageable pageable);
}
