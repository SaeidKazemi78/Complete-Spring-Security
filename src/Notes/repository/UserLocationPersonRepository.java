package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.UserLocationPerson;
import ir.donyapardaz.niopdc.base.domain.embeddableid.UserLocationPersonId;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the UserDataAccess entity.
 */
@SuppressWarnings("unused")
@Repository
/*@JaversSpringDataAuditable*/
public interface UserLocationPersonRepository extends JpaRepository<UserLocationPerson, UserLocationPersonId>, QueryDslPredicateExecutor<UserLocationPerson> {
}
