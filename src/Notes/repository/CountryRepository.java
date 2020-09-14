package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Country;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Spring Data JPA repository for the Country entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CountryRepository extends JpaRepository<Country,Long> ,QueryDslPredicateExecutor <Country>{

    @Query("select distinct country from Country country " +
        "left join fetch country.regions region " +
        "where (:id is null or :id = country.id or :id = region.id) and " +
        "(:startDate is null or country.lastModifiedDate > :startDate or region.lastModifiedDate>:startDate)")
    List<Country> findAllOrOne(@Param("id") Long id, @Param("startDate" )Date startDate);

    Country findFirstByCheckNationalCodeIsTrue();

   /* @Query( value = " select country from Country  country where country.rmtoCode = :rmtoCode  and country.neighbor = true ")
    Country findFirstByRmtoCode(@Param("rmtoCode") String rmtoCode);
*/
    @Query( value = " select  country from Country  country where country.rmtoCode = :rmtoCode ")
    Country findByRmtoCode(@Param("rmtoCode") String rmtoCode);

    List<Country> findAllByOrderByName();
}
