package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerCredit;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyTypeUsage;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerCreditRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;


/**
 * Spring Data JPA repository for the CustomerCredit entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerCreditRepository extends JpaRepository<CustomerCredit, Long>, QueryDslPredicateExecutor<CustomerCredit>, CustomerCreditRepositoryCustom {


    Page<CustomerCredit> findByCustomerIdAndParentBuyType_BuyGroupIn(Long id, List<BuyGroup> buyGroups, Pageable pageable);

    Page<CustomerCredit> findAllByProductIdAndParentBuyType_BuyGroupIn(Long id, List<BuyGroup> buyGroups, Pageable pageable);

    @Query(value = "select max(credit.creditNumber) from CustomerCredit credit")
    Integer findMaxCreditNumber();


    @Query(value =
        "select customerCredit from CustomerCredit customerCredit " +
            "left join customerCredit.customer customer " +
            "left join customerCredit.person person " +
            "left join customerCredit.product product " +
            "left join product.sellContractCustomer sellContractCustomer " +
            "left join sellContractCustomer.location location " +
            "left join customerCredit.customerCreditAllowedDays customerCreditAllowedDays " +
            "where " +
            "(customer.id = :customerId or person.id =:personId)" +
            "and (product is null or product.id in :productIds) " +
            "and (location is null or location.id = :locationId) " +
            "and customerCredit.currencyId = :currencyId " +
            "and customerCredit.active = :active " +
            "and customerCredit.parentBuyType.buyGroup in (:buyGroups) " +
            "and ((customerCredit.hasAllowedDays=true and customerCreditAllowedDays.id is not null and " +
            "( customerCreditAllowedDays.day between :startDate and :endDate)) or " +
            "   (customerCredit.hasAllowedDays is null or customerCredit.hasAllowedDays = false)) " +
            "and (:nationalCurrency=true or customerCredit.currencyRateGroupId = :currencyRateGroupId )" +
            "and customerCredit.startDate <= :date and (customerCredit.finishDate is null or customerCredit.finishDate >= :date )"

    )
    List<CustomerCredit> findAllByFilter(
        @Param("customerId") Long customerId,
        @Param("personId") Long personId,
        @Param("currencyRateGroupId") Long currencyRateGroupId,
        @Param("nationalCurrency") Boolean nationalCurrency,
        @Param("productIds") List<Long> productIds,
        @Param("currencyId") Long currencyId,
        @Param("locationId") Long locationId,
        @Param("date") ZonedDateTime date,
        @Param("buyGroups") List<BuyGroup> buyGroups,
        @Param("startDate") ZonedDateTime startDate,
        @Param("endDate") ZonedDateTime endDate,
        @Param("active") Boolean active
    );

    @Query(value =
        "select customerCredit from CustomerCredit customerCredit " +
            "inner join customerCredit.customer customer " +
            "inner join customerCredit.parentBuyType parentBuyType " +
            "inner join customerCredit.product product " +
            "inner join product.sellContractCustomer sellContractCustomer " +
            "left join customerCredit.customerCreditAllowedDays customerCreditAllowedDays " +
            "where customer.id = :customerId " +
            "and product.id = :productId " +
            "and parentBuyType.buyGroup in :buyGroups " +
            "and customerCredit.startDate <= :date " +
            "and customerCredit.active =:active " +
            "and (customerCredit.hasAllowedDays=true and (customerCreditAllowedDays.id is not null and " +
            " customerCreditAllowedDays.day between :startDate and :endDate) or (customerCredit.hasAllowedDays is null or customerCredit.hasAllowedDays = false)) " +
            "and (customerCredit.finishDate is null or customerCredit.finishDate >= :date )"

    )
    CustomerCredit findAllByFilter(
        @Param("customerId") Long customerId,
        @Param("productId") Long productIds,
        @Param("date") ZonedDateTime date,
        @Param("buyGroups") List<BuyGroup> buyGroups,
        @Param("startDate") ZonedDateTime startDate,
        @Param("endDate") ZonedDateTime endDate,
        @Param("active") Boolean active);

    @Query(value =
        "select customerCredit from CustomerCredit customerCredit " +
            "inner join customerCredit.person person " +
            "inner join customerCredit.parentBuyType parentBuyType " +
            "where person.id = :personId " +
            "and parentBuyType.buyGroup = :buyGroup " +
            "and parentBuyType.buyTypeUsage = :buyTypeUsage " +
            "and customerCredit.currencyId = :currencyId " +
            "and (:nationalCurrency=true or customerCredit.currencyRateGroupId = :currencyRateGroupId )" +
            "and customerCredit.startDate <= :date " +
            "and (customerCredit.finishDate is null or customerCredit.finishDate >= :date )" +
            "and customerCredit.active =:active"

    )
    List<CustomerCredit> findAllByFilter(
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("buyTypeUsage") BuyTypeUsage buyTypeUsage,
        @Param("currencyId") Long currencyId,
        @Param("currencyRateGroupId") Long currencyRateGroupId,
        @Param("nationalCurrency") Boolean nationalCurrency,
        @Param("active") Boolean active
    );

    @Query(value =
        "select customerCredit from CustomerCredit customerCredit " +
            "inner join customerCredit.customer customer " +
            "inner join customerCredit.parentBuyType parentCredit " +
            "inner join customerCredit.product product " +
            "inner join product.sellContractCustomer sellContractCustomer " +
            "where customer.id = :customerId " +
            "and product.id in :productIds " +
            "and parentCredit.buyGroup in :buyGroups " +
            "and customerCredit.startDate <= :date and (customerCredit.finishDate is null or customerCredit.finishDate >= :date ) " +
            "and customerCredit.active=:active"

    )
    List<CustomerCredit> findAllByFilter(
        @Param("customerId") Long customerId,
        @Param("productIds") List<Long> productIds,
        @Param("date") ZonedDateTime date,
        @Param("buyGroups") List<BuyGroup> buyGroups,
        @Param("active") Boolean active
    );

    @Query(
        "select customerCredit from CustomerCredit customerCredit" +
            " where customerCredit.id in (:ids)"
    )
    List<CustomerCredit> findByIds(@Param("ids") List<Long> ids);

    Page<CustomerCredit> findByPerson_Id(Long id, Pageable pageable);

    @Query(
        value = "select count(sellContractProductCredit.id) from CustomerCredit sellContractProductCredit " +
            "inner join sellContractProductCredit.parentBuyType buyType " +
            "inner join sellContractProductCredit.product product " +
            "where " +
            "product.id=:sellContractProductId and " +
            "(:creditId is null or :creditId<> sellContractProductCredit.id) and " +
            "sellContractProductCredit.active=:active and " +
            "buyType.buyGroup='QUOTA' and ((sellContractProductCredit.startDate between :startDate AND :finishDate) " +
            "        or (sellContractProductCredit.finishDate between :startDate AND :finishDate)  " +
            "        or (:startDate between sellContractProductCredit.startDate AND sellContractProductCredit.finishDate)) "
    )
    Long conflictQuotaTypeForSellContractProduct(@Param("sellContractProductId") Long sellContractProductId,
                                                 @Param("startDate") ZonedDateTime startDate,
                                                 @Param("finishDate") ZonedDateTime finishDate,
                                                 @Param("creditId") Long creditId,
                                                 @Param("active") Boolean active);

    @Query(
        "select customerCredit from CustomerCredit customerCredit " +
            "inner join customerCredit.product product " +
            "inner join customerCredit.parentBuyType parentBuyType " +
            "where " +
            "parentBuyType.buyGroup = :buyGroup and " +
            "product.id = :sellContractProductId and " +
            "customerCredit.active=:active "
    )
    CustomerCredit findOneByBuyGroupAndSellContractProduct(
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("sellContractProductId") Long sellContractProductId,
        @Param("active") Boolean active
    );

    @Query("select customerCredit from CustomerCredit customerCredit " +
        "left join  customerCredit.person person " +
        "left join customerCredit.customer customer " +
        "inner join fetch customerCredit.parentBuyType parentCredit " +
        "left join fetch customerCredit.customerCreditAllowedDays day " +
        "where (person.id = :personId or :personId is null) " +
        "and (customer.id = :customerId or :customerId is null) " +
        "and (customerCredit.product.id is null  or customerCredit.product.id = :sellContractProductId) " +
        "and parentCredit.buyGroup = :buyGroup " +
        "and (parentCredit.buyGroup.typeEffect = 'AMOUNT' or customerCredit.currencyId = :currencyId) " +
        "and (((customerCredit.startDate is null  or  customerCredit.startDate <= :date ) " +
        "        and (customerCredit.finishDate is null or customerCredit.finishDate >= :date )) " +
        "     or ( customerCredit.hasAllowedDays is not null  and  customerCredit.hasAllowedDays = true  and ( year(day.day) = year(:date) and month(day.day) = month(:date) and day(day.day) = day(:date)) )) " +
       "and customerCredit.active = true " +
        "and ((parentCredit.buyGroup.typeEffect in ('CREDIT', 'BOTH') and customerCredit.currentCredit > 0) " +
        "       or (parentCredit.buyGroup.typeEffect in ('AMOUNT', 'BOTH') and customerCredit.currentAmount > 0) )" +
        "order by customerCredit.startDate"
    )
    List<CustomerCredit> findAllByActiveAndPersonIdAndCurrencyIdAndDate(@Param("personId") Long personId,
                                                                        @Param("customerId") Long customerId,
                                                                        @Param("sellContractProductId") Long sellContractProductId,
                                                                        @Param("currencyId") Long currencyId,
                                                                        @Param("buyGroup") BuyGroup buyGroup,
                                                                        @Param("date") ZonedDateTime date);


    List<CustomerCredit> findAllByIdIn(Set<Long> ids);
}
