package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeListDTO;
import ir.donyapardaz.niopdc.base.service.dto.CustomerTypeProductConsumptionDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.UaaServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerTypeMapper;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerTypeProductConsumptionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Service Implementation for managing CustomerType.
 */
@Service
@Transactional
public class CustomerTypeService {

    private final Logger log = LoggerFactory.getLogger(CustomerTypeService.class);

    private final CustomerTypeRepository customerTypeRepository;

    private final CustomerTypeMapper customerTypeMapper;

    private final CustomerTypeProductConsumptionRepository customerTypeProductConsumptionRepository;
    private final CustomerTypeProductConsumptionMapper customerTypeProductConsumptionMapper;

    public CustomerTypeService(CustomerTypeRepository customerTypeRepository, CustomerTypeMapper customerTypeMapper, CustomerTypeProductConsumptionRepository customerTypeProductConsumptionRepository, CustomerTypeProductConsumptionMapper customerTypeProductConsumptionMapper) {
        this.customerTypeRepository = customerTypeRepository;
        this.customerTypeMapper = customerTypeMapper;
        this.customerTypeProductConsumptionRepository = customerTypeProductConsumptionRepository;
        this.customerTypeProductConsumptionMapper = customerTypeProductConsumptionMapper;
    }

    /**
     * Save a customerType.
     *
     * @param customerTypeDTO the entity to save
     * @return the persisted entity
     */
    public CustomerTypeDTO save(CustomerTypeDTO customerTypeDTO) {
        log.debug("Request to save CustomerType : {}", customerTypeDTO);
        CustomerType customerType = customerTypeMapper.toEntity(customerTypeDTO);

        if (customerType.getCustomerGroup() != CustomerGroup.SELLER && customerType.getCustomerGroup() != CustomerGroup.MAJOR_CONSUMER)
            customerType.setManualQuota(null);

        customerType = customerTypeRepository.save(customerType);


        /*List<UserDTO> parentUserList = uaaServiceClient.getParentUserList(username);

        if (parentUserList == null)
            throw new CustomParameterizedException("not.found.parentUserList");

        List<UserDataAccess> addUserDataAccesses = new ArrayList<>();
        CustomerType finalCustomerType = customerType;
        parentUserList.forEach(userDTO -> {
            if (!customerTypeRepository.exists(userDTO.getLogin(), finalCustomerType.getId())) {
                userDataAccessRepository.findAllByUsername(userDTO.getLogin()).forEach(userDataAccess -> {
                    if (userDataAccess.getCustomerType() == null) {
                        userDataAccess.setId(null);
                        userDataAccess.setCustomerType(finalCustomerType);
                        addUserDataAccesses.add(userDataAccess);
                    }
                });
            }
        });
        userDataAccessRepository.save(addUserDataAccesses);*/

        return customerTypeMapper.toDto(customerType);
    }

    /**
     * Get all the customerTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerTypeListDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all CustomerTypes");
        Page<CustomerType>
            result = customerTypeRepository.findAll(query, pageable);

        return result.map(customerTypeMapper::toListDto);
    }

    @Transactional(readOnly = true)
    public List<CustomerTypeDTO> findAll(CustomerGroup customerGroup) {
        log.debug("Request to get all CustomerTypes");
        List<CustomerType>
            result = customerTypeRepository.findAllByCustomerGroup(customerGroup, SecurityUtils.getCurrentUserLogin().get());

        return customerTypeMapper.toDto(result);
    }

    @Transactional(readOnly = true)
    public List<CustomerTypeDTO> findAll(CustomerGroup customerGroup, VehicleModelType vehicleModelType) {
        log.debug("Request to get all CustomerTypes");
        List<CustomerType>
            result = customerTypeRepository.findAllByCustomerGroup(customerGroup, vehicleModelType, SecurityUtils.getCurrentUserLogin().get());

        return customerTypeMapper.toDto(result);
    }

    /**
     * Get one customerType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerTypeDTO findOne(Long id) {
        log.debug("Request to get CustomerType : {}", id);
        CustomerType customerType = customerTypeRepository.findOneWithEagerRelationships(id);
        return customerTypeMapper.toDto(customerType);
    }

    /**
     * Delete the  customerType by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerType : {}", id);
        customerTypeRepository.delete(id);
    }


    /**
     * Get all the customerTypeExpenseIncomes.
     *
     * @param customerTypeId the id of !CustomerType
     * @param query          the string for search
     * @param pageable       the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerTypeProductConsumptionDTO> findAllCustomerTypeProductConsumption(Long customerTypeId, String query, Pageable pageable) {
        Page<CustomerTypeProductConsumption> result;

        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerTypeProductConsumption.class, "customerTypeProductConsumption"), null);
            BooleanExpression customerExpression = QCustomerTypeProductConsumption.customerTypeProductConsumption.customerType.id.eq(customerTypeId);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = customerTypeProductConsumptionRepository.findAll(booleanExpression, pageable);
        } else
            result = customerTypeProductConsumptionRepository.findByCustomerType_Id(customerTypeId, pageable);
        return result.map(customerTypeProductConsumptionMapper::toDto);
    }

    public List<CustomerTypeDTO> findAllByIds(Set<Long> ids) {
        return customerTypeMapper.toDto(customerTypeRepository.findALlByIdIn(ids));
    }

/*
    public List<CostDTO> findAllCosts(Long customerTypeId) {
        List<Cost> result;
        result = costRepository.findByCustomerType_Id(customerTypeId);
        return costMapper.toDto(result);
    }*/


    public List<CustomerTypeListDTO> findAllByCustomerGroups(List<CustomerGroup> customerGroups) {
        List<CustomerType> allByCustomerGroupIn = customerTypeRepository.findAllByCustomerGroupIn(customerGroups);

        return customerTypeMapper.toListDto(allByCustomerGroupIn);
    }
}
