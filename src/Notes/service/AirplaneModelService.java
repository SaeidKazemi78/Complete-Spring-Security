package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.AirplaneModel;
import ir.donyapardaz.niopdc.base.repository.AirplaneModelRepository;
import ir.donyapardaz.niopdc.base.service.dto.AirplaneModelDTO;
import ir.donyapardaz.niopdc.base.service.mapper.AirplaneModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AirplaneModel.
 */
@Service
@Transactional
public class AirplaneModelService {

    private final Logger log = LoggerFactory.getLogger(AirplaneModelService.class);

    private final AirplaneModelRepository airplaneModelRepository;

    private final AirplaneModelMapper airplaneModelMapper;

    public AirplaneModelService(AirplaneModelRepository airplaneModelRepository, AirplaneModelMapper airplaneModelMapper) {
        this.airplaneModelRepository = airplaneModelRepository;
        this.airplaneModelMapper = airplaneModelMapper;
    }

    /**
     * Save a airplaneModel.
     *
     * @param airplaneModelDTO the entity to save
     * @return the persisted entity
     */
    public AirplaneModelDTO save(AirplaneModelDTO airplaneModelDTO) {
        log.debug("Request to save AirplaneModel : {}", airplaneModelDTO);
        AirplaneModel airplaneModel = airplaneModelMapper.toEntity(airplaneModelDTO);
        airplaneModel = airplaneModelRepository.save(airplaneModel);
        return airplaneModelMapper.toDto(airplaneModel);
    }

    /**
     * Get all the airplaneModels.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AirplaneModelDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AirplaneModels");
        return airplaneModelRepository.findAll(pageable)
            .map(airplaneModelMapper::toDto);
    }

    /**
     * Get one airplaneModel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public AirplaneModelDTO findOne(Long id) {
        log.debug("Request to get AirplaneModel : {}", id);
        AirplaneModel airplaneModel = airplaneModelRepository.findOne(id);
        return airplaneModelMapper.toDto(airplaneModel);
    }

    /**
     * Delete the airplaneModel by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AirplaneModel : {}", id);
        airplaneModelRepository.delete(id);
    }
}
