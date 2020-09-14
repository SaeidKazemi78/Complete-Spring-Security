package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CustomerOrderCapacity;
import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.News;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerTypeRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the CustomerType entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface CustomerOrderCapacityRepository extends JpaRepository<CustomerOrderCapacity, Long> , QueryDslPredicateExecutor<CustomerOrderCapacity>{

    Page<CustomerOrderCapacity> findAllByCustomer_Id(Long id, Pageable page);
    List<CustomerOrderCapacity> findAllByCustomer_IdAndActiveIsTrueAndProductGroup_Id(Long id, Long productGroupId);
    CustomerOrderCapacity findByCustomer_IdAndCapacityAndProductGroup_Id(Long customerId,Long Capacity,Long productGroupId);
    void deleteAllByCustomer_Id(Long customerId);
}
