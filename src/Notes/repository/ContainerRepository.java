package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Container;
import ir.donyapardaz.niopdc.base.repository.custom.ContainerRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data JPA repository for the Container entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ContainerRepository extends JpaRepository<Container, Long>,QueryDslPredicateExecutor<Container>, ContainerRepositoryCustom {

    List<Container> findByProductUnit_Id(Long productUnitId);

    @Query(
        "select count(cr) as containerRate " +
            " from Container c " +
            " inner join ContainerRate cr on cr.containerId=c.id" +
            " where " +
            " c.id=:id"
    )
    Long existsContainerRate(@Param("id") Long id);
}
