package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.repository.custom.LocationRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * Spring Data JPA repository for the Location entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface LocationRepository extends JpaRepository<Location, Long>, QueryDslPredicateExecutor<Location>, LocationRepositoryCustom {
    @Query("select distinct location from Location location left join fetch location.depots left join fetch location.regions")
    List<Location> findAllWithEagerRelationships();

    @Query(
        "select location from Location location " +
            "left join fetch location.depots " +
            "left join fetch location.regions " +
            "left join fetch location.country country " +
            "where location.id =:id"
    )
    Location findOneWithEagerRelationships(@Param("id") Long id);


    Page<Location> findByLocationParent_Id(Long locationParentId, Pageable pageable);

    @Query("select l from Location l, LocationView lv" +
        " where lv.username = :username and l.id = lv.id and ((:locationParentId is null and l.locationParent is null) or (:locationParentId is not null and l.locationParent.id = :locationParentId))")
    List<Location> findByLocationParent_Id(@Param("locationParentId") Long locationParentId, @Param("username") String username);

    @Query(
        "select distinct location FROM Location location " +
            "inner join location.locationParent parent " +
            "where parent in :locations "
    )
    List<Location> findAllByParent(@Param("locations") List<Location> locations);

    @Query(
        "select distinct location FROM Location location " +
            "left join fetch location.locationParent locationParent " +
            "left join fetch location.subLocations subLocations " +
            "left join LocationView lv1 on lv1.id = subLocations.id and lv1.username = :username " +
            "where location in :locations and (subLocations.id is null or subLocations.id = lv1.id)"
    )
    List<Location> findAllWithEagerRelationships(@Param("locations") List<Location> locations, @Param("username") String username);

    List<Location> findAllByLevel(int level);

    @Query(value =
        "SELECT l from Location l" +
            " inner join LocationView lv on lv.id=l.id " +
            "left join fetch l.country country " +
            " where lv.username=:username and l.level=:level" +
            " order by  l.name desc "
    )
    List<Location> findAllByLevelAndUsername(@Param("level") int level, @Param("username") String username);

    @Query(value =
        "SELECT distinct l.* from location l" +
            " inner join location_access lv on lv.id=l.id" +
//            " inner join sell_contract_customer  sellContractCustomer on SellContractCustomer.location_id=l.id" +
//            " inner join sell_contract sellContract on sellContractCustomer.sell_contract_id=sellContract.id" +
//            " inner join customer customer on customer.id=sellContractCustomer.customer_id" +
//            " inner join customer_access cv on cv.id =customer.id" +
            " where " +
            "   lv.username=:username " +
//            "   and cv.username=:username " +
            "   and l.jhi_level in (0,2)" +
//            "   and sellContract.active=1 " +
//            "   and sellContractCustomer.active = 1" +
//            "   and sellContractCustomer.start_date <= :date" +
//            "   and sellContractCustomer.finish_date >= :date" +
            " order by l.jhi_level asc"
        , nativeQuery = true

    )
    List<Location> findAllByForOrderAndUsername(@Param("username") String username);


    @Query(value =
        "SELECT l from Location l" +
            " inner join LocationAccess lv on lv.id.id = l.id" +
            " where lv.id.username = :username and l.id = :id"
    )
    Location findOneByUserName(@Param("username") String username, @Param("id") Long id);

    @Query(value = "WITH LocationH AS " +
        "( " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.doc_for_parent_location, " +
        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "  WHERE location.id in :ids " +
        " " +
        "  UNION ALL " +
        " " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.doc_for_parent_location, " +
        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "    INNER JOIN LocationH h ON h.location_parent_id = location.id " +
        " " +
        ") " +
        "SELECT DISTINCT " +
        "  ch.id, " +
        "  ch.name, " +
        "  ch.day, " +
        "  ch.code, " +
        "  ch.rmto_code, " +
        "  ch.financial_code, " +
        "  ch.cost_account, " +
        "  ch.jhi_level, " +
        "  ch.location_parent_id, " +
        "  ch.have_boundary_sell, " +
        "  ch.tranship_type, " +
        "  ch.state_code, " +
        "  ch.country_id, " +
        "  ch.before_control, " +
        "  ch.before_control_tranship, " +
        "  ch.tolerance, " +
        "  ch.last_modified_date, " +
        "  ch.last_modified_by ," +
        "  ch.far_country," +
        "  ch.pump_before_control," +
        "  ch.created_by, " +
        "    ch.checkbook_account_number, " +
        "    ch.has_depot, " +
        "    ch.doc_for_parent_location, " +

        "    ch.boundary_exemption, " +
        "  ch.created_date " +
        "FROM LocationH ch order by ch.jhi_level", nativeQuery = true)
    List<Location> findAllRecursiveToUp(@Param("ids") List<Long> ids);


    @Query(value = "WITH LocationH AS " +
        "( " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "  inner join location_access lv on lv.id = location.id" +
        "  WHERE location.id in :ids and lv.username = :username" +
        " " +
        "  UNION ALL " +
        " " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "    INNER JOIN LocationH h ON h.location_parent_id = location.id " +
        " " +
        ") " +
        "SELECT DISTINCT " +
        "  ch.id, " +
        "  ch.name, " +
        "  ch.day, " +
        "  ch.code, " +
        "  ch.rmto_code, " +
        "  ch.financial_code, " +
        "  ch.cost_account, " +
        "  ch.jhi_level, " +
        "  ch.location_parent_id, " +
        "  ch.have_boundary_sell, " +
        "  ch.tranship_type, " +
        "  ch.state_code, " +
        "  ch.country_id, " +
        "  ch.before_control, " +
        "  ch.before_control_tranship, " +
        "  ch.tolerance, " +
        "  ch.last_modified_date, " +
        "  ch.last_modified_by ," +
        "  ch.far_country," +
        "  ch.pump_before_control," +
        "  ch.created_by, " +
        "    ch.checkbook_account_number, " +
        "    ch.has_depot, " +
        "    ch.boundary_exemption, " +
        "  ch.created_date " +
        "FROM LocationH ch order by ch.jhi_level", nativeQuery = true)
    List<Location> findAllRecursiveToUpByAccessUser(@Param("username") String username, @Param("ids") List<Long> ids);

    @Query(value = "WITH LocationH AS " +
        "( " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.doc_for_parent_location, " +

        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "  inner join location_access lv on lv.id = location.id and (:username is null or lv.username = :username)" +
        "  WHERE  (:allLocations = 1 or location.id in (:locations))" +
        " " +
        "  UNION ALL " +
        " " +
        "  SELECT " +
        "    location.id, " +
        "    location.name, " +
        "    location.day, " +
        "    location.code, " +
        "    location.rmto_code, " +
        "    location.financial_code, " +
        "    location.cost_account, " +
        "    location.jhi_level, " +
        "    location.location_parent_id, " +
        "    location.have_boundary_sell, " +
        "    location.tranship_type, " +
        "    location.state_code, " +
        "    location.country_id, " +
        "    location.before_control, " +
        "    location.before_control_tranship, " +
        "    location.tolerance, " +
        "    location.last_modified_date, " +
        "    location.last_modified_by," +
        "    location.far_country," +
        "    location.pump_before_control," +
        "    location.created_by, " +
        "    location.checkbook_account_number, " +
        "    location.has_depot, " +
        "    location.doc_for_parent_location, " +

        "    location.boundary_exemption, " +
        "    location.created_date " +
        "  FROM location " +
        "    INNER JOIN LocationH h ON h.location_parent_id = location.id " +
        " " +
        ") " +
        "SELECT DISTINCT " +
        "  ch.id, " +
        "  ch.name, " +
        "  ch.code, " +
        "  ch.rmto_code, " +
        "  ch.day, " +
        "  ch.financial_code, " +
        "  ch.cost_account, " +
        "  ch.jhi_level, " +
        "  ch.location_parent_id, " +
        "  ch.have_boundary_sell, " +
        "  ch.tranship_type, " +
        "  ch.state_code, " +
        "  ch.country_id, " +
        "  ch.before_control, " +
        "  ch.before_control_tranship, " +
        "  ch.tolerance, " +
        "  ch.last_modified_date, " +
        "  ch.last_modified_by ," +
        "  ch.far_country," +
        "  ch.pump_before_control," +
        "  ch.created_by, " +
        "    ch.checkbook_account_number, " +
        "    ch.has_depot, " +
        "    ch.doc_for_parent_location, " +

        "    ch.boundary_exemption, " +
        "  ch.created_date " +
        "FROM LocationH ch where (:id is null and ch.location_parent_id is null) or ch.location_parent_id = :id order by ch.name", nativeQuery = true)
    List<Location> findAllForSelector(@Param("username") String username, @Param("id") Long id, @Param("allLocations") int allLocations, @Param("locations") Set<Long> locations);

    @Query(value = "WITH locationHierarchy AS" +
        " (" +
        "  SELECT l.id," +
        "    l.code," +
        "    l.rmto_code," +
        "    l.cost_account," +
        "    l.financial_code," +
        "    l.jhi_level," +
        "    l.name," +
        "    l.[day]," +
        "    l.location_parent_id," +
        "    l.have_boundary_sell," +
        "    l.tranship_type," +
        "    l.state_code," +
        "    l.country_id," +
        "    l.before_control," +
        "    l.before_control_tranship, " +
        "    l.tolerance," +
        "    l.last_modified_by," +
        "    l.last_modified_date," +
        "    l.far_country," +
        "    l.pump_before_control," +
        "    l.created_by, " +
        "    l.checkbook_account_number, " +
        "    l.has_depot, " +
        "    l.boundary_exemption," +
        "    l.doc_for_parent_location, " +
        "    l.created_date " +
        "  FROM dbo.location l" +
        "  where l.id in (:ids)" +
        "  UNION ALL" +
        "  SELECT c.id," +
        "    c.code," +
        "    c.rmto_code," +
        "    c.cost_account," +
        "    c.financial_code," +
        "    c.jhi_level," +
        "    c.name," +
        "    c.[day]," +
        "    c.location_parent_id," +
        "    c.have_boundary_sell," +
        "    c.tranship_type," +
        "    c.state_code," +
        "    c.country_id," +
        "    c.before_control," +
        "    c.before_control_tranship, " +
        "    c.tolerance," +
        "    c.last_modified_by," +
        "    c.last_modified_date," +
        "    c.far_country," +
        "    c.pump_before_control," +
        "    c.created_by, " +
        "    c.checkbook_account_number, " +
        "    c.has_depot, " +
        "    c.boundary_exemption," +
        "    c.doc_for_parent_location , " +
        "    c.created_date " +
        "  FROM dbo.location c" +
        "    INNER JOIN locationHierarchy ch ON c.location_parent_id = ch.id" +
        ")" +
        " SELECT DISTINCT id," +
        "  code," +
        "  rmto_code," +
        "  cost_account," +
        "  financial_code," +
        "  jhi_level," +
        "  name," +
        "  [day]," +
        "  location_parent_id," +
        "  have_boundary_sell," +
        "  tranship_type," +
        "  state_code," +
        "  country_id," +
        "  before_control," +
        "  before_control_tranship, " +
        "  tolerance," +
        "  last_modified_by," +
        "  last_modified_date," +
        "  far_country," +
        "  pump_before_control," +
        "  created_by, " +
        "    checkbook_account_number, " +
        "    has_depot, " +
        "    boundary_exemption, " +
        "  created_date ," +
        " doc_for_parent_location " +
        "FROM locationHierarchy ch" +
        " WHERE id IS NOT NULL and (jhi_level in (:levels))", nativeQuery = true)
    List<Location> findAllRecursiveToDown(@Param("ids") Set<Long> ids, @Param("levels") List<Integer> levels);

    @Query(
        value =
            "with conflict(id) " +
                "AS " +
                "( " +
                "    SELECT id FROM location " +
                "    where id in :oldLocationIds " +
                "    UNION ALL " +
                "        SELECT l.id from location as l " +
                "        INNER JOIN conflict on conflict.id = l.location_parent_id " +
                ") " +
                "SELECT * from location WHERE id in(SELECT id from conflict) and id in :locationIds"
        , nativeQuery = true
    )
    List<Location> findConflict(@Param("oldLocationIds") List<Long> oldLocationIds, @Param("locationIds") List<Long> locationIds);

    @Query(
        value = "with child(id) " +
            "AS " +
            "( " +
            "SELECT id FROM location " +
            "where id in :ids " +
            "UNION ALL " +
            "SELECT l.id from location as l " +
            "INNER JOIN child on child.id = l.location_parent_id " +
            ") " +
            "SELECT location.* from location " +
            "INNER JOIN location_access on location.id = location_access.id " +
            "WHERE location.id in(SELECT id from child) and location.jhi_level = :level " +
            "and location_access.username=:username",
        nativeQuery = true
    )
    List<Location> findAllSubLocationsByLevel(@Param("ids") List<Long> ids, @Param("level") Integer level, @Param("username") String username);


    @Query("select distinct location From Location location " +
        "inner join LocationView lv on location.id = lv.id " +
        "left join fetch location.subLocations subLocation " +
        "left join fetch subLocation.subLocations subLocation1 " +
        "where lv.username = :username and " +
        "((:id is null and location.locationParent is null) or :id = location.id) and " +
        "(:startDate is null or location.lastModifiedDate > :startDate)")
    List<Location> findAllByStartDateAndId(@Param("startDate") Date startDate, @Param("id") Long id, @Param("username") String username);

    Location findOneByLocationParentIsNull();

    Location findFirstByCode(String code);

    @Query(value =
        "SELECT l3 from Location l3" +
            " left join l3.locationParent l2" +
            " left join l2.locationParent l1" +
            " left join l1.locationParent l0" +
            " inner join LocationView lv on lv.id = l3.id" +
            " where lv.username = :username and (l2.id = :id or l1.id = :id or l0.id = :id)"
    )
    Set<Location> findAllByLocationId(@Param("username") String username, @Param("id") Long id);

    @Query(
        "select shiftWork.id from ShiftWork shiftWork " +
            "inner join shiftWork.location location " +
            "where location.id=:locationId and " +
            "location.level=3 and " +
            "(shiftWork.fromDate<=:date and (shiftWork.toDate is null or(shiftWork.toDate>=:date)))"
    )
    Long existLocationOpenShift(@Param("locationId") Long locationId, @Param("date") ZonedDateTime date);

    @Query(
        "select concat(coalesce(n.code, '00') , m.code)   as code from Location  m " +
            "left join Location n on m.locationParent.id = n.id " +
            "where m.id = :locationId"
    )
    String getFullLocationCode(@Param("locationId") Long locationId);

    @Query(
        nativeQuery = true,
        value = "declare @min_level as Integer; \n"+
        "select "+
        "@min_level = min(l.jhi_level) "+
        "from "+
        "niopdcbase_"+Profiles.activeProfile +".dbo.location l "+
        "inner join niopdcbase_"+Profiles.activeProfile + ".dbo.location_access lt on lt.id = l.id "+
        "where lt.username=:username "+
        "select "+
        "l.* "+
        "from "+
        "    niopdcbase_"+Profiles.activeProfile +".dbo.location l "+
        "inner join niopdcbase_"+Profiles.activeProfile + ".dbo.location_access lt on l.id = lt.id " +
        "where "+
        "(" +
        "    ( "+
        "        :parentId is not null "+
        "and l.location_parent_id = :parentId"+
    ")"+
    "or("+
    "     :parentId is null"+
    "    and l.jhi_level = @min_level"+
    ")"+
    ")"+
    "and ("+
    ":name is null"+
    "    or l.name like null"+
    ")"+
    "and ("+
    ":code is null"+
    "    or l.code like null"+
    ")"+
    "and lt.username=:username "+
    "ORDER BY "+
    "l.id desc"
    )
    List<Location> findAllByLocationIdNative(
        @Param("parentId") Long parentId,
        @Param("name") String name,
        @Param("code") String code,
        @Param("username") String username);

    @Query(
        value = "select l.* from location l " +
            "inner join location parent on l.location_parent_id = parent.id and parent.code =left (:code,2) " +
            "where l.code = right(:code,2) and l.jhi_level = 3 ",
        nativeQuery = true
    )
    Location findFirstByLocationCode(@Param("code") String code);

    @Query(
        value = "select l.* from location l " +
            "inner join location parent on l.location_parent_id = parent.id and parent.code =left (:code,2) " +
            "where l.code = right(:code,2) and l.jhi_level = :lvl ",
        nativeQuery = true
    )
    Location findByLocationCode(@Param("code") String code,@Param("lvl")Long lvl);


    @Query(
        value =
            "select distinct l1.*\n" +
                "from location l1\n" +
                "       left join location l2\n" +
                "         on l1.location_parent_id = l2.id and l2.jhi_level != 0\n" +
                "       left join location l3\n" +
                "         on l2.location_parent_id = l3.id and l3.jhi_level != 0\n" +
                "where l1.jhi_level = 3 and (isnull(l3.code, '') + isnull(l2.code, '') + l1.code) like :code\n",
        nativeQuery = true
    )
    Location findOneByLocationCode(@Param("code") String code);

    Location findFirstByRmtoCode(String rmtoCode);

    @Query(value = "select id from location_access as la where la.username = :username",
        nativeQuery = true)
    List<BigInteger> findAllUserName(@Param("username") String username);
}
