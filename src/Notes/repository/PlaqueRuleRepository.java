package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.PlaqueRule;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the PlaqueRule entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface PlaqueRuleRepository extends JpaRepository<PlaqueRule, Long>, QueryDslPredicateExecutor<PlaqueRule> {

    Page<PlaqueRule> findByPlaque_Id(Long id, Pageable pageable);
}
