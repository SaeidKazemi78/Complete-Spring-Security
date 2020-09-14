package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.QVehicleCapacity;
import ir.donyapardaz.niopdc.base.domain.VehicleCapacity;
import ir.donyapardaz.niopdc.base.domain.VehicleModel;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.repository.VehicleCapacityRepository;
import ir.donyapardaz.niopdc.base.repository.VehicleModelRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.VehicleCapacityDTO;
import ir.donyapardaz.niopdc.base.service.dto.VehicleModelDTO;
import ir.donyapardaz.niopdc.base.service.mapper.VehicleCapacityMapper;
import ir.donyapardaz.niopdc.base.service.mapper.VehicleModelCapacityProductMapper;
import ir.donyapardaz.niopdc.base.service.mapper.VehicleModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing VehicleModel.
 */
@Service
@Transactional
public class VehicleModelService {

    private final Logger log = LoggerFactory.getLogger(VehicleModelService.class);

    private final VehicleModelRepository vehicleModelRepository;

    private final VehicleModelMapper vehicleModelMapper;

    private final VehicleCapacityRepository vehicleCapacityRepository;
    private final VehicleCapacityMapper vehicleCapacityMapper;
    private final VehicleModelCapacityProductMapper vehicleModelCapacityProductMapper;

    public VehicleModelService(VehicleModelRepository vehicleModelRepository, VehicleModelMapper vehicleModelMapper, VehicleCapacityRepository vehicleCapacityRepository, VehicleCapacityMapper vehicleCapacityMapper, VehicleModelCapacityProductMapper vehicleModelCapacityProductMapper) {
        this.vehicleModelRepository = vehicleModelRepository;
        this.vehicleModelMapper = vehicleModelMapper;
        this.vehicleCapacityRepository = vehicleCapacityRepository;
        this.vehicleCapacityMapper = vehicleCapacityMapper;
        this.vehicleModelCapacityProductMapper = vehicleModelCapacityProductMapper;
    }

    /**
     * Save a vehicleModel.
     *
     * @param vehicleModelDTO the entity to save
     * @return the persisted entity
     */
    public VehicleModelDTO save(VehicleModelDTO vehicleModelDTO) {
        log.debug("Request to save VehicleModel : {}", vehicleModelDTO);
        VehicleModel vehicleModel = vehicleModelMapper.toEntity(vehicleModelDTO);
        vehicleModel = vehicleModelRepository.save(vehicleModel);
        return vehicleModelMapper.toDto(vehicleModel);
    }

    /**
     * Get all the vehicleModels.
     *
     * @param
     * @param confirm
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<VehicleModelDTO> findAll(String title, VehicleModelType vehicleModelType, CustomerGroup customerGroup, String productTitle, Boolean confirm, Pageable pageable) {
        log.debug("Request to get all VehicleModels");
       /* Page<VehicleModel> result;
        if (query != null)
            result = vehicleModelRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(VehicleModel.class, "vehicleModel"), null), pageable);
        else
            result = vehicleModelRepository.findAll(pageable);
        return result.map(vehicleModelMapper::toDto);*/

        return vehicleModelRepository.findAll(title, customerGroup, vehicleModelType, productTitle,confirm, pageable).map(vehicleModelDTO -> {
            vehicleModelDTO.setCapacityInfo(vehicleModelDTO.getProductTitle());
            return vehicleModelDTO;
        });

    }

    /**
     * Get all the vehicleModels.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<VehicleModelDTO> findAllByCustomerGroup(CustomerGroup group) {
        log.debug("Request to get all VehicleModels");
        List<VehicleModel> result = vehicleModelRepository.findAllByCustomerGroup(group);
        return result.stream().map(vehicleModelMapper::toCustomDto).collect(Collectors.toList());
    }

    /**
     * Get one vehicleModel by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public VehicleModelDTO findOne(Long id) {
        log.debug("Request to get VehicleModel : {}", id);
        VehicleModel vehicleModel = vehicleModelRepository.findOne(id);
        return vehicleModelMapper.toDto(vehicleModel);
    }

    /**
     * Delete the vehicleModel by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete VehicleModel : {}", id);
        vehicleModelRepository.delete(id);
    }

    public Page<VehicleCapacityDTO> findAllVehicleCapacities(Long id, String query, Pageable pageable) {
        Page<VehicleCapacity> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(VehicleCapacity.class, "vehicleCapacity"), null);
            BooleanExpression customerExpression = QVehicleCapacity.vehicleCapacity.vehicleModel.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = vehicleCapacityRepository.findAll(booleanExpression, pageable);
        } else {
            result = vehicleCapacityRepository.findByVehicleModel_Id(id, pageable);
        }
        return result.map(vehicleCapacityMapper::toDto);
    }


    public VehicleCapacityDTO findVehicleCapacity(Long vehicleModelId) {
        VehicleCapacityDTO vehicleCapacityDTO = null;
        VehicleModel vehicleModel = vehicleModelRepository.getOne(vehicleModelId);
        if (vehicleModel != null && vehicleModel.getVehicleModelType() == VehicleModelType.CAR) {
            vehicleCapacityDTO = new VehicleCapacityDTO();
            vehicleCapacityDTO.setProductId(vehicleModel.getProduct().getId());
            vehicleCapacityDTO.setProductTitle(vehicleModel.getProduct().getTitle());
            vehicleCapacityDTO.setCapacity(vehicleModel.getCapacity());
            vehicleCapacityDTO.setVehicleModelId(vehicleModel.getId());
        }
        return vehicleCapacityDTO;
    }

    public Page<VehicleModelDTO> findAllByVehicleModel(VehicleModelType vehicleModelType, String query, Pageable pageable) {
        Page<VehicleModel> result = vehicleModelRepository.findAllByVehicleModelType(vehicleModelType, pageable);
        return result.map(vehicleModelMapper::toDto);
    }

    public void confirm(Long id) {
        VehicleModel vehicleModel = vehicleModelRepository.findOne(id);
        vehicleModel.setConfirm(true);
        vehicleModelRepository.save(vehicleModel);
    }
}
