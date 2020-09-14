package ir.donyapardaz.niopdc.base.repository;

import ir.donyapardaz.niopdc.base.domain.News;
import ir.donyapardaz.niopdc.base.domain.enumeration.NewsType;
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
 * Spring Data JPA repository for the News entity.
 */
@SuppressWarnings("unused")
@Repository
@JaversSpringDataAuditable
public interface NewsRepository extends JpaRepository<News, Long>, QueryDslPredicateExecutor<News> {
    @Query("select distinct news from News news left join fetch news.locations")
    List<News> findAllWithEagerRelationships();

    @Query("select news from News news left join fetch news.locations where news.id =:id")
    News findOneWithEagerRelationships(@Param("id") Long id);

    @Query(
        "select news from News news " +
            "left join news.locations locations " +
            "left join LocationView locationView on locations.id=locationView.id " +
            "where (news.finishDate is null or news.finishDate<:date) " +
            "and ((locations is null) or (locationView.username=:username)) " +
            "and (:newsType is null or news.newsType=:newsType)"
    )
    Page<News> findAllByFinishDateIsNullOrFinishDateAfter(@Param("newsType") NewsType newsType, @Param("date") ZonedDateTime date, @Param("username") String username, @Param("pageable") Pageable pageable);
}
