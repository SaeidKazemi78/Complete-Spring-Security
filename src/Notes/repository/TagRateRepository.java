package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.TagRate;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;


/**
 * Spring Data JPA repository for the TagRate entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface TagRateRepository extends JpaRepository<TagRate, Long>, QueryDslPredicateExecutor<TagRate> {

    Page<TagRate> findByLocation_Id(Long id, Pageable pageable);

    @Query(
        "select tagRate from TagRate tagRate " +
            "inner join fetch tagRate.location l " +
            "inner join LocationView lv on lv.id = l.id " +
            "where " +
            "l.level = 3 and " +
            "lv.username = :username"
    )
    List<TagRate> findAllByLocationAccess(@Param("username") String username);


    @Query(
        "select count(tagRate.id) from TagRate tagRate " +
            "where " +
            "(:id is null or (:id <> tagRate.id)) and " +
            "(tagRate.location.id = :locationId) and " +
            "(tagRate.finishDate is null or( " +
            "(tagRate.startDate between :startDate and :finishDate) or " +
            "(:startDate between tagRate.startDate and tagRate.finishDate) " +
            "))"
    )
    Long checkConflict(
        @Param("locationId") Long locationId,
        @Param("id") Long id,
        @Param("startDate") ZonedDateTime startDate,
        @Param("finishDate") ZonedDateTime finishDate
    );
}
