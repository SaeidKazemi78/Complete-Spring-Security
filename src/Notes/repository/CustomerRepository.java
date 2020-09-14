package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.Customer;
import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.Personality;
import ir.donyapardaz.niopdc.base.domain.projection.*;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerRepository extends JpaRepository<Customer, Long>, QueryDslPredicateExecutor<Customer>, CustomerRepositoryCustom {

    @Query("select distinct customer from Customer customer left join fetch customer.locations")
    List<Customer> findAllWithEagerRelationships();

    @Query("select distinct customer from Customer customer left join fetch customer.locations where customer.id in (:ids)")
    List<Customer> findAllByIdInWithEagerRelationships(@Param("ids") List<Long> ids);

    Customer findOneByIdentifyCode(String code);

    @Query(
        "select customer from Customer customer " +
            "left join fetch customer.locations " +
            "left join fetch customer.type " +
            "left join fetch customer.vehicleModel " +
            "left join fetch customer.region " +
            "left join fetch customer.product " +
            "where customer.id =:id"
    )
    Customer findOneWithEagerRelationships(@Param("id") Long id);


    @Query("select customer from Customer customer left join fetch customer.type where customer.id in :ids")
    Set<Customer> findAllByIdInAndFetchType(@Param("ids") List<Long> ids);

    @Query(
        value = "with location_code as (\n" +
            "    select concat ( m.code, n.code) as code from location m\n" +
            "      inner join location n on m.id = n.location_parent_id\n" +
            "      where n.id = :locationId),\n" +
            "max_old_code as (\n" +
            "      select\n" +
            "        max(Code) as code\n" +
            "        from niopdcbase_" + Profiles.activeProfile + ".dbo.old_customer\n" +
            "        where left(code  COLLATE Persian_100_CI_AI,4) = (select location_code.code from location_code)\n" +
            "  )\n" +
            ",\n" +
            "       max_code as (select max(identify_code) as code from niopdcbase_" + Profiles.activeProfile + ".dbo.customer\n" +
            "       where left(identify_code,4) = (select location_code.code from location_code))\n" +
            "       select max(code) as code from (\n" +
            "         select code\n" +
            "         from max_code\n" +
            "         union\n" +
            "         select code\n" +
            "         COLLATE Persian_100_CI_AI\n" +
            "         from max_old_code\n" +
            "       )codes\n"
        ,
        nativeQuery = true
    )
    Long generateCode(@Param("locationId") Long locationId);

    //todo fix it
    @Query(value = "select DISTINCT customer.* from customer" +
        " inner join customer_access on customer_access.id = customer.id and customer_access.username = :username " +
        " inner join sell_contract_customer scc ON customer.id = scc.customer_id" +
        " inner join sell_contract  sc on sc.id=scc.sell_contract_id" +
        " inner JOIN sell_contract_person scp on scp.sell_contract_id = sc.id" +
        " WHERE scc.location_id = :locationId " +
        "   AND sc.start_date <= :date " +
        "   AND sc.finish_date >= :date ", nativeQuery = true)
    List<Customer> findAllByLocation(@Param("username") String username, @Param("locationId") Long locationId, @Param("date") ZonedDateTime date);

    @Query(value = "select customer.* from customer_full customer" +
        " INNER JOIN sell_contract_customer ON  customer.id = sell_contract_customer.customer_id" +
        " where sell_contract_customer.sell_contract_id = :sellContractId and customer.start_date <= :exportationDate and :exportationDate < customer.finish_date", nativeQuery = true)
    Customer findBySellContractCustomerIdAndSystemTime(@Param("sellContractId") Long sellContractId, @Param("exportationDate") ZonedDateTime exportationDate);

    @Query("select customer1 from Customer customer1 " +
        "inner join customer1.type type1 " +
        "left join type1.customerTypeIgnores type2 " +
        "where customer1.postalCode = :postalCode and (type2.id is null or :myType <> type2) and " +
        "not exists (select type3 from CustomerType type3  " +
        "inner join type3.customerTypeIgnores type4" +
        "        where type1= type4 and type3=:myType) and " +
        "(:customerId is null or customer1.id<>:customerId)")
    List<Customer> findOneByPostalCodeAndPostalCodeIsNotNull(@Param("postalCode") String postalCode, @Param("myType") CustomerType myType, @Param("customerId") Long customerId);

    @Query(
        "select c as currency " +
            " from Currency c " +
            " where " +
            " c.id=:id"
    )
    Currency findCurrencyById(@Param("id") Long id);

    @Query(
        "select c as costGroup " +
            " from CostGroup c " +
            " where " +
            " c.id=:id"
    )
    CostGroup findCostGroupById(@Param("id") Long id);

    @Query(
        "select c as currencyRateGroup" +
            " from CurrencyRateGroup c " +
            " where " +
            " c.id=:id"
    )
    CurrencyRateGroup findCurrencyRateGroupById(@Param("id") Long id);

    @Query(
        "select c as rateGroup" +
            " from RateGroup c " +
            " where " +
            " c.id=:id"
    )
    RateGroup findRateGroupById(@Param("id") Long id);

    @Query(
        "select c as refuelCenter" +
            " from RefuelCenter c " +
            " where " +
            " c.id=:id"
    )
    RefuelCenter findRefuelCenterById(@Param("id") Long id);

    @Query(
        "select distinct customer from Customer customer " +
            "left join fetch customer.carTanks carTanks " +
            "where customer.carRfId like :rfId and (customer.archive is null or customer.archive=false) "
    )
    Customer findOneByRfId(@Param("rfId") String rfId);

    @Query(
        "select distinct customer from Customer customer " +
            "left join fetch customer.carTanks carTanks " +
            "where customer.carRfId=:rfId and (customer.archive is null or customer.archive=false) "
    )
    List<Customer> findByRfId(@Param("rfId") String rfId);


    @Query(
        "select distinct customer from Customer customer " +
            "left join fetch customer.carTanks carTanks " +
            "left join fetch customer.vehicleModel vehicleModel " +
            "left join fetch vehicleModel.product  " +
            "where customer.carRfId like :rfId " +
            " and (customer.archive is null or customer.archive = false) order by customer.valid DESC "
    )
    List<Customer> findAllByRfId(@Param("rfId") String rfId, Pageable pageable);

    @Query(
        "select distinct customer from Customer customer " +
            "left join customer.carRfIds carRfIds " +
            "left join fetch customer.vehicleModel vehicleModel " +
            "left join fetch vehicleModel.product  " +
            "where " +
            "(customer.plaque like :plaque or customer.plaqueTwo like :plaque) " +
            "and (customer.archive is null or customer.archive = false) " +
            "order by customer.valid DESC "
    )
    List<Customer> findOneByPlaque(@Param("plaque") String plaque, Pageable pageable);

    @Query(
        "select distinct customer from Customer customer " +
            "where " +
            "(customer.plaque = :plaque or customer.plaqueTwo=:plaque) and (customer.archive is null or customer.archive=false)"
    )
    Customer findOneByPlaque(@Param("plaque") String plaque);

    @Query(
        "select distinct customer from Customer customer " +
            "where " +
            "(customer.plaque = :plaque or customer.plaqueTwo=:plaque) and (customer.archive is null or customer.archive=false)"
    )
    List<Customer> findByPlaque(@Param("plaque") String plaque);

    @Query(
        value = "select count(customer) from Customer customer " +
            "left join customer.type type1 " +
            "left join customer.country country1 " +
            "where " +
            "(:id is null or (customer.id <> :id)) and " +
            "type1.id = :typeId and " +
            "country1.id = :countryId and " +
            "(customer.plaque=:plaqueOne or customer.plaqueTwo=:plaqueTwo " +
            " or customer.plaque =:plaqueTwo or customer.plaqueTwo=:plaqueOne) " +
            " and (customer.archive is null or customer.archive = false) "
    )
    Long existPlaque(@Param("id") Long id,
                     @Param("plaqueOne") String plaqueOne,
                     @Param("plaqueTwo") String plaqueTwo,
                     @Param("typeId") Long typeId,
                     @Param("countryId") Long countryId);

    List<Customer> findAllByLocations_Id(Long locationId);

    Page<Customer> findAllByType_CustomerGroup(CustomerGroup customerGroup, Pageable pageable);

    @Query("select case when (count(sc) > 0)  then true else false end from SellContract sc " +
        "inner join sc.sellContractCustomers scc " +
        "inner join scc.customer customer " +
        "inner join sc.sellContractPeople scp " +
        "inner join scp.person person " +
        "where person.personality = :personality and person.code = :personCode and customer.gsId = :customerCode")
    Boolean existsByCodeAndPersonalityAndPersonCode(@Param("customerCode") String customerCode,
                                                    @Param("personality") Personality personality,
                                                    @Param("personCode") String personCode);

    Boolean existsByType_Id(Long customerTypeId);

    @Query(
        "select count(customer.id) from Customer customer " +
            "inner join customer.customerDeactiveRules cdr " +
            /*         "inner join CustomerDeactiveRule cdr on cdr.customerCode = customer.code " +*/
            "where customer.id in :ids and " +
            "(cdr.startDate<:date and (cdr.finishDate is null or (cdr.finishDate>:date))) "
    )
    Integer checkActiveCustomer(@Param("ids") List<Long> ids, @Param("date") ZonedDateTime date);

    @Query(
        value = "\n" +
            "select max(cast(customer.identify_code as bigint))\n" +
            "from customer\n" +
            "       inner join customer_type ct on customer.type_id = ct.id\n" +
            "where ct.customer_group = 'BOUNDARY'", nativeQuery = true
    )
    Long getMaxCodeForBoundary();

    @Query(
        value = "\n" +
            "select max(cast(customer.identify_code as bigint))\n" +
            "from customer\n" +
            "       inner join customer_type ct on customer.type_id = ct.id\n" +
            "where ct.customer_group = 'AIRPLANE'", nativeQuery = true
    )
    Long getMaxCodeForAirplane();

    @Query("select distinct customer from Person p " +
        "inner join p.sellContractPeople scp " +
        "inner join scp.sellContract sc " +
        "inner join sc.sellContractCustomers scc " +
        "inner join scc.customer customer " +
        "where p.id = :id")
    List<Customer> findAllByPerson_Id(@Param("id") Long id);


    @Query("select case when (count(c) > 0)  then true else false end from Customer c " +
        "where c.registerCode = :registerCode and (:id is null or :id <> c.id)")
    boolean existsByRegisterCode(@Param("id") Long id, @Param("registerCode") String registerCode);

    @Query(
        value = "select count(customer) from Customer customer " +
            "left join customer.type type1 " +
            "left join customer.country country1 " +
            "where " +
            "( customer.archive is not null and customer.archive = true ) and " +
            "type1.id = :typeId and " +
            "country1.id = :countryId and " +
            "(:plaqueOne is null or customer.plaque=:plaqueOne or customer.plaqueTwo=:plaqueOne ) " +
            " and (:plaqueTwo is null or customer.plaque =:plaqueTwo or customer.plaqueTwo=:plaqueTwo )"
    )
    int isArchive(@Param("plaqueOne") String plaqueOne,
                  @Param("plaqueTwo") String plaqueTwo,
                  @Param("typeId") Long typeId,
                  @Param("countryId") Long countryId);

    @Query(
        value = "select count(customer) from Customer customer " +
            "where " +
            "(:plaqueOne is null or customer.plaque=:plaqueOne or customer.plaqueTwo=:plaqueOne ) " +
            " and (:plaqueTwo is null or customer.plaque =:plaqueTwo or customer.plaqueTwo=:plaqueTwo )"
    )
    int  getAllPlaque(@Param("plaqueOne") String plaqueOne,
                      @Param("plaqueTwo") String plaqueTwo);

    @Modifying
    @Query("update Customer as customer  set customer.archive = true " +
        " where customer.id = :customerId ")
    int archive(@Param("customerId") Long customerId);


    @Query(
        value = "select customer from Customer customer " +
            "inner join fetch customer.type type " +
            "inner join fetch CarRfId carRfId on carRfId.customer = customer " +
            "inner join fetch CarTank carTank on carTank.customer = customer " +
            "inner join fetch customer.vehicleModel vehicleModel " +
            "inner join fetch vehicleModel.product product " +
            "inner join fetch customer.country country " +
            "where type.customerGroup=:customerGroup ",
        countQuery = "select count(customer) from Customer customer " +
            "inner join customer.type type " +
            "where type.customerGroup=:customerGroup and (customer.archive is null or customer.archive = false) "
    )
    Page<Customer> findAllBoundaryCustomerForOffline(@Param("customerGroup") CustomerGroup customerGroup, Pageable pageable);
}
