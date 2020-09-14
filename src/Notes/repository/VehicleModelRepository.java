package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.VehicleModel;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the VehicleModel entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface VehicleModelRepository extends JpaRepository<VehicleModel, Long>, QueryDslPredicateExecutor<VehicleModel>,VehicleModelRepositoryCustom {

    Page<VehicleModel> findAllByVehicleModelType(VehicleModelType vehicleModelType, Pageable pageable);


    @Query(
        "select distinct vehicleModel from VehicleModel vehicleModel " +
        "left join fetch vehicleModel.vehicleCapacities vehicleCapacitie " +
        "left join fetch vehicleCapacitie.product " +
        "where vehicleModel.customerGroup = :group1")
    List<VehicleModel> findAllByCustomerGroup(@Param("group1") CustomerGroup group1);
}
