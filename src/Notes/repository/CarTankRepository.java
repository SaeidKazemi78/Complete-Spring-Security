package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CarTank;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the CarTank entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CarTankRepository extends JpaRepository<CarTank, Long>, QueryDslPredicateExecutor<CarTank> {

    Page<CarTank> findByCustomer_Id(Long id, Pageable pageable);

    List<CarTank> findAllByIdInOrderByTankNo(List<Long> ids);

    @Query(
        "select carTank from CarTank carTank " +
            "inner join fetch carTank.customer customer " +
            "where  " +
            "customer.carRfId = :rfId  " +
            "order by carTank.tankNo "
    )
    List<CarTank> findCarTankByTankNoAndRfId(@Param("rfId") String rfId);
}
