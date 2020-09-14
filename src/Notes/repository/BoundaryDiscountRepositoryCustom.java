package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.BoundaryDiscount;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.time.ZonedDateTime;

/**
 * Spring Data JPA repository for the BoundaryDiscount entity.
 */
public interface BoundaryDiscountRepositoryCustom {
    Page<BoundaryDiscountDTO> findAll(String location, String country, String vehicleModelType, String liter, Pageable pageable);

}
