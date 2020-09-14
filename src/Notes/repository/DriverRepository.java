package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Driver;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Driver entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface DriverRepository extends JpaRepository<Driver, Long>, QueryDslPredicateExecutor<Driver> {

    Page<Driver> findByCar_Id(Long id, Pageable pageable);
    List<Driver> findAllByCar_Id(Long id);

    Driver findFirstByDrivingLicenseNumber(String number);
}
