package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Projections;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.UserDataAccess;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the UserDataAccess entity.
 */
@SuppressWarnings("unused")
@Repository
/*@JaversSpringDataAuditable*/
public interface UserDataAccessRepository extends JpaRepository<UserDataAccess, Long>, QueryDslPredicateExecutor<UserDataAccess> {

    Page<UserDataAccess> findAllByUsername(String username, Pageable pageable);

    @Query("select userDataAccess from UserDataAccess userDataAccess " +
        "left join fetch userDataAccess.customerType " +
        "left join fetch userDataAccess.region " +
        "left join fetch userDataAccess.location " +
        "left join fetch userDataAccess.customer " +
        "left join fetch userDataAccess.person " +
        "where userDataAccess.username = :username")
    List<UserDataAccess> findAllByUsername(@Param("username") String username);


    @Query(value = "select u from LocationView l" +
        "  inner join UserDataAccess u on l.username = u.username" +
        " left join fetch u.location a1 " +
        " left join fetch u.region a2 " +
        " left join fetch u.person a3 " +
        " left join fetch u.customer a4 " +
        " left join fetch u.customerType a5 " +
        " where l.id in (:locations)")
    List<UserDataAccess> findAllByLocation(@Param("locations") List<Long> locations);

    @Query(value = "select u.* from region_access l" +
        "  inner join user_data_access u on l.username = u.username " +
        "where l.id in (:regions)",nativeQuery = true)
    List<UserDataAccess> findAllByRegion(@Param("regions") List<Long> regions);

    @Query("select userDataAccess.location from UserDataAccess userDataAccess " +
        "where " +
        " userDataAccess.customer is null " +
        " and userDataAccess.customerType is null " +
        " and userDataAccess.contractType is null " +
        " and userDataAccess.region is null " +
        " and userDataAccess.person is null " +
        " and userDataAccess.customer is null " +
        " and userDataAccess.username =:user" +
        ""
    )
    List<Location> findAllLocation(@Param("user") String user);


    @Modifying
    @Query(
        value = "delete userDataAccess from user_data_access userDataAccess " +
        " inner join location location1 on location1.id=userDataAccess.location_id " +
        "where " +
        " userDataAccess.customer_id is null " +
        " and userDataAccess.customer_type_id is null " +
        " and userDataAccess.contract_type is null " +
        " and userDataAccess.region_id is null " +
        " and userDataAccess.person_id is null " +
        " and userDataAccess.username =:user" +
        " and location1.id in (:locationIds)",
        nativeQuery = true
    )
    void deleteByLocationAndUsername(@Param("user") String username,@Param("locationIds") List<Long> locationIds);
}
