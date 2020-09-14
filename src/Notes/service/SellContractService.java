package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.BuyGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ContractType;
import ir.donyapardaz.niopdc.base.domain.enumeration.OrderType;
import ir.donyapardaz.niopdc.base.domain.enumeration.TypeOfFuelReceipt;
import ir.donyapardaz.niopdc.base.domain.projection.Currency;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.*;
import ir.donyapardaz.niopdc.base.service.dto.custom.CurrencyDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.SellContractProductPersonCustomerDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.AoServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.RateServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.TaServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import ir.donyapardaz.niopdc.base.service.remote.specifyrate.CustomerWSStub;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import org.apache.axis2.AxisFault;
import org.apache.commons.lang.SerializationUtils;
import org.javers.core.Javers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.rmi.RemoteException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static ir.donyapardaz.niopdc.base.domain.enumeration.ContractType.AIRPLANE;
import static ir.donyapardaz.niopdc.base.domain.enumeration.ContractType.EXPORT;


/**
 * Service Implementation for managing SellContract.
 */
@Service
@Transactional
public class SellContractService {

    private final Logger log = LoggerFactory.getLogger(SellContractService.class);

    private final SellContractRepository sellContractRepository;
    private final CustomerRepository customerRepository;
    private final DepotRepository depotRepository;


    private final SellContractMapper sellContractMapper;
    private final SellContractPersonRepository sellContractPersonRepository;
    private final SellContractPersonMapper sellContractPersonMapper;
    private final SellContractProductMapper sellContractProductMapper;
    private final SellContractProductRepository sellContractProductRepository;
    private final SellContractCustomerRepository sellContractCustomerRepository;
    private final CustomerMapper customerMapper;
    private final DepotMapper depotMapper;
    private final CustomerWSStub customerWSStub;
    private final SellContractCustomerMapper sellContractCustomerMapper;
    private final Javers javers;
    private final LocationRepository locationRepository;
    private final OrderServiceClient orderServiceClient;
    private final CarInfoRepository carInfoRepository;
    private SupplyChannelService supplyChannelService;
    private TaServiceClient taServiceClient;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;
    private CurrencyMapper currencyMapper;
    private RateServiceClient rateServiceClient;
    private AoServiceClient aoServiceClient;
    private DepotService depotService;
    private PersonRepository personRepository;
    private VehicleCapacityMapper vehicleCapacityMapper;


    public SellContractService(Javers javers, SellContractRepository sellContractRepository, CustomerRepository customerRepository, DepotRepository depotRepository, SellContractMapper sellContractMapper, SellContractPersonRepository sellContractPersonRepository, SellContractPersonMapper sellContractPersonMapper, SellContractProductMapper sellContractProductMapper, SellContractProductRepository sellContractProductRepository, SellContractCustomerRepository sellContractCustomerRepository, CustomerMapper customerMapper, DepotMapper depotMapper, CustomerWSStub customerWSStub, SellContractCustomerMapper sellContractCustomerMapper, LocationRepository locationRepository, OrderServiceClient orderServiceClient, SupplyChannelService supplyChannelService, TaServiceClient taServiceClient, UserDataAccessServiceAsync userDataAccessServiceAsync, CurrencyMapper currencyMapper, RateServiceClient rateServiceClient, AoServiceClient aoServiceClient, DepotService depotService, PersonRepository personRepository, VehicleCapacityMapper vehicleCapacityMapper, CarInfoRepository carInfoRepository) {
        this.javers = javers;
        this.sellContractRepository = sellContractRepository;
        this.customerRepository = customerRepository;
        this.depotRepository = depotRepository;
        this.sellContractMapper = sellContractMapper;
        this.sellContractPersonRepository = sellContractPersonRepository;
        this.sellContractPersonMapper = sellContractPersonMapper;
        this.sellContractProductMapper = sellContractProductMapper;
        this.sellContractProductRepository = sellContractProductRepository;
        this.sellContractCustomerRepository = sellContractCustomerRepository;
        this.customerMapper = customerMapper;
        this.depotMapper = depotMapper;
        this.customerWSStub = customerWSStub;
        this.sellContractCustomerMapper = sellContractCustomerMapper;
        this.locationRepository = locationRepository;
        this.orderServiceClient = orderServiceClient;
        this.supplyChannelService = supplyChannelService;
        this.taServiceClient = taServiceClient;
        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.currencyMapper = currencyMapper;
        this.rateServiceClient = rateServiceClient;
        this.aoServiceClient = aoServiceClient;
        this.depotService = depotService;
        this.personRepository = personRepository;
        this.vehicleCapacityMapper = vehicleCapacityMapper;
        this.carInfoRepository = carInfoRepository;
    }

    /**
     * Save a sellContract.
     *
     * @param sellContractDTO the entity to save
     * @return the persisted entity
     */
    public SellContractDTO save(SellContractDTO sellContractDTO) {
        log.debug("Request to save SellContract : {}", sellContractDTO);

        final SellContract sellContract = sellContractMapper.toEntity(sellContractDTO);
        Set<SellContractProduct> sellContractProducts = null;
        boolean isAddendum = false;

        final Location rootLocation = (sellContract.getContractType() == EXPORT ||
            sellContract.getContractType() == ContractType.AIRPLANE) ?
            locationRepository.findOneByLocationParentIsNull()
            : null;

        long sellContractId = 0;

        if (sellContractDTO.getId() == null) { // ایجاد قرار داد
            sellContract.setActive(false);
            String contractNo = getContractNo(sellContract.getContractType(), sellContract.getSellContractCustomers());
            sellContract.setContractNo(contractNo);
            sellContract.setExportationDate(ZonedDateTime.now());
            sellContract.setParent(null);
            sellContract.setAddendumNumber(0);
            sellContract.setArchive(false);

            if (sellContract.getContractType() != EXPORT) {

                // ثبت ناحیه فعالیت مشتریان در قرارداد
                sellContract.getSellContractCustomers().forEach(sellContractCustomer -> {
                    if (rootLocation != null) {
                        sellContractCustomer.setLocation(rootLocation);
                    } else {
                        sellContractCustomer.setLocation(customerRepository.findOneWithEagerRelationships(sellContractCustomer.getCustomer().getId())
                            .getLocations().iterator().next());
                    }
                    if (sellContract.getContractType() != ContractType.SUPPLY_CHANNEL)
                        sellContractCustomer.setHasTransport(true);
                });
            } else {
                sellContract.setSellContractCustomers(new HashSet<>());


            }
        } else { // ویرایش قرارداد در صورتی که قرارداد تایید شده باشد باید الحاقیه ایجاد شود.

            SellContract sellContractDb = sellContractRepository.findOne(sellContractDTO.getId());
            if (sellContract.getArchive() != null && sellContract.getArchive())
                throw new CustomParameterizedException("error.500");

            sellContract.setCreatedDate(sellContractDb.getCreatedDate());

            boolean isActive = sellContractDb.isActive() != null && sellContractDb.isActive();

            sellContract.setExportationDate(sellContractDb.getExportationDate());
            sellContract.setContractNo(sellContractDb.getContractNo());
            sellContract.setCreatedDate(sellContractDb.getCreatedDate());
            Set<SellContractCustomer> sellContractCustomers = new HashSet<>();

            if (!isActive) { // ویرایش قرارداد حالت عادی
                //region Remove And Edit People
                if (sellContract.getAddendumNumber() == null || sellContract.getAddendumNumber() == 0) {
                    Set<SellContractPerson> sellContractPeople = sellContractDb.getSellContractPeople();

                    List<SellContractPerson> peopleRemoved = sellContractPeople.stream()
                        .filter(sellContractPerson -> sellContract.getSellContractPeople().stream()
                            .noneMatch(sellContractPerson1 ->
                                sellContractPerson.getPerson().getId().equals(sellContractPerson1.getPerson().getId())
                            ))
                        .collect(Collectors.toList());
                    sellContractDb.getSellContractPeople().removeAll(peopleRemoved);

                    sellContractPersonRepository.delete(peopleRemoved);


                    Set<SellContractPerson> peopleEdit = new HashSet<>();
                    sellContract.getSellContractPeople()
                        .forEach(sellContractPerson1 -> sellContractDb.getSellContractPeople()
                            .forEach(sellContractPersonDb -> {
                                if (sellContractPersonDb.getPerson().getId().equals(sellContractPerson1.getPerson().getId())) {
                                    sellContractPersonDb.setSharePercent(sellContractPerson1.getSharePercent());
                                    // set start date
                                    peopleEdit.add(sellContractPersonDb);
                                }
                            }));

                    peopleEdit.addAll(sellContract.getSellContractPeople().stream().filter(sellContractPerson ->
                        sellContractDb.getSellContractPeople().stream().noneMatch(sellContractPerson1 -> sellContractPerson1.getPerson().getId().equals(sellContractPerson.getPerson().getId()))
                    ).collect(Collectors.toSet()));
                    sellContract.setSellContractPeople(peopleEdit);
                }
                //endregion

                //region Remove
                Set<SellContractCustomer> sellContractCustomersDb = sellContractDb.getSellContractCustomers();
                List<SellContractCustomer> customerRemoved = sellContractCustomersDb.stream()
                    .filter(sellContractCustomer -> sellContract.getSellContractCustomers().stream()
                        .noneMatch(sellContractCustomer1 ->
                            sellContractCustomer.getCustomer().getId().equals(sellContractCustomer1.getCustomer().getId())
                        ))
                    .collect(Collectors.toList());

                for (SellContractCustomer sellContractCustomer : customerRemoved) {
                    if (sellContract.getId() != null) {
                        ZonedDateTime maxDateP = orderServiceClient.getMaxDateBySellContractAndPerson(
                            sellContract.getId(), sellContractCustomer.getCustomer().getId());
                        if (maxDateP != null)
                            throw new CustomParameterizedException("sellContractCustomer.cannotRemove");
                    }
                }

                sellContractDb.getSellContractCustomers().removeAll(customerRemoved);

                sellContractCustomerRepository.delete(customerRemoved);
                //endregion

                //region Edit Customer
                if (sellContract.getContractType() != EXPORT) {
                    sellContract.getSellContractCustomers()
                        .forEach(sellContractCustomer1 -> sellContractDb.getSellContractCustomers()
                            .forEach(sellContractCustomerDb -> {
                                if (sellContractCustomerDb.getCustomer().getId().equals(sellContractCustomer1.getCustomer().getId())) {
                                    if (rootLocation == null) {
                                        // قابل ویرایش اگر قرارداد قبلا ثبت شده تایید نشده باشد و یا مشتری که قبلا اضافه شده تایید نشده باشد
                                        sellContractCustomerDb.setLocation(sellContractCustomerDb.getCustomer().getLocations().iterator().next());
                                        sellContractCustomerDb.setHasTransport(sellContractCustomer1.isHasTransport());
                                        sellContractCustomerDb.setCreditAccount(sellContractCustomer1.getCreditAccount());
                                    } else {
                                        sellContractCustomerDb.setLocation(rootLocation);
                                    }
                                    if (sellContractDb.getContractType() != ContractType.SUPPLY_CHANNEL)
                                        sellContractCustomerDb.setHasTransport(true);
                                    sellContractCustomers.add(sellContractCustomerDb);
                                }
                            }));
                }
            } else { // الحاقیه
                isAddendum = true;
                sellContractId = sellContractDb.getId();
                sellContractDb.setArchive(true);
                sellContractDb.setActive(false);
                sellContractDb.setAddendumDate(ZonedDateTime.now());
                sellContractRepository.save(sellContractDb);

                sellContract.setId(null);
                sellContract.getSellContractCustomers().forEach(sellContractCustomer -> sellContractCustomer.setId(null));
                sellContract.getSellContractPeople().forEach(sellContractPerson -> sellContractPerson.setId(null));
                sellContract.setStartDate(sellContractDb.getStartDate());
                sellContract.setExportationDate(sellContractDb.getExportationDate());
                sellContract.setContractType(sellContractDb.getContractType());
                sellContract.setContractNo(sellContractDb.getContractNo());
                sellContract.setArchive(false);
                sellContract.setActive(false);
                sellContract.setParent(sellContractDb);
                sellContract.setAddendumNumber((sellContractDb.getAddendumNumber() == null ? 0 : sellContractDb.getAddendumNumber()) + 1);
            }


            //region Add Customer
            if (sellContract.getContractType() != EXPORT) {
                // مشتریان جدید اضافه شوند
                Set<SellContractCustomer> newSellContractCustomers = sellContract.getSellContractCustomers().stream().filter(sellContractCustomer ->
                    isActive || sellContractDb.getSellContractCustomers()
                        .stream()
                        .noneMatch(sellContractCustomer1 -> sellContractCustomer1.getCustomer().getId().equals(sellContractCustomer.getCustomer().getId()))
                ).collect(Collectors.toSet());
                newSellContractCustomers.forEach(sellContractCustomer -> {
                    if (rootLocation != null) {
                        sellContractCustomer.setLocation(rootLocation);
                        if (sellContract.getContractType() != ContractType.SUPPLY_CHANNEL)
                            sellContractCustomer.setHasTransport(true);
                    } else {
                        sellContractCustomer.setLocation(customerRepository.findOneWithEagerRelationships(sellContractCustomer.getCustomer().getId())
                            .getLocations().iterator().next());
                    }
                });
                sellContractCustomers.addAll(newSellContractCustomers);
                sellContract.setSellContractCustomers(sellContractCustomers);

                // region reCreate sellContractProduct
                if (isAddendum)
                    sellContractProducts = sellContractDb.getSellContractCustomers().stream()
                        .filter(sellContractCustomerDb -> sellContractCustomers.stream()
                            .anyMatch(sellContractCustomer -> sellContractCustomer.getCustomer().getId()
                                .equals(sellContractCustomerDb.getCustomer().getId())))
                        .flatMap(sellContractCustomerDb -> {
                            SellContractCustomer sellContractCustomer1 = sellContractCustomers.stream().filter(sellContractCustomer -> sellContractCustomer.getCustomer().getId()
                                .equals(sellContractCustomerDb.getCustomer().getId())).findFirst().get();
                            return sellContractCustomerDb.getSellContractProducts().stream().map(sellContractProductDb -> {
                                SellContractProduct clone = (SellContractProduct) SerializationUtils.clone(sellContractProductDb);
                                clone.setSellContractCustomer(sellContractCustomer1);
                                clone.setId(null);
                                clone.setSellContract(sellContract);
                                sellContractCustomer1.getSellContractProducts().add(clone);
                                return clone;
                            });
                        }).collect(Collectors.toSet());
                //endregion

            } else sellContract.setSellContractCustomers(new HashSet<>());
            //endregion

        }


        SellContract sellContractReturn = sellContractRepository.saveAndFlush(sellContract);
        if (sellContractProducts != null)
            sellContractProductRepository.save(sellContractProducts);

        javers.commit(SecurityUtils.getCurrentUserLogin().get(), sellContractReturn);
        userDataAccessServiceAsync.refreshSellContractAccess();
        if (isAddendum) {
            orderServiceClient.editSellContractId(sellContractId, sellContractReturn.getId());
        }
        return sellContractMapper.toDto(sellContractReturn);

    }

    private String getContractNo(ContractType contractType, Set<SellContractCustomer> sellContractCustomers) {
        String contractNo;
        if (contractType == ContractType.SUPPLY_CHANNEL || contractType == ContractType.CONSUMER) {
            Customer customer = customerRepository.findOne(sellContractCustomers.iterator().next().getCustomer().getId());
            if (customer.getIdentifyCode() == null)
                throw new CustomParameterizedException("error.sellContractCustomer.customer.emptyIdentifyCode");
            contractNo = customer.getIdentifyCode();
        } else {
            contractNo = DateUtil.convertToPersianByFormat(ZonedDateTime.now(), "YYYY");
        }
        SellContract contract = sellContractRepository.findTopByContractNoStartsWithOrderByIdDesc(contractNo);
        Long counter = 0L;
        if (contract != null) {
            String substring = contract.getContractNo().substring((contractType == ContractType.SUPPLY_CHANNEL || contractType == ContractType.CONSUMER) ? 9 : 4);
            counter = Long.parseLong(substring);
        }
        while (sellContractRepository.findFirstByContractNo(contractNo + ++counter) != null) ;
        return contractNo + counter;
    }


    /**
     * Get all the sellContracts.
     *
     * @param addendum
     * @param customerId
     * @param personId
     * @param pageable   the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<NativeSellContractDTO> findAll(Boolean addendum, Long customerId, Long personId, String personName, String customerName, String contractNo, Boolean active, Pageable pageable) {
        log.debug("Request to get all SellContracts");
        return sellContractRepository.findAll(addendum, customerId, personId, personName, customerName, contractNo, active, pageable);
    }

    /**
     * Get all the sellContracts.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Set<ContractType> findAllTypes(Long customerId) {
        log.debug("Request to get all contractTypes");
        if (customerId != null) {
            Customer customer = customerRepository.findOne(customerId);
            Set<ContractType> contractTypes = ContractType.getContractTypeByCustomerGroups(customer.getType().getCustomerGroup());

            Set<ContractType> contractTypesAccess = sellContractRepository.findAllTypes(SecurityUtils.getCurrentUserLogin().get())
                .stream().map(ContractType::valueOf).collect(Collectors.toSet());
            contractTypes.retainAll(contractTypesAccess);
            return contractTypes;
        } else {
            return sellContractRepository.findAllTypes(SecurityUtils.getCurrentUserLogin().get())
                .stream().map(ContractType::valueOf).collect(Collectors.toSet());
        }

    }

    /**
     * Get one sellContract by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SellContractDTO findOne(Long id) {
        log.debug("Request to get SellContract : {}", id);
        SellContract sellContract = sellContractRepository.findOneWithEagerRelationships(id);


        SellContractDTO sellContractDTO = sellContractMapper.toDto(sellContract);

        return sellContractDTO;
    }


    /**
     * Delete the sellContract by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete SellContract : {}", id);

        SellContract sellContract = sellContractRepository.findOneWithEagerRelationships(id);
        SellContract sellContractParent = sellContract.getParent();
        if (sellContractParent != null) {
            sellContractParent.setArchive(false);
            sellContractParent.setAddendumDate(null);
            sellContractParent.setActive(true);
            sellContractRepository.save(sellContractParent);
        }
        sellContractRepository.delete(id);

    }

    /**
     * Active the sellContract by id.
     *
     * @param id the id of the entity
     */
    public List<SellContractCustomerDTO> confirm(Long id) {
        log.debug("Request to active SellContract : {}", id);

        SellContract sellContract = sellContractRepository.findOneWithEagerRelationships(id);
        if (sellContract.getArchive() != null && sellContract.getArchive())
            throw new CustomParameterizedException("error.500");

        if (sellContract.getSellContractProducts() == null || sellContract.getSellContractProducts().isEmpty())
            throw new CustomParameterizedException("error.sellContract.product.not.found");


        List<SellContractCustomerDTO> unSuccessCustomer = new ArrayList<>();
        sellContract.getSellContractCustomers().forEach(sellContractCustomer -> {
            Customer customer = sellContractCustomer.getCustomer();
            //todo disable in server 13
      /*      boolean resultAddCustomer = addCustomer(customer, sellContract);
            log.debug("result (" + customer.getIdentifyCode() + "):" + resultAddCustomer);
            if (!resultAddCustomer) {
                unSuccessCustomer.add(sellContractCustomerMapper.toDto(sellContractCustomer));
            }
*/
        });

        sellContract.setActive(true);
        if (sellContract.getContractType() != AIRPLANE)
            supplyChannelService.sendSupplyChannelToTejaratAsan(sellContract);

        return unSuccessCustomer;
    }


    boolean addCustomer(Customer customer, SellContract sellContract) {
        try {

            CustomerWSStub.AddCustomerE addCustomerE = new CustomerWSStub.AddCustomerE();
            CustomerWSStub.AddCustomer addCustomer = new CustomerWSStub.AddCustomer();
            addCustomer.setAddress(customer.getAddress() == null ? "" : customer.getAddress());
            String code = customer.getIdentifyCode();
            String customerCode = code.substring(0, 4) + "1" + code.substring(5, 9); // todo testi
            addCustomer.setCustomerCode(customerCode);
            addCustomer.setCustomerType(Integer.parseInt(customer.getType().getOldCode() == null ? "0" : customer.getType().getOldCode()));
            addCustomer.setMasrafType((sellContract.getContractType() == ContractType.SUPPLY_CHANNEL) ?
                3 : 1);
            addCustomer.setStatusType(1);
            addCustomer.setMType((sellContract.getContractType() == ContractType.SUPPLY_CHANNEL) ?
                0 : 1);// 1 جایگاه و فروشندگی
            addCustomer.setOldCode(0);
            addCustomer.setCustomerName(customer.getName());
            String economicCode = sellContract.getSellContractPeople().stream()
                .max(Comparator.comparing(SellContractPerson::getSharePercent)).get()
                .getPerson().getEconomicCode();
            addCustomer.setEconomicCode(economicCode == null ? "" : economicCode);
            addCustomer.setPass("RaTe_SeLl_CuStOmEr_Niopdc_WS");
            addCustomerE.setAddCustomer(addCustomer);
            CustomerWSStub.AddCustomerResponseE addCustomerResponseE = customerWSStub.addCustomer(addCustomerE);
            String result = addCustomerResponseE.getAddCustomerResponse().get_return();
            log.debug("call CustomerWSStub add customer :" + result);
            return Boolean.parseBoolean(result);
        } catch (AxisFault axisFault) {
            axisFault.printStackTrace();
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Transactional(readOnly = true)
    public Page<SellContractPersonDTO> findSellContractPersonBySellContract(Long sellContractId, Pageable pageable) {
        log.debug("Request to get all SellContracts");
        return sellContractPersonRepository.findAllBySellContract_Id(sellContractId, pageable)
            .map(sellContractPersonMapper::toDto);


    }

    @Transactional(readOnly = true)
    public Page<SellContractProductFullDTO> findAllSellContractProduct(Long sellContractId, String query, Pageable pageable) {
        log.debug("Request to get all SellContracts");
        return sellContractProductRepository.findAll(sellContractId, query, pageable)
            .map(sellContractProductMapper::customToDto);


    }

    @Transactional(readOnly = true)
    public List<SellContractCustomerDTO> findAllSellContractCustomer(Long sellContractId) {
        log.debug("Request to get all SellContracts");
        return sellContractCustomerMapper.toDto(sellContractCustomerRepository.findAllBySellContract_Id(sellContractId));


    }

    public List<DepotDTO> findAllDepotBySellContract(Long sellContractId) {
        return depotMapper.toDto(depotRepository.findAllBySellContract(sellContractId));
    }

    /*Most used in order*/

    public List<DepotDTO> getAllDepotsBySellContractAndPersonAndCustomer(Long sellContractId, Long personId, Long customerId, OrderType orderType) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        List<Depot> depots = depotRepository.getAllDepotsBySellContractAndPersonAndCustomer(
            sellContractId,
            personId,
            customerId,
            contractTypes,
            ZonedDateTime.now(),
            orderType.toString());

        List<DepotDTO> depotDTOS = depotMapper.toDto(depots);
        if (orderType == OrderType.AIRPLANE || orderType == OrderType.REFUEL_CENTER) {
            depotService.injectRefuelCenter(depotDTOS.toArray(new DepotDTO[0]));
        }

        return depotDTOS;
    }

    public DepotDTO getOneDepotsBySellContractAndPersonAndCustomer(Long sellContractId,
                                                                   Long personId,
                                                                   Long customerId,
                                                                   OrderType orderType,
                                                                   Long depotId) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        List<Depot> depots = depotRepository.getOneDepotsBySellContractAndPersonAndCustomer(
            sellContractId,
            personId,
            customerId,
            contractTypes,
            depotId,
            ZonedDateTime.now());

        if (depots.size() > 1) {
            throw new CustomParameterizedException("error.depot.isMulti");
        }
        Depot depot = depots.size() > 0 ? depots.get(0) : null;

        DepotDTO depotDTO = depotMapper.toDto(depot);
        if (orderType == OrderType.AIRPLANE || orderType == OrderType.REFUEL_CENTER) {
            depotService.injectRefuelCenter(depotDTO);
        }

        return depotDTO;
    }


    public List<CurrencyDTO> getCurrenciesBySellContractAndPersonAndCustomerByDepot(Long sellContractId,
                                                                                    Long personId,
                                                                                    Long customerId,
                                                                                    Long depotId,
                                                                                    OrderType orderType) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        List<Currency> currencyIds = sellContractProductRepository.getAllCurrencyIdBySellContractAndPersonAndCustomer(sellContractId,
            personId,
            customerId,
            depotId,
            contractTypes,
            ZonedDateTime.now());

        return
            currencyMapper.toDto(
                currencyIds
            );
    }


    public List<BuyGroup> findBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(Long sellContractId,
                                                                                           Long personId,
                                                                                           Long customerId,
                                                                                           Long depotId,
                                                                                           Long currencyId,
                                                                                           OrderType orderType) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        return sellContractProductRepository.findBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
            sellContractId, personId, customerId, depotId, currencyId, contractTypes, ZonedDateTime.now());
    }

    public BuyGroup findOneBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(Long sellContractId,
                                                                                        Long personId,
                                                                                        Long customerId,
                                                                                        Long depotId,
                                                                                        Long currencyId,
                                                                                        OrderType orderType,
                                                                                        BuyGroup buyGroup
    ) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        return sellContractProductRepository.findOneBuyGroupBySellContractAndPersonAndCustomerByDepotAndCurrency(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, contractTypes, ZonedDateTime.now());
    }


    public List<TypeOfFuelReceipt> findTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(Long sellContractId,
                                                                                                                        Long personId,
                                                                                                                        Long customerId,
                                                                                                                        Long depotId,
                                                                                                                        Long currencyId,
                                                                                                                        BuyGroup buyGroup,
                                                                                                                        OrderType orderType) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        return sellContractProductRepository.findTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, contractTypes, ZonedDateTime.now());
    }


    public TypeOfFuelReceipt findOneTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(Long sellContractId,
                                                                                                                     Long personId,
                                                                                                                     Long customerId,
                                                                                                                     Long depotId,
                                                                                                                     Long currencyId,
                                                                                                                     BuyGroup buyGroup,
                                                                                                                     OrderType orderType,
                                                                                                                     TypeOfFuelReceipt typeOfFuelReceipt) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);
        return sellContractProductRepository.findOneTypeOfFuelReceiptBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
            sellContractId, personId, customerId, depotId, currencyId, buyGroup, contractTypes, typeOfFuelReceipt, ZonedDateTime.now());
    }


    public SellContractProductPersonCustomerDTO findProductAndPersonAndCustomerForOrderEdit(Long sellContractId,
                                                                                            Long personId,
                                                                                            Long customerId,
                                                                                            Long depotId,
                                                                                            Long currencyId,
                                                                                            BuyGroup buyGroup,
                                                                                            OrderType orderType,
                                                                                            TypeOfFuelReceipt typeOfFuelReceipt) {
        Set<ContractType> contractTypes = ContractType.getContractTypes(orderType);

        SellContractProductPersonCustomerDTO sellContractProductPersonCustomerDTO = new SellContractProductPersonCustomerDTO();

        List<SellContractProduct> sellContractProducts = sellContractProductRepository.findAllBySellContractAndPersonAndCustomerByDepotAndCurrencyAndBuyGroup(
            sellContractId,
            personId,
            customerId,
            depotId,
            currencyId,
            buyGroup,
            contractTypes,
            typeOfFuelReceipt == null ? null : typeOfFuelReceipt.toString(),
            ZonedDateTime.now()
        );
        List<SellContractProductDTO> sellContractProductDTOS = sellContractProductMapper.toDtoForOrderFind(sellContractProducts);

        Person person = personRepository.findOne(personId);
        sellContractProductPersonCustomerDTO.setPersonFullName(person.getFullName());
        Depot depot = depotRepository.findOne(depotId);
        sellContractProductPersonCustomerDTO.setDepotTitle(depot.getTitle());

        Set<VehicleCapacity> vehicleCapacities = new HashSet<>();
        if (customerId != null) {
            Customer customer = customerRepository.findOneWithEagerRelationships(customerId);
            sellContractProductPersonCustomerDTO.setCustomerName(customer.getName());
            sellContractProductPersonCustomerDTO.setCustomerCode(customer.getIdentifyCode());
            sellContractProductPersonCustomerDTO.setCustomerGroup(customer.getType().getCustomerGroup());

            if (orderType == OrderType.AIRPLANE) {
                vehicleCapacities = customer.getVehicleModel().getVehicleCapacities();

                if (customer.getVehicleModel() == null)
                    throw new CustomParameterizedException("error.customer.vehicleModel.isUndefined");
                if (vehicleCapacities.size() == 0)
                    throw new CustomParameterizedException("error.customer.vehicleCapacities.isUndefined");
            }
        }

        sellContractProductPersonCustomerDTO.setSellContractProducts(sellContractProductDTOS);
        if (sellContractProductDTOS.size() > 0) {
            Set<Long> currencyRateGroupIds = sellContractProductDTOS.stream().map(SellContractProductDTO::getCurrencyRateGroupId).collect(Collectors.toSet());
            Set<Long> rateGroupIds = sellContractProductDTOS.stream().map(SellContractProductDTO::getRateGroupId).collect(Collectors.toSet());

            Map<Long, String> currencyRateGroupTitles = currencyRateGroupIds.size() == 0 ? new HashMap<>() : rateServiceClient.getAllCurrencyRateGroupTitles(currencyRateGroupIds);
            Map<Long, String> rateGroupTitles = rateGroupIds.size() == 0 ? new HashMap<>() : rateServiceClient.getAllRateGroupTitles(rateGroupIds);

            for (SellContractProductDTO sellContractProductDTO : sellContractProductDTOS) {
                sellContractProductDTO.setCurrencyRateGroupTitle(currencyRateGroupTitles.get(sellContractProductDTO.getCurrencyRateGroupId()));
                sellContractProductDTO.setRateGroupTitle(rateGroupTitles.get(sellContractProductDTO.getRateGroupId()));

                if (orderType == OrderType.AIRPLANE) {
                    long capacity = vehicleCapacities.stream().filter(vehicleCapacity -> vehicleCapacity.getProduct().getId().equals(sellContractProductDTO.getProductId())).mapToLong(VehicleCapacity::getCapacity).sum();
                    sellContractProductDTO.setCapacity(capacity);
                } else if (orderType == OrderType.REFUEL_CENTER) {
                    List<CarInfo> carInfos = carInfoRepository.findAllBySellContractCustomerIdInTransportContract(sellContractProductDTO.getSellContractCustomerId(), ZonedDateTime.now());
                }
            }
        }
        return sellContractProductPersonCustomerDTO;
    }




    /*Most used in order*/


    public CustomerAccountingDTO findCustomerAccounting(Long personId, Long customerId) {
        SellContract sellContract = sellContractRepository.findOneByPersonAndCustomer(personId, customerId);

        CustomerAccountingDTO customerAccountingDTO = new CustomerAccountingDTO();
        customerAccountingDTO.setPersonId(personId);
        customerAccountingDTO.setContractType(sellContract.getContractType());

        customerAccountingDTO.setCustomerId(customerId);
        customerAccountingDTO.setId(sellContract.getId());

        customerAccountingDTO.setCreditAccountCustomer(sellContract.getSellContractCustomers()
            .stream()
            .filter(sellContractCustomer -> sellContractCustomer.getCustomer().getId().equals(customerId))
            .findAny().get().getCreditAccount());

        SellContractPerson sellContractPerson1 = sellContract.getSellContractPeople()
            .stream()
            .filter(sellContractPerson -> sellContractPerson.getPerson().getId().equals(personId))
            .findAny().get();
        customerAccountingDTO.setCreditAccountPerson(sellContractPerson1.getCreditAccount());

        customerAccountingDTO.setBankAccountId(sellContractPerson1.getBankAccountId());

        return customerAccountingDTO;
    }

    public void updateCustomerAccounting(CustomerAccountingDTO customerAccountingDTO) throws Exception {
        SellContract sellContract = sellContractRepository.
            findOneByPersonAndCustomer(customerAccountingDTO.getPersonId(), customerAccountingDTO.getCustomerId());

        if (!sellContract.getId().equals(customerAccountingDTO.getId())) {
            throw new Exception();
        }

        SellContractCustomer sellContractCustomer1 = sellContract.getSellContractCustomers()
            .stream()
            .filter(sellContractCustomer -> sellContractCustomer.getCustomer().getId().equals(customerAccountingDTO.getCustomerId()))
            .findAny().get();

        sellContractCustomer1.setCreditAccount(customerAccountingDTO.getCreditAccountCustomer());

        SellContractPerson sellContractPerson1 = sellContract.getSellContractPeople()
            .stream()
            .filter(sellContractPerson -> sellContractPerson.getPerson().getId().equals(customerAccountingDTO.getPersonId()))
            .findAny().get();
        sellContractPerson1.setCreditAccount(customerAccountingDTO.getCreditAccountPerson());

        sellContractPerson1.setBankAccountId(customerAccountingDTO.getBankAccountId());

        sellContractCustomerRepository.save(sellContractCustomer1);
        sellContractPersonRepository.save(sellContractPerson1);

    }

/*    public Page<SellContractDTO> findAllByCustomer(Pageable pageable, Long customerId) {
        return sellContractRepository.findByCustomersIn(new ArrayList<>(Arrays.asList(customerRepository.findOne(customerId))), pageable)
            .map(sellContractMapper::toDto);
    }*/

}
