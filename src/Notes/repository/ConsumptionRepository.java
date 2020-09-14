package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Consumption;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Consumption entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ConsumptionRepository extends JpaRepository<Consumption, Long>, QueryDslPredicateExecutor<Consumption> {

    @Query(
        "select distinct consumption from  Customer customer1 " +
            "inner join customer1.type type " +
            "inner join CustomerTypeProductConsumption ctpc on ctpc.customerType=type " +
            "inner join ctpc.consumption consumption " +
            "where customer1.id=:customerId"
    )
    Page<Consumption> findAllByCustomer(Pageable pageable, @Param("customerId") Long customerId);

    @Query(
        "select distinct consumption from  Customer customer1 " +
            "inner join customer1.type type " +
            "inner join CustomerTypeProductConsumption ctpc on ctpc.customerType=type " +
            "inner join ctpc.product product1 " +
            "inner join ctpc.consumption consumption " +
            "where customer1.id=:customerId and product1.id=:productId"
    )
    Page<Consumption> findByProduct(Pageable pageable, @Param("customerId") Long customerId, @Param("productId") Long productId);

}
