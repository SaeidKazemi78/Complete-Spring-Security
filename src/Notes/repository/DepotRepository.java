package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Depot;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.OrderType;
import ir.donyapardaz.niopdc.base.repository.custom.DepotRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.BitSet;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Depot entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface DepotRepository extends JpaRepository<Depot, Long>, QueryDslPredicateExecutor<Depot>, DepotRepositoryCustom {


    @Query("select distinct depot from Depot depot left join fetch depot.products")
    List<Depot> findAllWithEagerRelationships();

    @Query("select depot from Depot depot left join fetch depot.products where depot.id =:id")
    Depot findOneWithEagerRelationships(@Param("id") Long id);

    Page<Depot> findAllByLocationsIn(List<Location> locations, Pageable pageable);

    @Query(value =
        "WITH locationHierarchy AS (\n" +
            "  SELECT\n" +
            "    location.id\n" +
            "  FROM location\n" +
            "  WHERE location.id = :location\n" +
            "  UNION ALL\n" +
            "  SELECT\n" +
            "    c.id\n" +
            "  FROM location c\n" +
            "    INNER JOIN locationHierarchy ch ON ch.id = c.location_parent_id\n" +
            ")\n" +
            "SELECT DISTINCT depot.*\n" +
            "FROM depot" +
            "  INNER JOIN depot_access on depot_access.id = depot.id " +
            "  INNER JOIN location_depot ON location_depot.depots_id = depot.id or (:contractType='AIRPLANE' and depot_type = 'REFUELING_UNIT')" +
            "  INNER JOIN locationHierarchy ch ON location_depot.locations_id = ch.id or depot.location_id = ch.id" +
            " WHERE (username = :username) and " +
            "(:contractType<>'AIRPLANE' or depot.depot_type='REFUELING_UNIT')",
        nativeQuery = true)
    List<Depot> findAllByLocationsIn(@Param("location") Long location, @Param("username") String username, @Param("contractType") String contractType);

    @Query(value =
        "WITH locationHierarchy AS (\n" +
            "  SELECT\n" +
            "    location.id\n" +
            "  FROM location\n" +
            "  WHERE location.id = :location\n" +
            "  UNION ALL\n" +
            "  SELECT\n" +
            "    c.id\n" +
            "  FROM location c\n" +
            "    INNER JOIN locationHierarchy ch ON ch.id = c.location_parent_id\n" +
            ")\n" +
            "SELECT DISTINCT depot.*\n" +
            "FROM locationHierarchy h\n" +
            "  LEFT JOIN location_depot ON location_depot.locations_id = h.id\n" +
            "  LEFT JOIN depot ON location_depot.depots_id = depot.id \n" +
            "  INNER JOIN depot_access da on da.id = depot.id " +
            "WHERE username = :username",
        nativeQuery = true)
    List<Depot> findAllByLocationsIn(@Param("location") Long location, @Param("username") String username);


    @Query(
        "select distinct depot from SellContractProduct sellContractProduct" +
            " inner join sellContractProduct.sellContract sellContract" +
            " inner join sellContract.sellContractPeople sellContractPeople" +
            " inner join sellContractPeople.person person " +
            " left join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " left join sellContractCustomer.customer customer " +
            " left join sellContractProduct.depots scpd" +
            " inner join Depot depot on ((scpd.id is null and :orderType = 'AIRPLANE' and depot.depotType = 'REFUELING_UNIT') or (scpd.id = depot.id ))" +
            "  " +
            "  where " +
            "   (customer.id is null or customer.id = :customerId)" +
            "   and person.id = :personId " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.active=true " +
            "   and sellContract.id=:sellContractId" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date  "
    )
    List<Depot> getAllDepotsBySellContractAndPersonAndCustomer(
        @Param("sellContractId") long sellContractId,
        @Param("personId") long personId,
        @Param("customerId") Long customerId,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("date") ZonedDateTime date,
        @Param("orderType") String orderType);

    @Query(
        "select distinct depot from SellContractProduct sellContractProduct " +
            " inner join sellContractProduct.sellContractCustomer sellContractCustomer" +
            " inner join sellContractCustomer.sellContract sellContract" +
            " inner join sellContract.sellContractPeople sellContractPeople" +
            " inner join sellContractCustomer.customer customer " +
            " inner join sellContractPeople.person person " +
            " inner join Depot depot on depot.id = :depotId " +
            " left join sellContractProduct.depots scpd" +
            "  where " +
            "   (customer.id is null or customer.id = :customerId)" +
            "   and person.id = :personId " +
            "   and sellContract.contractType in (:contractTypes)" +
            "   and sellContract.active=true " +
            "   and sellContract.id=:sellContractId" +
            "   and sellContract.startDate <= :date " +
            "   and (sellContract.finishDate is null or sellContract.finishDate >= :date ) " +
            "   and sellContractProduct.startDate <= :date " +
            "   and sellContractProduct.finishDate >= :date  " +
            "   and ( (scpd.id is null and depot.id = :depotId) or (scpd.id is not null and scpd.id = :depotId))"
    )
    List<Depot> getOneDepotsBySellContractAndPersonAndCustomer(
        @Param("sellContractId") long sellContractId,
        @Param("personId") long personId,
        @Param("customerId") long customerId,
        @Param("contractTypes") Set<ContractType> contractTypes,
        @Param("depotId") long depotId,
        @Param("date") ZonedDateTime date
    );


    @Query("select distinct depot from Depot depot " +
        "left join fetch depot.products product " +
        "left join fetch depot.locations locations " +
        "left join fetch depot.location location " +
        "where (:id is null or depot.id = :id) and " +
        "(:startDate is null or " +
        "depot.lastModifiedDate > :startDate or " +
        "product.lastModifiedDate > :startDate or " +
        "locations.lastModifiedDate > :startDate or " +
        "location.lastModifiedDate > :startDate)")
    List<Depot> findAllOrOne(@Param("id") Long id, @Param("startDate") Date startDate);

    @Query("select depot from SellContract sellContract " +
        "inner join sellContract.locations location " +
        "inner join location.depots depot " +
        "where sellContract.id = :sellContractId")
    List<Depot> findAllBySellContract(@Param("sellContractId") Long sellContractId);

    Depot findFirstByRefuelCenterId(Long id);

    Depot findFirstByCode(String code);

    @Query("select distinct depot from Depot depot " +
        " where depot.code in (:codes)" )
    List<Depot> findAllByCodes(@Param("codes")List<String> codes);
}
