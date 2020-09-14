package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.CmrLog;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.Instant;
import java.util.List;


@Repository
@JaversSpringDataAuditable
public interface CmrLogRepository  extends JpaRepository<CmrLog, Long>, QueryDslPredicateExecutor<CmrLog>{

    @Query(value = "select cmrLog from CmrLog  cmrLog " +
        "where cmrLog.cmr = :cmr and cmrLog.customerId = :customerId and cmrLog.orderLocationId = :orderLocationId and cmrLog.createdDate > :now_minus_30_Minutes ")
    List<CmrLog> findOneBy(@Param("cmr") String cmr, @Param("orderLocationId")Long orderLocationId, @Param("customerId") Long customerId, @Param("now_minus_30_Minutes") Instant now_minus_30_Minutes);
}
