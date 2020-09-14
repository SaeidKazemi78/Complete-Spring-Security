package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.BuyType;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
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
 * Spring Data JPA repository for the BuyType entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface BuyTypeRepository extends JpaRepository<BuyType, Long>, QueryDslPredicateExecutor<BuyType> {

    Page<BuyType> findAllByBuyGroupIn(List<BuyGroup> buyGroup, Pageable pageable);

    @Query(
        "select distinct buyType from BuyType buyType " +
            " inner join buyType.customerGroups as customerGroups " +
            "inner join Customer customer on customer.id = :customerId " +
            "inner join customer.type as customerType  " +
            "where " +
            " customerType.customerGroup = customerGroups " +
            " and (buyType.buyGroup in (:buyGroup) and buyType.buyGroup not in (:buyGroup2))"

    )
    List<BuyType> findAllByBuyGroupInAndBuyGroup(@Param("customerId") Long customerId, @Param("buyGroup") List<BuyGroup> buyGroup, @Param("buyGroup2") List<BuyGroup> buyGroup2);

    List<BuyType> findByBuyGroup(BuyGroup quota);
}
