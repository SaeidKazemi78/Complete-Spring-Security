package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.SalesCode;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SalesCode entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface SalesCodeRepository extends JpaRepository<SalesCode, Long> {

}
