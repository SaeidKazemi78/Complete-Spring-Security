package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Person;
import ir.donyapardaz.niopdc.base.domain.enumeration.*;
import ir.donyapardaz.niopdc.base.repository.custom.PersonRepositoryCustom;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Person entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface PersonRepository extends JpaRepository<Person, Long>, QueryDslPredicateExecutor<Person>, PersonRepositoryCustom {
    @Query("select distinct person from Person person left join fetch person.locations")
    List<Person> findAllWithEagerRelationships();

    @Query("select person from Person person " +
        "left join fetch person.locations " +
        "left join fetch person.country country " +
        "left join fetch person.region region " +
        "left join fetch person.nationality nationality " +
        "left join fetch person.birthRegion birthRegion " +
        "where person.id =:id")
    Person findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select person from Person person " +
        "left join fetch person.locations " +
        "left join fetch person.country country " +
        "left join fetch person.region region " +
        "left join fetch person.nationality nationality " +
        "left join fetch person.birthRegion birthRegion " +
        "where person.code = :nationalCode")
    Person findOneByCode(@Param("nationalCode") String nationalCode);


    @Query("select person from  Person  person join Stakeholder stakeholder on  stakeholder.person.id = person.id   and stakeholder.company.id = :companyId")
    Page<Person> findAllByCompany(@Param("companyId") Long companyId, Pageable pageable);

/*
    @Query("select person from  Stakeholder stakeholder join stakeholder.person person  where stakeholder.company.id = :companyId")
    Page<Person> findAllByCompany(@Param("companyId") Long companyId, Pageable pageable);*/

    @Query(value = "SELECT CASE WHEN EXISTS(SELECT p.*" +
        "                        FROM person p, person_access pv" +
        "                        WHERE pv.username = :username AND p.id = pv.id AND pv.id = :id)" +
        "  THEN CAST(1 AS BIT)" +
        "       ELSE CAST(0 AS BIT) END", nativeQuery = true)
    boolean exists(@Param("username") String username, @Param("id") Long id);

    @Query(value =
        "SELECT p.*" +
            " FROM person p" +
            " INNER JOIN sell_contract_person scp on scp.person_id=p.id " +
            " INNER JOIN sell_contract sc on sc.id=scp.sell_contract_id" +
            " INNER JOIN sell_contract_customer scc on scc.sell_contract_id=sc.id" +
            " INNER JOIN person_access pv on p.id = pv.id " +
            " WHERE pv.username = :username " +
            "   AND scc.location_id = :locationId" +
            "   AND scc.customer_id = :customerId" +
            "   AND sc.start_date <= :date " +
            "   AND sc.finish_date >= :date "
        , nativeQuery = true)
    List<Person> find(
        @Param("username") String username
        , @Param("locationId") Long locationId
        , @Param("customerId") Long customerId
        , @Param("date") ZonedDateTime date
    );


    Person findOneByPostalCode(String postalCode);

    @Query(value =
        "select distinct new ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO(c.name, " +
            "ct.customerGroup, " +
            "c.identifyCode, " +
            "p.code, " +
            "c.id, " +
            "p.name, " +
            "p.firstName, " +
            "p.lastName, " +
            "p.id, " +
            "sc.id, " +
            "sc.contractNo, " +
            "p.personality," +
            "r.title, " +
            "v.title, " +
            "product.title )" +
            " from SellContract sc" +
            " inner join sc.sellContractPeople scp" +
            " inner join sc.sellContractProducts scpp " +
            " inner join scpp.product product " +
            " inner join RateGroup r on r.id = scpp.rateGroupId " +
            " inner join scp.person p" +
            " left join sc.sellContractCustomers scc" +
            " left join scpp.typeOfFuelReceipts typeOfFuelReceipt " +
            " left join scc.location l1" +
            " left join sc.locations l2" +
            " left join scc.customer c" +
            " left join c.vehicleModel v " +
            " left join c.type ct" +
            " inner join PersonAccess pv on p.id = pv.id.id " +
            " where pv.id.username = :username " +
            "   and (:locationId is null or  l1.id = :locationId or l2.id = :locationId)" +
            "   and sc.startDate <= :date " +
            "   and sc.finishDate >= :date" +
            "   and scpp.startDate <= :date " +
            "   and scpp.finishDate >= :date" +
            "   and sc.active = true" +
            "   and sc.contractType in :contractTypes" +
            "   and (:customerName is null or c.name like '%'+:customerName+'%')" +
            "   and (:customerCode is null or c.identifyCode like '%'+:customerCode+'%')" +
            "   and (:personName is null or p.fullName like '%'+:personName+'%')" +
            "   and (:personCode is null or p.code like '%'+:personCode+'%')" +
            "   and (:contractNo is null or sc.contractNo like '%'+:contractNo+'%')" +
            "   and (:customerGroup is null or ct.customerGroup = :customerGroup) " +
            "   and (:customerId is null or c.id = :customerId) " +
            "   and (sc.contractType != 'AIRPLANE'  or typeOfFuelReceipt in (:typeOfFuelReceipts)) " +
            "   and scp.main=true "
    )
    Page<CustomerPersonDTO> findCustomerPersonAirplane(
        @Param("username") String username,
        @Param("locationId") Long locationId,
        @Param("date") ZonedDateTime date,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("customerName") String customerName,
        @Param("customerCode") String customerCode,
        @Param("customerGroup") CustomerGroup customerGroup,
        @Param("personName") String personName,
        @Param("personCode") String personCode,
        @Param("customerId") Long customerId,
        @Param("contractNo") String contractNo,
        @Param("typeOfFuelReceipts") List<TypeOfFuelReceipt> typeOfFuelReceipts,
        Pageable pageable
    );

    @Query(value =
        "select distinct new ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO(c.name, " +
            "ct.customerGroup, " +
            "c.identifyCode, " +
            "p.code, " +
            "c.id, " +
            "p.name, " +
            "p.firstName, " +
            "p.lastName, " +
            "p.id, " +
            "sc.id, " +
            "sc.contractNo, " +
            "p.personality )" +
            " from SellContract sc" +
            " inner join sc.sellContractPeople scp" +
            " inner join sc.sellContractProducts scpp " +
            " inner join scp.person p" +
            " left join sc.sellContractCustomers scc" +
            " left join scpp.typeOfFuelReceipts typeOfFuelReceipt " +
            " left join scc.location l1" +
            " left join sc.locations l2" +
            " left join scc.customer c" +
            " left join c.type ct" +
            " inner join PersonAccess pv on p.id = pv.id.id " +
            " where pv.id.username = :username " +
            "   and (:locationId is null or  l1.id = :locationId or l2.id = :locationId)" +
            "   and sc.startDate <= :date " +
            "   and sc.finishDate >= :date" +
            "   and scpp.startDate <= :date " +
            "   and scpp.finishDate >= :date" +
            "   and sc.active = true" +
            "   and sc.contractType in :contractTypes" +
            "   and (:customerName is null or c.name like '%'+:customerName+'%')" +
            "   and (:customerCode is null or c.identifyCode like '%'+:customerCode+'%')" +
            "   and (:personName is null or p.fullName like '%'+:personName+'%')" +
            "   and (:personCode is null or p.code like '%'+:personCode+'%')" +
            "   and (:contractNo is null or sc.contractNo like '%'+:contractNo+'%')" +
            "   and (:customerGroup is null or ct.customerGroup = :customerGroup) "+
            "   and (:customerId is null or c.id = :customerId) "+
            "   and (sc.contractType != 'AIRPLANE'  or typeOfFuelReceipt in (:typeOfFuelReceipts)) "+
            "   and scp.main=true "
    )
    Page<CustomerPersonDTO> findCustomerPerson(
        @Param("username") String username,
        @Param("locationId") Long locationId,
        @Param("date") ZonedDateTime date,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("customerName") String customerName,
        @Param("customerCode") String customerCode,
        @Param("customerGroup") CustomerGroup customerGroup,
        @Param("personName") String personName,
        @Param("personCode") String personCode,
        @Param("customerId") Long customerId,
        @Param("contractNo") String contractNo,
        @Param("typeOfFuelReceipts") List<TypeOfFuelReceipt> typeOfFuelReceipts,
        Pageable pageable
    );


    @Query(value =
        "select new ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO(c.name, " +
            "ct.customerGroup, " +
            "c.identifyCode, " +
            "p.code, " +
            "c.id, " +
            "p.name, " +
            "p.firstName, " +
            "p.lastName, " +
            "p.id, " +
            "sc.id, " +
            "sc.contractNo, " +
            "p.personality )" +
            " from SellContract sc" +
            " inner join sc.sellContractPeople scp" +
            " inner join scp.person p" +
            " inner join PersonAccess pv on p.id = pv.id.id " +
            " left join sc.sellContractCustomers scc" +
            " left join scc.customer c" +
            " left join c.type ct" +
            " where pv.id.username = :username " +
            "   and sc.id = :sellContractId" +
            "   and p.id = :personId " +
            "   and (:customerId is null or c.id = :customerId)")
    List<CustomerPersonDTO> findCustomerPerson(
        @Param("username") String username,
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId
    );


    @Query("select distinct person from Person person " +
        "INNER JOIN PersonView pv on person.id = pv.id " +
        "INNER JOIN fetch person.locations locations " +
        "INNER JOIN fetch person.sellContractPeople sellContractPeople " +
        "INNER JOIN fetch sellContractPeople.sellContract sellContract " +
        "INNER JOIN fetch sellContract.sellContractCustomers sellContractCustomers " +
        "INNER JOIN fetch sellContractCustomers.customer customer " +
        "left join fetch person.region region " +
        "left join fetch person.country country " +
        "left join fetch customer.region region3 " +
        "left join fetch customer.type type " +
        "left join fetch customer.locations locations1 " +
        "left join fetch sellContractCustomers.sellContractProducts sellContractProducts " +
        "left join fetch sellContractCustomers.location location " +
        "left join fetch sellContractProducts.product product " +
        "left join fetch sellContractProducts.depots depots " +
        "left join fetch sellContractProducts.costGroupIds " +
//        "left join fetch sellContractProducts.currencyIds currencyIds " +
        "left join fetch depots.location location2 " +
        "left join fetch sellContractProducts.buyTypes buyTypes " +
        "where pv.username = :username and (:id is null or :id = person.id) and " +
        " ( " +
        "   :startDate is null or " +
        "   product.lastModifiedDate > :startDate or " +
        "   sellContractProducts.lastModifiedDate > :startDate or " +
        "   customer.lastModifiedDate > :startDate or " +
        "   type.lastModifiedDate > :startDate or " +
        "   sellContractCustomers.lastModifiedDate > :startDate or " +
        "   sellContract.lastModifiedDate > :startDate or " +
        "   sellContractPeople.lastModifiedDate > :startDate or " +
        "   person.lastModifiedDate > :startDate " +
        " ) " +
        "and person.personality = :personality " +
        "and sellContract.startDate <= :dateNow " +
        "and sellContract.finishDate >= :dateNow"
    )
    List<Person> findAllOrOne(@Param("id") Long id, @Param("startDate") Date startDate, @Param("username") String username, @Param("personality") Personality personality, @Param("dateNow") ZonedDateTime dateNow);


    @Query("select p from PersonView pv, Person p " +
        "where pv.id = p.id and pv.username = :username")
    List<Person> findAllByUsernameFetchPerson(@Param("username") String username);

    Boolean existsByCode(String code);

    Page<Person> findAllByPersonGroup(PersonGroup personGroup, Pageable pageable);

    Person findFirstByCode(String code);
}
