package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Location;
import ir.donyapardaz.niopdc.base.domain.QUserDataAccess;
import ir.donyapardaz.niopdc.base.domain.UserDataAccess;
import ir.donyapardaz.niopdc.base.repository.LocationRepository;
import ir.donyapardaz.niopdc.base.repository.UserDataAccessRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.LocationDTO;
import ir.donyapardaz.niopdc.base.service.dto.UserDataAccessDTO;
import ir.donyapardaz.niopdc.base.service.mapper.LocationMapper;
import ir.donyapardaz.niopdc.base.service.mapper.UserDataAccessMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import liquibase.exception.CustomPreconditionErrorException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing UserDataAccess.
 */
@Service
@Transactional
public class UserDataAccessService {

    private final Logger log = LoggerFactory.getLogger(UserDataAccessService.class);

    private final UserDataAccessRepository userDataAccessRepository;

    private final UserDataAccessMapper userDataAccessMapper;
    private final LocationMapper locationMapper;
    private final LocationRepository locationRepository;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;
    private LocationService locationService;

    public UserDataAccessService(UserDataAccessRepository userDataAccessRepository, UserDataAccessMapper userDataAccessMapper, LocationMapper locationMapper, LocationRepository locationRepository, UserDataAccessServiceAsync userDataAccessServiceAsync, LocationService locationService) {
        this.userDataAccessRepository = userDataAccessRepository;
        this.userDataAccessMapper = userDataAccessMapper;
        this.locationMapper = locationMapper;
        this.locationRepository = locationRepository;

        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.locationService = locationService;
    }

    /**
     * Save a userDataAccess.
     *
     * @param userDataAccessDTO the entity to save
     * @return the persisted entity
     */
    public UserDataAccessDTO save(UserDataAccessDTO userDataAccessDTO) {
        log.debug("Request to save UserDataAccess : {}", userDataAccessDTO);
        UserDataAccess userDataAccess = userDataAccessMapper.toEntity(userDataAccessDTO);


        HashSet<Location> locations = new HashSet<>();
        locations.add(userDataAccess.getLocation());
        Set<Location> locations1 = locationService.getAccessLocation(locations);
        if (locations1.size() == 0)
            throw new CustomParameterizedException("error.locationIsAccessDeny");
        userDataAccess.setLocation(locations1.iterator().next());

        if (userDataAccess.getId() != null)
            userDataAccessRepository.delete(userDataAccess.getId());
        userDataAccessRepository.flush();
        userDataAccess = userDataAccessRepository.save(userDataAccess);
        userDataAccessServiceAsync.addUserRow(userDataAccess);
        return userDataAccessMapper.toDto(userDataAccess);
    }


    /*
    public List<UserDataAccess> save(List<UserDataAccess> userDataAccesses) {
        userDataAccesses.forEach(this::userDataAccessCompleteDate);

        return userDataAccessRepository.save(userDataAccesses);
    }*/
/*

    private UserDataAccess userDataAccessCompleteDate(UserDataAccess userDataAccess) {
        List<UserDataAccess> allByUsername = userDataAccessRepository.findAllByUsername(userDataAccess.getUsername());

        if(allByUsername==null)
            throw new CustomParameterizedException("not.found.userDataAccess");

        if (userDataAccess.getLocation() == null) {
            Optional<UserDataAccess> firstForLocation = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getLocation() != null).findFirst();
            firstForLocation.ifPresent(userDataAccess1 -> userDataAccess.setLocation(userDataAccess1.getLocation()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getLocation() == null)
                userDataAccess1.setLocation(userDataAccess.getLocation());
        });
        if (userDataAccess.getRegion() == null) {
            Optional<UserDataAccess> firstForRegion = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getRegion() != null).findFirst();
            firstForRegion.ifPresent(userDataAccess1 -> userDataAccess.setRegion(userDataAccess1.getRegion()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getRegion() == null)
                userDataAccess1.setRegion(userDataAccess.getRegion());
        });
        if (userDataAccess.getCustomerType() == null) {
            Optional<UserDataAccess> firstForCustomerType = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getCustomerType() != null).findFirst();
            firstForCustomerType.ifPresent(userDataAccess1 -> userDataAccess.setCustomerType(userDataAccess1.getCustomerType()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getCustomerType() == null)
                userDataAccess1.setCustomerType(userDataAccess.getCustomerType());
        });
        if (userDataAccess.getCustomer() == null) {
            Optional<UserDataAccess> firstForCustomer = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getCustomer() != null).findFirst();
            firstForCustomer.ifPresent(userDataAccess1 -> userDataAccess.setCustomer(userDataAccess1.getCustomer()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getCustomer() == null)
                userDataAccess1.setCustomer(userDataAccess.getCustomer());
        });
        if (userDataAccess.getPerson() == null) {
            Optional<UserDataAccess> firstForPerson = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getPerson() != null).findFirst();
            firstForPerson.ifPresent(userDataAccess1 -> userDataAccess.setPerson(userDataAccess1.getPerson()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getPerson() == null)
                userDataAccess1.setPerson(userDataAccess.getPerson());
        });
        if (userDataAccess.getContractType() == null) {
            Optional<UserDataAccess> firstForContract = allByUsername.stream()
                .filter(userDataAccess1 -> userDataAccess1.getContractType() != null).findFirst();
            firstForContract.ifPresent(userDataAccess1 -> userDataAccess.setContractType(userDataAccess1.getContractType()));
        } else allByUsername.forEach(userDataAccess1 -> {
            if (userDataAccess1.getContractType() == null)
                userDataAccess1.setContractType(userDataAccess.getContractType());
        });
        return userDataAccess;
    }
*/

    /**
     * Get all the userDataAccesses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserDataAccessDTO> findAll(String user, String query, Pageable pageable) {
        log.debug("Request to get all UserDataAccesses");
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder(UserDataAccess.class, "userDataAccess"), null);
            BooleanExpression eq = QUserDataAccess.userDataAccess.username.eq(user);
            booleanExpression = booleanExpression == null ? eq : booleanExpression.and(eq);

            userDataAccessRepository.findAll(booleanExpression, pageable);
        }
        return userDataAccessRepository.findAllByUsername(user, pageable)
            .map(userDataAccessMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<LocationDTO> findAllLocationForUserTree(String user) {
        log.debug("Request to get all UserDataAccesses");
        return locationMapper.toDto(userDataAccessRepository.findAllLocation(user));
    }

    public void saveLocations(List<Long> locationIds, String username) {
        log.debug("Request to get all UserDataAccesses");
        List<Location> userDataAccessLocation = userDataAccessRepository.findAllLocation(username);
        List<Long> userDataAccessLocationIds = userDataAccessLocation.stream().map(Location::getId).collect(Collectors.toList());
        List<Long> deleteLocations = userDataAccessLocation.stream().map(Location::getId).collect(Collectors.toList());
        deleteLocations.removeAll(locationIds);
        locationIds.removeAll(userDataAccessLocationIds);
        if (deleteLocations.size() > 0)
            userDataAccessRepository.deleteByLocationAndUsername(username, deleteLocations);
        if (locationIds.size() > 0)
            locationIds.forEach(locationId -> {
                UserDataAccessDTO userDataAccessDTO = new UserDataAccessDTO();
                userDataAccessDTO.setUsername(username);
                userDataAccessDTO.setLocationId(locationId);
                save(userDataAccessDTO);
            });

        userDataAccessServiceAsync.refreshLocationAccess();
    }

    /**
     * Get one userDataAccess by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public UserDataAccessDTO findOne(Long id) {
        log.debug("Request to get UserDataAccess : {}", id);
        UserDataAccess userDataAccess = userDataAccessRepository.findOne(id);
        return userDataAccessMapper.toDto(userDataAccess);
    }

    /**
     * Delete the userDataAccess by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserDataAccess : {}", id);
        userDataAccessRepository.delete(id);
    }
}
