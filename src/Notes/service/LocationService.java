package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkType;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.pda.LocationApiDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.AccountingServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.UaaServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.OrderNumberDTO;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import ir.donyapardaz.niopdc.base.service.mapper.pda.LocationApiMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Location.
 */
@Service
@Transactional
public class LocationService {

    private final Logger log = LoggerFactory.getLogger(LocationService.class);

    private final LocationRepository locationRepository;

    private final LocationMapper locationMapper;
    private final LocationApiMapper locationApiMapper;
    private final DepotMapper depotMapper;
    private final UaaServiceClient uaaServiceClient;
    private final AccountingServiceClient accountingServiceClient;
    private final ShiftWorkRepository shiftWorkRepository;
    private final ShiftWorkMapper shiftWorkMapper;
    private final BoundaryTagRepository boundaryTagRepository;
    private final BoundaryTagMapper boundaryTagMapper;
    private final TagRateRepository tagRateRepository;
    private final TagRateMapper tagRateMapper;
    private RegionRepository regionRepository;
    private RegionMapper regionMapper;
    private DepotRepository depotRepository;
    private CustomerRepository customerRepository;
    private CustomerMapper customerMapper;
    private UserDataAccessRepository userDataAccessRepository;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;
    private LocationSelectorMapper locationSelectorMapper;
    private OrderServiceClient orderServiceClient;

    public LocationService(LocationRepository locationRepository, LocationMapper locationMapper, LocationApiMapper locationApiMapper, DepotMapper depotMapper, UaaServiceClient uaaServiceClient, BoundaryTagRepository boundaryTagRepository, BoundaryTagMapper boundaryTagMapper, TagRateRepository tagRateRepository, TagRateMapper tagRateMapper, RegionRepository regionRepository, RegionMapper regionMapper, DepotRepository depotRepository, CustomerRepository customerRepository, CustomerMapper customerMapper, UserDataAccessRepository userDataAccessRepository, UserDataAccessServiceAsync userDataAccessServiceAsync, AccountingServiceClient accountingServiceClient, ShiftWorkRepository shiftWorkRepository, ShiftWorkMapper shiftWorkMapper, LocationSelectorMapper locationSelectorMapper, OrderServiceClient orderServiceClient) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
        this.locationApiMapper = locationApiMapper;
        this.depotMapper = depotMapper;
        this.uaaServiceClient = uaaServiceClient;
        this.boundaryTagRepository = boundaryTagRepository;
        this.boundaryTagMapper = boundaryTagMapper;
        this.tagRateRepository = tagRateRepository;
        this.tagRateMapper = tagRateMapper;
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
        this.depotRepository = depotRepository;
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.userDataAccessRepository = userDataAccessRepository;
        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.accountingServiceClient = accountingServiceClient;
        this.shiftWorkRepository = shiftWorkRepository;
        this.shiftWorkMapper = shiftWorkMapper;
        this.locationSelectorMapper = locationSelectorMapper;
        this.orderServiceClient = orderServiceClient;
    }

    /**
     * Save a location.
     *
     * @param locationDTO the entity to save
     * @return the persisted entity
     */
    public LocationFullDTO save(LocationFullDTO locationDTO) {
        log.debug("Request to save Location : {}", locationDTO);
        Location location = locationMapper.toFullEntity(locationDTO);
        int level = 0;
        if (locationDTO.getLocationId() != null) {
            LocationFullDTO parentLocationDTO = findOne(locationDTO.getLocationId());
            if (parentLocationDTO.getLevel() == 0)
                location.setFinancialCode(null);
            level = parentLocationDTO.getLevel() + 1;
        }
        location.setLevel(level);

        /*if (location.getId() == null) {
            Set<Region> regions = location.getRegions();
            location.setRegions(null);
            locationRepository.save(location);
            location.setRegions(regions);
        }*/

        if (location.getCostAccount() != null && location.getCostAccount().isEmpty())
            location.setCostAccount(null);
        if (location.getFinancialCode() != null && location.getFinancialCode().isEmpty())
            location.setFinancialCode(null);

        Location location1 = locationRepository.saveAndFlush(location);

        if (locationDTO.getId() == null && location.getLocationParent() != null) {
            List<Location> locationUp = locationRepository.findAllRecursiveToUp(new ArrayList<Long>() {{
                add(location.getLocationParent().getId());
            }});

            List<UserDataAccess> userDataAccesses = userDataAccessRepository.findAllByLocation(locationUp.stream()
                .map(Location::getId).collect(Collectors.toList()));

            userDataAccessServiceAsync.addUserRows(userDataAccesses, new ArrayList<Location>() {{
                add(location);
            }}, null);
        }

        return locationMapper.toFullDto(location1);
    }


    /**
     * Get all the locations.
     *
     * @param ids the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationFullDTO> findAllSubLocation(List<Long> ids) {
        log.debug("Request to get all Locations");
        List<LocationFullDTO> result = new ArrayList<>();
        ids.forEach(aLong -> {
            Location one = locationRepository.findOne(aLong);
            if (one.getLevel() == 0) {
                one.getSubLocations().forEach(location -> location.getSubLocations().forEach(location1 -> result.add(locationMapper.toFullDto(location1))));
            } else if (one.getLevel() == 1) {
                one.getSubLocations().forEach(location -> result.add(locationMapper.toFullDto(location)));
            } else {
                result.add(locationMapper.toFullDto(one));
            }
        });

        return result;
    }

    /**
     * Get all the locations.
     *
     * @param name
     * @param code
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAllByLocationId(Long parentId, String name, String code, String query, Pageable pageable) {
        log.debug("Request to get all Locations");

//        Page<Location> allByLocationId = locationRepository.findAllByLocationId(parentId, query, pageable);
        if (name != null)
            name = "%" + name + "%";
        if (code != null)
            code = "%" + code + "%";
        List<Location> allByLocationId = locationRepository.findAllByLocationIdNative(parentId, name, code,
            SecurityUtils.getCurrentUserLogin().get());

//        Page<LocationDTO> map = allByLocationId.map(locationMapper::toDto);
        List<LocationDTO> map = locationMapper.toDto(allByLocationId);
        map.forEach(locationDTO -> {
            locationDTO.setCanOpen(locationDTO.getDay() != null && locationDTO.getDay().getDayOfYear() == (ZonedDateTime.now().getDayOfYear() + 1));
            locationDTO.setCanClose(locationDTO.getDay() != null && locationDTO.getDay().getDayOfYear() == ZonedDateTime.now().getDayOfYear());
        });
        return map;
    }


    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAllByLocationIdAndCustomerIds(Long parentId, Boolean dataAccess, List<Long> customerIds) {
        log.debug("Request to get all Locations");
        Set<Long> locations = new HashSet<>();
        boolean haveCustomer = customerIds != null && customerIds.size() > 0;
        if (haveCustomer) {
            Set<Long> locations1 = new HashSet<>();
            customerRepository.findAllByIdInWithEagerRelationships(customerIds)
                .forEach(customer -> customer.getLocations()
                    .forEach(location -> locations1.add(location.getId())));
            locations = findAllRecursiveToDown(locations1).stream().map(Location::getId).collect(Collectors.toSet());
        }
        List<Location> result = customerIds != null && customerIds.size() == 0 ? new ArrayList<>() :
            locationRepository.findAllForSelector(dataAccess == null || dataAccess ?
                    SecurityUtils.getCurrentUserLogin().get() :
                    null,
                parentId,
                customerIds == null ?
                    1 :
                    0,
                locations.size() == 0 ?
                    null :
                    locations);

        return locationMapper.toDto(result);
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Location> findAllRecursiveToDown(Set<Long> ids) {
        log.debug("Request to get all Locations");
        return findAllRecursiveToDown(ids, new ArrayList<Integer>() {{
            add(0);
            add(1);
            add(2);
            add(3);
        }});
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Location> findAllRecursiveToDown(Set<Long> ids, List<Integer> levels) {
        log.debug("Request to get all Locations");
        return locationRepository.findAllRecursiveToDown(ids, levels);
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAllRecursiveToUp(Long id) {
        log.debug("Request to get all Locations");
        ArrayList<Long> id1 = new ArrayList<Long>() {{
            add(id);
        }};
        List<Location> result = locationRepository.findAllRecursiveToUp(id1);
        return locationMapper.toDto(result);
    }

    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAllRecursiveToUp(List<Long> ids) {
        log.debug("Request to get all Locations");
        List<Location> result = locationRepository.findAllRecursiveToUp(ids);
        return locationMapper.toDto(result);
    }

    @Transactional(readOnly = true)
    public Map<Long, List<LocationSelectorDTO>> findAllRecursiveToUpIds(List<Long> ids) {
        log.debug("Request to get all Regions");
        Map<Long, List<LocationSelectorDTO>> result = new HashMap<>();
        List<Location> locations = locationRepository.findAllRecursiveToUp(ids);
        locations = locationRepository.findAllWithEagerRelationships(locations, SecurityUtils.getCurrentUserLogin().get());


        if (locations.isEmpty() || (ids == null || ids.isEmpty())) return result;
        for (Long id : ids) {
            Location location = locations.stream().filter(location1 -> location1.getId().equals(id)).findAny().orElse(null);

            if (location == null) return result;

            List<Location> locationList = new ArrayList<>();
            do {
                locationList.add(0, location);
            } while ((location = location.getLocationParent()) != null);

            result.put(id, locationSelectorMapper.toDto(locationList));
        }

        return result;
    }


    /**
     * Get all the locations.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LocationDTO> findAllSubLocationByLevel(int level) {
        log.debug("Request to get all Locations");
        List<Location> result = locationRepository.findAllByLevel(level);
        return locationMapper.toDto(result);
    }


    /**
     * Get all the locations depots.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DepotDTO> findAllDepots(Long locationId) {
        log.debug("Request to get all Locations");

        Location location = locationRepository.findOne(locationId);


        ArrayList<Depot> depots = new ArrayList<>();
        boolean b = depots.addAll(location.getDepots());
        return depotMapper.toDto(depots);
    }


    /**
     * Get all the locations depots.
     *
     * @param locations
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DepotDTO> findAllDepotRecursive(Long locations, String contractType) {
        log.debug("Request to get all Locations");
        if (locations == -1)
            locations = locationRepository.findOneByLocationParentIsNull().getId();
        List<Depot> depots = depotRepository.findAllByLocationsIn(
            locations,
            SecurityUtils.getCurrentUserLogin().get(), contractType);
        return depotMapper.toDto(depots);
    }


    /**
     * Get all the locations depots.
     *
     * @param locations
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<DepotDTO> findAllDepotRecursive(Long locations) {
        log.debug("Request to get all Locations");
        if (locations == -1)
            locations = locationRepository.findOneByLocationParentIsNull().getId();
        List<Depot> depots = depotRepository.findAllByLocationsIn(
            locations,
            SecurityUtils.getCurrentUserLogin().get());
        return depotMapper.toDto(depots);
    }

    /**
     * Get one location by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public LocationFullDTO findOne(Long id) {
        log.debug("Request to get Location : {}", id);
        Location location = locationRepository.findOneWithEagerRelationships(id);
        return locationMapper.toFullDto(location);
    }

    /**
     * Get one location by id.
     *
     * @return the entity
     */
    @Transactional(readOnly = true)
    public LocationFullDTO findRoot() {
        log.debug("Request to get Location : setad");
        Location location = locationRepository.findOneByLocationParentIsNull();
        return locationMapper.toFullDto(location);
    }

  /*  @Transactional(readOnly = true)
    public String getLocationCurrentOrderNumber(Long id) {
        log.debug("Request to get Location : {}", id);
        Location location = locationRepository.findOneWithEagerRelationships(id);
        return location.getCurrentOrderNumber() == null ? "" : location.getCurrentOrderNumber();
    }

    public void updateLocationCurrentOrderNumber(Long id, String currentOrderNumber) {
        Location location = locationRepository.findOneWithEagerRelationships(id);
        location.setCurrentOrderNumber(currentOrderNumber);
        locationRepository.save(location);
    }*/

    /**
     * Delete the location by id.
     *
     * @param id the id of the entity
     */
    public Integer delete(Long id) {
        log.debug("Request to delete Location : {}", id);
        int level;
        level = locationRepository.findOne(id).getLevel();
        locationRepository.delete(id);
        return level;
    }

    public List<LocationDTO> findAllByParent(List<Long> ids) {
        List<Location> locations = locationRepository.findAllRecursiveToUpByAccessUser(SecurityUtils.getCurrentUserLogin().get(), ids);
        /*Boolean key = true;
        List<Location> locations = locationRepository.findAllById(ids);
        List<Location> temp1 = locations;
        while (key) {
            List<Location> temp = locationRepository.findAllByParent(temp1);
            locations.addAll(temp);
            temp1 = temp.stream().filter(location ->
                location.getLevel() > 0
            ).collect(Collectors.toList());
            if (temp1.size() == 0) {
                key = false;
            }
        }*/
        return locationMapper.toDto(locations);
    }

    public List<LocationWithCountryDTO> findAllByLevelAndUsername(int level) {
        return locationMapper.toDtoWithCountry(
            locationRepository.findAllByLevelAndUsername(level, SecurityUtils.getCurrentUserLogin().get())
        );
    }

    public List<RegionDTO> findAllRegionByLocationId(Long locationId) {
        List<Region> regions = regionRepository.findAllByLocation(locationId, SecurityUtils.getCurrentUserLogin().get());
        return regionMapper.toDto(regions);
    }

    public List<RegionDTO> findAllRegionByLocationIds(List<Long> locationIds) {
        List<Region> regions = regionRepository.findAllByLocations(locationIds, SecurityUtils.getCurrentUserLogin().get());
        return regionMapper.toDto(regions);
    }

    public List<CustomerFullDTO> findAllCustomers(Long locationId) {

        return customerMapper.toDto(
            customerRepository.findAllByLocations_Id(locationId)
        );

    }

    public List<LocationDTO> findAllSubLocationsByLevel(List<Long> ids, Integer level) {
        return locationMapper.toDto(locationRepository.findAllSubLocationsByLevel(ids, level, SecurityUtils.getCurrentUserLogin().get()));
    }


    public List<LocationApiDTO> findAllByStartDateAndId(Date startDate, Long id) {
        return locationApiMapper.toDto(locationRepository.findAllByStartDateAndId(startDate, id, SecurityUtils.getCurrentUserLogin().get()));
    }


    public List<LocationDTO> getAllLocationForOrder() {
        return locationMapper.toDto(
            locationRepository.findAllByForOrderAndUsername(SecurityUtils.getCurrentUserLogin().get())
        );
    }

    public List<BigInteger> getAllLocationByUsername(String username) {
        return locationRepository.findAllUserName(username);
    }

    public void close(Long id) {
        Location location = locationRepository.findOne(id);
        ZonedDateTime day = ZonedDateTime.now();
        day = day.minusNanos(day.getNano());
        day = day.minusSeconds(day.getSecond());
        day = day.minusMinutes(day.getMinute());
        day = day.minusHours(day.getHour());
        location.setDay(day);
        if (location.getDay() == null)
            throw new CustomParameterizedException("error.day.is.null");
        locationRepository.save(location);
    }

    public void open(Long id) {
        Location location = locationRepository.findOne(id);
        if (accountingServiceClient.existsConfirm(location.getId(), location.getDay().toInstant()))
            throw new CustomParameterizedException("voucher.master.exists");
        if (location.getDay() == null || location.getDay().getDayOfYear() == ZonedDateTime.now().getDayOfYear())
            throw new CustomParameterizedException("error.day.is.null");
        location.setDay(location.getDay().minusDays(1));
        locationRepository.save(location);

    }

    public LocationDTO getOpenDay(Long id) {
        Location location = locationRepository.findOne(id);
        if (location.getDay() != null) {
            if (location.getDay().getDayOfYear() < ZonedDateTime.now().getDayOfYear()) {
                close(id);
            }
        } else {
            ZonedDateTime day = ZonedDateTime.now();
            location.setDay(day);
        }
        locationRepository.save(location);
        location = locationRepository.findOne(id);
        return locationMapper.toDto(location);
    }

    public LocationDateDTO getLocationDate(Long id) {
        LocationDateDTO locationDateDTO = new LocationDateDTO();
        locationDateDTO.setLocationDay(locationRepository.findOne(id).getDay());
        locationDateDTO.setServerDate(ZonedDateTime.now());
        if (locationDateDTO.getLocationDay() == null)
            locationDateDTO.setLocationDay(ZonedDateTime.now());
        locationDateDTO.setDay(locationDateDTO.getLocationDay().getDayOfYear() <= locationDateDTO.getServerDate().getDayOfYear());
        return locationDateDTO;
    }

    public Page<ShiftWorkDTO> findAllShiftWorks(Long id, String query, Pageable pageable) {
        log.debug("Request to get all Shift Works");
        Page<ShiftWork> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(ShiftWork.class, "shiftWork"), null);
            BooleanExpression customerExpression = QShiftWork.shiftWork.location.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = shiftWorkRepository.findAll(booleanExpression, pageable);
        } else {
            result = shiftWorkRepository.findByLocation_Id(id, pageable);
        }
        Page<ShiftWorkDTO> shiftWorkDTOS = result.map(shiftWorkMapper::toDto);
        ShiftWork first = shiftWorkRepository.findFirstByLocation_IdOrderByToDateDesc(id);
        shiftWorkDTOS.forEach(shiftWork -> shiftWork.setCanOpen(shiftWork.getToDate() == null || shiftWork.getToDate().equals(first.getToDate())));
        return shiftWorkDTOS;
    }


    public void openShiftWork(Long locationId, Boolean tomorrow) {
        ShiftWorkDTO shiftWorkDTO = findOpenedShiftWork(locationId);

        if (shiftWorkDTO.getType() != ShiftWorkType.CLOSE)
            throw new CustomParameterizedException("error.exist.open.day");


        ShiftWork shiftWork = new ShiftWork();


        shiftWork.setLocation(locationRepository.findOne(locationId));
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Tehran"));
        if (tomorrow) {
            now = now.plusDays(1);
            now = now.minusHours(now.getHour());
            now = now.minusMinutes(now.getMinute());
            now = now.minusSeconds(now.getSecond());
            now = now.minusNanos(now.getNano());
        }
        shiftWork.setFromDate(now);

        shiftWorkRepository.save(shiftWork);
    }

    public void closeShiftWork(Long locationId) {
        ShiftWork shiftWork = shiftWorkRepository.findFirstByLocation_IdAndToDateIsNull(locationId);

        if (shiftWork == null)
            throw new CustomParameterizedException("error.not.exist.open.day");

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Tehran"));

        if (shiftWork.getFromDate().isAfter(now)) {
            throw new CustomParameterizedException("error.fromDateIsBeforeNow");
        }

        shiftWork.setToDate(now);

        shiftWorkRepository.save(shiftWork);
    }

    public ShiftWorkDTO findOpenedShiftWorkWithOrderNumber(Long locationId) {

        OrderNumberDTO orderNumber;
        orderNumber = orderServiceClient.getOrderNumber(locationId);

        return findOpenedShiftWork(locationId).orderNumber(orderNumber);

    }

    public ShiftWorkDTO findOpenedShiftWork(Long locationId) {
        Location location = this.locationRepository.findOneByUserName(SecurityUtils.getCurrentUserLogin().get(), locationId);
        if (location == null)
            throw new CustomParameterizedException("location.access.deny");

        ShiftWork shiftWork = shiftWorkRepository.findFirstByLocation_IdAndToDateIsNull(locationId);

        if (shiftWork == null) return new ShiftWorkDTO().type(ShiftWorkType.CLOSE);

        ZonedDateTime plusDays = shiftWork.getFromDate().plusDays(1);
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Tehran"));

        if (now.isAfter(plusDays)) {
            shiftWork.setToDate(plusDays);
            shiftWorkRepository.save(shiftWork);
            return new ShiftWorkDTO().type(ShiftWorkType.CLOSE);
        }

        ShiftWorkDTO shiftWorkDTO = shiftWorkMapper.toDto(shiftWork);

        if (shiftWork.getFromDate().isAfter(now))
            return shiftWorkDTO.type(ShiftWorkType.OPEN_TOMORROW);

        return shiftWorkDTO.type(ShiftWorkType.OPEN);
    }


    public Set<Location> getAccessLocation(Set<Location> locations) {
        return getAccessLocation(locations, null);
    }

    private Set<Location> getAccessLocation(Set<Location> locations, Set<Location> locationAccess) {
        if (locationAccess == null) locationAccess = new HashSet<>();
        if (locations == null) return locationAccess;
        for (Location location : locations) {
            String username = SecurityUtils.getCurrentUserLogin().get();
            Location location1 = locationRepository.findOneByUserName(username, location.getId());
            if (location1 == null) {
                getAccessLocation(locationRepository.findAllByLocationId(username, location.getId())
                    , locationAccess);
            } else {
                locationAccess.add(location1);
            }
        }
        return locationAccess;
    }

    public List<LocationDTO> getSubLocation(Set<Location> locations) {
        return locationMapper.toDto(new ArrayList<>(getAccessLocation(locations)));
    }

    public Page<BoundaryTagDTO> findAllBoundaryTag(Long id, String query, Pageable pageable) {
        log.debug("Request to get all boundary tag");
        Page<BoundaryTag> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(BoundaryTag.class, "boundaryTag"), null);
            BooleanExpression customerExpression = QBoundaryTag.boundaryTag.location.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = boundaryTagRepository.findAll(booleanExpression, pageable);
        } else {
            result = boundaryTagRepository.findByLocation_Id(id, pageable);

        }
        return result.map(boundaryTagMapper::toDto);
    }

    public Page<TagRateDTO> findAllTagRate(Long id, String query, Pageable pageable) {
        log.debug("Request to get all boundary tag");
        Page<TagRate> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(TagRate.class, "tagRate"), null);
            BooleanExpression customerExpression = QTagRate.tagRate.location.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = tagRateRepository.findAll(booleanExpression, pageable);
        } else {
            result = tagRateRepository.findByLocation_Id(id, pageable);

        }
        return result.map(tagRateMapper::toDto);
    }

    public String getStateLocationCode(Set<Location> customerLocations) {
        String locationCode;
        if (customerLocations.size() > 1) {
            locationCode = locationRepository.findOneByLocationParentIsNull().getStateCode();
        } else {
            Location location = customerLocations.iterator().next();
            if (location.getLevel().equals(0)) {
                locationCode = location.getStateCode();
            } else {
                List<Location> locations = locationRepository.findAllRecursiveToUp(
                    customerLocations.stream()
                        .map(Location::getId).collect(Collectors.toList()));
                locationCode = locations.stream().filter(location1 -> location1.getLevel().equals(1)).findFirst().get().getStateCode();
            }
        }
        return locationCode;
    }

    public LocationDTO findOneLocationByCode(String code, Long lvl) {
        Location location;
        if (code.length() == 4) {
            if (lvl == (null)) {
                lvl = 2L;
            }
            location = locationRepository.findByLocationCode(code, lvl);
        } else {
            location = locationRepository.findOneByLocationCode(code);
        }

        if (location == null) {
            throw new CustomParameterizedException("error.locationNotFind");
        }
        return locationMapper.toDto(location);
    }

    public LocationDTO findOneByLocationParentIsNull() {
        return locationMapper.toDto(locationRepository.findOneByLocationParentIsNull());
    }
}
