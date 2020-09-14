package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CarTank;
import ir.donyapardaz.niopdc.base.repository.CarTankRepository;
import ir.donyapardaz.niopdc.base.service.dto.CarTankDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CarTankMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * Service Implementation for managing CarTank.
 */
@Service
@Transactional
public class CarTankService {

    private final Logger log = LoggerFactory.getLogger(CarTankService.class);

    private final CarTankRepository carTankRepository;

    private final CarTankMapper carTankMapper;

    public CarTankService(CarTankRepository carTankRepository, CarTankMapper carTankMapper) {
        this.carTankRepository = carTankRepository;
        this.carTankMapper = carTankMapper;
    }

    /**
     * Save a carTank.
     *
     * @param carTankDTO the entity to save
     * @return the persisted entity
     */
    public CarTankDTO save(CarTankDTO carTankDTO) {
        log.debug("Request to save CarTank : {}", carTankDTO);
        CarTank carTank = carTankMapper.toEntity(carTankDTO);
        carTank = carTankRepository.save(carTank);
        return carTankMapper.toDto(carTank);
    }

    /**
     * Get one carTank by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CarTankDTO findOne(Long id) {
        log.debug("Request to get CarTank : {}", id);
        CarTank carTank = carTankRepository.findOne(id);
        return carTankMapper.toDto(carTank);
    }

    /**
     * Delete the carTank by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CarTank : {}", id);
        carTankRepository.delete(id);
    }

    public List<CarTankDTO> findAllByIds(List<Long> ids) {
        return carTankMapper.toDto(carTankRepository.findAllByIdInOrderByTankNo(ids));
    }
}
