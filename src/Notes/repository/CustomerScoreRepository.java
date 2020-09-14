package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerScore;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the CustomerScore entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerScoreRepository extends JpaRepository<CustomerScore, Long> ,QueryDslPredicateExecutor<CustomerScore> {

    Page<CustomerScore> findByCustomer_Id(Long id, Pageable pageable);
}
