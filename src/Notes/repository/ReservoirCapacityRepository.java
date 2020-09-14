package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.ReservoirCapacity;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ReservoirCapacity entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ReservoirCapacityRepository extends JpaRepository<ReservoirCapacity, Long> {

}
