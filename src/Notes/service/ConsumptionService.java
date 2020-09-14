package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Consumption;
import ir.donyapardaz.niopdc.base.repository.ConsumptionRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ConsumptionDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ConsumptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Consumption.
 */
@Service
@Transactional
public class ConsumptionService {

    private final Logger log = LoggerFactory.getLogger(ConsumptionService.class);

    private final ConsumptionRepository consumptionRepository;

    private final ConsumptionMapper consumptionMapper;

    public ConsumptionService(ConsumptionRepository consumptionRepository, ConsumptionMapper consumptionMapper) {
        this.consumptionRepository = consumptionRepository;
        this.consumptionMapper = consumptionMapper;
    }

    /**
     * Save a consumption.
     *
     * @param consumptionDTO the entity to save
     * @return the persisted entity
     */
    public ConsumptionDTO save(ConsumptionDTO consumptionDTO) {
        log.debug("Request to save Consumption : {}", consumptionDTO);
        Consumption consumption = consumptionMapper.toEntity(consumptionDTO);
        consumption = consumptionRepository.save(consumption);
        return consumptionMapper.toDto(consumption);
    }

    /**
     * Get all the consumptions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ConsumptionDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all Consumptions");
        Page<Consumption> result;
        if (query != null)
        result = consumptionRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(Consumption.class, "consumption"),null), pageable);
            else
        result = consumptionRepository.findAll(pageable);
        return result.map(consumption -> consumptionMapper.toDto(consumption));
    }

    /**
     * Get one consumption by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ConsumptionDTO findOne(Long id) {
        log.debug("Request to get Consumption : {}", id);
        Consumption consumption = consumptionRepository.findOne(id);
        return consumptionMapper.toDto(consumption);
    }

    /**
     * Delete the consumption by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Consumption : {}", id);
        consumptionRepository.delete(id);
    }
}
