package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.embeddableid.*;
import ir.donyapardaz.niopdc.base.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Transactional
public class UserDataAccessServiceAsync {
    private final Logger log = LoggerFactory.getLogger(LocationService.class);

    private UserContractTypeRepository userContractTypeRepository;
    private UserCustomerTypeRepository userCustomerTypeRepository;
    private LocationRepository locationRepository;
    private UserLocationCustomerTypeRepository userLocationCustomerTypeRepository;
    private UserLocationContractTypeRepository userLocationContractTypeRepository;
    private UserLocationRepository userLocationRepository;
    private UserLocationPersonRepository userLocationPersonRepository;
    private UserLocationPersonCustomerRepository userLocationPersonCustomerRepository;
    private RegionRepository regionRepository;
    private UserLocationRegionRepository userLocationRegionRepository;
    private UserLocationRegionCustomerTypeRepository userLocationRegionCustomerTypeRepository;
    private UserLocationRegionContractTypeRepository userLocationRegionContractTypeRepository;
    private UserLocationRegionContractTypeCustomerTypeRepository userLocationRegionContractTypeCustomerTypeRepository;
    private UserContractTypeCustomerTypeRepository userContractTypeCustomerTypeRepository;
    private UserLocationRegionPersonRepository userLocationRegionPersonRepository;
    private UserLocationRegionPersonCustomerRepository userLocationRegionPersonCustomerRepository;
    private UserLocationContractTypeCustomerTypeRepository userLocationContractTypeCustomerTypeRepository;

    public UserDataAccessServiceAsync(UserContractTypeRepository userContractTypeRepository, UserCustomerTypeRepository userCustomerTypeRepository, LocationRepository locationRepository, UserLocationCustomerTypeRepository userLocationCustomerTypeRepository, UserLocationContractTypeRepository userLocationContractTypeRepository, UserLocationRepository userLocationRepository, UserLocationPersonRepository userLocationPersonRepository, UserLocationPersonCustomerRepository userLocationPersonCustomerRepository, RegionRepository regionRepository, UserLocationRegionRepository userLocationRegionRepository, UserLocationRegionCustomerTypeRepository userLocationRegionCustomerTypeRepository, UserLocationRegionContractTypeRepository userLocationRegionContractTypeRepository, UserLocationRegionContractTypeCustomerTypeRepository userLocationRegionContractTypeCustomerTypeRepository, UserContractTypeCustomerTypeRepository userContractTypeCustomerTypeRepository, UserLocationRegionPersonRepository userLocationRegionPersonRepository, UserLocationRegionPersonCustomerRepository userLocationRegionPersonCustomerRepository, UserLocationContractTypeCustomerTypeRepository userLocationContractTypeCustomerTypeRepository) {
        this.userContractTypeRepository = userContractTypeRepository;
        this.userCustomerTypeRepository = userCustomerTypeRepository;
        this.locationRepository = locationRepository;
        this.userLocationCustomerTypeRepository = userLocationCustomerTypeRepository;
        this.userLocationContractTypeRepository = userLocationContractTypeRepository;
        this.userLocationRepository = userLocationRepository;
        this.userLocationPersonRepository = userLocationPersonRepository;
        this.userLocationPersonCustomerRepository = userLocationPersonCustomerRepository;
        this.regionRepository = regionRepository;
        this.userLocationRegionRepository = userLocationRegionRepository;
        this.userLocationRegionCustomerTypeRepository = userLocationRegionCustomerTypeRepository;
        this.userLocationRegionContractTypeRepository = userLocationRegionContractTypeRepository;
        this.userLocationRegionContractTypeCustomerTypeRepository = userLocationRegionContractTypeCustomerTypeRepository;
        this.userContractTypeCustomerTypeRepository = userContractTypeCustomerTypeRepository;
        this.userLocationRegionPersonRepository = userLocationRegionPersonRepository;
        this.userLocationRegionPersonCustomerRepository = userLocationRegionPersonCustomerRepository;
        this.userLocationContractTypeCustomerTypeRepository = userLocationContractTypeCustomerTypeRepository;
    }



    @Async
    public void refreshLocationAccess() {
        this.userLocationRepository.refreshLocationAccess();
    }

    @Async
    public void refreshAccess() {
        this.userLocationRepository.refreshLocationAccess();
        this.userLocationRepository.refreshCustomerTypeAccess();
        this.userLocationRepository.refreshContractTypeAccess();
        this.userLocationRepository.refreshPersonAccess();
        this.userLocationRepository.refreshCustomerAccess();
        this.userLocationRepository.refreshDepotAccess();
        this.userLocationRepository.refreshSellContractAccess();
    }

    @Async
    public void refreshSellContractAccess() {
        this.userLocationRepository.refreshSellContractAccess();
    }


    @Async
    public void addUserRows(List<UserDataAccess> userDataAccesses, List<Location> locations, List<Region> regions) {
        userDataAccesses.forEach(userDataAccess -> {
            addUserRow(userDataAccess, locations, regions);
        });
    }

    @Async
    public void addUserRow(UserDataAccess userDataAccess) {
        addUserRow(userDataAccess, null, null);
    }

    @Async
    public void addUserRow(UserDataAccess userDataAccess, List<Location> locations, List<Region> regions) {
        if (userDataAccess.getLocation() != null) {
            if (locations == null)
                locations = locationRepository.findAllRecursiveToDown(new HashSet<Long>() {{
                    add(userDataAccess.getLocation().getId());
                }}, new ArrayList<Integer>() {{
                    add(0);
                    add(1);
                    add(2);
                    add(3);
                }});

            if (userDataAccess.getRegion() != null) {
                if (regions == null)
                    regions = regionRepository.findAllRecursiveToDown(userDataAccess.getRegion().getId());
                if (userDataAccess.getPerson() != null) {
                    if (userDataAccess.getCustomer() != null) { // UserLocationRegionPersonCustomer
                        List<UserLocationRegionPersonCustomer> userLocationRegionPeople = getUserLocationRegionPersonCustomers(locations, regions, userDataAccess);
                        userLocationRegionPersonCustomerRepository.save(userLocationRegionPeople);
                    } else { // UserLocationRegionPerson
                        List<UserLocationRegionPerson> userLocationRegionPeople = getUserLocationRegionPeople(locations, regions, userDataAccess);
                        userLocationRegionPersonRepository.save(userLocationRegionPeople);
                    }

                } else if (userDataAccess.getContractType() != null) {
                    if (userDataAccess.getCustomerType() != null) { // UserLocationRegionContractTypeCustomerType
                        List<UserLocationRegionContractTypeCustomerType> userLocationRegionContractTypeCustomerTypes = getUserLocationRegionContractTypeCustomerTypes(locations, regions, userDataAccess);
                        userLocationRegionContractTypeCustomerTypeRepository.save(userLocationRegionContractTypeCustomerTypes);
                    } else { // UserLocationRegionContractType
                        List<UserLocationRegionContractType> userLocationRegionContractTypes = getUserLocationRegionContractTypes(locations, regions, userDataAccess);
                        userLocationRegionContractTypeRepository.save(userLocationRegionContractTypes);
                    }
                } else if (userDataAccess.getCustomerType() != null) { // UserLocationRegionCustomerType
                    List<UserLocationRegionCustomerType> userLocationRegionCustomerTypes = getUserLocationRegionCustomerTypes(locations, regions, userDataAccess);
                    userLocationRegionCustomerTypeRepository.save(userLocationRegionCustomerTypes);
                } else { // UserLocationRegion
                    List<UserLocationRegion> userLocationRegions = getUserLocationRegions(locations, regions, userDataAccess);
                    log.debug("XXXXXXXXXXXXXXXXXXXXXXXٓٓٓٓٓ", userDataAccess.getUsername() + ":" + userDataAccess.getLocation().getName() + ":" + userDataAccess.getRegion().getName());
                    userLocationRegionRepository.save(userLocationRegions);
                }
            } else if (userDataAccess.getPerson() != null) {
                if (userDataAccess.getCustomer() != null) { // UserLocationPersonCustomer
                    List<UserLocationPersonCustomer> userLocationPersonCustomers = getUserLocationPersonCustomers(locations, userDataAccess);
                    userLocationPersonCustomerRepository.save(userLocationPersonCustomers);
                } else { // UserLocationPerson
                    List<UserLocationPerson> userLocationPeople = getUserLocationPeople(locations, userDataAccess);
                    userLocationPersonRepository.save(userLocationPeople);
                }
            } else if (userDataAccess.getContractType() != null && userDataAccess.getCustomerType() != null) { // UserLocationContractTypeCustomerType
                userLocationContractTypeCustomerTypeRepository.save(
                    getUserLocationContractTypeCustomerTypes(locations, userDataAccess));
            } else if (userDataAccess.getContractType() != null) { // UserLocationContractType
                userLocationContractTypeRepository.save(
                    getUserLocationContractTypes(locations, userDataAccess));
            } else if (userDataAccess.getCustomerType() != null) { // UserLocationCustomerType
                userLocationCustomerTypeRepository.save(getUserLocationCustomerTypes(locations, userDataAccess));
            } else { // UserLocation
                List<UserLocation> userLocations = getUserLocations(userDataAccess, locations);
                userLocationRepository.save(userLocations);
            }
        } else if (userDataAccess.getContractType() != null && userDataAccess.getCustomerType() != null) { // UserContractTypeCustomerType
            UserContractTypeCustomerType userContractTypeCustomerType = getUserContractTypeCustomerType(userDataAccess);
            userContractTypeCustomerTypeRepository.save(userContractTypeCustomerType);
        } else if (userDataAccess.getContractType() != null) { // UserContractType
            UserContractType userContractType = getUserContractType(userDataAccess);
            userContractTypeRepository.save(userContractType);
        } else if (userDataAccess.getCustomerType() != null) { // UserCustomerType
            UserCustomerType userCustomerType = getUserCustomerType(userDataAccess);
            userCustomerTypeRepository.save(userCustomerType);
        } else {
            // error
        }
        refreshAccess();
    }

    private UserCustomerType getUserCustomerType(UserDataAccess userDataAccess) {
        UserCustomerType userCustomerType = new UserCustomerType();
        UserCustomerTypeId userCustomerTypeId = new UserCustomerTypeId();
        userCustomerTypeId.setUsername(userDataAccess.getUsername());
        userCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
        userCustomerType.setUserCustomerTypeId(userCustomerTypeId);
        userCustomerType.setUserDataAccess(userDataAccess);
        return userCustomerType;
    }

    private UserContractType getUserContractType(UserDataAccess userDataAccess) {
        UserContractType userContractType = new UserContractType();
        UserContractTypeId userContractTypeId = new UserContractTypeId();
        userContractTypeId.setUsername(userDataAccess.getUsername());
        userContractTypeId.setContractType(userDataAccess.getContractType());
        userContractType.setUserContractTypeId(userContractTypeId);
        userContractType.setUserDataAccess(userDataAccess);
        return userContractType;
    }

    private UserContractTypeCustomerType getUserContractTypeCustomerType(UserDataAccess userDataAccess) {
        UserContractTypeCustomerType userContractTypeCustomerType = new UserContractTypeCustomerType();
        UserContractTypeCustomerTypeId userContractTypeCustomerTypeId = new UserContractTypeCustomerTypeId();
        userContractTypeCustomerTypeId.setUsername(userDataAccess.getUsername());
        userContractTypeCustomerTypeId.setContractType(userDataAccess.getContractType());
        userContractTypeCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
        userContractTypeCustomerType.setUserContractTypeCustomerTypeId(userContractTypeCustomerTypeId);
        userContractTypeCustomerType.setUserDataAccess(userDataAccess);
        return userContractTypeCustomerType;
    }

    private List<UserLocation> getUserLocations(UserDataAccess userDataAccess, List<Location> locations) {
        return locations.stream().map(location -> {
            UserLocation userLocation = new UserLocation();
            UserLocationId userLocationId = new UserLocationId();
            userLocationId.setUsername(userDataAccess.getUsername());
            userLocationId.setLocation(location);
            userLocation.setUserLocationId(userLocationId);
            userLocation.setUserDataAccess(userDataAccess);
            return userLocation;
        }).collect(Collectors.toList());
    }

    private List<UserLocationPersonCustomer> getUserLocationPersonCustomers(List<Location> locations, UserDataAccess userDataAccess) {
        return locations.stream().map(location -> {
            UserLocationPersonCustomer userLocationPersonCustomer = new UserLocationPersonCustomer();
            UserLocationPersonCustomerId userLocationPersonCustomerId = new UserLocationPersonCustomerId();
            userLocationPersonCustomerId.setUsername(userDataAccess.getUsername());
            userLocationPersonCustomerId.setLocation(location);
            userLocationPersonCustomerId.setPerson(userDataAccess.getPerson());
            userLocationPersonCustomerId.setCustomer(userDataAccess.getCustomer());
            userLocationPersonCustomer.setUserLocationPersonCustomerId(userLocationPersonCustomerId);
            userLocationPersonCustomer.setUserDataAccess(userDataAccess);
            return userLocationPersonCustomer;
        }).collect(Collectors.toList());
    }

    private List<UserLocationRegionCustomerType> getUserLocationRegionCustomerTypes(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegionCustomerType> userLocationRegionCustomerTypes = new ArrayList<>();
        locations.forEach(location -> userLocationRegionCustomerTypes.addAll(regions.stream().map(region -> {
            UserLocationRegionCustomerType userLocationRegionCustomerType = new UserLocationRegionCustomerType();
            UserLocationRegionCustomerTypeId userLocationRegionCustomerTypeId = new UserLocationRegionCustomerTypeId();
            userLocationRegionCustomerTypeId.setUsername(userDataAccess.getUsername());
            userLocationRegionCustomerTypeId.setLocation(location);
            userLocationRegionCustomerTypeId.setRegion(region);
            userLocationRegionCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
            userLocationRegionCustomerType.setUserLocationRegionCustomerTypeId(userLocationRegionCustomerTypeId);
            userLocationRegionCustomerType.setUserDataAccess(userDataAccess);
            return userLocationRegionCustomerType;
        }).collect(Collectors.toList())));
        return userLocationRegionCustomerTypes;
    }

    private List<UserLocationRegionPerson> getUserLocationRegionPeople(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegionPerson> userLocationRegionPeople = new ArrayList<>();
        locations.forEach(location -> userLocationRegionPeople.addAll(regions.stream().map(region -> {
            UserLocationRegionPerson userLocationRegionPerson = new UserLocationRegionPerson();
            UserLocationRegionPersonId userLocationRegionPersonId = new UserLocationRegionPersonId();
            userLocationRegionPersonId.setUsername(userDataAccess.getUsername());
            userLocationRegionPersonId.setLocation(location);
            userLocationRegionPersonId.setRegion(region);
            userLocationRegionPersonId.setPerson(userDataAccess.getPerson());
            userLocationRegionPerson.setUserLocationRegionPersonId(userLocationRegionPersonId);
            userLocationRegionPerson.setUserDataAccess(userDataAccess);
            return userLocationRegionPerson;
        }).collect(Collectors.toList())));
        return userLocationRegionPeople;
    }

    private List<UserLocationPerson> getUserLocationPeople(List<Location> locations, UserDataAccess userDataAccess) {
        return locations.stream().map(location -> {
            UserLocationPerson userLocationPerson = new UserLocationPerson();
            UserLocationPersonId userLocationPersonId = new UserLocationPersonId();
            userLocationPersonId.setUsername(userDataAccess.getUsername());
            userLocationPersonId.setLocation(location);
            userLocationPersonId.setPerson(userDataAccess.getPerson());
            userLocationPerson.setUserLocationPersonId(userLocationPersonId);
            userLocationPerson.setUserDataAccess(userDataAccess);
            return userLocationPerson;
        }).collect(Collectors.toList());
    }

    private List<UserLocationRegion> getUserLocationRegions(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegion> userLocationRegions = new ArrayList<>();
        locations.forEach(location -> userLocationRegions.addAll(regions.stream().map(region -> {
            UserLocationRegion userLocationRegion = new UserLocationRegion();
            UserLocationRegionId userLocationRegionId = new UserLocationRegionId();
            userLocationRegionId.setUsername(userDataAccess.getUsername());
            userLocationRegionId.setLocation(location);
            userLocationRegionId.setRegion(region);
            userLocationRegion.setUserLocationRegionId(userLocationRegionId);
            userLocationRegion.setUserDataAccess(userDataAccess);
            return userLocationRegion;
        }).collect(Collectors.toList())));
        return userLocationRegions;
    }

    private List<UserLocationRegionContractType> getUserLocationRegionContractTypes(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegionContractType> userLocationRegionContractTypes = new ArrayList<>();
        locations.forEach(location -> userLocationRegionContractTypes.addAll(regions.stream().map(region -> {
            UserLocationRegionContractType userLocationRegionContractType = new UserLocationRegionContractType();
            UserLocationRegionContractTypeId userLocationRegionContractTypeId = new UserLocationRegionContractTypeId();
            userLocationRegionContractTypeId.setUsername(userDataAccess.getUsername());
            userLocationRegionContractTypeId.setLocation(location);
            userLocationRegionContractTypeId.setRegion(region);
            userLocationRegionContractTypeId.setContractType(userDataAccess.getContractType());
            userLocationRegionContractType.setUserLocationRegionContractTypeId(userLocationRegionContractTypeId);
            userLocationRegionContractType.setUserDataAccess(userDataAccess);
            return userLocationRegionContractType;
        }).collect(Collectors.toList())));
        return userLocationRegionContractTypes;
    }

    private List<UserLocationRegionContractTypeCustomerType> getUserLocationRegionContractTypeCustomerTypes(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegionContractTypeCustomerType> userLocationRegionContractTypeCustomerTypes = new ArrayList<>();
        locations.forEach(location -> userLocationRegionContractTypeCustomerTypes.addAll(regions.stream().map(region -> {
            UserLocationRegionContractTypeCustomerType userLocationRegionContractTypeCustomerType = new UserLocationRegionContractTypeCustomerType();
            UserLocationRegionContractTypeCustomerTypeId userLocationRegionContractTypeCustomerTypeId = new UserLocationRegionContractTypeCustomerTypeId();
            userLocationRegionContractTypeCustomerTypeId.setUsername(userDataAccess.getUsername());
            userLocationRegionContractTypeCustomerTypeId.setLocation(location);
            userLocationRegionContractTypeCustomerTypeId.setRegion(region);
            userLocationRegionContractTypeCustomerTypeId.setContractType(userDataAccess.getContractType());
            userLocationRegionContractTypeCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
            userLocationRegionContractTypeCustomerType.setUserLocationRegionContractTypeCustomerTypeId(userLocationRegionContractTypeCustomerTypeId);
            userLocationRegionContractTypeCustomerType.setUserDataAccess(userDataAccess);
            return userLocationRegionContractTypeCustomerType;
        }).collect(Collectors.toList())));
        return userLocationRegionContractTypeCustomerTypes;
    }

    private List<UserLocationRegionPersonCustomer> getUserLocationRegionPersonCustomers(List<Location> locations, List<Region> regions, UserDataAccess userDataAccess) {
        List<UserLocationRegionPersonCustomer> userLocationRegionPeople = new ArrayList<>();
        locations.forEach(location -> userLocationRegionPeople.addAll(regions.stream().map(region -> {
            UserLocationRegionPersonCustomer userLocationRegionPerson = new UserLocationRegionPersonCustomer();
            UserLocationRegionPersonCustomerId userLocationRegionPersonId = new UserLocationRegionPersonCustomerId();
            userLocationRegionPersonId.setUsername(userDataAccess.getUsername());
            userLocationRegionPersonId.setLocation(location);
            userLocationRegionPersonId.setRegion(region);
            userLocationRegionPersonId.setPerson(userDataAccess.getPerson());
            userLocationRegionPersonId.setCustomer(userDataAccess.getCustomer());
            userLocationRegionPerson.setUserLocationRegionPersonCustomerId(userLocationRegionPersonId);
            userLocationRegionPerson.setUserDataAccess(userDataAccess);
            return userLocationRegionPerson;
        }).collect(Collectors.toList())));
        return userLocationRegionPeople;
    }

    private List<UserLocationContractType> getUserLocationContractTypes(List<Location> locations, UserDataAccess userDataAccess) {
        List<UserLocationContractType> userLocationContractTypes = locations.stream().map(location -> {
            UserLocationContractType userLocationContractType = new UserLocationContractType();
            UserLocationContractTypeId userLocationContractTypeId = new UserLocationContractTypeId();
            userLocationContractTypeId.setUsername(userDataAccess.getUsername());
            userLocationContractTypeId.setLocation(location);
            userLocationContractTypeId.setContractType(userDataAccess.getContractType());
            userLocationContractType.setUserLocationContractTypeId(userLocationContractTypeId);
            userLocationContractType.setUserDataAccess(userDataAccess);
            return userLocationContractType;
        }).collect(Collectors.toList());
        return userLocationContractTypes;
    }

    private List<UserLocationContractTypeCustomerType> getUserLocationContractTypeCustomerTypes(List<Location> locations, UserDataAccess userDataAccess) {
        return locations.stream().map(location -> {
            UserLocationContractTypeCustomerType userLocationContractTypeCustomerType = new UserLocationContractTypeCustomerType();
            UserLocationContractTypeCustomerTypeId userLocationContractTypeCustomerTypeId = new UserLocationContractTypeCustomerTypeId();
            userLocationContractTypeCustomerTypeId.setUsername(userDataAccess.getUsername());
            userLocationContractTypeCustomerTypeId.setLocation(location);
            userLocationContractTypeCustomerTypeId.setContractType(userDataAccess.getContractType());
            userLocationContractTypeCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
            userLocationContractTypeCustomerType.setUserLocationContractTypeCustomerTypeId(userLocationContractTypeCustomerTypeId);
            userLocationContractTypeCustomerType.setUserDataAccess(userDataAccess);
            return userLocationContractTypeCustomerType;
        }).collect(Collectors.toList());
    }

    private List<UserLocationCustomerType> getUserLocationCustomerTypes(List<Location> locations, UserDataAccess userDataAccess) {
        return locations.stream().map(location -> {
            UserLocationCustomerType userLocationCustomerType = new UserLocationCustomerType();
            UserLocationCustomerTypeId userLocationCustomerTypeId = new UserLocationCustomerTypeId();
            userLocationCustomerTypeId.setUsername(userDataAccess.getUsername());
            userLocationCustomerTypeId.setLocation(location);
            userLocationCustomerTypeId.setCustomerType(userDataAccess.getCustomerType());
            userLocationCustomerType.setUserLocationCustomerTypeId(userLocationCustomerTypeId);
            userLocationCustomerType.setUserDataAccess(userDataAccess);
            return userLocationCustomerType;
        }).collect(Collectors.toList());
    }


}
