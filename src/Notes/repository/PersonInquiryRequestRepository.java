package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.PersonInquiryRequest;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
@JaversSpringDataAuditable
public interface PersonInquiryRequestRepository extends JpaRepository<PersonInquiryRequest, Long> {

    @Query(" select distinct re from PersonInquiryRequest as re inner join  re.personInquiries " +
        " where re.responseTime is null  and re.requestTime < :nowMinus30m ")
    List<PersonInquiryRequest> findAllWaitAfter30m(@Param("nowMinus30m") ZonedDateTime nowMinus30m);

    @Query(" select distinct re from PersonInquiryRequest as re inner join  re.personInquiries " +
        " where re.failed = :failed ")
    List<PersonInquiryRequest> findAllByFailed(@Param("failed")boolean failed);

    @Query(" select distinct re from PersonInquiryRequest as re inner join fetch re.personInquiries " +
         " where re.responseTime is null  ")
    List<PersonInquiryRequest> findAllWaitRequest();
}
