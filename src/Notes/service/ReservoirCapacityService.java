package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.ReservoirCapacity;
import ir.donyapardaz.niopdc.base.repository.ReservoirCapacityRepository;
import ir.donyapardaz.niopdc.base.service.dto.ReservoirCapacityDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ReservoirCapacityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ReservoirCapacity.
 */
@Service
@Transactional
public class ReservoirCapacityService {

    private final Logger log = LoggerFactory.getLogger(ReservoirCapacityService.class);

    private final ReservoirCapacityRepository reservoirCapacityRepository;

    private final ReservoirCapacityMapper reservoirCapacityMapper;

    public ReservoirCapacityService(ReservoirCapacityRepository reservoirCapacityRepository, ReservoirCapacityMapper reservoirCapacityMapper) {
        this.reservoirCapacityRepository = reservoirCapacityRepository;
        this.reservoirCapacityMapper = reservoirCapacityMapper;
    }

    /**
     * Save a reservoirCapacity.
     *
     * @param reservoirCapacityDTO the entity to save
     * @return the persisted entity
     */
    public ReservoirCapacityDTO save(ReservoirCapacityDTO reservoirCapacityDTO) {
        log.debug("Request to save ReservoirCapacity : {}", reservoirCapacityDTO);
        ReservoirCapacity reservoirCapacity = reservoirCapacityMapper.toEntity(reservoirCapacityDTO);
        reservoirCapacity = reservoirCapacityRepository.save(reservoirCapacity);
        return reservoirCapacityMapper.toDto(reservoirCapacity);
    }

    /**
     * Get all the reservoirCapacities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ReservoirCapacityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ReservoirCapacities");
        return reservoirCapacityRepository.findAll(pageable)
            .map(reservoirCapacityMapper::toDto);
    }

    /**
     * Get one reservoirCapacity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ReservoirCapacityDTO findOne(Long id) {
        log.debug("Request to get ReservoirCapacity : {}", id);
        ReservoirCapacity reservoirCapacity = reservoirCapacityRepository.findOne(id);
        return reservoirCapacityMapper.toDto(reservoirCapacity);
    }

    /**
     * Delete the reservoirCapacity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ReservoirCapacity : {}", id);
        reservoirCapacityRepository.delete(id);
    }
}
