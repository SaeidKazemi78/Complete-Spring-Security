package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.BoundaryDiscount;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;
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
 * Spring Data JPA repository for the BoundaryDiscount entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface BoundaryDiscountRepository extends JpaRepository<BoundaryDiscount, Long>, QueryDslPredicateExecutor<BoundaryDiscount>, BoundaryDiscountRepositoryCustom {

    /*@Query(
        "select boundaryDiscount from BoundaryDiscount boundaryDiscount " +
            "inner join boundaryDiscount.location location " +
            "inner join boundaryDiscount.country country " +
            "inner join boundaryDiscount.vehicleModel vehicleModel " +
            "inner join boundaryDiscount.product product " +
            "where " +
            "(:locationId is null or location.id=:locationId) and " +
            "(:countryId is null or country.id=:countryId) and " +
            "(:vehicleModelId is null or vehicleModel.id = :vehicleModelId) and " +
            "(:productId is null or product.id=:productId)"
    )
    Page<BoundaryDiscount> findAllPageable(
        @Param("locationId") Long locationId,
        @Param("countryId") Long countryId,
        @Param("vehicleModelId") Long vehicleModelId,
        @Param("productId") Long productId,
        Pageable pageable);*/

    @Query(
        value = "select boundaryDiscount from BoundaryDiscount boundaryDiscount " +
            "left join fetch boundaryDiscount.location boundaryLocation "+
            "left join fetch boundaryDiscount.country boundaryCountry " +
            "where " +

            "(boundaryLocation.id is null or boundaryLocation.id = :locationId)and " +
            "((:countryId is null and  boundaryCountry.id is null) or boundaryCountry.id = :countryId) and " +
            "boundaryDiscount.startDate <= :date and " +
            "(boundaryDiscount.finishDate is null or boundaryDiscount.finishDate >= :date ) and " +
            "boundaryDiscount.vehicleModelType=:vehicleModelType " +
            "order by boundaryDiscount.liter desc "
    )
    Set<BoundaryDiscount> findBoundaryDiscount(
        @Param("locationId") Long locationId,
        @Param("countryId") Long countryId,
        @Param("vehicleModelType") VehicleModelType vehicleModelType,
        @Param("date") ZonedDateTime date
    );


    @Query(value = "select boundaryDiscount from BoundaryDiscount boundaryDiscount " +
            "where " +
            "((:locationId is null and  boundaryDiscount.location is null) or boundaryDiscount.location.id = :locationId) and " +
            "((:countryId is null and  boundaryDiscount.country is null) or boundaryDiscount.country.id = :countryId) and " +
            "boundaryDiscount.startDate <= :date and " +
            "(boundaryDiscount.finishDate is null or boundaryDiscount.finishDate >= :date ) and " +
            "boundaryDiscount.vehicleModelType =:vehicleModelType ")
    BoundaryDiscount findByLocationAndCountryAndVehicleModelTypeAndDate(@Param("locationId") Long locationId,@Param("countryId") Long countryId, @Param("vehicleModelType")VehicleModelType vehicleModelType,@Param("date") ZonedDateTime date);





/*    @Query(
        "select distinct  boundaryDiscount from BoundaryDiscount boundaryDiscount " +
            "inner join boundaryDiscount.product product " +
            "inner join boundaryDiscount.vehicleModel vehicleModel " +
            "left join boundaryDiscount.locations locations " +
            "inner join Customer customer on customer.id = :customerId " +
            "inner join customer.vehicleModel customerVehicleModel " +
            "inner join customer.product customerProduct " +
            "left join boundaryDiscount.countries countries1 " +
            "where " +
            "(customerProduct.id = product.id) and " +
            "(customerVehicleModel.id = vehicleModel.id) and " +
            "(locations.id is null or (locations.id = :locationId and locations.rmtoCode=:rmtoLocationCode)) and " +
            "(countries1.id is null)"
    )
    BoundaryDiscount findBoundaryDiscountWithoutCountry(
        @Param("locationId") Long locationId,
        @Param("customerId") Long customerId,
        @Param("rmtoLocationCode") String rmtoLocationCode
    );*/
}
