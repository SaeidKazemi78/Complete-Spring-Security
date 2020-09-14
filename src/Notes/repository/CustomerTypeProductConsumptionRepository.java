package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Consumption;
import ir.donyapardaz.niopdc.base.domain.CustomerTypeProductConsumption;
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
 * Spring Data JPA repository for the CustomerTypeProductConsumption entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerTypeProductConsumptionRepository extends JpaRepository<CustomerTypeProductConsumption, Long>, QueryDslPredicateExecutor<CustomerTypeProductConsumption> {


    Page<CustomerTypeProductConsumption> findByCustomerType_Id(Long customerTypeId, Pageable pageable);


    @Query(
        "select distinct consumption from Consumption consumption " +
            "left join consumption.customerTypeProductConsumptions customerTypeProductConsumption " +
            "left join customerTypeProductConsumption.customerType customerType " +
            "left join Customer customer on customer.type = customerType " +
            "where " +
            "customer.id = :customerId or (:customerId is null and customerTypeProductConsumption.id is null)"
    )
    List<Consumption> findAllConsumptionByProductAndCustomer(@Param("customerId") Long customerId);
 /*   List<Consumption> findAllConsumptionByProductAndCustomer(@Param("productId") Long productId,
                                                             @Param("customerId") Long customerId);*/
}
