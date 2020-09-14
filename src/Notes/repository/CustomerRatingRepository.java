package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerRating;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the CustomerRating entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerRatingRepository extends JpaRepository<CustomerRating, Long>, QueryDslPredicateExecutor<CustomerRating> {
    @Query("select distinct customer_rating from CustomerRating customer_rating left join fetch customer_rating.locations")
    List<CustomerRating> findAllWithEagerRelationships();

    @Query("select customer_rating from CustomerRating customer_rating left join fetch customer_rating.locations where customer_rating.id =:id")
    CustomerRating findOneWithEagerRelationships(@Param("id") Long id);

    /*   @Query(
           value = "select count (*) from customer_rating_details " +
               "inner join customer_rating rating on customer_rating_details.customer_rating_id = rating.id " +
               "inner join customer_rating_details_location location2 on customer_rating_details.id = location2.customer_rating_details_id " +
               "where " +
               "location2.locations_id in (:locationIds) and " +
               "rating.id = :customerRatingId and " +
               "((customer_rating_details.from_date between :startDate AND :finishDate) " +
               " or (customer_rating_details.to_date between :startDate AND :finishDate)" +
               " or (:startDate between customer_rating_details.from_date AND customer_rating_details.to_date))"
           , nativeQuery = true
       )*/
    @Query(
        "select count(cr.id) from CustomerRating cr " +
            "inner join cr.locations locations " +
            "where " +
            "(:id is null or cr.id<>:id) and " +
            "locations.id in (:locationIds) and " +
            "((cr.fromDate between :startDate and :finishDate) " +
            "or (cr.toDate between :startDate and :finishDate) " +
            "or(:startDate between cr.fromDate and cr.toDate))"
    )
    Long checkConflict(@Param("id") Long id, @Param("locationIds") Set<Long> locationIds, @Param("startDate") ZonedDateTime startDate,
                       @Param("finishDate") ZonedDateTime finishDate);


}
