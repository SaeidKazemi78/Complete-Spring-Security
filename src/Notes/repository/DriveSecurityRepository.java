package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.DriveSecurity;
import ir.donyapardaz.niopdc.base.domain.Driver;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DriveSecurity entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface DriveSecurityRepository extends JpaRepository<DriveSecurity, Long> , QueryDslPredicateExecutor<DriveSecurity> {

    DriveSecurity findFirstByDriver_Id(Long id);

}
