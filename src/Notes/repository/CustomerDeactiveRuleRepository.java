package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the CustomerDeactiveRule entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerDeactiveRuleRepository extends JpaRepository<CustomerDeactiveRule, Long> ,QueryDslPredicateExecutor<CustomerDeactiveRule> ,CustomerDeactiveRuleRepositoryCustom{
    @Query("select distinct customer_deactive_rule from CustomerDeactiveRule customer_deactive_rule left join fetch customer_deactive_rule.locations left join fetch customer_deactive_rule.customerTypes")
    List<CustomerDeactiveRule> findAllWithEagerRelationships();

    @Query("select customer_deactive_rule from CustomerDeactiveRule customer_deactive_rule left join fetch customer_deactive_rule.locations left join fetch customer_deactive_rule.customerTypes where customer_deactive_rule.id =:id")
    CustomerDeactiveRule findOneWithEagerRelationships(@Param("id") Long id);



    @Query(
        "select count(cdr.id) from CustomerDeactiveRule cdr " +
            "left join cdr.locations locations " +
            "left join cdr.customerTypes customerTypes " +
            "inner join Customer customer on customer.id=:customerId " +
            "inner join customer.type customerType " +
            "inner join SellContract sellContract on sellContract.id=:sellContractId " +
            "where " +
            "(locations is not null or customerTypes is not null or cdr.sellContractCode is not null) and ( " +
            "(locations is null or (:locationId in (locations.id))) and " +
            "(customerTypes is null or (customerType.id in (customerTypes.id))) and " +
            "(cdr.sellContractCode is null or (cdr.sellContractCode = sellContract.contractNo)) and " +
            "( " +
            "(cdr.finishDate is not null and " +
            "( " +
            "(cdr.startDate between :startDate and :finishDate) " +
            "or " +
            "(:startDate between cdr.startDate and cdr.finishDate) " +
            ") " +
            ") " +
            "or " +
            "(cdr.startDate <= :startDate) " +
            ") " +
            ")"
    )
    Integer checkActive(@Param("locationId") Long locationId,
                        @Param("sellContractId") Long sellContractId,
                        @Param("customerId") Long customerId,
                        @Param("startDate") ZonedDateTime startDate,
                        @Param("finishDate") ZonedDateTime finishDate);



    @Query(
        "select distinct cdr from CustomerDeactiveRule cdr " +
            "inner join cdr.locations as locations " +
            "inner join LocationAccess as access on locations.id = access.id.id and access.id.username = :username " +
            "left join cdr.customerTypes customerTypes " +
            "left join cdr.exceptionCustomers exceptionCustomers " +
            " left join cdr.customer mCustomer "+
            "left join Customer customer on customer.id=:customerId " +
            "inner join customer.type customerType " +
            "where " +
            "( cdr.finishDate is null  or cdr.finishDate >= GETDATE() and cdr.startDate <= GETDATE() ) " +
            "and (cdr.periodic is null or cdr.periodic = false " +
            "       or ( cdr.periodic = true and  cdr.startPeriodDay <= dbo.GregorianToJalali(GETDATE(),'dd') and cdr.endPeriodDay >= dbo.GregorianToJalali(GETDATE(),'dd'))) " +
            " and  (((cdr.byCustomerType is null or cdr.byCustomerType = false)  and ( mCustomer is null or mCustomer.id = :customerId))" +
                     " or (cdr.byCustomerType = true  and (( customerTypes.id = customerType.id) and  (exceptionCustomers is null or  :customerId != exceptionCustomers ) ))) "


    )

    List<CustomerDeactiveRule> checkActive(@Param("customerId") Long customerId,
                                           @Param("username")String username);
}
