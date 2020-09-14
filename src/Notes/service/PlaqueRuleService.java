package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Plaque;
import ir.donyapardaz.niopdc.base.domain.PlaqueRule;
import ir.donyapardaz.niopdc.base.domain.enumeration.DigitType;
import ir.donyapardaz.niopdc.base.repository.PlaqueRepository;
import ir.donyapardaz.niopdc.base.repository.PlaqueRuleRepository;
import ir.donyapardaz.niopdc.base.service.dto.PlaqueRuleDTO;
import ir.donyapardaz.niopdc.base.service.mapper.PlaqueRuleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing PlaqueRule.
 */
@Service
@Transactional
public class PlaqueRuleService {

    private final Logger log = LoggerFactory.getLogger(PlaqueRuleService.class);

    private final PlaqueRuleRepository plaqueRuleRepository;

    private final PlaqueRuleMapper plaqueRuleMapper;

    private final PlaqueRepository plaqueRepository;

    public PlaqueRuleService(PlaqueRuleRepository plaqueRuleRepository, PlaqueRuleMapper plaqueRuleMapper, PlaqueRepository plaqueRepository) {
        this.plaqueRuleRepository = plaqueRuleRepository;
        this.plaqueRuleMapper = plaqueRuleMapper;
        this.plaqueRepository = plaqueRepository;
    }

    /**
     * Save a plaqueRule.
     *
     * @param plaqueRuleDTO the entity to save
     * @return the persisted entity
     */
    public PlaqueRuleDTO save(PlaqueRuleDTO plaqueRuleDTO) {
        log.debug("Request to save PlaqueRule : {}", plaqueRuleDTO);
        PlaqueRule plaqueRule = plaqueRuleMapper.toEntity(plaqueRuleDTO);
        plaqueRule = plaqueRuleRepository.saveAndFlush(plaqueRule);

        Plaque plaque = plaqueRepository.findOneWithPlaqueRules(plaqueRuleDTO.getPlaqueId());

        plaque.setPattern(generatePattern(plaque));
        plaqueRepository.save(plaque);

        return plaqueRuleMapper.toDto(plaqueRule);
    }

    /**
     * Get all the plaqueRules.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PlaqueRuleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PlaqueRules");
        return plaqueRuleRepository.findAll(pageable)
            .map(plaqueRuleMapper::toDto);
    }

    /**
     * Get one plaqueRule by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PlaqueRuleDTO findOne(Long id) {
        log.debug("Request to get PlaqueRule : {}", id);
        PlaqueRule plaqueRule = plaqueRuleRepository.findOne(id);
        return plaqueRuleMapper.toDto(plaqueRule);
    }

    /**
     * Delete the plaqueRule by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PlaqueRule : {}", id);
        plaqueRuleRepository.delete(id);
    }

    private String generatePattern(Plaque plaque) {
        StringBuilder pattern = new StringBuilder("^");
        Set<PlaqueRule> plaqueRules = plaque.getPlaqueRules().stream()
            .sorted(Comparator.comparing(PlaqueRule::getPriority))
            .collect(Collectors.toSet());
        for (PlaqueRule plaqueRule : plaqueRules) {
            switch (plaqueRule.getDigitType()) {
                case PERSIAN_WORD: {
                    pattern.append("[آ-ی]{").append(plaqueRule.getDigit()).append("}");
                    break;
                }
                case ENGLISH_WORD: {
                    pattern.append("[a-zA-z]{").append(plaqueRule.getDigit()).append("}");
                    break;
                }
                case NUMBER: {
                    pattern.append("[۰-۹0-9]{").append(plaqueRule.getDigit()).append("}");
                }
            }
        }

        pattern.append("$");

        return pattern.toString();
    }
}
