package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.ProductUnit;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;


/**
 * Spring Data JPA repository for the ProductUnit entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ProductUnitRepository extends JpaRepository<ProductUnit,Long>, QueryDslPredicateExecutor<ProductUnit> {

}
