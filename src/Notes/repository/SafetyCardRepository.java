package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.SafetyCard;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the SafetyCard entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface SafetyCardRepository extends JpaRepository<SafetyCard, Long>, QueryDslPredicateExecutor<SafetyCard> {

    Page<SafetyCard> findByDriver_Id(Long id, Pageable pageable);
}
