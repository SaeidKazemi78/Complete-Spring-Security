package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.BoundaryDiscount;
import ir.donyapardaz.niopdc.base.domain.Plaque;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Plaque entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface PlaqueRepository extends JpaRepository<Plaque, Long>, QueryDslPredicateExecutor<Plaque> {

    @Query(
        "select plaque from Plaque plaque " +
            "inner join fetch plaque.plaqueRules plaqueRules " +
            "where " +
            "plaque.id=:id"
    )
    Plaque findOneWithPlaqueRules(@Param("id") Long id);
}
