package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.SellContract;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.repository.custom.SellContractRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data JPA repository for the SellContract entity.
 */
@SuppressWarnings("unused")
@Repository
/*@JaversSpringDataAuditable*/
public interface SellContractRepository extends JpaRepository<SellContract, Long>, QueryDslPredicateExecutor<SellContract>, SellContractRepositoryCustom {

    SellContract findTopByContractNoStartsWithOrderByIdDesc(String s);

    SellContract findFirstByContractNo(String s);

    @Query("select sellContract from SellContract sellContract " +
        "join sellContract.sellContractCustomers c " +
        "where c.id = :cId")
    SellContract findTopByCustomerOrderByIdDesc(@Param("cId") Long cId);

    @Query("select distinct sell_contract from SellContract sell_contract left join fetch sell_contract.locations")
    List<SellContract> findAllWithEagerRelationships();

    SellContract findOneByIdAndContractType(Long id, ContractType contractType);

    @Query("select distinct sc from SellContract sc" +
        " inner join fetch sc.sellContractPeople scp " +
        " inner join fetch scp.person person" +
        " left join fetch sc.sellContractCustomers scc " +
        " left join fetch sc.locations " +
        " left join fetch scc.customer customer" +
        " left join fetch customer.type " +
        " left join fetch sc.sellContractProducts " +
        " left join fetch scc.location location" +
        " left join fetch customer.customerCapacities ccp"+
        " where sc.id = :id ")
    SellContract findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select sellContract  from SellContract sellContract " +
            "left join sellContract.sellContractCustomers scCustomer " +
            "left join scCustomer.customer customer " +
            "where " +
            "( customer.id in (:customerIds) ) and " +
            "( (sellContract.finishDate>=:finishDate and sellContract.startDate<=:finishDate) or " +
            "(sellContract.startDate<=:startDate and sellContract.finishDate>=:startDate) or " +
            " (sellContract.startDate>=:startDate and sellContract.startDate<=:finishDate) )  and" +
            "  (:id is null or sellContract.id<>:id) and" +
            "  sellContract.active=true "

    )
    List<SellContract> find(@Param("id") Long id, @Param("customerIds") List<Long> customerIds, @Param("startDate") ZonedDateTime startDate, @Param("finishDate") ZonedDateTime finishDate);

    @Query(value = "select id from contract_type_access where username = :username", nativeQuery = true)
    List<String> findAllTypes(@Param("username") String username);

    @Query(
        "select max(sellContract.contractNo) from SellContract sellContract" +
            " inner join sellContract.sellContractCustomers sellcontractCustomer" +
            " inner join sellcontractCustomer.customer customer" +
            " where customer.id=:customerId"
    )
    String findMaxContractNoByCustomer(@Param("customerId") Long customerId);

    @Query("select sc from SellContract sc " +
        "inner join fetch sc.sellContractPeople scp " +
        "inner join fetch sc.sellContractCustomers scc " +
        "where scp.person.id = :personId and scc.customer.id = :customerId")
    SellContract findOneByPersonAndCustomer(@Param("personId") Long personId, @Param("customerId") Long customerId);

    @Query("select distinct pt.code from Customer  customer " +
        "inner join TransportContract tc on tc.customer = customer " +
        "inner join tc.person p " +
        "inner join PersonTransport pt on pt.person = p " +
        "where customer.id = :customerId and tc.startDate <= :now and tc.finishDate >= :now")
    List<String> findPersonTransportCodeCustomer_Id(@Param("customerId") Long customerId, @Param("now") ZonedDateTime now);

    @Query("select distinct d.code from Customer  customer " +
        "inner join customer.sellContractCustomers scc " +
        "inner join scc.sellContract sc " +
        "inner join sc.sellContractProducts scp " +
        "inner join scp.depots d " +
        "where customer.id = :customerId")
    List<String> findDepotCodeByCustomer_Id(@Param("customerId") Long customerId);


    @Query("select sc from SellContract sc " +
        "inner join sc.sellContractCustomers scc " +
        "inner join scc.customer c " +
        "inner join sc.sellContractPeople scp " +
        "inner join scp.person p " +
        "where (:code is null or p.code = :code) and c.identifyCode = :customerCode and sc.startDate <= :now and sc.finishDate >= :now and sc.active = true")
    SellContract findOneByCustomerCodeAndPersonCode(@Param("customerCode") String customerCode, @Param("code") String code,@Param("now") ZonedDateTime now);


}
