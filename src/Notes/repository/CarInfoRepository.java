package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CarInfo;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the CarInfo entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CarInfoRepository extends JpaRepository<CarInfo, Long>, QueryDslPredicateExecutor<CarInfo> {

    Page<CarInfo> findByCar_Id(Long id, Pageable pageable);

    CarInfo findFirstByCar_Id(Long id);

    @Query(
        "select carInfo from TransportContract ts " +
            "inner join ts.customer customer " +
            "inner join SellContractCustomer scc on scc.customer = customer " +
            "inner join ts.person person " +
            "inner join Car car on car.person = person " +
            "inner join CarInfo  carInfo on carInfo.car = car " +
            "where scc.id = :id and " +
            "(ts.startDate <= :date and ts.finishDate is null or (ts.finishDate >= :date))"
    )
    List<CarInfo> findAllBySellContractCustomerIdInTransportContract(@Param("id") Long id, @Param("date") ZonedDateTime date);

}
