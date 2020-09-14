package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.*;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.security.AuthoritiesConstants;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerSellContractDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import ir.donyapardaz.niopdc.base.service.remote.specifyrate.CustomerWSStub;
import ir.donyapardaz.niopdc.base.service.remote.transportation.DataComplexTypePymanResult;
import ir.donyapardaz.niopdc.base.service.remote.transportation.TransportationClient;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.apache.axis2.AxisFault;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.rmi.RemoteException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static ir.donyapardaz.niopdc.base.domain.enumeration.LocationType.MOVABLE;

/**
 * Service Implementation for managing Customer.
 */
@Service
@Transactional
public class CustomerService {

    private final Logger log = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerRepository customerRepository;
    private final SellContractRepository sellContractRepository;
    private final SellContractProductRepository sellContractProductRepository;
    private final CustomerMapper customerMapper;
    private final SellContractProductMapper sellContractProductMapper;
    private final LocationRepository locationRepository;
    private final CustomerCreditRepository customerCreditRepository;
    private final CustomerCapacityRepository customerCapacityRepository;
    private final CustomerCreditMapper customerCreditMapper;
    private final CustomerCapacityMapper customerCapacityMapper;
    private final TransportContractRepository transportContractRepository;
    private final TransportContractMapper transportContractMapper;
    private final RemoteService remoteService;
    private final CustomerScoreRepository customerScoreRepository;
    private final CustomerScoreMapper customerScoreMapper;
    private final CustomerSellContractMapper customerSellContractMapper;
    private final CustomerTypeRepository customerTypeRepository;
    private final OldCustomerRepository oldCustomerRepository;
    private final CarTankRepository carTankRepository;
    private final CarTankMapper carTankMapper;
    private final CarRfIdRepository carRfIdRepository;
    private final CarRfIdMapper carRfIdMapper;
    private final ProductGroupRepository productGroupRepository;
    private final ProductRepository productRepository;
    private final VehicleModelRepository vehicleModelRepository;
    private final OrderServiceClient orderServiceClient;
    private final CustomerVisitRepository customerVisitRepository;
    private final CustomerVisitMapper customerVisitMapper;
    private final CustomerWSStub customerWSStub;
    private final VehicleModelMapper vehicleModelMapper;
    private CustomerOrderCapacityRepository customerOrderCapacityRepository;
    private CustomerOrderCapacityMapper customerOrderCapacityMapper;
    private TransportationClient transportationClient;
    private CustomerStationInfoRepository customerSataionInfoRepository;
    private CustomerStationInfoMapper customerSataionInfoMapper;
    private LocationService locationService;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;

    public CustomerService(CustomerRepository customerRepository, SellContractRepository sellContractRepository,
                           SellContractProductRepository sellContractProductRepository,
                           CustomerMapper customerMapper, SellContractProductMapper sellContractProductMapper,
                           LocationRepository locationRepository, CustomerCreditRepository customerCreditRepository,
                           CustomerCapacityRepository customerCapacityRepository, CustomerCreditMapper customerCreditMapper,
                           TransportContractRepository transportContractRepository, TransportContractMapper transportContractMapper,
                           RemoteService remoteService, CustomerScoreRepository customerScoreRepository, CustomerScoreMapper customerScoreMapper,
                           CustomerSellContractMapper customerSellContractMapper, CustomerTypeRepository customerTypeRepository,
                           OldCustomerRepository oldCustomerRepository, CarTankRepository carTankRepository, CarTankMapper carTankMapper,
                           CarRfIdRepository carRfIdRepository, CarRfIdMapper carRfIdMapper, VehicleModelRepository vehicleModelRepository,
                           CustomerCapacityMapper customerCapacityMapper, ProductGroupRepository productGroupRepository,
                           ProductRepository productRepository, CustomerOrderCapacityRepository customerOrderCapacityRepository,
                           CustomerOrderCapacityMapper customerOrderCapacityMapper, TransportationClient transportationClient,
                           CustomerStationInfoRepository customerSataionInfoRepository, CustomerStationInfoMapper customerSataionInfoMapper
        , VehicleModelMapper vehicleModelMapper,
                           LocationService locationService, UserDataAccessServiceAsync userDataAccessServiceAsync, OrderServiceClient orderServiceClient,
                           CustomerVisitRepository customerVisitRepository, CustomerVisitMapper customerVisitMapper, CustomerWSStub customerWSStub) {
        this.customerRepository = customerRepository;
        this.sellContractRepository = sellContractRepository;
        this.sellContractProductRepository = sellContractProductRepository;
        this.customerMapper = customerMapper;
        this.sellContractProductMapper = sellContractProductMapper;
        this.locationRepository = locationRepository;
        this.customerCreditRepository = customerCreditRepository;
        this.customerCapacityRepository = customerCapacityRepository;
        this.customerCreditMapper = customerCreditMapper;
        this.transportContractRepository = transportContractRepository;
        this.transportContractMapper = transportContractMapper;
        this.remoteService = remoteService;
        this.customerScoreRepository = customerScoreRepository;
        this.customerScoreMapper = customerScoreMapper;
        this.customerSellContractMapper = customerSellContractMapper;
        this.customerTypeRepository = customerTypeRepository;
        this.oldCustomerRepository = oldCustomerRepository;
        this.carTankRepository = carTankRepository;
        this.carTankMapper = carTankMapper;
        this.carRfIdRepository = carRfIdRepository;
        this.carRfIdMapper = carRfIdMapper;
        this.vehicleModelRepository = vehicleModelRepository;
        this.productGroupRepository = productGroupRepository;
        this.productRepository = productRepository;
        this.customerOrderCapacityRepository = customerOrderCapacityRepository;
        this.customerOrderCapacityMapper = customerOrderCapacityMapper;
        this.transportationClient = transportationClient;
        this.customerCapacityMapper = customerCapacityMapper;

        this.customerSataionInfoRepository = customerSataionInfoRepository;
        this.customerSataionInfoMapper = customerSataionInfoMapper;
        this.locationService = locationService;
        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.orderServiceClient = orderServiceClient;
        this.customerVisitRepository = customerVisitRepository;
        this.customerVisitMapper = customerVisitMapper;
        this.customerWSStub = customerWSStub;
        this.vehicleModelMapper = vehicleModelMapper;
    }

    static List<ContractType> convertContractType(String contractType) {
        List<ContractType> contractTypes = new ArrayList<>();
        switch (contractType) {
            case "order": {
                contractTypes.add(ContractType.SUPPLY_CHANNEL);
                contractTypes.add(ContractType.LIQUID_GAS);
                contractTypes.add(ContractType.BRAND);
                contractTypes.add(ContractType.CONSUMER);
            }
            break;
            case "airplane":
                contractTypes.add(ContractType.AIRPLANE);
                contractTypes.add(ContractType.MILITARY);
                break;
            case "export":
                contractTypes.add(ContractType.EXPORT);
                break;
        }
        return contractTypes;
    }

    public void saveCreditAccount(CustomerFullDTO customerDTO) throws Exception {

        if (customerDTO.getId() == null) {
            throw new Exception();
        }

        if (customerDTO.getCreditAccount() == null || customerDTO.getCreditAccount().isEmpty()) {
            throw new CustomParameterizedException("error.creditAccount.isEmpty");
        }

        Customer customer = customerRepository.findOne(customerDTO.getId());
        customer.setCreditAccount(customerDTO.getCreditAccount());
        customerRepository.save(customer);

    }

    /**
     * Save a customer.
     *
     * @param customerDTO the entity to save
     * @return the persisted entity
     */

    public CustomerFullDTO save(CustomerFullDTO customerDTO) {
        log.debug("Request to save Customer : {}", customerDTO);

        if (customerDTO.getId() == null) {
            customerDTO.setRegisterDate(ZonedDateTime.now());
        }

        if (customerDTO.getCustomPlaque() == null && customerDTO.getCustomPlaqueTwo() == null) { // not boundary customer
            Customer customer = customerMapper.toEntity(customerDTO);
            CustomerType customerType = customerTypeRepository.findOne(customer.getType().getId());
            customer.setType(customerType);

            if (customer.getId() == null && customerType.getCustomerGroup().equals(CustomerGroup.AIRPLANE) && customerType.getLocationType().equals(MOVABLE))
                customer.setIdentifyCode(null);

            if (customer.getId() == null && customer.getIdentifyCode() == null)
                customer.setIdentifyCode(generateCustomerCode(customer.getType().getCustomerGroup(), customer.getLocations()));

            if (customerType.isHasGsId() != null && !customerType.isHasGsId())
                customer.setGsId(null);

            if (customerType.getLocationType() != MOVABLE) {
                try {
                    AddressDTO addressByPostcode = remoteService.findAddressByPostcode(customer.getPostalCode());
                    customer.setAddress(addressByPostcode.getAddress());
                    customer.setActive(true);
                } catch (CustomParameterizedException | NullPointerException e) {
                    if (customer.getId() != null) {
                        Customer one = customerRepository.findOne(customer.getId());
                        if ((one.isActive() != null && one.isActive()) && one.getIdentifyCode().equals(customer.getIdentifyCode())) {
                            customer.setAddress(one.getAddress());
                            customer.setActive(true);
                        } else {
                            customer.setActive(false);
                        }
                    } else {
                        customer.setActive(false);
                    }
                }

            }
            customer = customerRepository.save(customer);
            userDataAccessServiceAsync.refreshAccess();
            return customerMapper.toDto(customer);
        } else {
            CustomerFullDTO customerFullDTO = saveCar(customerDTO);
            userDataAccessServiceAsync.refreshAccess();
            return customerFullDTO;
        }

    }

    /**
     * Get all the customers.
     *
     * @param locationName
     * @param haveSellContract
     * @param contractType
     * @param personId
     * @param customerTypeIds
     * @param pageable         the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerDTO> findAll(String locationName, String query, Boolean haveSellContract, ContractType contractType, String selfCode, Long personId, List<Long> customerTypeIds, Pageable pageable) {
        log.debug("Request to get all Customers");

        //viewService.create(ViewService.ViewNameEnum.CUSTOMER);
        Set<CustomerGroup> customerGroups = contractType == null ? null : contractType.getCustomerGroups();

        List<Long> customerIds = null;
        if (personId != null) {
            customerIds = customerRepository.findAllByPerson_Id(personId).stream().map(customer -> customer.getId()).collect(Collectors.toList());
            if (customerIds == null)
                customerIds = new ArrayList<>();
        }


        Page<Customer> result = (haveSellContract != null && haveSellContract) ?
            customerRepository.findAll(locationName, query, customerGroups, selfCode, customerTypeIds, pageable) :
            customerRepository.findAllByAccessLocation(locationName, query, customerGroups, customerIds, customerTypeIds, pageable);
        return result.map(customerMapper::toListDto);
    }

    /**
     * Get one customer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CustomerFullDTO findOne(Long id) {
        log.debug("Request to get Customer : {}", id);
        Customer customer = customerRepository.findOneWithEagerRelationships(id);
        CustomerFullDTO customerFullDTO = customerMapper.toDto(customer);
        if (customerFullDTO != null && !customerFullDTO.getCustomerGroupTitle().equals(CustomerGroup.BOUNDARY.toString()))
            customerFullDTO.setPersons(customerRepository.getPersonInfo(id));
//        customerFullDTO.setUsed(orderServiceClient.isUseCustomerInOrder(id));
        return customerFullDTO;
    }

    /**
     * Get one customer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public String getCustomerInfo(Long id) {
        log.debug("Request to get Customer : {}", id);
        Customer customer = customerRepository.findOneWithEagerRelationships(id);

        String result = "";

        if (customer.getType().getCustomerGroup() == CustomerGroup.BOUNDARY) {
            result += (customer.getPlaque() != null ? " پلاک : " + customer.getPlaque() + "<br>" : "");
            result += (customer.getPlaqueTwo() != null ? " پلاک دوم : " + customer.getPlaqueTwo() + "<br>" : "");
            result += (customer.getCarRfId() != null ? " تگ : " + customer.getCarRfId() + "<br>" : "");
            result += (customer.getType() != null && customer.getType().getTitle() != null ? " نوع وسیله نقلیه : " + customer.getType().getTitle() + "<br>" : "");
            result += (customer.getVehicleModel() != null && customer.getVehicleModel().getTitle() != null ? " مدل وسیله نقلیه : " + customer.getVehicleModel().getTitle() + "<br>" : "");

        }


        return result;
    }

    /**
     * Delete the customer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Customer : {}", id);
        if (orderServiceClient.isUseCustomerInOrder(id)) {
            throw new CustomParameterizedException("error.product.rate.not.allow.delete");
        }
        customerRepository.delete(id);
    }

    /**
     * Get all the customerCredits.
     *
     * @param id       the Customer id
     * @param query    the Search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerCreditListDTO> findAllCustomerCredit(Long id, Boolean isCredit, Boolean archive, String query, Pageable pageable) {
        log.debug("Request to get all CustomerCredits");

        boolean hasQuota = SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.LIST_CUSTOMER_QUOTA);
        boolean hasCredit = SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.LIST_CUSTOMER_CREDIT);
        if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN)) {
            if (isCredit != null && isCredit && !hasCredit)
                throw new CustomParameterizedException("error.customer.credit.no.authority");
            if ((isCredit == null || isCredit) && !hasQuota)
                throw new CustomParameterizedException("error.customer.quota.no.authority");
        }
        Page<CustomerCredit> result = customerCreditRepository.findAllByCustomerId(id, isCredit, archive, ZonedDateTime.now(), query, pageable);

        return result.map(customerCreditMapper::toListDto);
    }


    /**
     * Get all the customerCapacities.
     *
     * @param id       the Customer id
     * @param query    the Search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CustomerCapacityDTO> findAllCustomerCapacities(Long id, String query, Pageable pageable) {
        log.debug("Request to get all CustomerCredits");
        Page<CustomerCapacity> result;//= customerCapacityRepository.findAllByCustomerId(id, query, pageable);

        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerCapacity.class, "customerCapacity"), null);
            BooleanExpression customerExpression = QCustomerCapacity.customerCapacity.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = customerCapacityRepository.findAll(booleanExpression, pageable);
        } else {
            result = customerCapacityRepository.findByCustomer_Id(id, pageable);

        }

        return result.map(customerCapacityMapper::toDto);
    }

    public List<SellContractProductDTO> findSellContractProductByCustomer_Id(Long customerId) {
        return sellContractProductMapper.toDto(
            sellContractProductRepository.findAllByCustomer(customerId, ZonedDateTime.now())
        );
    }

    public Page<TransportContractDTO> findAllTransportContracts(Long id, String query, Pageable pageable) {
        log.debug("Request to get all TransportContracts");
        Page<TransportContract> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(TransportContract.class, "transportContract"), null);
            BooleanExpression customerExpression = QTransportContract.transportContract.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = transportContractRepository.findAll(booleanExpression, pageable);
        } else {
            result = transportContractRepository.findByCustomer_Id(id, pageable);
        }
        return result.map(transportContractMapper::toDto);
    }

    public Boolean hasAccessForOrderRegisterAndCheckTransportContracts(Long customerId) {
        log.debug("Request to get access for order register and check transport contract");
        Customer customer = customerRepository.findOne(customerId);
        if (customer != null && customer.getIdentifyCode() != null) {
            Boolean result = isCustomerPayable(customer.getIdentifyCode());
            if (!result) {
                ZonedDateTime date = ZonedDateTime.now();
                Long count = transportContractRepository.CustomerIdAndStartDateBeforeAndFinishDateAfter(customerId, date);
                if (count > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return true;
    }

   /* public List<SellContractProductDTO> findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(
        BuyGroup buyGroup,
        Long currencyRateGroupId,
        Long currencyId,
        Long depotId,
        Long customerId,
        Long personId,
        TypeOfFuelReceipt typeOfFuelReceipt,
        OrderType orderType,
        Long sellContractId
    ) {
        List<ContractType> contractTypes = new ArrayList<>(ContractType.getContractTypes(orderType));
        Boolean nationalCurrency = customerRepository.findCurrencyById(currencyId).getNationalCurrency();

        return
            sellContractProductMapper
                .toDto(
//                    contractType != null ?
//                          sellContractProductRepository.findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(buyGroup, currencyRateGroupId, currencyId, depotId, personId, ZonedDateTime.now(), contractTypes, nationalCurrency, sellContractId)
                    sellContractProductRepository.findSellContractProductByBuyTypeIdAndCurrencyRateGroupId_Order(buyGroup, currencyRateGroupId, currencyId, depotId, customerId, personId, ZonedDateTime.now(), typeOfFuelReceipt == null ? null : typeOfFuelReceipt.toString(), nationalCurrency, sellContractId)
                );
    }*/

    public Page<CustomerScoreDTO> findAllCustomerScores(Long id, String query, Pageable pageable) {
        log.debug("Request to get all Customer Scores");
        Page<CustomerScore> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerScore.class, "customerScore"), null);
            BooleanExpression customerExpression = QCustomerScore.customerScore.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = customerScoreRepository.findAll(booleanExpression, pageable);
        } else {
            result = customerScoreRepository.findByCustomer_Id(id, pageable);

        }
        return result.map(customerScoreMapper::toDto);

    }


    public List<CustomerSellContractDTO> getAllCustomerSellContract(Integer year, Integer month, Integer day, PaymentPeriod paymentPeriod) {
        YearMonthDay finishYearMonthDay = new YearMonthDay();
        finishYearMonthDay.setYear(year);
        finishYearMonthDay.setMonth(month);
        finishYearMonthDay.setDay(day);

        //calculate date rang
        YearMonthDay startYearMonthDay = new YearMonthDay();
        startYearMonthDay.setYear(finishYearMonthDay.getYear());
        startYearMonthDay.setMonth(finishYearMonthDay.getMonth());
        startYearMonthDay.setDay(finishYearMonthDay.getDay());

        if (paymentPeriod.equals(PaymentPeriod.DAY)) {
            startYearMonthDay.setDay(startYearMonthDay.getDay() - 1);
        } else if (paymentPeriod.equals(PaymentPeriod.MONTH)) {
            startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 1);
        } else if (paymentPeriod.equals(PaymentPeriod.SEASON)) {
            startYearMonthDay.setMonth(startYearMonthDay.getMonth() - 2);
            startYearMonthDay.setDay(1);
        } else if (paymentPeriod.equals(PaymentPeriod.YEAR)) {
            startYearMonthDay.setYear(startYearMonthDay.getYear() - 1);
        }
        ZonedDateTime startDate = DateUtil.convertToGeorgian(startYearMonthDay);
        ZonedDateTime finishDate = DateUtil.convertToGeorgian(finishYearMonthDay);

        return customerSellContractMapper.toDto(
            customerRepository.findAllCustomerSellContract(startDate, finishDate, SecurityUtils.getCurrentUserLogin().get())
        );
    }

    public OldCustomerDTO getOldCustomer(String salesCode, String nationalCode) {
        List<OldCustomerDTO> res = oldCustomerRepository.findOneBySalesCodeAndNationalCode(salesCode, nationalCode);

        return (!res.isEmpty()) ? res.get(0) : new OldCustomerDTO();
    }

    public List<CustomerFullDTO> findOneByRfId(String rfId) {
        List<Customer> customer = customerRepository.findAllByRfId("%" + rfId + "%", new PageRequest(0, 5));
        return customerMapper.toDto(customer);
    }

    public Long findIdByRfId(String rfId) {
        Customer customer = customerRepository.findOneByRfId(rfId);
        return customer == null ? null : customer.getId();
    }

    public Page<CarTankDTO> findAllCarTanks(Long id, String query, Pageable pageable) {
        log.debug("Request to get all CarTank");
        Page<CarTank> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CarTank.class, "carTank"), null);
            BooleanExpression customerExpression = QCarTank.carTank.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = carTankRepository.findAll(booleanExpression, pageable);
        } else {
            result = carTankRepository.findByCustomer_Id(id, pageable);
        }
        return result.map(carTankMapper::toDto);
    }

    public Page<CarRfIdDTO> findAllCarRfId(Long id, String query, Pageable pageable) {
        log.debug("Request to get all Car Rf Id");
        Page<CarRfId> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CarRfId.class, "carRfId"), null);
            BooleanExpression customerExpression = QCarRfId.carRfId.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = carRfIdRepository.findAll(booleanExpression, pageable);
        } else {
            result = carRfIdRepository.findByCustomer_Id(id, pageable);

        }
        return result.map(carRfIdMapper::toDto);
    }

    public List<CustomerFullDTO> findTop5ByPlaque(String plaque) {
        List<Customer> customer = customerRepository.findOneByPlaque("%" + plaque + "%", new PageRequest(0, 5));
        return customerMapper.toDto(customer);
    }

    public Long findIdByPlaque(String plaque) {
        Customer customer = customerRepository.findOneByPlaque(plaque);
        return customer == null ? null : customer.getId();
    }

    public CustomerFullDTO saveCar(CustomerFullDTO customerDTO) {

        Customer customer = customerMapper.toEntity(customerDTO);
        customer.setType(customerTypeRepository.findOne(customerDTO.getTypeId()));

        if (customer.getId() == null && customer.getIdentifyCode() == null) {
            customer.setRegisterDate(ZonedDateTime.now());
            generateCustomerCode(customer.getType().getCustomerGroup(), null);
        }


        if (customer.getId() != null) {

            // boolean customerInOrder = orderServiceClient.isUseCustomerInOrder(customer.getId());
            Customer beforeUpdate = customerRepository.findOne(customer.getId());

            if (beforeUpdate.isValid() == null)
                beforeUpdate.setValid(false);

            if (beforeUpdate.isValid() && !(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN)
                || SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.EDIT_PLUS_BOUNDARY_CUSTOMER))) {
                throw new CustomParameterizedException("error.customerIsValid");
            }

           /* if(!beforeUpdate.isValid() && customerInOrder && !(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN)
                || SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.EDIT_PLUS_BOUNDARY_CUSTOMER))) {

                 if(!beforeUpdate.getType().equals(customer.getType())
                 || (beforeUpdate.getVehicleModel() !=null && !beforeUpdate.getVehicleModel().equals(customer.getVehicleModel()))
                 || (beforeUpdate.getCountry()!=null && !beforeUpdate.getCountry().equals(customer.getCountry()))
                 || (  beforeUpdate.getProduct()!= null && !beforeUpdate.getProduct().equals(customer.getProduct())))
                     throw new CustomParameterizedException("error.customerInOrder");
            }*/

            if (customer.getCarRfId() != null && !StringUtils.isEmpty(customer.getCarRfId())) {
                CarRfId carRfId = carRfIdRepository.findFirstByActiveAndCustomer_Id(true, customer.getId());
                customer.setCarRfId(carRfId.getCode());
                if (carRfIdRepository.existCode(carRfId.getId(), carRfId.getCode()) > 0) {
                    throw new CustomParameterizedException("error.rfIdIsExist");
                }
            }
        }

        if (customerDTO.getId() == null && customerDTO.getCarRfId() != null) {

            if (carRfIdRepository.existCode(null, customerDTO.getCarRfId()) > 0) {
                throw new CustomParameterizedException("error.rfIdIsExist");
            }

            CarRfId carRfId = new CarRfId();
            carRfId.setCustomer(customer);
            carRfId.setActive(true);
            carRfId.setCode(customerDTO.getCarRfId().toUpperCase());
            carRfIdRepository.save(carRfId);

        }

        if (customerDTO.getVehicleModelId() != null) {
            VehicleModel vehicleModel = vehicleModelRepository.findOne(customerDTO.getVehicleModelId());
            customer.setVehicleModel(vehicleModel);
        }

        customer = customerRepository.save(customer);

        return customerMapper.toDto(customer);
    }

    private String generateCustomerCode(CustomerGroup customerGroup, Set<Location> locations) {
        if (customerGroup == CustomerGroup.AIRPLANE) {
            Long maxCodeForBoundary = customerRepository.getMaxCodeForAirplane();
            if (maxCodeForBoundary == null) {
                maxCodeForBoundary = 2000000000L;
            } else {
                maxCodeForBoundary += 1L;
            }
            return String.valueOf(maxCodeForBoundary);
        } else if (customerGroup == CustomerGroup.BOUNDARY) {
            Long maxCodeForBoundary = customerRepository.getMaxCodeForBoundary();
            if (maxCodeForBoundary == null) {
                maxCodeForBoundary = 1000000000L;
            } else {
                maxCodeForBoundary += 1L;
            }
            return String.valueOf(maxCodeForBoundary);
        } else {
            Long locationId = locations.stream().map(Location::getId).findFirst().get();
            String code = String.valueOf(customerRepository.generateCode(locationId));
            if (code == null || code.equals("null")) {
                code = locationRepository.getFullLocationCode(locationId) + "00000";
            } else {
                code = (Long.parseLong(code) + 1) + "";
            }
            return code;
        }
    }

    public Page<CarCustomerDTO> findAllBoundaryCustomers(String vehicleModel,
                                                         Boolean archive,
                                                         String carRfId,
                                                         String plaque,
                                                         String plaquePart1,
                                                         String plaquePart2,
                                                         String plaquePart3,
                                                         String type,
                                                         String typeCode,
                                                         Pageable pageable) {


        log.debug("Request to get all Customers");
        Page<Customer> customers = customerRepository.findAllBoundaryCustomers(
            vehicleModel,
            archive,
            carRfId,
            plaque,
            plaquePart1,
            plaquePart2,
            plaquePart3,
            type,
            typeCode,
            pageable);
        Page<CarCustomerDTO> customers1 = customers.map(customerMapper::toCarDto);
        return customers1;
    }

    public Boolean exist(CustomerExistDTO customerExistDTO) {

        Personality personality = customerExistDTO.getNationalId() == null ?
            Personality.NATURAL :
            Personality.LEGAL;

        return customerRepository.existsByCodeAndPersonalityAndPersonCode(customerExistDTO.getCustomerCode(),
            personality,
            personality == Personality.NATURAL ? customerExistDTO.getNationalCode() : customerExistDTO.getNationalId());

    }

    public Boolean checkActiveCustomer(List<Long> ids) {
        return customerRepository.checkActiveCustomer(ids, ZonedDateTime.now()).equals(0);
    }

    public Boolean archiveCustomer(Long customerId) {
        return customerRepository.archive(customerId) > 0;

    }

    public void deArchiveCustomer(Long id) {
        Customer customer = customerRepository.findOne(id);
        if (customer == null)
            throw new CustomParameterizedException("error.customer.not.found");

        if (customerRepository.existPlaque(customer.getId(),
            customer.getPlaque(),
            customer.getPlaqueTwo(), customer.getType().getId(), customer.getCountry().getId()) > 0) {
            throw new CustomParameterizedException("error.exist.plaque");
        }

        customer.setArchive(false);
        customerRepository.save(customer);
    }


    public List<CarTankDTO> getTankMeasure(String rfId) {
        List<CarTank> carTanks = carTankRepository.findCarTankByTankNoAndRfId(rfId);
        if (carTanks == null || !carTanks.iterator().hasNext()) {
            CarRfId carRfId = carRfIdRepository.findByCode(rfId);
            if (carRfId != null && !carRfId.isActive()) {
                throw new CustomParameterizedException("error.rfId.disable");
            } else if (carRfId == null) throw new CustomParameterizedException("error.customer.not.found");

        }
        return carTankMapper.toDto(carTanks);
    }


    public Page<CustomerOrderCapacityDTO> findAllCustomerOrderCapacities(Long customerId, String query, Boolean forceLoad, Pageable page) {

        Page<CustomerOrderCapacity> result;

        if (query != null) {
            BooleanExpression where = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerOrderCapacity.class, "customerOrderCapacity"), null);
            where = where.and(QCustomerOrderCapacity.customerOrderCapacity.customer.id.eq(customerId));
            result = customerOrderCapacityRepository.findAll(where, page);
        } else {
            result = customerOrderCapacityRepository.findAllByCustomer_Id(customerId, page);
        }

        if (forceLoad || result.getSize() < 1) {
            Customer customer = customerRepository.findOne(customerId);
            List<DataComplexTypePymanResult> capacities = new ArrayList<>();
            Boolean webServiceResponse = isCustomerPayable(customer.getIdentifyCode());
            if (webServiceResponse != null && !webServiceResponse) {
                Optional<String> personTransportCode = sellContractRepository.findPersonTransportCodeCustomer_Id(customerId, ZonedDateTime.now()).stream().findFirst();
                if (personTransportCode.isPresent()) {
                    List<DataComplexTypePymanResult> capacity = transportationClient.getCapacity(personTransportCode.get(), CapacityType.PERSON_TRANSPOR);
                    capacities.addAll(capacity);
                }
            } else {
                Optional<String> depotCode = sellContractRepository.findDepotCodeByCustomer_Id(customerId).stream().findFirst();
                if (depotCode.isPresent()) {
                    List<DataComplexTypePymanResult> capacity = transportationClient.getCapacity(depotCode.get(), CapacityType.DEPOT);
                    capacities.addAll(capacity);
                }
            }


            if (capacities.isEmpty()) {
                List<Double> tempCapacity = Arrays.asList(12000D, 18500D, 25500D, 29500D, 18000D, 19500D, 1000D, 32000D, 28500D, 6000D, 30000D, 15000D, 29800D, 19800D, 23500D, 28000D, 27000D, 26500D, 14000D, 27500D, 14500D, 24500D, 31000D, 19660D, 26000D, 32500D, 40000D, 25000D, 24000D, 29000D, 20290D, 290000D, 20000D, 21000D, 19000D, 20580D);
                tempCapacity.forEach(s ->
                {
                    DataComplexTypePymanResult item = new DataComplexTypePymanResult();
                    item.setPymanZarfiat1(s.toString());
                    item.setPymanZarfiat2(s.toString());
                    item.setPymanZarfiat3(s.toString());
                    item.setPymanZarfiat4(s.toString());
                    capacities.add(item);
                });
            }


            if (!capacities.isEmpty()) {
                customerOrderCapacityRepository.deleteAllByCustomer_Id(customerId);
                capacities.stream()
                    .map(data -> Arrays.asList(
                        new ProductCapacityDTO().capacity(data.getPymanZarfiat1()).productGroup("8989"),
                        new ProductCapacityDTO().capacity(data.getPymanZarfiat2()).productGroup("2222"),
                        new ProductCapacityDTO().capacity(data.getPymanZarfiat3()).productGroup("3333"),
                        new ProductCapacityDTO().capacity(data.getPymanZarfiat4()).productGroup("4444")))
                    .flatMap(Collection::stream).distinct().forEach(c -> {
                    if (c.getCapacity() == null || c.getCapacity().isEmpty())
                        return;
                    Double capacity = Double.parseDouble(c.getCapacity());
                    if (capacity == 0 || capacity < 0)
                        return;
                    ProductGroup productGroup = productGroupRepository.findOneByCode(c.getProductGroup());
                    CustomerOrderCapacity customerOrderCapacity = customerOrderCapacityRepository.findByCustomer_IdAndCapacityAndProductGroup_Id(customerId, capacity.longValue(), productGroup.getId());
                    if (customerOrderCapacity == null) {
                        customerOrderCapacity = new CustomerOrderCapacity();
                        customerOrderCapacity.setCustomer(customer);
                        customerOrderCapacity.setActive(false);
                        customerOrderCapacity.setCapacity(capacity.longValue());
                        customerOrderCapacity.setProductGroup(productGroup);
                        customerOrderCapacityRepository.saveAndFlush(customerOrderCapacity);
                    }
                });
            }


        }

        return result.map(customerOrderCapacityMapper::toDto);

    }

    public List<CustomerOrderCapacityDTO> findAllCustomerOrderCapacities(Long customerId, Long productId) {
        Product product = productRepository.findOne(productId);
        Long productGroupId = product.getProductGroup().getId();
        List<CustomerOrderCapacity> result = product != null ? customerOrderCapacityRepository.findAllByCustomer_IdAndActiveIsTrueAndProductGroup_Id(customerId, productGroupId) : new ArrayList<>();
        return customerOrderCapacityMapper.toDto(result);
    }

    public CustomerStationInfoDTO findCustomerStationInfo(Long customerId) {
        CustomerStationInfo result = customerSataionInfoRepository.findByCustomer_Id(customerId);
        return customerSataionInfoMapper.toDto(result);
    }


    public IdCodeLocationDTO getCodeLocation(Long customerId) {
        IdCodeLocationDTO idCodeLocationDTO = new IdCodeLocationDTO();
        idCodeLocationDTO.setId(customerId);

        Customer customer = customerRepository.findOne(customerId);
        idCodeLocationDTO.setCode(customer.getIdentifyCode());

        String locationCode = (customer.getType().getCustomerGroup() == CustomerGroup.BOUNDARY) ?
            locationRepository.findOneByLocationParentIsNull().getStateCode() :
            locationService.getStateLocationCode(customer.getLocations());

        idCodeLocationDTO.setLocationCode(locationCode);
        return idCodeLocationDTO;
    }

    public List<Long> getListOfCarAmount(Long customerId) {
        return transportContractRepository.getListOfCarAmountByCustomerId(customerId, ZonedDateTime.now());
    }


    public Page<CustomerVisitDTO> findAllCustomerVisit(Long id, String query, Pageable pageable) {

        log.debug("Request to get all Car Rf Id");
        Page<CustomerVisit> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerVisit.class, "customerVisit"), null);
            BooleanExpression customerExpression = QCustomerVisit.customerVisit.customer.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = customerVisitRepository.findAll(booleanExpression, pageable);
        } else {
            result = customerVisitRepository.findByCustomer_Id(id, pageable);

        }
        return result.map(customerVisitMapper::toDto);
    }

    Boolean isCustomerPayable(String customerCode) {

        try {

            CustomerWSStub.IsCustomerPayableE isCustomerPayable0 = new CustomerWSStub.IsCustomerPayableE();
            CustomerWSStub.IsCustomerPayable isCustomerPayable = new CustomerWSStub.IsCustomerPayable();
            isCustomerPayable.setCustomerCode(customerCode);
            isCustomerPayable0.setIsCustomerPayable(isCustomerPayable);


            CustomerWSStub.IsCustomerPayableResponseE customerPayable = customerWSStub.isCustomerPayable(isCustomerPayable0);
            Boolean result = customerPayable.getIsCustomerPayableResponse().get_return();
            log.debug("isCustomerPayable:" + result);
            return result;
        } catch (AxisFault axisFault) {
            axisFault.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Boolean customerHasFare(Long customerId) {
        Boolean result = false;
        Customer customer = customerRepository.findOne(customerId);
        if (customer != null && customer.getIdentifyCode() != null)
            result = isCustomerPayable(customer.getIdentifyCode());
        return result;
    }

    public CustomerFullDTO findOneByCode(String code) {
        return customerMapper.toDto(customerRepository.findOneByIdentifyCode(code));
    }

    public Page<CarCustomerOfflineDTO> findAllBoundaryCustomers(Pageable pageable) {
        Page<Customer> customers = customerRepository.findAllBoundaryCustomerForOffline(CustomerGroup.BOUNDARY, pageable);
        return customers.map(customerMapper::toCarOfflineDTO);
    }

    public Long checkExistBoundaryCustomer(CarCustomerOfflineDTO customerDTO) {
        List<Customer> customer = null;
        if (customerDTO.getPlaque() != null) {
            customer = customerRepository.findByPlaque(customerDTO.getPlaque());
        } else if (customerDTO.getPlaqueTwo() != null) {
            customer = customerRepository.findByPlaque(customerDTO.getPlaqueTwo());
        } else if (customerDTO.getCarRfId() != null) {
            customer = customerRepository.findByRfId(customerDTO.getCarRfId());
        }
        if (customer != null) {
            return customer.get(0).getId();
        }

        Customer newCustomer = customerMapper.toCustomerFromOffline(customerDTO);

        newCustomer.setId(null);
        newCustomer.setType(customerTypeRepository.findOne(customerDTO.getTypeId()));
        newCustomer.setRegisterDate(ZonedDateTime.now());
        newCustomer.setCarTanks(new HashSet<>());
        VehicleModel vehicleModel = vehicleModelRepository.findOne(customerDTO.getVehicleModel().getId());
        if (vehicleModel == null) {
            vehicleModel = vehicleModelRepository.save(vehicleModelMapper.toEntity(customerDTO.getVehicleModel()));
        }

        newCustomer.setVehicleModel(vehicleModel);
        newCustomer = customerRepository.save(newCustomer);

        List<CarTank> carTanks = carTankMapper.toEntity(new ArrayList<>(customerDTO.getCarTanks()));
        for (CarTank carTank : carTanks) {
            carTank.setCustomer(newCustomer);
        }
        CarRfId carRfId = new CarRfId();
        carRfId.setCustomer(newCustomer);
        carRfId.setCode(newCustomer.getCarRfId());
        carRfId.setActive(true);
        carRfIdRepository.save(carRfId);

        return newCustomer.getId();
    }
}
