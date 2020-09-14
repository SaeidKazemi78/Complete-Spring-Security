package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Plaque;
import ir.donyapardaz.niopdc.base.domain.PlaqueRule;
import ir.donyapardaz.niopdc.base.domain.QPlaqueRule;
import ir.donyapardaz.niopdc.base.repository.PlaqueRepository;
import ir.donyapardaz.niopdc.base.repository.PlaqueRuleRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueDTO;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueRuleDTO;
import ir.donyapardaz.niopdc.base.service.mapper.PlaqueMapper;
import ir.donyapardaz.niopdc.base.service.mapper.PlaqueRuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;


/**
 * Service Implementation for managing Plaque.
 */
@Service
@Transactional
public class PlaqueService {

    private final Logger log = LoggerFactory.getLogger(PlaqueService.class);

    private final PlaqueRepository plaqueRepository;

    private final PlaqueMapper plaqueMapper;

    private final PlaqueRuleRepository plaqueRuleRepository;
    private final PlaqueRuleMapper plaqueRuleMapper;

    public PlaqueService(PlaqueRepository plaqueRepository, PlaqueMapper plaqueMapper, PlaqueRuleRepository plaqueRuleRepository, PlaqueRuleMapper plaqueRuleMapper) {
        this.plaqueRepository = plaqueRepository;
        this.plaqueMapper = plaqueMapper;
        this.plaqueRuleRepository = plaqueRuleRepository;
        this.plaqueRuleMapper = plaqueRuleMapper;
    }

    /**
     * Save a plaque.
     *
     * @param plaqueDTO the entity to save
     * @return the persisted entity
     */
    public PlaqueDTO save(PlaqueDTO plaqueDTO) {
        log.debug("Request to save Plaque : {}", plaqueDTO);
        Plaque plaque = plaqueMapper.toEntity(plaqueDTO);
        plaque = plaqueRepository.save(plaque);
        return plaqueMapper.toDto(plaque);
    }

    /**
     * Get all the plaques.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PlaqueDTO> findAll(Pageable pageable,String query) {
        log.debug("Request to get all Plaques");
        Page<Plaque> result;
        if (query != null)
            result = plaqueRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(Plaque.class, "plaque"),null), pageable);
        else
            result = plaqueRepository.findAll(pageable);
        return result.map(plaqueMapper::toDto);
    }

    /**
     * Get one plaque by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PlaqueDTO findOne(Long id) {
        log.debug("Request to get Plaque : {}", id);
        Plaque plaque = plaqueRepository.findOne(id);
        return plaqueMapper.toDto(plaque);
    }

    /**
     * Delete the plaque by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Plaque : {}", id);
        plaqueRepository.delete(id);
    }
}
