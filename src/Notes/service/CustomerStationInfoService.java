package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.CustomerStationInfo;
import ir.donyapardaz.niopdc.base.domain.NozzleProductCount;
import ir.donyapardaz.niopdc.base.repository.CustomerStationInfoRepository;
import ir.donyapardaz.niopdc.base.service.dto.CustomerStationInfoDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CustomerStationInfoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing CustomerStationInfo.
 */
@Service
@Transactional
public class CustomerStationInfoService {

    private final Logger log = LoggerFactory.getLogger(CustomerStationInfoService.class);

    private final CustomerStationInfoRepository customerStationInfoRepository;

    private final CustomerStationInfoMapper customerStationInfoMapper;

    public CustomerStationInfoService(CustomerStationInfoRepository customerStationInfoRepository, CustomerStationInfoMapper customerStationInfoMapper) {
        this.customerStationInfoRepository = customerStationInfoRepository;
        this.customerStationInfoMapper = customerStationInfoMapper;
    }

    /**
     * Save a customerStationInfo.
     *
     * @param customerStationInfoDTO the entity to save
     * @return the persisted entity
     */
    public CustomerStationInfoDTO save(CustomerStationInfoDTO customerStationInfoDTO) {
        log.debug("Request to save CustomerStationInfo : {}", customerStationInfoDTO);
        CustomerStationInfo customerStationInfo = customerStationInfoMapper.toEntity(customerStationInfoDTO);
        customerStationInfo = customerStationInfoRepository.save(customerStationInfo);
        for (NozzleProductCount nozzleProductCount : customerStationInfo.getNozzleProductCounts()) {
            nozzleProductCount.setCustomerStationInfo(customerStationInfo);
        }
        return customerStationInfoMapper.toDto(customerStationInfo);
    }

    /**
     * Get all the customerStationInfos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerStationInfoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CustomerStationInfos");
        return customerStationInfoRepository.findAll(pageable)
            .map(customerStationInfoMapper::toDto);
    }

    /**
     * Get one customerStationInfo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerStationInfoDTO findOne(Long id) {
        log.debug("Request to get CustomerStationInfo : {}", id);
        CustomerStationInfo customerStationInfo = customerStationInfoRepository.findOne(id);
        return customerStationInfoMapper.toDto(customerStationInfo);
    }

    /**
     * Delete the customerStationInfo by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete CustomerStationInfo : {}", id);
        customerStationInfoRepository.delete(id);
    }
}
