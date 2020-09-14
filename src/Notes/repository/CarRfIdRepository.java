package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CarRfId;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


/**
 * Spring Data JPA repository for the CarType entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CarRfIdRepository extends JpaRepository<CarRfId, Long>, QueryDslPredicateExecutor<CarRfId> {


    @Query(
        "select count(carRfId) from CarRfId carRfId " +
            "where " +
            "(:id is null or (carRfId.id <> :id)) and " +
            "(carRfId.code = :code)"
    )
    Long existCode(@Param("id") Long id, @Param("code") String code);


    Page<CarRfId> findByCustomer_Id(Long id, Pageable pageable);

    @Query(
        "select count(carRfId) from CarRfId carRfId " +
            "where " +
            "carRfId.customer.id = :customerId and " +
            "carRfId.active = :active and " +
            "(:id is null or (carRfId.id<>:id))"
    )
    int findOneByActiveAndCustomer_Id(@Param("id") Long id, @Param("active") Boolean active, @Param("customerId") Long customerId);

    CarRfId findFirstByActiveAndCustomer_Id(Boolean active, Long customerId);

    Long countAllByCustomer_Id(Long customerId);

    @Query(
        "update CarRfId as c " +
            "set " +
            "c.active=false " +
            "where c.customer.id = :customerId"
    )
    @Modifying
    @Transactional
    void disableAllPreviousStatus(@Param("customerId") Long customerId);

    CarRfId findByCode(String code);
}
