package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.VehicleCapacity;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.repository.VehicleCapacityRepository;
import ir.donyapardaz.niopdc.base.service.dto.VehicleCapacityDTO;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import ir.donyapardaz.niopdc.base.service.mapper.VehicleCapacityMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing VehicleCapacity.
 */
@Service
@Transactional
public class VehicleCapacityService {

    private final Logger log = LoggerFactory.getLogger(VehicleCapacityService.class);

    private final VehicleCapacityRepository vehicleCapacityRepository;

    private final VehicleCapacityMapper vehicleCapacityMapper;

    private final VehicleModelService vehicleModelService;

    public VehicleCapacityService(VehicleCapacityRepository vehicleCapacityRepository, VehicleCapacityMapper vehicleCapacityMapper, VehicleModelService vehicleModelService) {
        this.vehicleCapacityRepository = vehicleCapacityRepository;
        this.vehicleCapacityMapper = vehicleCapacityMapper;
        this.vehicleModelService = vehicleModelService;
    }

    /**
     * Save a vehicleCapacity.
     *
     * @param vehicleCapacityDTO the entity to save
     * @return the persisted entity
     */
    public VehicleCapacityDTO save(VehicleCapacityDTO vehicleCapacityDTO) {
        log.debug("Request to save VehicleCapacity : {}", vehicleCapacityDTO);
        VehicleCapacity vehicleCapacity = vehicleCapacityMapper.toEntity(vehicleCapacityDTO);
        if (vehicleCapacity.getVehicleModel() != null) {
            VehicleModelDTO vehicleModel = vehicleModelService.findOne(vehicleCapacity.getVehicleModel().getId());
            if (vehicleModel.getVehicleModelType() == VehicleModelType.CAR) {
                Long countLong = vehicleCapacityRepository.countByVehicleModel_Id(vehicleModel.getId());
                if (countLong > 0) {
                    throw new CustomParameterizedException("error.vehicle.capacity.more.than.1");
                }
            }
        }
        vehicleCapacity = vehicleCapacityRepository.save(vehicleCapacity);
        return vehicleCapacityMapper.toDto(vehicleCapacity);
    }

    /**
     * Get all the vehicleCapacities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<VehicleCapacityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all VehicleCapacities");
        return vehicleCapacityRepository.findAll(pageable)
            .map(vehicleCapacityMapper::toDto);
    }

    /**
     * Get one vehicleCapacity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public VehicleCapacityDTO findOne(Long id) {
        log.debug("Request to get VehicleCapacity : {}", id);
        VehicleCapacity vehicleCapacity = vehicleCapacityRepository.findOne(id);
        return vehicleCapacityMapper.toDto(vehicleCapacity);
    }

    /**
     * Delete the vehicleCapacity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete VehicleCapacity : {}", id);
        vehicleCapacityRepository.delete(id);
    }
}
