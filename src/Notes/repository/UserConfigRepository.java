package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.ShiftWork;
import ir.donyapardaz.niopdc.base.domain.UserConfig;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the UserConfig entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface UserConfigRepository extends JpaRepository<UserConfig, Long> , QueryDslPredicateExecutor<UserConfig> {

    Page<UserConfig> findAllByUsername(String username, Pageable pageable);
}
