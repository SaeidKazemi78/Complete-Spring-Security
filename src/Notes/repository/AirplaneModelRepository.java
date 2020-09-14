package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.AirplaneModel;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AirplaneModel entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface AirplaneModelRepository extends JpaRepository<AirplaneModel, Long> {

}
