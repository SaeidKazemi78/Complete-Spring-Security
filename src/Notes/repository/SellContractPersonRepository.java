package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.SellContractPerson;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;


/**
 * Spring Data JPA repository for the SellContractPerson entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface SellContractPersonRepository extends JpaRepository<SellContractPerson, Long> {


    Page<SellContractPerson> findAllBySellContract_Id(Long sellContractId, Pageable pageable);

    @Query("select sum(sellContractPerson1.sharePercent) from SellContract sellContract1 " +
        " join sellContract1.sellContractPeople sellContractPerson1 " +
        " where sellContract1.id = :sellContractId and (:id is null or sellContractPerson1.id = :id)")
    Integer sumSharePercent(@Param("sellContractId") Long sellContractId, @Param("id") Long id);

    @Query(
        nativeQuery = true,
        value = "select sell_contract_person.* from sell_contract_person " +
            "inner join sell_contract on sell_contract_person.sell_contract_id = sell_contract.id " +
            "where sell_contract.active = 1 and " +
            " ((sell_contract.start_date between :startDate AND :finishDate " +
            "        or (sell_contract.finish_date between :startDate AND :finishDate) " +
            "        or (:startDate between sell_contract.start_date AND sell_contract.finish_date)))"

    )
    List<SellContractPerson> findAllSellContractByActiveSellContractAndTime(@Param("startDate") Instant startDate,
                                                                            @Param("finishDate") Instant finishDate);

    List<SellContractPerson> findAllBySellContract_ContractType(ContractType contractType);
}
