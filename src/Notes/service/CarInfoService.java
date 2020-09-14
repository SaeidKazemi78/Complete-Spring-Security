package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CarInfo;
import ir.donyapardaz.niopdc.base.repository.CarInfoRepository;
import ir.donyapardaz.niopdc.base.service.dto.CarInfoDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CarInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CarInfo.
 */
@Service
@Transactional
public class CarInfoService {

    private final Logger log = LoggerFactory.getLogger(CarInfoService.class);

    private final CarInfoRepository carInfoRepository;

    private final CarInfoMapper carInfoMapper;

    public CarInfoService(CarInfoRepository carInfoRepository, CarInfoMapper carInfoMapper) {
        this.carInfoRepository = carInfoRepository;
        this.carInfoMapper = carInfoMapper;
    }

    /**
     * Save a carInto.
     *
     * @param carInfoDTO the entity to save
     * @return the persisted entity
     */
    public CarInfoDTO save(CarInfoDTO carInfoDTO) {
        log.debug("Request to save CarInfo : {}", carInfoDTO);
        CarInfo carInfo = carInfoMapper.toEntity(carInfoDTO);
        carInfo = carInfoRepository.save(carInfo);
        return carInfoMapper.toDto(carInfo);
    }

    /**
     * Get all the carIntos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CarInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CarIntos");
        return carInfoRepository.findAll(pageable)
            .map(carInfoMapper::toDto);
    }

    /**
     * Get one carInto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CarInfoDTO findOne(Long id) {
        log.debug("Request to get CarInfo : {}", id);
        CarInfo carInfo = carInfoRepository.findOne(id);
        return carInfoMapper.toDto(carInfo);
    }

    /**
     * Delete the carInto by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CarInfo : {}", id);
        carInfoRepository.delete(id);
    }
}
