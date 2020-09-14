package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CeilingQuota;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;


/**
 * Spring Data JPA repository for the CeilingQuota entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CeilingQuotaRepository extends JpaRepository<CeilingQuota, Long>, QueryDslPredicateExecutor<CeilingQuota> {

    Page<CeilingQuota> findByCustomerCredit_Id(Long id, Pageable pageable);

    @Query(
        "select count(cq) from CeilingQuota cq " +
            "inner join cq.customerCredit cc " +
            "where " +
            "((:id is null or :id<>cq.id) and " +
            "((:startDate between cq.startDate and cq.finishDate) or " +
            "(:finishDate between cq.startDate and cq.finishDate) or " +
            "(cq.startDate between :startDate and :finishDate)) " +
            ") "

    )
    Long checkConflict(@Param("id") Long id, @Param("startDate") ZonedDateTime startDate, @Param("finishDate") ZonedDateTime finishDate);

    @Query(
        "select cq from CeilingQuota cq " +
            "inner join fetch cq.customerCredit customerCredit " +
            "where " +
            "customerCredit.id = :id"
    )
    CeilingQuota findOneWithCustomerCredit(@Param("id") Long id);

    @Query(
        "select cq from CeilingQuota cq " +
            "inner join cq.customerCredit cc " +
            "where " +
            "cc.id = :customerCreditId and " +
            ":now between cq.startDate and cq.finishDate"
    )
    CeilingQuota findOneWithCustomerCreditIdAndCurrentDate(@Param("customerCreditId") Long customerCreditId, @Param("now") ZonedDateTime now);
}
