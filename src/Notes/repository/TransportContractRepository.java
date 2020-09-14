package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.TransportContract;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the TransportContract entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface TransportContractRepository extends JpaRepository<TransportContract, Long>, QueryDslPredicateExecutor<TransportContract> {

    Page<TransportContract> findByCustomer_Id(Long id, Pageable pageable);

    @Query(
        "select distinct carInfo.capacity from TransportContract ts " +
            "inner join ts.customer customer " +
            "inner join ts.person person " +
            "inner join Car car on person = car.person " +
            "inner join CarInfo carInfo on carInfo.car = car " +
            "where customer.id = :customerId and " +
            "(ts.startDate <= :date and (ts.finishDate is null or ts.finishDate >= :date))"
    )
    List<Long> getListOfCarAmountByCustomerId(@Param("customerId") Long customerId, @Param("date") ZonedDateTime date);

    @Query(
        "select count(ts) from TransportContract ts " +
            "inner join ts.customer customer " +
            "where customer.id = :customerId and ts.confirm = true and" +
            "(ts.startDate <= :date and (ts.finishDate is null or ts.finishDate >= :date))"
    )
    Long CustomerIdAndStartDateBeforeAndFinishDateAfter(@Param("customerId") Long customerId,@Param("date") ZonedDateTime date);


}
