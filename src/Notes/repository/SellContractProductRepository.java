package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.SellContractProduct;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.domain.projection.CurrencyRateGroup;
import ir.donyapardaz.niopdc.base.repository.custom.SellContractProductRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the SellContractProduct entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface SellContractProductRepository extends JpaRepository<SellContractProduct, Long>, SellContractProductRepositoryCustom {

    @Query("select distinct sell_contract_product from SellContractProduct sell_contract_product left join fetch sell_contract_product.depots left join fetch sell_contract_product.buyTypes")
    List<SellContractProduct> findAllWithEagerRelationships();

    @Query("select sell_contract_product from SellContractProduct sell_contract_product left join fetch sell_contract_product.depots left join fetch sell_contract_product.buyTypes left join fetch sell_contract_product.product product left join fetch product.productGroup productGroup where sell_contract_product.id =:id")
    SellContractProduct findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select sellContractProduct from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            "  where " +
            "   customer.id = :customerId and " +
            "   sellContract.startDate <= :date and (sellContract.finishDate is null or sellContract.finishDate >= :date ) and " +
            "   sellContract.active=true "
    )
    List<SellContractProduct> findAllByCustomer(@Param("customerId") Long customerId, @Param("date") ZonedDateTime date);

    @Query(
        "select sellContractProduct from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            "  where " +
            "   customer.id = :customerId and " +
            "   sellContract.id = :sellContractId and " +
            "   sellContract.startDate <= :date and (sellContract.finishDate is null or sellContract.finishDate >= :date ) and " +
            "   sellContract.active=true "
    )
    List<SellContractProduct> findAllBySellContractAndCustomer(@Param("sellContractId") Long sellContractId, @Param("customerId") Long customerId, @Param("date") ZonedDateTime date);

    @Query(
        "select distinct c as currency from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContractProduct.currencyIds currencyId" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join Currency c on c.id = currencyId" +
            " inner join scPerson.person person " +
            " left join sellContractProduct.depots depots" +
            " left join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " left join sellContractCustomer.customer customer " +
            "  where " +
            "   (customer.id is null or :customerId is null or customer.id = :customerId) " +
            "   and person.id = :personId " +
            "   and (depots.id is null or depots.id=:depotId) " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active=true " +
            "   and sellContract.id=:sellContractId" +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date "
    )
    List<Currency> getAllCurrencyIdBySellContractAndPersonAndCustomer(
        @Param("sellContractId") long sellContractId,
        @Param("personId") long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("date") ZonedDateTime date
    );


    @Query(
        "select  c as currencyRateGroup from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join CurrencyRateGroup c on c.id = sellContractProduct.currencyRateGroupId" +
            " inner join sellContractProduct.depots depots" +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            "  where " +
            "   (customer.id is null or customer.id = :customerId)" +
            "   and person.id = :personId " +
            "   and depots.id=:depotId " +
            "   and :currencyId in (currencyIds)" +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and sellContract.active = true " +
            "   and sellContract.id =:sellContractId" +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date "
    )
    Set<CurrencyRateGroup> findCurrencyRateGroupIdByCurrencyAndDepotAndCustomerAndPerson(
        @Param("currencyId") Long currencyId,
        @Param("depotId") Long depotId,
        @Param("customerId") Long customerId,
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("contractTypes") List<ContractType> contractTypes,
        @Param("sellContractId") Long sellContractId
    );

    @Query(
        "select  c as currencyRateGroup from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join CurrencyRateGroup c on c.id = sellContractProduct.currencyRateGroupId" +
            " inner join sellContractProduct.depots depots" +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            "  where " +
            "   person.id = :personId " +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active = true " +
            "   and sellContract.id = :sellContractId " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date  " +
            "   and depots.id=:depotId " +
            "   and :currencyId in (currencyIds)" +
            "   and sellContract.contractType in (:contractTypes)"
    )
    Set<CurrencyRateGroup> findCurrencyRateGroupIdByCurrencyAndDepotAndCustomerAndPerson(
        @Param("currencyId") Long currencyId,
        @Param("depotId") Long depotId,
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("contractTypes") List<ContractType> contractTypes,
        @Param("sellContractId") Long sellContractId
    );

    List<SellContractProduct> findByIdIn(List<Long> collect);

    @Query(
        "select sellContractProduct from SellContractProduct sellContractProduct " +
            "inner join fetch sellContractProduct.sellContractCustomer sellContractCustomer " +
            "inner join fetch sellContractCustomer.sellContract sellContract " +
            "inner join fetch sellContractCustomer.customer customer " +
            "inner join fetch customer.type customerType " +
            "left join fetch sellContractProduct.consumption consumption " +
            "left join fetch sellContractProduct.product product " +
            "where sellContract.active = true and " +
            "customer.id =:customerId " +
            "and sellContract.startDate <= :date and (sellContract.finishDate is null or sellContract.finishDate >= :date)"
    )
    List<SellContractProduct> findAllByCustomerId(@Param("customerId") Long customerId, @Param("date") ZonedDateTime date);

    @Query(
        "select distinct sellContractProduct from SellContractProduct sellContractProduct " +
            "inner join sellContractProduct.sellContract sellContract " +
            "inner join sellContract.sellContractPeople sellContractPeople " +
            "inner join sellContractPeople.person person " +
            "where " +
            "person.id =:personId " +
            "and sellContract.startDate <= :date and (sellContract.finishDate is null or sellContract.finishDate >= :date)"
    )
    List<SellContractProduct> findAllByPersonId(@Param("personId") Long personId, @Param("date") ZonedDateTime date);

    @Query(
        "select distinct sellContractProduct from SellContractProduct sellContractProduct " +
            "inner join sellContractProduct.sellContractCustomer sellContractCustomer " +
            "inner join fetch sellContractProduct.product product " +
            "left join fetch sellContractProduct.depots depot " +
            "left join fetch product.container container " +
            "inner join sellContractProduct.sellContract sellContract " +
            "inner join sellContractCustomer.customer customer " +
            "left join fetch sellContractProduct.costGroupIds costGroupIds " +
            "inner join sellContractProduct.buyTypes buyType " +
            "where " +
            " sellContract.id =:sellContractId " +
            " and customer.id =:customerId " +
            " and product.id in(:productIds)" +
            " and (depot.id is null or depot.id = :depotId)" +
            " and sellContract.active=true " +
            " and sellContract.startDate <= :date " +
            " and (sellContract.finishDate is null or sellContract.finishDate >= :date)" +
            " and sellContractProduct.startDate <= :date " +
            " and sellContractProduct.finishDate >= :date" +
            " and buyType.buyGroup = :buyGroup"
    )
    List<SellContractProduct> findAllByCustomerIdAndProductId(
        @Param("sellContractId") Long sellContractId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("productIds") Set<Long> productIds,
        @Param("date") ZonedDateTime date
    );

    @Query(
        "select distinct buyTypes.buyGroup from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " left join sellContractProduct.depots depots" +
            " left join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " left join sellContractCustomer.customer customer " +
            "  where " +
            "   (customer.id is null or :customerId is null or customer.id = :customerId) " +
            "   and person.id = :personId " +
            "   and (depots.id is null or depots.id=:depotId) " +
            "   and :currencyId in (currencyIds) " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active=true " +
            "   and sellContract.id =:sellContractId" +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date "
    )
    List<BuyGroup> findBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("currencyId") Long currencyId,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("date") ZonedDateTime date
    );


    @Query(
        "select distinct buyTypes.buyGroup from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join sellContractProduct.depots depots" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " left join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " left join sellContractCustomer.customer customer " +
            "  where " +
            "   (customer.id is null or :customerId is null or customer.id = :customerId) " +
            "   and person.id = :personId " +
            "   and depots.id=:depotId " +
            "   and :currencyId in (currencyIds) " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active=true " +
            "   and sellContract.id =:sellContractId" +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and buyTypes.buyGroup = :buyGroup "
    )
    BuyGroup findOneBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("currencyId") Long currencyId,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("date") ZonedDateTime date
    );

    @Query(
        "select distinct typeOfFuelReceipts from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " left join sellContractProduct.depots depots" +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " inner join sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            "  where " +
            "   (customer.id is null or customer.id = :customerId) " +
            "   and person.id = :personId " +
            "   and (depots.id is null or depots.id=:depotId) " +
            "   and :currencyId in (currencyIds) " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active=true " +
            "   and sellContract.id =:sellContractId" +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and buyTypes.buyGroup=:buyGroup"
    )
    List<TypeOfFuelReceipt> findTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("currencyId") Long currencyId,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("date") ZonedDateTime date
    );


    @Query(
        "select distinct typeOfFuelReceipts from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " left join sellContractProduct.depots depots" +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " inner join sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            "  where " +
            "   (customer.id is null or customer.id = :customerId) " +
            "   and person.id = :personId " +
            "   and (depots.id is null or depots.id=:depotId) " +
            "   and :currencyId in (currencyIds) " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContract.active=true " +
            "   and sellContract.id =:sellContractId" +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and buyTypes.buyGroup=:buyGroup" +
            "   and typeOfFuelReceipts = :typeOfFuelReceipt"
    )
    TypeOfFuelReceipt findOneTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("currencyId") Long currencyId,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("typeOfFuelReceipt") TypeOfFuelReceipt typeOfFuelReceipt,
        @Param("date") ZonedDateTime date
    );

    @Query(
        "select distinct sellContractProduct from SellContractProduct sellContractProduct " +
            " inner join fetch sellContractProduct.sellContract sellContract" +
            " inner join fetch sellContract.sellContractPeople scPerson " +
            " inner join fetch scPerson.person person " +
            " inner join fetch sellContractProduct.product product" +
            " inner join fetch sellContractProduct.currencyIds currencyIds" +
            " inner join fetch sellContractProduct.buyTypes buyTypes" +
            " left join fetch sellContractProduct.sellContractCustomer sellContractCustomer" +
            " left join fetch sellContractCustomer.customer customer " +
            " left join fetch sellContractProduct.depots depots" +
            " left join fetch sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts " +
            " left join fetch customer.customerStationInfo customerStationInfo " +
            " left join fetch person.personTransport personTransport " +
            " where " +
            "   sellContract.id=:sellContractId " +
            "   and person.id = :personId " +
            "   and ((:customerId is null and customer.id is null) or customer.id = :customerId )" +
            "   and (depots.id is null or depots.id = :depotId) " +
            "   and :currencyId in (currencyIds)" +
            "   and buyTypes.buyGroup = :buyGroup" +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.active=true " +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and ((:typeOfFuelReceipt is null) or :typeOfFuelReceipt in (typeOfFuelReceipts))"
    )
    List<SellContractProduct> findAllBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
        @Param("sellContractId") Long sellContractId,
        @Param("personId") Long personId,
        @Param("customerId") Long customerId,
        @Param("depotId") Long depotId,
        @Param("currencyId") Long currencyId,
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("typeOfFuelReceipt") String typeOfFuelReceipt,
        @Param("date") ZonedDateTime date
    );
/*
    @Query(
        "select  distinct sellContractProduct from SellContractProduct sellContractProduct " +
            " left join sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join sellContractProduct.depots depots" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractProduct.product product" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContractCustomer.customer customer " +
            " inner join customer.type customerType " +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            " where " +
            "   customer.id = :customerId " +
            "   and person.id = :personId " +
            "   and depots.id=:depotId " +
            "   and :currencyId in (currencyIds) " +
            "   and :buyGroup = buyTypes.buyGroup " +
            "   and (:isNational =true or sellContractProduct.currencyRateGroupId = :currencyRateGroupId )" +
            "   and sellContract.id=:sellContractId " +
            "   and sellContract.active=true " +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.active=true " +
            "   and sellContractCustomer.active=true " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and sellContractCustomer.finishDate >= :date " +
            "   and sellContractCustomer.startDate <= :date " +
            "   and (typeOfFuelReceipts is null or :typeOfFuelReceipt in (typeOfFuelReceipts))" +
            "   and product.productShowStatus='NORMAL'"
    )
    List<SellContractProduct> findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("currencyRateGroupId") Long currencyRateGroupId,
        @Param("currencyId") Long currencyId,
        @Param("depotId") Long depotId,
        @Param("customerId") Long customerId,
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("typeOfFuelReceipt") String typeOfFuelReceipt,
//        @Param("contractTypes") List<ContractType> contractTypes,
        @Param("isNational") Boolean isNational,
        @Param("sellContractId") Long sellContractId
    );*/

    @Query(
        "select  distinct sellContractProduct from SellContractProduct sellContractProduct " +
            " left join sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts " +
            " inner join sellContractProduct.currencyIds currencyIds" +
            " inner join sellContractProduct.depots depots" +
            " inner join sellContractProduct.buyTypes buyTypes" +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            " where " +
            "   person.id = :personId " +
            "   and depots.id=:depotId " +
            "   and :currencyId in (currencyIds) " +
            "   and :buyGroup = buyTypes.buyGroup " +
            "   and (:isNational = true or sellContractProduct.currencyRateGroupId = :currencyRateGroupId )" +
            "   and sellContract.id=:sellContractId " +
            "   and sellContract.active=true " +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date " +
            "   and sellContract.contractType in (:contractTypes) " +
            "   and typeOfFuelReceipts is null or :typeOfFuelReceipt in (typeOfFuelReceipts)"
    )
    List<SellContractProduct> findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("currencyRateGroupId") Long currencyRateGroupId,
        @Param("currencyId") Long currencyId,
        @Param("depotId") Long depotId,
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("typeOfFuelReceipt") String typeOfFuelReceipt,
        @Param("contractTypes") List<ContractType> contractTypes,
        @Param("isNational") Boolean isNational,
        @Param("sellContractId") Long sellContractId
    );

    @Query(
        "select  distinct sellContractProduct from SellContractProduct sellContractProduct " +
            " left join fetch sellContractProduct.typeOfFuelReceipts typeOfFuelReceipts " +
            " left join fetch sellContractProduct.costGroupIds " +
            " inner join fetch sellContractProduct.currencyIds currencyIds" +
            " inner join fetch sellContractProduct.depots depots" +
            " inner join fetch depots.location " +
            " inner join fetch sellContractProduct.buyTypes buyTypes" +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople scPerson " +
            " inner join scPerson.person person " +
            " inner join fetch sellContractProduct.product product1 " +
            " inner join fetch sellContractProduct.sellContractCustomer customer1" +
            " inner join fetch customer1.customer " +
            " inner join fetch product1.productGroup " +
            "  where   " +
            "  sellContract.contractType in (:contractTypes) " +
            "and person.id = :personId " +
            "and depots.id=:depotId " +
            "and :currencyId in (currencyIds) " +
            "and :buyGroup = buyTypes.buyGroup " +
            "and (:isNational = true or sellContractProduct.currencyRateGroupId = :currencyRateGroupId )" +
            "and sellContract.active=true " +
            "and sellContract.id=:sellContractId " +
            "and sellContract.startDate <= :date " +
            "and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "and sellContractProduct.startDate <= :date " +
            "and sellContractProduct.finishDate >= :date "
    )
    List<SellContractProduct> findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
        @Param("buyGroup") BuyGroup buyGroup,
        @Param("currencyRateGroupId") Long currencyRateGroupId,
        @Param("currencyId") Long currencyId,
        @Param("depotId") Long depotId,
        @Param("personId") Long personId,
        @Param("date") ZonedDateTime date,
        @Param("contractTypes") List<ContractType> contractTypes,
        @Param("isNational") Boolean isNational,
        @Param("sellContractId") Long sellContractId
    );

    @Query("select sellContractProduct from SellContract sellContract " +
        "inner join sellContract.sellContractProducts sellContractProduct " +
        "inner join sellContractProduct.product product " +
        "inner join sellContractProduct.sellContractCustomer scc" +
        " where sellContract.id = :sellContractId and product.id = :productId " +
        "and (:scCustomerId is null or scc.id = :scCustomerId)" +
        " and (:id is null or sellContractProduct.id <> :id)" +
        " and ( " +
        "   (sellContractProduct.startDate <= :startDate and sellContractProduct.finishDate >= :startDate) or " +
        "   (sellContractProduct.finishDate >= :finishDate and sellContractProduct.startDate <= :finishDate) or " +
        "   (sellContractProduct.startDate >= :startDate and sellContractProduct.finishDate <= :finishDate)" +
        ")")
    SellContractProduct find(@Param("sellContractId") Long sellContractId,
                             @Param("id") Long id,
                             @Param("productId") Long productId,
                             @Param("scCustomerId") Long scCustomerId,
                             @Param("startDate") ZonedDateTime startDate,
                             @Param("finishDate") ZonedDateTime finishDate);

    Boolean existsByRateGroupIdAndSellContract_ActiveTrue(Long rateGroupId);

    Boolean existsByCurrencyRateGroupIdAndSellContract_ActiveTrue(Long currencyRateGroupId);

    @Query(
        "select c.id from SellContractProduct sp " +
            "inner join sp.sellContractCustomer sc " +
            "inner join sc.customer c " +
            "where " +
            "sp.id = :id"
    )
    Long findSellContractCustomerIdBySellContractProduct(@Param("id") Long id);

    @Query(value = "select " +
        " scp.id" +
        " from sell_contract_customer scc" +
        " inner join sell_contract_product scp on scp.sell_contract_customer_id = scc.id " +
        " inner join consumption c2 on scp.consumption_id = c2.id" +
        " inner join product p on scp.product_id = p.id" +
        " inner join product_group pg on p.product_group_id = pg.id" +
        " inner join niopdcrate_" + Profiles.activeProfile + ".dbo.rate_group rg on rg.id = scp.rate_group_id" +
        " where scc.sell_contract_id = :sellContractId and scc.customer_id = :customerId" +
        " and c2.code = :consumption and pg.code = :productGroupCode and rg.jhi_type = :rateGroupsType", nativeQuery = true)
    BigInteger findProductByProductGroupAndRateTypeAndConsumption(
        @Param("sellContractId") Long sellContractId,
        @Param("customerId") Long customerId,
        @Param("productGroupCode") String productGroupCode,
        @Param("rateGroupsType") String rateGroupsType,
        @Param("consumption") String consumption);

    @Query(
        "select distinct toScp from SellContractProduct toScp " +
            "inner join SellContractProduct fromScp on fromScp.id = :fromSellContractProductId " +
            "inner join fromScp.sellContract fromSellContract " +
            "inner join toScp.sellContract toSellContract " +
            "inner join fromScp.product fromProduct " +
            "inner join toScp.product toProduct " +
            "inner join fromProduct.productGroup fromProductGroup " +
            "inner join toProduct.productGroup toProductGroup " +
            "inner join ProductRate fromProductRate on fromProduct.id = fromProductRate.productId " +
            "inner join ProductRate toProductRate on toProduct.id = toProductRate.productId " +
            "inner join fromProductRate.rateGroup fromRateGroup " +
            "inner join toProductRate.rateGroup toRateGroup " +
            "where " +
            "(fromProduct.id <> toProduct.id) and " +
            "(fromRateGroup.id <> toRateGroup.id) and " +
            "(fromRateGroup.type=toRateGroup.type) and " +
            "(fromProductGroup.id = toProductGroup.id) and " +
            "(fromScp.id = :fromSellContractProductId) and " +
            "(fromScp.id <> toScp.id) and " +
            "(fromSellContract.id = toSellContract.id)"
    )
    List<SellContractProduct> getForTransferQuota(@Param("fromSellContractProductId") Long fromSellContractProductId);

    @Query(
        "select scp from SellContractProduct scp " +
            "inner join scp.sellContract sp " +
            "inner join CustomerCredit cc on cc.product = scp " +
            "where " +
            "sp.id=:id and " +
            "cc.parentBuyType.buyGroup='QUOTA'"
    )
    List<SellContractProduct> findAllByHaveQuotaCredit(@Param("id") Long id);


    @Query(
        "select sellContractProduct from SellContractProduct sellContractProduct " +
            "inner join sellContractProduct.sellContract sellContract " +
            "where sellContract.contractType = 'AIRPLANE' "
    )
    List<SellContractProduct> findAllSellContractProductForAirplane();
}
