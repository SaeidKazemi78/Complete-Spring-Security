package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.NozzleProductCount;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NozzleProductCount entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface NozzleProductCountRepository extends JpaRepository<NozzleProductCount, Long> {

}
