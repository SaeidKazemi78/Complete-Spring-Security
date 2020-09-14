package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Depot;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.enumeration.DepotType;
import ir.donyapardaz.niopdc.base.repository.DepotRepository;
import ir.donyapardaz.niopdc.base.repository.LocationRepository;
import ir.donyapardaz.niopdc.base.repository.ProductRepository;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.DepotDTO;
import ir.donyapardaz.niopdc.base.service.dto.DepotFullDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.DepotApiDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.AoServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.RefuelCenterDTO;
import ir.donyapardaz.niopdc.base.service.mapper.pda.DepotApiMapper;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.mapper.DepotMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductMapper;
import ir.donyapardaz.niopdc.base.service.mapper.pda.DepotApiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Depot.
 */
@Service
@Transactional
public class DepotService {

    private final Logger log = LoggerFactory.getLogger(DepotService.class);

    private final DepotRepository depotRepository;

    private final DepotMapper depotMapper;
    private final AoServiceClient aoServiceClient;

    private ProductRepository productRepository;
    private ProductMapper productMapper;
    private LocationRepository locationRepository;
    private DepotApiMapper depotApiMapper;

    public DepotService(DepotRepository depotRepository, DepotMapper depotMapper, AoServiceClient aoServiceClient, ProductRepository productRepository, ProductMapper productMapper, LocationRepository locationRepository, DepotApiMapper depotApiMapper) {
        this.depotRepository = depotRepository;
        this.depotMapper = depotMapper;
        this.aoServiceClient = aoServiceClient;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.locationRepository = locationRepository;
        this.depotApiMapper = depotApiMapper;
    }

    /**
     * Save a depot.
     *
     * @param depotDTO the entity to save
     * @return the persisted entity
     */
    public DepotFullDTO save(DepotFullDTO depotDTO) {
        log.debug("Request to save Depot : {}", depotDTO);
        Depot depot = depotMapper.toFullEntity(depotDTO);
        if (depot.getDepotType() == DepotType.DEPOT) {
            Set<Location> locations = locationRepository.findAllSubLocationsByLevel(
                depot.getLocations().stream()
                    .map(Location::getId).collect(Collectors.toList()), 2, SecurityUtils.getCurrentUserLogin().get()).stream().map(location -> {
                Location location1 = new Location();
                location1.setId(location.getId());
                return location1;
            }).collect(Collectors.toSet());
            depot.setLocations(locations);
        } else {
            depot.setLocation(locationRepository.findOneByLocationParentIsNull());
            depot.setLocations(null);
        }
        depot = depotRepository.save(depot);
        return depotMapper.toFullDto(depot);
    }

    /**
     * Get all the depots.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DepotDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all Depots");
        Page<Depot> depots = depotRepository.findAll(query, pageable);
        return depots.map(depotMapper::toDto);
    }

    /**
     * Get all the depots.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DepotDTO> findAll() {
        log.debug("Request to get all Depots");
        List<Depot> result = depotRepository.findAll();
        return depotMapper.toDto(result);
    }

    /**
     * Get one depot by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DepotFullDTO findOne(Long id) {
        log.debug("Request to get Depot : {}", id);
        Depot depot = depotRepository.findOneWithEagerRelationships(id);
        return depotMapper.toFullDto(depot);
    }

    /**
     * Get one depot by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DepotDTO findOneWithRefuelCenter(Long id) {
        log.debug("Request to get Depot : {}", id);
        Depot depot = depotRepository.findOneWithEagerRelationships(id);
        DepotDTO depotDTO = depotMapper.toDto(depot);
        injectRefuelCenter(depotDTO);
        return depotDTO;
    }

    void injectRefuelCenter(DepotDTO... depotDTOS) {
        List<Long> ids = Arrays.stream(depotDTOS).map(DepotDTO::getRefuelCenterId).distinct().collect(Collectors.toList());
        log.info(ZonedDateTime.now().toString());
        Set<RefuelCenterDTO> refuelCenters = aoServiceClient.getRefuelCenters(ids);
        log.info(ZonedDateTime.now().toString());

        for (DepotDTO depot : depotDTOS) {
            depot.setRefuelCenter(refuelCenters.stream().filter(refuelCenterDTO -> refuelCenterDTO.getId().equals(depot.getRefuelCenterId())).findAny().get());
        }
        log.info(ZonedDateTime.now().toString());
    }


    /**
     * Delete the depot by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Depot : {}", id);
        depotRepository.delete(id);
    }

    /**
     * Get all the depots.
     *
     * @param depotId  the depot Id
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllProducts(Long depotId, Pageable pageable) {
        log.debug("Request to get all Depots");
        Page<Product> result = productRepository.findAllByDepot(depotId, pageable);
        return result.map(product -> productMapper.toDto(product));
    }

    /**
     * Get all the depots.
     *
     * @param Id        the depot Id
     * @param startDate the start date
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DepotApiDTO> findAllOrOne(Long Id, Date startDate) {
        log.debug("Request to get all Depots");
        List<Depot> result = depotRepository.findAllOrOne(Id, startDate);
        return depotApiMapper.toDto(result);
    }

    public DepotFullDTO findOneByRefuelCenterId(Long id) {
        Depot depot = depotRepository.findFirstByRefuelCenterId(id);
        return depotMapper.toFullDto(depot);
    }

    public DepotDTO getDepotIdByCode(String depotCode) {
        return depotMapper.toDto(depotRepository.findFirstByCode(depotCode));
    }

    public List<DepotDTO> getAllDepotByCodes(List<String> depotCodes) {
        if (depotCodes != null && depotCodes.size() > 0)
            return depotRepository.findAllByCodes(depotCodes).stream().map(depotMapper::toDto).collect(Collectors.toList());
        return null;
    }
}
