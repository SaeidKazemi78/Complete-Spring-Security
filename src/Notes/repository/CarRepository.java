package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Car;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Car entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CarRepository extends JpaRepository<Car, Long>, QueryDslPredicateExecutor<Car> {

    Car findFirstByChassisNumber(String carCode);

    @Query(
        "select car from Driver driver " +
            "inner join driver.car car " +
            "inner join car.person person " +
            "where :title is null or car.title like :title and person.id = :personId "
    )
    Page<Car> findAllByHaveDriver(@Param("title") String title, @Param("personId") Long personId,Pageable pageable);
}
