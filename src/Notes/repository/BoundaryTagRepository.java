package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.BoundaryTag;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the BoundaryTag entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface BoundaryTagRepository extends JpaRepository<BoundaryTag, Long>, QueryDslPredicateExecutor<BoundaryTag> {

    Page<BoundaryTag> findByLocation_Id(Long id, Pageable pageable);
    BoundaryTag findFirstByLocation_IdAndAmountGreaterThan(Long locationId,Long amount);
}
