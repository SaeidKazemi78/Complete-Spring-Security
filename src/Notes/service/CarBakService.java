package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CarBak;
import ir.donyapardaz.niopdc.base.domain.CarInfo;
import ir.donyapardaz.niopdc.base.repository.CarBakRepository;
import ir.donyapardaz.niopdc.base.repository.CarInfoRepository;
import ir.donyapardaz.niopdc.base.service.dto.CarBakDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CarBakMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CarBak.
 */
@Service
@Transactional
public class CarBakService {

    private final Logger log = LoggerFactory.getLogger(CarBakService.class);

    private final CarBakRepository carBakRepository;

    private final CarBakMapper carBakMapper;

    private final CarInfoRepository carInfoRepository;

    public CarBakService(CarBakRepository carBakRepository, CarBakMapper carBakMapper, CarInfoRepository carInfoRepository) {
        this.carBakRepository = carBakRepository;
        this.carBakMapper = carBakMapper;
        this.carInfoRepository = carInfoRepository;
    }

    /**
     * Save a carBak.
     *
     * @param carBakDTO the entity to save
     * @return the persisted entity
     */
    public CarBakDTO save(CarBakDTO carBakDTO) {
        log.debug("Request to save CarBak : {}", carBakDTO);
        CarBak carBak = carBakMapper.toEntity(carBakDTO);
        carBak = carBakRepository.save(carBak);
        CarInfo carInfo = carInfoRepository.findFirstByCar_Id(carBakDTO.getCarId());
        carInfo.setSealNumber(carInfo.getSealNumber() + 1);
        carInfoRepository.save(carInfo);
        return carBakMapper.toDto(carBak);
    }

    /**
     * Get all the carBaks.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CarBakDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CarBaks");
        return carBakRepository.findAll(pageable)
            .map(carBakMapper::toDto);
    }

    /**
     * Get one carBak by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CarBakDTO findOne(Long id) {
        log.debug("Request to get CarBak : {}", id);
        CarBak carBak = carBakRepository.findOne(id);
        return carBakMapper.toDto(carBak);
    }

    /**
     * Delete the carBak by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CarBak : {}", id);
        CarBak carBak = carBakRepository.findOne(id);
        CarInfo carInfo = carInfoRepository.findFirstByCar_Id(carBak.getCar().getId());
        carInfo.setSealNumber(carInfo.getSealNumber() - 1);
        carInfoRepository.save(carInfo);
        carBakRepository.delete(id);
    }
}
