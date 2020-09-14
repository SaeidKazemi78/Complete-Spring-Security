package ir.donyapardaz.niopdc.base.repository;


import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.domain.projection.VehicleModelCapacityProduct;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VehicleModelRepositoryCustom {
    Page<VehicleModelCapacityProduct> findAll(String query, Pageable pageable);
    Page<VehicleModelDTO> findAll(String title , CustomerGroup customerGroup , VehicleModelType vehicleModelType, String productTitle,Boolean confirm, Pageable pageable);
}
