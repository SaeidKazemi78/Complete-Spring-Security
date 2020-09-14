package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.ProductGroup;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductGroup entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ProductGroupRepository extends JpaRepository<ProductGroup, Long>, QueryDslPredicateExecutor<ProductGroup>{

    ProductGroup findOneByCode(String productCode);
}
