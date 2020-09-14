package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.DangerousCertificate;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the DangerousCertificate entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface DangerousCertificateRepository extends JpaRepository<DangerousCertificate, Long>, QueryDslPredicateExecutor<DangerousCertificate> {

    Page<DangerousCertificate> findByDriver_Id(Long id, Pageable pageable);
}
