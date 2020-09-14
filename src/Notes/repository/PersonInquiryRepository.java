package ir.donyapardaz.niopdc.base.repository;


import ir.donyapardaz.niopdc.base.domain.PersonInquiry;
import ir.donyapardaz.niopdc.base.domain.enumeration.PersonInquiryStatus;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Repository
@JaversSpringDataAuditable
public interface PersonInquiryRepository extends JpaRepository<PersonInquiry, Long> {


    @Query("select  p from PersonInquiry as p " +
        " where  (:nationalCode is null or p.nationalCode = :nationalCode) " +
        " and (( :classified is null and :alphabetClassified is null and :consecutive is null) or " +
        " ( p.classified =:classified and p.alphabetClassified = :alphabetClassified and p.consecutive = :consecutive)) " +
        " or  (  p.firstName = :firstName and p.lastName = :lastName and p.fatherName = :fatherName and p.idCode = :idCode and p.birthday = :birthday) ")
    List<PersonInquiry> findAll(@Param("nationalCode") String nationalCode, @Param("consecutive") String consecutive,
                                @Param("idCode") String idCode, @Param("classified") String classified, @Param("alphabetClassified") String alphabetClassified,
                                @Param("birthday") Instant birthday, @Param("firstName") String firstName, @Param("lastName") String lastName,
                                @Param("fatherName") String fatherName);

    @Query("select p from PersonInquiry as p " +
        "where p.status in (:statusList)")
    Set<PersonInquiry> findAllByPersonInquiryStatus(@Param("statusList") List<PersonInquiryStatus> statusList);
}
