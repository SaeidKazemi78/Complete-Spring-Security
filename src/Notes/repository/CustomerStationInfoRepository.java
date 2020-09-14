package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerStationInfo;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CustomerStationInfo entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerStationInfoRepository extends JpaRepository<CustomerStationInfo, Long> {

    CustomerStationInfo findByCustomer_Id(Long customerId);
}
