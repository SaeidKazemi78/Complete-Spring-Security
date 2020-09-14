package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.VehicleCapacity;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the VehicleCapacity entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface VehicleCapacityRepository extends JpaRepository<VehicleCapacity, Long>, QueryDslPredicateExecutor<VehicleCapacity> {

    Page<VehicleCapacity> findByVehicleModel_Id(Long id, Pageable pageable);
    Long countByVehicleModel_Id(Long id);
}
