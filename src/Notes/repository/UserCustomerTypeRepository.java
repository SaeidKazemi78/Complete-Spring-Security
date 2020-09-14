package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.UserCustomerType;
import ir.donyapardaz.niopdc.base.domain.embeddableid.UserCustomerTypeId;
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
public interface UserCustomerTypeRepository extends JpaRepository<UserCustomerType, UserCustomerTypeId>, QueryDslPredicateExecutor<UserCustomerType> {
}
