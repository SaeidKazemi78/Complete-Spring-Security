package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.UserContractTypeCustomerType;
import ir.donyapardaz.niopdc.base.domain.embeddableid.UserContractTypeCustomerTypeId;
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
public interface UserContractTypeCustomerTypeRepository extends JpaRepository<UserContractTypeCustomerType, UserContractTypeCustomerTypeId>, QueryDslPredicateExecutor<UserContractTypeCustomerType> {
}
