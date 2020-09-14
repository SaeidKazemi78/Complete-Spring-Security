package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.projection.OldCustomer;
import ir.donyapardaz.niopdc.base.repository.custom.OldCustomerRepositoryCustom;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface OldCustomerRepository extends JpaRepository<OldCustomer, Long>, OldCustomerRepositoryCustom {


}
