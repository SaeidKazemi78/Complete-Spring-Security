package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.QUserConfig;
import ir.donyapardaz.niopdc.base.domain.UserConfig;
import ir.donyapardaz.niopdc.base.repository.UserConfigRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.UserConfigDTO;
import ir.donyapardaz.niopdc.base.service.mapper.UserConfigMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing UserConfig.
 */
@Service
@Transactional
public class UserConfigService {

    private final Logger log = LoggerFactory.getLogger(UserConfigService.class);

    private final UserConfigRepository userConfigRepository;

    private final UserConfigMapper userConfigMapper;

    public UserConfigService(UserConfigRepository userConfigRepository, UserConfigMapper userConfigMapper) {
        this.userConfigRepository = userConfigRepository;
        this.userConfigMapper = userConfigMapper;
    }

    /**
     * Save a userConfig.
     *
     * @param userConfigDTO the entity to save
     * @return the persisted entity
     */
    public UserConfigDTO save(UserConfigDTO userConfigDTO) {
        log.debug("Request to save UserConfig : {}", userConfigDTO);
        UserConfig userConfig = userConfigMapper.toEntity(userConfigDTO);
        userConfig.setUsername(SecurityUtils.getCurrentUserLogin().get());
        userConfig = userConfigRepository.save(userConfig);
        return userConfigMapper.toDto(userConfig);
    }

    /**
     * Get all the userConfigs.
     *
     * @param query
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserConfigDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all UserConfigs");
        Page<UserConfig> result;
        if (query != null) {
            BooleanExpression userConfig = new PredicatesBuilder().build(query, new PathBuilder<>(UserConfig.class, "userConfig"), null);
            userConfig = userConfig.and(QUserConfig.userConfig.username.eq(SecurityUtils.getCurrentUserLogin().get()));
            result = userConfigRepository.findAll(userConfig, pageable);
        } else
            result = userConfigRepository.findAllByUsername(SecurityUtils.getCurrentUserLogin().get(), pageable);
        return result.map(userConfigMapper::toDto);
    }

    /**
     * Get one userConfig by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserConfigDTO findOne(Long id) {
        log.debug("Request to get UserConfig : {}", id);
        UserConfig userConfig = userConfigRepository.findOne(id);
        return userConfigMapper.toDto(userConfig);
    }

    /**
     * Delete the userConfig by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserConfig : {}", id);
        userConfigRepository.delete(id);
    }
}
