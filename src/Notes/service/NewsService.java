package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.News;
import ir.donyapardaz.niopdc.base.domain.enumeration.NewsType;
import ir.donyapardaz.niopdc.base.repository.NewsRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.NewsDTO;
import ir.donyapardaz.niopdc.base.service.mapper.NewsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.ZonedDateTime;


/**
 * Service Implementation for managing News.
 */
@Service
@Transactional
public class NewsService {

    @PersistenceContext
    private EntityManager em;


    private final Logger log = LoggerFactory.getLogger(NewsService.class);

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    public NewsService(NewsRepository newsRepository, NewsMapper newsMapper) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
    }

    /**
     * Save a news.
     *
     * @param newsDTO the entity to save
     * @return the persisted entity
     */
    public NewsDTO save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        return newsMapper.toDto(news);
    }

    /**
     * Get all the news.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<NewsDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all News");
        Page<News> result;
        if (query != null)
            result = newsRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(News.class, "news"),null), pageable);
        else
            result = newsRepository.findAll(pageable);
        return result.map(newsMapper::toDto);
    }

    @Transactional(readOnly = true)
    public Page<NewsDTO> findAllRemainTime(NewsType newsType, Pageable pageable) {
        log.debug("Request to get all News by remain time");

        String username = SecurityUtils.getCurrentUserLogin().get();

        Page<News> result;
        if (newsType != null) {
            result = newsRepository.findAllByFinishDateIsNullOrFinishDateAfter(newsType, ZonedDateTime.now(), username, pageable);
        } else {
            result = newsRepository.findAllByFinishDateIsNullOrFinishDateAfter(null, ZonedDateTime.now(), username, pageable);
        }
        return result.map(newsMapper::toDto);
    }

    /**
     * Get one news by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public NewsDTO findOne(Long id) {
        log.debug("Request to get News : {}", id);
        News news = newsRepository.findOneWithEagerRelationships(id);
        return newsMapper.toDto(news);
    }

    /**
     * Delete the news by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete News : {}", id);
        newsRepository.delete(id);
    }

}
