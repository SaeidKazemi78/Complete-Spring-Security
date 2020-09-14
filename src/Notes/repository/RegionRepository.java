package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.repository.custom.RegionRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Region entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface RegionRepository extends JpaRepository<Region, Long>, QueryDslPredicateExecutor<Region>, RegionRepositoryCustom {

    Region findFirstByCode(String code);

    @Query("select region from Region region " +
        "where region.country.id = :countryId and ((:level = 0 and region.parent is null) or (:level = 1 and region.parent is not null ))" +
        "order by region.name")
    List<Region> findAllByLevel(@Param("countryId") Long countryId, @Param("level") int level);

    @Query(
        "select distinct parent FROM Region region " +
            "inner join region.parent parent " +
            "where region in :regions"
    )
    List<Region> findAllByParent(@Param("regions") List<Region> regions);

    @Query(value = "WITH regionHierarchy AS\n" +
        "(\n" +
        "  SELECT l.id,\n" +
        "code,\n" +
        "global_code,\n" +
        "jhi_level,\n" +
        "name,\n" +
        "parent_id,\n" +
        "country_id,\n" +
        "last_modified_by,\n" +
        "last_modified_date,\n" +
        "created_by,\n" +
        "created_date\n" +
        "  FROM dbo.region l\n" +
        "  where l.id = :id\n" +
        "  UNION ALL\n" +
        "  SELECT c.id,\n" +
        "   c.code,\n" +
        "   c.global_code,\n" +
        "   c.jhi_level,\n" +
        "   c.name,\n" +
        "   c.parent_id,\n" +
        "   c.country_id,\n" +
        "   c.last_modified_by,\n" +
        "   c.last_modified_date,\n" +
        "   c.created_by,\n" +
        "   c.created_date\n" +
        "  FROM dbo.region c\n" +
        "    INNER JOIN regionHierarchy ch ON c.parent_id = ch.id\n" +
        ")\n" +
        "SELECT DISTINCT id,\n" +
        "code,\n" +
        "global_code,\n" +
        "jhi_level,\n" +
        "name,\n" +
        "parent_id,\n" +
        "country_id,\n" +
        "last_modified_by,\n" +
        "last_modified_date,\n" +
        "created_by,\n" +
        "created_date\n" +
        "FROM regionHierarchy ch\n" +
        "WHERE id IS NOT NULL", nativeQuery = true)
    List<Region> findAllRecursiveToDown(@Param("id") Long id);

    @Query(value = "WITH regionHierarchy AS\n" +
        "(\n" +
        "  SELECT l.id,\n" +
        "code,\n" +
        "global_code,\n" +
        "jhi_level,\n" +
        "name,\n" +
        "parent_id,\n" +
        "country_id,\n" +
        "last_modified_by,\n" +
        "last_modified_date,\n" +
        "created_by,\n" +
        "created_date\n" +
        "  FROM dbo.region l\n" +
        "  where l.id in (:id)\n" +
        "  UNION ALL\n" +
        "  SELECT c.id,\n" +
        "   c.code,\n" +
        "   c.global_code,\n" +
        "   c.jhi_level,\n" +
        "   c.name,\n" +
        "   c.parent_id,\n" +
        "   c.country_id,\n" +
        "   c.last_modified_by,\n" +
        "   c.last_modified_date,\n" +
        "   c.created_by,\n" +
        "   c.created_date\n" +
        "  FROM dbo.region c\n" +
        "    INNER JOIN regionHierarchy ch ON c.id = ch.parent_id\n" +
        ")\n" +
        "SELECT DISTINCT id,\n" +
        "code,\n" +
        "global_code,\n" +
        "jhi_level,\n" +
        "name,\n" +
        "parent_id,\n" +
        "country_id,\n" +
        "last_modified_by,\n" +
        "last_modified_date,\n" +
        "created_by,\n" +
        "created_date\n" +
        "FROM regionHierarchy ch\n" +
        "WHERE id IS NOT NULL ORDER BY jhi_level, name", nativeQuery = true)
    List<Region> findAllRecursiveToUp(@Param("id") List<Long> id);


    @Query(value = "SELECT distinct \n" +
        "  l.id,\n" +
        "  l.code,\n" +
        "  l.global_code,\n" +
        "  l.jhi_level,\n" +
        "  l.name,\n" +
        "  l.parent_id,\n" +
        "  l.country_id,\n" +
        "  l.last_modified_by,\n" +
        "  l.last_modified_date,\n" +
        "  l.created_by,\n" +
        "  l.created_date\n" +
        "FROM region l\n" +
        "  left join region_access rv on rv.id = l.id and (:username = '-1' or rv.username = :username) \n" +
        "  left join location_region lr on lr.regions_id = l.id and (:allLocations = 1 or lr.locations_id in (:locations))\n" +
        "WHERE " +
        "      (\n" +
        "        (:id = -1 and l.parent_id is null ) or\n" +
        "        (:id <> -1 and l.parent_id = :id)\n" +
        "      )\n" +
        "      and\n" +
        "      (:countryId = -1 or\n" +
        "       (\n" +
        "         :countryId <> -1  and\n" +
        "         l.country_id = :countryId\n" +
        "       )) \n" +
        "ORDER BY jhi_level, name", nativeQuery = true)
    List<Region> findAllForSelector(@Param("username") String username,
                                    @Param("id") Long id,
                                    @Param("countryId") Long countryId,
                                    @Param("allLocations") int allLocations,
                                    @Param("locations") Set<Long> locations);



    @Query(
        "select distinct region FROM Region region " +
            "left join fetch region.parent parent " +
            "left join fetch region.subRegions subRegion " +
            "left join RegionView rv1 on rv1.id = subRegion.id and rv1.username = :username " +
            "where region in :regions and (subRegion.id is null or (subRegion.id = rv1.id))"
    )
    List<Region> findAllWithEagerRelationships(@Param("regions") List<Region> regions, @Param("username") String username);


/*    @Query(
        "select region FROM Region region " +
            "where region.id in :ids "
    )
    List<Region> findAllById(@Param("ids") List<Long> ids);*/

    Region findFirstByName(String name);

    @Query(value = "SELECT DISTINCT regionx.*\n" +
        "FROM region regionx\n" +
        "  JOIN region_access rv on regionx.id = rv.id\n" +
        "  JOIN location_region lr ON rv.id = lr.regions_id\n" +
        "  JOIN location_access lv ON lv.id = lr.locations_id\n" +
        "  JOIN region allRegion ON (rv.id = allRegion.id OR regionx.parent_id = allRegion.id)\n" +
        "WHERE rv.username = :username\n" +
        "      AND lv.id IN\n" +
        "          (SELECT lv.id\n" +
        "           FROM location_access lv\n" +
        "             JOIN location l ON l.id = lv.id\n" +
        "             JOIN location ON location.id = l.location_parent_id\n" +
        "           WHERE username = :username AND l.jhi_level = 2 AND (\n" +
        "             l.id = :locationId OR l.location_parent_id = :locationId OR\n" +
        "             (location.location_parent_id = :locationId AND location.jhi_level = 1)\n" +
        "           ))", nativeQuery = true)
    List<Region> findAllByLocation(@Param("locationId") Long locationId, @Param("username") String username);


    @Query(value = "SELECT DISTINCT regionx.*\n" +
        "FROM region regionx\n" +
        "  JOIN region_access rv on regionx.id = rv.id\n" +
        "  JOIN location_region lr ON rv.id = lr.regions_id\n" +
        "  JOIN location_access lv ON lv.id = lr.locations_id\n" +
        "  JOIN region allRegion ON (rv.id = allRegion.id OR regionx.parent_id = allRegion.id)\n" +
        "WHERE rv.username = :username\n" +
        "      AND lv.id IN\n" +
        "          (SELECT lv.id\n" +
        "           FROM location_access lv\n" +
        "             JOIN location l ON l.id = lv.id\n" +
        "             JOIN location ON location.id = l.location_parent_id\n" +
        "           WHERE username = :username AND l.jhi_level = 2 AND (\n" +
        "             l.id in :locationIds OR l.location_parent_id in :locationIds OR\n" +
        "             (location.location_parent_id in :locationIds AND location.jhi_level = 1)\n" +
        "           ))", nativeQuery = true)
    List<Region> findAllByLocations(@Param("locationIds") List<Long> locationIds, @Param("username") String username);

    @Query(value = "SELECT CASE WHEN EXISTS(SELECT p.*\n" +
        "                        FROM region p, region_access pv\n" +
        "                        WHERE pv.username = :username AND p.id = pv.id AND pv.id = :id)\n" +
        "  THEN CAST(1 AS BIT)\n" +
        "  ELSE CAST(0 AS BIT) END", nativeQuery = true)
    boolean exists(@Param("username") String username, @Param("id") Long id);

    @Query(
        value =
            "with conflict(id) " +
                "AS " +
                "( " +
                "SELECT id FROM region " +
                "where id in :oldRegionIds " +
                "UNION ALL " +
                "SELECT r.id from region as r " +
                "INNER JOIN conflict on conflict.id = r.parent_id " +
                ") " +
                "SELECT * from region WHERE id in(SELECT id from conflict) and id in :regionIds"
        , nativeQuery = true
    )
    List<Region> findConflict(@Param("oldRegionIds") List<Long> oldRegionIds, @Param("regionIds") List<Long> regionIds);

}
