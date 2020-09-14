package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.Stakeholder;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * Spring Data JPA repository for the Stakeholder entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface StakeholderRepository extends JpaRepository<Stakeholder, Long> {

    Stakeholder findByCompany_Id(Long id);

    Stakeholder findByCompany_IdAndPerson_Id(Long companyId, Long personId);

}
