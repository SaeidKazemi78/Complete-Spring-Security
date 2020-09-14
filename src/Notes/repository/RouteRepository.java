package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Route;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Route entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface RouteRepository extends JpaRepository<Route, Long> {

    Route findFirstBySourceCodeAndDestCode(String sourceCode, String targetCode);

}
