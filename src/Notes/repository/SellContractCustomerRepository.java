package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.SellContractCustomer;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the SellContractCustomer entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable

public interface SellContractCustomerRepository extends JpaRepository<SellContractCustomer, Long> {

    SellContractCustomer findByCustomer_Id(Long customerId);

    List<SellContractCustomer> findAllBySellContract_Id(Long sellContractId);

}
