package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.config.Profiles;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.ShiftWork;
import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkRefuelCenterType;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;


/**
 * Spring Data JPA repository for the ShiftWork entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface ShiftWorkRepository extends JpaRepository<ShiftWork, Long>, QueryDslPredicateExecutor<ShiftWork> {

    Page<ShiftWork> findByLocation_Id(Long id, Pageable pageable);

    @Query(
        "select count(shift.id) from ShiftWork shift " +
            "inner join shift.location location " +
            "where " +
            "(:shiftWorkId is null or :shiftWorkId<>shift.id) and " +
            "location.id = :locationId and " +
            "((shift.toDate is null) or ((shift.fromDate between :fromDate and :toDate) or " +
            "(shift.toDate between :fromDate and :toDate)or " +
            "(:fromDate between shift.fromDate and shift.toDate))) "
    )
    Long checkForConflict(@Param("shiftWorkId") Long shiftWorkId,
                          @Param("locationId") Long locationId,
                          @Param("fromDate") ZonedDateTime fromDate,
                          @Param("toDate") ZonedDateTime toDate
    );

    ShiftWork findFirstByLocation_IdAndToDateIsNull(Long locationId);


    @Query(value =" select top 1 shift.* from niopdcbase_"+ Profiles.activeProfile +".dbo.shift_work  as shift " +
        " where shift.location_id = :locationId" +
        " order by  shift.created_date  asc ", nativeQuery = true)
    ShiftWork findFirstByLocationId(@Param("locationId")Long locationId);

    @Query(
        "select shiftWork from ShiftWork shiftWork where " +
            "shiftWork.location.id=:locationId and shiftWork.toDate is null"
    )
    ShiftWork findStartDateTimeWithNullFinishDateTime(@Param("locationId") Long locationId);

    long countAllByToDateAfterAndLocation_Id(ZonedDateTime now, Long locationId);

    ShiftWork findFirstByLocationAndFromDateIsAfter(Location location, ZonedDateTime date);

    ShiftWork findFirstByLocation_IdOrderByToDateDesc(Long locationId);

    ShiftWork findFirstByRefuelCenterIdAndShiftTypeOrderByToDateDesc(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType);

    ShiftWork findFirstByRefuelCenterIdAndShiftTypeAndToDateIsNull(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType);

    Long countAllByRefuelCenterIdAndShiftType(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType);

    Page<ShiftWork> findAllByRefuelCenterIdAndShiftType(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType, Pageable pageable);

    @Modifying
    @Query(value = " update shift_work set  to_date = GETDATE() ,last_modified_by = 'job_scheduler'" +
        " where to_date is null and shift_work.from_date < GETDATE()  and location_id in (" +
        " select location.id from location inner join shift_work on location.id = shift_work.location_id " +
        " where location.jhi_level ='2'  )",nativeQuery = true)
    void closeAllOpenShiftOnArea();

    @Modifying
    @Query(value = "update shift_work " +
        " set to_date = GETDATE(), last_modified_by = 'job_scheduler'" +
        " from location " +
        "       inner join shift_work on location.id = shift_work.location_id " +
        " where location.jhi_level = '3' and to_date is null " +
        " and ((DATEDIFF(minute, DATEADD(hour, 24, from_date), getdate()) > 0) or " +
        "       DATEDIFF(minute, DATEADD(second, 86399, dbo.GetJalaliLastDayOfMonth(from_date)), getdate()) > 0) ",nativeQuery = true)
    void closeAllOpenShiftForBoundary();
}
