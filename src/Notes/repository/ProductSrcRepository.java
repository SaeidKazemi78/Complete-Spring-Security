package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.ProductSrc;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the ProductSrc entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ProductSrcRepository extends JpaRepository<ProductSrc, Long>, QueryDslPredicateExecutor<ProductSrc> {

    List<ProductSrc> findAllByProduct_IdAndActiveIsTrue(Long id);

    Page<ProductSrc> findAllByProduct_Id(Long id, Pageable pageable);
}
