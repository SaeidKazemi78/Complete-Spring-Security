package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.UserLocation;
import ir.donyapardaz.niopdc.base.domain.embeddableid.UserLocationId;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the UserDataAccess entity.
 */
@SuppressWarnings("unused")
@Repository
/*@JaversSpringDataAuditable*/
public interface UserLocationRepository extends JpaRepository<UserLocation, UserLocationId>, QueryDslPredicateExecutor<UserLocation> {

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = location_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshLocationAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = region_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshRegionAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = customer_type_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshCustomerTypeAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = contract_type_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshContractTypeAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = person_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshPersonAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = customer_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshCustomerAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = depot_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshDepotAccess();

        @Query(value = "begin " +
            "declare @result int " +
            "exec " +
            "@result = sell_contract_access_procedures " +
            "select @result as result " +
            "end", nativeQuery = true)
    void refreshSellContractAccess();

}
