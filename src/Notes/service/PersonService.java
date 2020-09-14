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
import ir.donyapardaz.niopdc.base.service.dto.custom.BankAccountDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.CustomerPersonDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Person.ContractItem;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Person.NewContract;
import ir.donyapardaz.niopdc.base.service.dto.pda.PersonApiDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.AccountingServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.TaServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.UaaServiceClient;
import ir.donyapardaz.niopdc.base.service.feign.client.dto.UserDTO;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import ir.donyapardaz.niopdc.base.service.mapper.pda.PersonApiMapper;
import ir.donyapardaz.niopdc.base.service.remote.Shahkar.ShahkarClient;
import ir.donyapardaz.niopdc.base.service.remote.person.LegalPersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.person.NaturalPersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.person.PersonInfoClient;
import ir.donyapardaz.niopdc.base.service.remote.transportation.DataComplexTypeGetDataNavganPymanSell;
import ir.donyapardaz.niopdc.base.service.remote.transportation.TransportationClient;
import ir.donyapardaz.niopdc.base.service.remote.verify.postcode.PostCodeClient;
import ir.donyapardaz.niopdc.base.service.utils.LocalizationUtil;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ws.client.WebServiceIOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Person.
 */
@Service
@Transactional
public class PersonService {

    private final Logger log = LoggerFactory.getLogger(PersonService.class);

    private final PersonRepository personRepository;
    private final SalesCodeRepository salesCodeRepository;
    private final PersonMapper personMapper;
    private final StakeholderRepository stakeholderRepository;
    private final StakeholderMapper stakeholderMapper;
    private final UserDataAccessRepository userDataAccessRepository;
    private final UaaServiceClient uaaServiceClient;
    private final CustomerCreditRepository customerCreditRepository;
    private final CustomerCreditMapper customerCreditMapper;
    private final LocationRepository locationRepository;
    private final OldCustomerRepository oldCustomerRepository;
    private final CustomerRepository customerRepository;
    private final CustomerTypeRepository customerTypeRepository;
    private final AccountingServiceClient accountingServiceClient;
    private final ShahkarClient shahkarClient;
    private PersonApiMapper personApiMapper;
    private CountryRepository countryRepository;
    private RemoteService remoteService;
    private PersonInfoClient personInfoClient;
    private UserDataAccessService userDataAccessService;
    private LocationService locationService;
    private LegalPersonInfoClient legalPersonInfoClient;
    private NaturalPersonInfoClient naturalPersonInfoClient;
    private PostCodeClient postCodeClient;
    private CustomerMapper customerMapper;
    private SabtAhvalSAHAPersonInfoMapper sabtAhvalSAHAPersonInfoMapper;
    private TransportationClient transportationClient;
    private PersonTransportRepository personTransportRepository;
    private TaServiceClient taServiceClient;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;


    public PersonService(PersonRepository personRepository, SalesCodeRepository salesCodeRepository,
                         PersonMapper personMapper,
                         StakeholderRepository stakeholderRepository, StakeholderMapper stakeholderMapper,
                         UserDataAccessRepository userDataAccessRepository, UaaServiceClient uaaServiceClient,
                         CustomerCreditRepository customerCreditRepository, CustomerCreditMapper customerCreditMapper,
                         PersonApiMapper personApiMapper, CountryRepository countryRepository, RemoteService remoteService,
                         PersonInfoClient personInfoClient, LocationRepository locationRepository, OldCustomerRepository oldCustomerRepository,
                         CustomerRepository customerRepository, CustomerTypeRepository customerTypeRepository, UserDataAccessService userDataAccessService,
                         LocationService locationService, LegalPersonInfoClient legalPersonInfoClient, NaturalPersonInfoClient naturalPersonInfoClient,
                         PostCodeClient postCodeClient, CustomerMapper customerMapper, AccountingServiceClient accountingServiceClient,
                         SabtAhvalSAHAPersonInfoMapper sabtAhvalSAHAPersonInfoMapper, TransportationClient transportationClient,
                         PersonTransportRepository personTransportRepository, TaServiceClient taServiceClient,
                         UserDataAccessServiceAsync userDataAccessServiceAsync, ShahkarClient shahkarClient) {
        this.personRepository = personRepository;
        this.salesCodeRepository = salesCodeRepository;
        this.personMapper = personMapper;
        this.stakeholderRepository = stakeholderRepository;
        this.stakeholderMapper = stakeholderMapper;
        this.userDataAccessRepository = userDataAccessRepository;
        this.uaaServiceClient = uaaServiceClient;
        this.customerCreditRepository = customerCreditRepository;
        this.customerCreditMapper = customerCreditMapper;
        this.personApiMapper = personApiMapper;
        this.countryRepository = countryRepository;
        this.remoteService = remoteService;
        this.personInfoClient = personInfoClient;
        this.locationRepository = locationRepository;
        this.oldCustomerRepository = oldCustomerRepository;
        this.customerRepository = customerRepository;
        this.customerTypeRepository = customerTypeRepository;
        this.userDataAccessService = userDataAccessService;
        this.locationService = locationService;
        this.legalPersonInfoClient = legalPersonInfoClient;
        this.naturalPersonInfoClient = naturalPersonInfoClient;
        this.postCodeClient = postCodeClient;
        this.customerMapper = customerMapper;
        this.accountingServiceClient = accountingServiceClient;
        this.sabtAhvalSAHAPersonInfoMapper = sabtAhvalSAHAPersonInfoMapper;
        this.transportationClient = transportationClient;
        this.personTransportRepository = personTransportRepository;
        this.taServiceClient = taServiceClient;
        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.shahkarClient = shahkarClient;
    }

    /**
     * Save a person.
     *
     * @param personDTO the entity to save
     * @return the persisted entity
     */
    public void register(PersonDTO personDTO) {
        log.debug("Request to save Person : {}", personDTO);
        save(personDTO, true);
    }

    public void saveCreditAccount(PersonDTO personDTO) throws Exception {
        if (personDTO.getId() == null) {
            throw new Exception();
        }

        if (personDTO.getCreditAccount() == null || personDTO.getCreditAccount().isEmpty()) {
            throw new CustomParameterizedException("error.creditAccount.isEmpty");
        }

        Person person = personRepository.findOne(personDTO.getId());

        if (person.getInvalidData())
            throw new CustomParameterizedException("error.person.isInvalidData");


        person.setCreditAccount(personDTO.getCreditAccount());
        personRepository.save(person);
    }


    /**
     * Save a person.
     *
     * @param personDTO the entity to save
     * @return the persisted entity
     */
    public PersonDTO save(PersonDTO personDTO, boolean isRegister) {
        log.debug("Request to save Person : {}", personDTO);
        Person person = personMapper.toEntity(personDTO);


        if (isRegister) {
            person.setCountry(countryRepository.findFirstByCheckNationalCodeIsTrue());
            if (person.getPersonality().equals(Personality.NATURAL))
                person.setNationality(person.getCountry());

            personDTO.setCountryId(person.getCountry().getId());
        }


        if (!SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ROLE_ADMIN) && person.getPersonality().equals(Personality.NATURAL) &&
            !shahkarClient.isOwnershipMobile(person.getCellphone(), person.getCode())) {
            throw new CustomParameterizedException("error.inquiry.cell.phone.invalid");
        }

        if (!isRegister) {
            person.setLocations(locationService.getAccessLocation(person.getLocations()));
            if (personDTO.getId() == null)
                person.setStatus(VerifyStatus.ACTIVE);
        } else {
            personDTO.setStatus(VerifyStatus.PENDING);
            person.setStatus(VerifyStatus.PENDING);
            person.setPersonGroup(PersonGroup.NORMAL);
        }

        Person one;
        if (person.getId() != null) {
            one = personRepository.findOne(person.getId());

            if (!person.getPersonality().equals(one.getPersonality()))
                throw new CustomParameterizedException("error.personality.is.invalid");
            person.setCode(one.getCode());
            person.setStatus(one.getStatus());
        }

        if (person.getPersonality().equals(Personality.LEGAL)) {
            person.setFirstName(null);
            person.setFatherName(null);
            person.setLastName(null);
            person.setNationality(null);
        } else {
            person.setName(null);
            person.setRegisterNo(null);
            person.setEconomicCode(null);
        }

        Country country = countryRepository.findOne(personDTO.getCountryId());
        if (country.isCheckNationalCode()) {

            if (person.getPersonality().equals(Personality.LEGAL)) {
                if (isRegister) {
                    PersonDTO personInfo = findBaseInfo(personDTO);
                    person.setName(personInfo.getName());
                    person.setPostalCode(personInfo.getPostalCode());
                    try {
                        AddressDTO address = remoteService.findAddressByPostcode(person.getPostalCode());
                        person.setAddress(address.getAddress());
                    } catch (Exception e) {
                        person.setAddress(personInfo.getAddress());
                    }
                }
            } else {
                if (isRegister) {
                    PersonDTO personInfo = findBaseInfo(personDTO);
                    person.setFirstName(personInfo.getFirstName());
                    person.setLastName(personInfo.getLastName());
                    person.setFatherName(personInfo.getFatherName());
                    try {
                        AddressDTO address = remoteService.findAddressByPostcode(person.getPostalCode());
                        person.setAddress(address.getAddress());
                    } catch (WebServiceIOException e) {
                        e.printStackTrace();
                    }
                }
            }

        }
        if (person.getPersonGroup().equals(PersonGroup.CONTRACTOR)) {
            Location setad = locationRepository.findOne(1L);
            Set<Location> locations = new HashSet<>();
            locations.add(setad);
            person.setLocations(locations);
        }
        person = personRepository.saveAndFlush(person);
        if (!personDTO.getSalesCodes().isEmpty()) {
            Set<SalesCode> salesCodes = new HashSet<>();
            for (SalesCode salesCode : personDTO.getSalesCodes()) {
                salesCode.setPerson(person);
                salesCodes.add(salesCode);
            }
            salesCodeRepository.save(salesCodes);
        }

        Set<BankAccountDTO> bankAccounts = personDTO.getBankAccounts();
        if (bankAccounts != null && !bankAccounts.isEmpty()) {
            for (BankAccountDTO bankAccount : bankAccounts) {
                bankAccount.setPersonId(person.getId());
            }
            accountingServiceClient.createListBankAccount(bankAccounts);
        }


        if (personDTO.getCompanyId() != null) {
            StakeholderDTO s = stakeholderMapper.toDto(stakeholderRepository
                .findByCompany_IdAndPerson_Id(personDTO.getCompanyId(), person.getId()));
            if (s == null) s = new StakeholderDTO();
            s.setCompanyId(personDTO.getCompanyId());
            s.setPersonId(person.getId());
            s.setSharePercent(personDTO.getSharePercent());
            s.setStakeholderType(personDTO.getStakeholderType());
            stakeholderRepository.save(stakeholderMapper.toEntity(s));
        }

        if (isRegister) {
            createUserByPersonInfo(personDTO);
        }

        userDataAccessServiceAsync.refreshAccess();
        return personMapper.toDto(person);
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PersonListDTO> findAll(String query, Pageable pageable, boolean isTransport) {
        log.debug("Request to get all People");

        return personRepository.findAll(query, pageable, isTransport)
            .map(personMapper::toListDto);
    }

    /**
     * Get all the people selector.
     *
     * @param self
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PersonListDTO> findAllSelector(Boolean onlySellContractAirplane, Boolean self, String query, Pageable pageable) {
        log.debug("Request to get all People");

        return ((onlySellContractAirplane != null && onlySellContractAirplane) ?
            personRepository.findAllBySellContractAirplane(query, pageable)
            : personRepository.findAllSelector(self, query, pageable))
            .map(personMapper::toListDto);
    }

    /**
     * Get all the people.
     *
     * @param id
     * @param startDate
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<PersonApiDTO> findAllOrOne(Long id, Date startDate) {
        log.debug("Request to get all People");
        long l = System.currentTimeMillis();

        List<Person> allOrOne = personRepository.findAllOrOne(
            id, startDate, SecurityUtils.getCurrentUserLogin().get(),
            Personality.LEGAL, ZonedDateTime.now());
        long l1 = System.currentTimeMillis();
        log.debug("TINE (0):::::::::::::   " + String.valueOf(l1 - l));
        List<PersonApiDTO> personApiDTOS = personApiMapper.toDto(allOrOne);
        long l2 = System.currentTimeMillis();
        log.debug("TINE (1):::::::::::::   " + String.valueOf(l2 - l));

        personApiDTOS.forEach(personApiDTO -> {
            if (personApiDTO.getSellContracts() != null) {
                personApiDTO.getSellContracts().forEach(sellContractApiDTO -> {
                    if (sellContractApiDTO.getCustomers() != null) {
                        sellContractApiDTO.getCustomers().forEach(customerApiDTO -> {
                            if (customerApiDTO.getSellContractProducts() != null) {
                                customerApiDTO.getSellContractProducts().forEach(sellContractProductApiDTO -> {
                                    if (sellContractProductApiDTO.getDepots() != null) {
                                        sellContractProductApiDTO.getDepots().forEach(depotApiDTO -> {
                                            if (depotApiDTO.getRefuelCenterId() != null && depotApiDTO.getRefuelCenterId() != 0) {
                                                depotApiDTO.setRefuelCenterTitle(customerRepository.findRefuelCenterById(depotApiDTO.getRefuelCenterId()).getPersianTitle());
                                            }
                                        });
                                    }
                                    if (sellContractProductApiDTO.getCurrencies() != null) {
                                        sellContractProductApiDTO.getCurrencies().forEach(currencyApiDTO -> {
                                            currencyApiDTO.setTitle(customerRepository.findCurrencyById(currencyApiDTO.getId()).getTitle());
                                        });

                                    }
                                    if (sellContractProductApiDTO.getCostGroups() != null) {
                                        sellContractProductApiDTO.getCostGroups().forEach(costGroupApiDTO -> {
                                            costGroupApiDTO.setTitle(customerRepository.findCostGroupById(costGroupApiDTO.getId()).getTitle());
                                        });
                                    }
                                    if (sellContractProductApiDTO.getRateGroupId() != null) {
                                        sellContractProductApiDTO.setRateGroupTitle(customerRepository.findRateGroupById(sellContractProductApiDTO.getRateGroupId()).getTitle());
                                    }
                                    if (sellContractProductApiDTO.getCurrencyRateGroupId() != null) {
                                        sellContractProductApiDTO.setCurrencyRateGroupTitle(customerRepository.findCurrencyRateGroupById(sellContractProductApiDTO.getCurrencyRateGroupId()).getTitle());
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        long l3 = System.currentTimeMillis();
        log.debug("TINE (2):::::::::::::   " + String.valueOf(l3 - l));
        log.debug("TINE (3):::::::::::::   " + String.valueOf(l3 - l2));
        return personApiDTOS;
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PersonDTO> findAll(Long id, String query, Pageable pageable) {
        log.debug("Request to get all People");
        Page<PersonDTO> personDTOS;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder(Person.class, "person"), null);
            BooleanExpression eq = QPerson.person.stakeholders.any().company.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(eq) : eq;
            personDTOS = personRepository.findAll(booleanExpression, pageable)
                .map(personMapper::toDto);

        } else
            personDTOS = personRepository.findAllByCompany(id, pageable)
                .map(personMapper::toDto);

        personDTOS.forEach(personDTO -> {
            Stakeholder stakeholder = stakeholderRepository.findByCompany_IdAndPerson_Id(id, personDTO.getId());
            personDTO.setSharePercent(stakeholder.getSharePercent());
            personDTO.setCompanyId(id);
            personDTO.setStakeholderId(stakeholder.getId());
        });
        return personDTOS;
    }

    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PersonDTO findOne(Long id, Long companyId) {
        log.debug("Request to get Person : {}", id);
        Person person = personRepository.findOneWithEagerRelationships(id);
        PersonDTO personDTO = personMapper.toDto(person);
        if (companyId != null) {
            Stakeholder stakeholder = stakeholderRepository.findByCompany_IdAndPerson_Id(companyId, person.getId());
            personDTO.setCompanyId(stakeholder.getCompany().getId());
            personDTO.setSharePercent(stakeholder.getSharePercent());
            personDTO.setStakeholderType(stakeholder.getStakeholderType());
        }
        return personDTO;
    }

    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public String getPersonInfo(Long id) {
        log.debug("Request to get Person : {}", id);
        String result = "";
        return result;
    }

    /**
     * Get one person by id.
     *
     * @param username the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PersonListDTO findOneByUsername(String username) {
        log.debug("Request to get Person : {}", username);
        List<Person> personViews = personRepository.findAllByUsernameFetchPerson(username);
        if (personViews == null || personViews.size() != 1) return null;
        return personMapper.toListDto(personViews.get(0));
    }

    /**
     * Get one person by id.
     *
     * @param nationalCode
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PersonDTO findByNationalCode(String nationalCode) {
        log.debug("Request to get Person : {}", nationalCode);
        Person oneByCode = personRepository.findOneByCode(nationalCode);
        return personMapper.toDto(oneByCode);
    }

    /**
     * Get one person by id.
     *
     * @param nationalCode
     * @return the entity
     */
    @Transactional(readOnly = true)
    public SabtAhvalSAHAPersonInfoDTO findByFinderNationalCode(String nationalCode) {
        log.debug("Request to get Person : {}", nationalCode);
        SabtAhvalSAHAPersonInfo personInfo = naturalPersonInfoClient.getFullPersonInfo(nationalCode);
        return sabtAhvalSAHAPersonInfoMapper.toDto(personInfo);
    }

    /**
     * Get one person by id.
     *
     * @param personDTO
     * @return the entity
     */
    @Transactional(readOnly = true)
    public PersonDTO findBaseInfo(PersonDTO personDTO) {
        log.debug("Request to get Person : {}", personDTO);
        if (personDTO.getPersonality() == Personality.LEGAL) {
            try {
                PersonDTO personInfo = legalPersonInfoClient.getPersonInfo(personDTO.getCode());
                log.debug("api Person : {}", personInfo);

                if (!personInfo.getRegisterNo().equals(personDTO.getRegisterNo()) ||
                    !DateUtil.convertToPersianByFormat(personInfo.getBirthday(), "yyyyMMdd").equals(
                        DateUtil.convertToPersianByFormat(personDTO.getBirthday(), "yyyyMMdd")
                    ))
                    throw new CustomParameterizedException("error.person-legal-not-find");

                return personInfo;
            } catch (WebServiceIOException e) {
                e.printStackTrace();
                throw new CustomParameterizedException(e.getMessage());
            }
        } else {
            try {
                PersonDTO personInfo = naturalPersonInfoClient.getPersonInfo(personDTO.getCode());
                log.debug("api Person : {}", personInfo);


               /*  if(Objects.nonNull(personInfo.getIdCode()) && !personInfo.getIdCode().equals("") && !personInfo.getIdCode().equals(personDTO.getIdCode())){
                     throw new CustomParameterizedException("error.person-not-find");
                 }*/

                if (Objects.nonNull(personInfo.getBirthday())
                    && !DateUtil.convertToPersianByFormat(personInfo.getBirthday(),
                    "yyyyMMdd").equals(DateUtil.convertToPersianByFormat(personDTO.getBirthday(),
                    "yyyyMMdd"))) {

                    throw new CustomParameterizedException("error.person-not-find");
                }


                return personInfo;
            } catch (WebServiceIOException e) {
                e.printStackTrace();
                throw new CustomParameterizedException(e.getMessage());
            }
        }
    }

    /**
     * Delete the  person by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Person : {}", id);
        personRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public Page<CustomerCreditDTO> findAllCustomerCredit(Long id, String query, Pageable pageable) {
        log.debug("Request to get all CustomerCredits");
        Page<CustomerCredit> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CustomerCredit.class, "customerCredit"), null);
            BooleanExpression customerExpression = QCustomerCredit.customerCredit.person.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = customerCreditRepository.findAll(booleanExpression, pageable);
        } else {
            result = customerCreditRepository.findByPerson_Id(id, pageable);

        }
        return result.map(customerCreditMapper::toDto);
    }

    @Transactional(readOnly = true)
    public List<CustomerDTO> findAllCustomer(Long id) {
        log.debug("Request to get all Customers");
        List<Customer> result = customerRepository.findAllByPerson_Id(id);
        if (result.size() == 0) return new ArrayList<>();
        return result.stream().map(customerMapper::toListDto).collect(Collectors.toList());
    }

    public List<PersonDTO> getAllPersonByLocation(Long locationId, Long customerId) {
        return personMapper.toDto(
            personRepository.find(SecurityUtils.getCurrentUserLogin().get(), locationId, customerId, ZonedDateTime.now())
        );
    }


    public CustomerPersonDTO findCustomerPerson(Long sellContractId, Long personId, Long customerId) {
        List<CustomerPersonDTO> customerPerson = personRepository.findCustomerPerson(
            SecurityUtils.getCurrentUserLogin().get(),
            sellContractId,
            personId, customerId
        );
        return customerPerson.size() > 0 ? customerPerson.get(0) : null;
    }

    public Page<CustomerPersonDTO> getAllPersonCustomerByLocation(Long locationId, CustomerPersonDTO query, Pageable pageable) {
        if (query.getOrderType() == null) query.setOrderType(OrderType.ORDER);
        Set<ContractType> contractTypes = ContractType.getContractTypes(query.getOrderType());
        Map<String, String> sortMapper = new HashMap<String, String>() {{
            put("fullName", "p.fullName");
            put("personCode", "p.code");
            put("rateGroupTitle", "r.title");
            put("customerName", "c.name");
            put("customerCode", "c.identifyCode");
            put("contractNo", "contractNo");
        }};

        ArrayList<Sort.Order> orders = new ArrayList<>();
        pageable.getSort().iterator().forEachRemaining(order -> {
            if (sortMapper.containsKey(order.getProperty()))
                orders.add(new Sort.Order(
                    order.getDirection(), sortMapper.get(order.getProperty())
                ));
        });

        Sort sort = new Sort(orders);
        PageRequest pageRequest = new PageRequest(pageable.getPageNumber(), pageable.getPageSize(), sort);

        List<TypeOfFuelReceipt> typeOfFuelReceipts = new ArrayList<>();

        if (query.getOrderType().equals(OrderType.AIRPLANE)) {
            typeOfFuelReceipts.add(TypeOfFuelReceipt.UNIT_TO_AIRPLANE);
            typeOfFuelReceipts.add(TypeOfFuelReceipt.UNIT_TO_CUSTOMERS);
        } else if (query.getOrderType().equals(OrderType.REFUEL_CENTER)) {
            typeOfFuelReceipts.add(TypeOfFuelReceipt.PIPE_LINE_SALES);
            typeOfFuelReceipts.add(TypeOfFuelReceipt.TANKER_SALES);
        } else typeOfFuelReceipts.add(TypeOfFuelReceipt.UNIT_TO_AIRPLANE);
        if (query.getOrderType().equals(OrderType.AIRPLANE)) {
            return personRepository.findCustomerPersonAirplane(
                SecurityUtils.getCurrentUserLogin().get(),
                locationId,
                ZonedDateTime.now(),
                contractTypes,
                query.getCustomerName(),
                query.getCustomerCode(),
                query.getCustomerGroup(),
                query.getPersonName(),
                query.getPersonCode(),
                query.getCustomerId(),
                query.getContractNo(),
                typeOfFuelReceipts,
                pageRequest
            );
        } else {
            return personRepository.findCustomerPersonAirplane(
                SecurityUtils.getCurrentUserLogin().get(),
                locationId,
                ZonedDateTime.now(),
                contractTypes,
                query.getCustomerName(),
                query.getCustomerCode(),
                query.getCustomerGroup(),
                query.getPersonName(),
                query.getPersonCode(),
                query.getCustomerId(),
                query.getContractNo(),
                typeOfFuelReceipts,
                pageRequest
            );
        }
    }

    public void active(Long id) {
        Person person = personRepository.findOne(id);
        if (person.getInvalidData())
            throw new CustomParameterizedException("error.person.isInvalidData");

        if (person.getStatus() != VerifyStatus.ACTIVE) {
            person.setStatus(VerifyStatus.ACTIVE);

            if (person.getUsername() != null && uaaServiceClient.existUserByLogin(person.getUsername())) {
                person.getLocations().forEach(location -> {
                    UserDataAccessDTO dataAccessDTO = new UserDataAccessDTO();
                    List<UserDataAccess> userDataAccesses = userDataAccessRepository.findAllByUsername(person.getUsername());
                    if (userDataAccesses != null && userDataAccesses.size() > 0) {
                        userDataAccessRepository.delete(userDataAccesses);
                        userDataAccessRepository.flush();
                    }
                    dataAccessDTO.setLocationId(location.getId());
                    dataAccessDTO.setPersonId(id);
                    dataAccessDTO.setUsername(person.getUsername());
                    userDataAccessService.save(dataAccessDTO);
                });
                uaaServiceClient.activeUser(person.getUsername());
            }
            personRepository.save(person);
        } else throw new CustomParameterizedException("error.person.status.notMatch");
    }

    public void deActive(Long id) {
        Person person = personRepository.findOne(id);
        if (person.getInvalidData())
            throw new CustomParameterizedException("error.person.isInvalidData");

        if (person.getStatus() == VerifyStatus.ACTIVE) {
            person.setStatus(VerifyStatus.DEACTIVE);
            personRepository.save(person);
        } else throw new CustomParameterizedException("error.person.status.notMatch");
    }

    public void reject(Long id) {
        Person person = personRepository.findOne(id);
        if (person.getInvalidData())
            throw new CustomParameterizedException("error.person.isInvalidData");

        if (person.getStatus() == VerifyStatus.PENDING) {
            person.setStatus(VerifyStatus.REJECT);
            personRepository.save(person);
        } else throw new CustomParameterizedException("error.person.status.notMatch");
    }

    public PersonCustomDTO findForFactor(Long id) {
        List<PersonCustomDTO> persons = personRepository.findPersonForFactor(id);
        return (!persons.isEmpty() ? persons.get(0) : new PersonCustomDTO());
    }

    public Boolean existByNationalCode(String nationalCode) {
        return personRepository.existsByCode(nationalCode);
    }

    /* private List<Customer> getCustomersByOldCustomers(List<OldCustomerDTO> list) {
         List<Customer> result = new ArrayList<>();
         for (OldCustomerDTO o : list) {
             Customer customer1 = customerRepository.findFirstByOrderByGsIdDesc();
             String code = customer1 == null ? null : customer1.getGsId();
             if (code == null)
                 code = "1000000000";
             else {
                 code = (Long.parseLong(code) + 1) + "";
             }
             Customer c = new Customer();
             c.setName(o.getCustomerName());
             c.setAddress(o.getAddress());
             c.setGsId(String.valueOf(o.getGsId()));
             c.setIdentifyCode(o.getCode());
             c.setGsId(code);
             c.setRegisterCode((o.getRegisterNo() != null && !o.getRegisterNo().equals("")) ? o.getRegisterNo() : null);
             c.setSalesPermit(true);
             c.setTelephone(o.getPhone());
             c.setPostalCode(o.getPostCode());
             c.setBuyOneToMany(Boolean.valueOf(o.getIsOneToMany()));
             c.setRegisterDate(ZonedDateTime.now());
             c.getLocations().add(locationRepository.findFirstByCode(o.getLocationCode()));
             c.setType(customerTypeRepository.findFirstByCode(String.valueOf(o.getCustomerTypeCode())));
             result.add(c);
         }
         return result;
     }
 */
    public PersonDTO createUser(PersonDTO personDTO) {
        Person person = personRepository.findOne(personDTO.getId());

        if (person.getUsername() == null || person.getUsername().isEmpty()) {
            person.setUsername(personDTO.getUsername());
            createUserByPersonInfo(personDTO);
        } else
            updateUserByPersonInfo(personDTO);

        person.setEmail(personDTO.getEmail());
        Person person1 = personRepository.save(person);
        if (person1.getStatus().equals(VerifyStatus.ACTIVE))
            userDataAccessServiceAsync.refreshAccess();
        return personMapper.toDto(person1);
    }

    private UserDTO createUserByPersonInfo(PersonDTO personDTO) {
        UserDTO userDTO = new UserDTO();

        if (personDTO.getUsername() != null && personDTO.getPassword() != null && personDTO.getConfirmPassword() != null) {
            if (personDTO.getPassword().equals(personDTO.getConfirmPassword())) {
                userDTO.setLogin(personDTO.getUsername());

                userDTO.setEmail(personDTO.getEmail());
                userDTO.setLangKey("fa");
                if (personDTO.getPersonality() == Personality.LEGAL) {
                    userDTO.setFirstName(personDTO.getName());
                    userDTO.setLastName(null);
                } else {
                    userDTO.setFirstName(personDTO.getFirstName());
                    userDTO.setLastName(personDTO.getLastName());
                }
                userDTO.setUserType(UserType.PERSON);
                userDTO.setPassword(personDTO.getPassword());
                userDTO.setActivated(personDTO.getStatus() == VerifyStatus.ACTIVE);
                userDTO.setCellPhone(personDTO.getCellphone());
                userDTO.setFirstName(personDTO.getFirstName());
                userDTO.setLastName(personDTO.getLastName());
                userDTO.setFatherName(personDTO.getFatherName());
                userDTO.setNationalCode(personDTO.getCode());
                userDTO.setIdCode(personDTO.getIdCode());
                userDTO.setBirthday(personDTO.getBirthday());
                userDTO = uaaServiceClient.createUser(userDTO);
                return userDTO;
            } else {
                throw new CustomParameterizedException("error.password.not.match");
            }
        }
        return null;
    }

    private UserDTO updateUserByPersonInfo(PersonDTO personDTO) {
        UserDTO userDTO = new UserDTO();

        if (personDTO.getUsername() != null && personDTO.getPassword() != null && personDTO.getConfirmPassword() != null) {
            if (personDTO.getPassword().equals(personDTO.getConfirmPassword())) {
                userDTO.setLogin(personDTO.getUsername());

                userDTO.setEmail(personDTO.getEmail());
                userDTO.setPassword(personDTO.getPassword());
                userDTO.setCellPhone(personDTO.getCellphone());
                userDTO = uaaServiceClient.updatePersonUser(userDTO);
                return userDTO;
            } else {
                throw new CustomParameterizedException("error.password.not.match");
            }
        }
        return null;
    }

    public PersonDTO updateUserPerson(PersonDTO personDTO) {
        Person person = personRepository.findOne(personDTO.getId());
        Person newPerson = personMapper.toEntity(personDTO);
        person.setTelephone(newPerson.getTelephone());
        person.setCellphone(newPerson.getCellphone());

        person.setEmail(newPerson.getEmail());
        UserDTO user = new UserDTO();
        user.setLogin(person.getUsername());
        user.setEmail(person.getEmail());
        user.setFirstName(person.getFirstName());
        user.setLastName(person.getLastName());
        user.setCellPhone(person.getCellphone());
        user.setNationalCode(person.getCode());

        uaaServiceClient.updateUserPerson(user);

        person.setLocations(newPerson.getLocations());
        person.setRegion(newPerson.getRegion());


        if (!person.getPostalCode().equals(newPerson.getPostalCode())) {
            person.setPostalCode(newPerson.getPostalCode());
            Country country = person.getCountry();
            if (country.isCheckNationalCode()) {
                try {
                    if (person.getPersonality().equals(Personality.LEGAL)) {
                        PersonDTO personInfo = findBaseInfo(personDTO);
                        person.setName(personInfo.getName());
                        person.setPostalCode(personInfo.getPostalCode());
                        try {
                            AddressDTO address = remoteService.findAddressByPostcode(personInfo.getPostalCode());
                            person.setAddress(address.getAddress());
                        } catch (Exception e) {
                            person.setAddress(personInfo.getAddress());
                        }
                    } else {
                        PersonDTO personInfo = findBaseInfo(personDTO);
                        person.setFirstName(personInfo.getFirstName());
                        person.setLastName(personInfo.getLastName());
                        person.setFatherName(personInfo.getFatherName());
                        try {
                            AddressDTO address = remoteService.findAddressByPostcode(personInfo.getPostalCode());
                            person.setAddress(address.getAddress());
                        } catch (WebServiceIOException e) {
                        }
                    }
                } catch (Exception ignored) {
                }
            }
        }

        Set<BankAccountDTO> bankAccounts = personDTO.getBankAccounts();
        if (bankAccounts != null && !bankAccounts.isEmpty()) {
            for (BankAccountDTO bankAccount : bankAccounts) {
                bankAccount.setPersonId(person.getId());
            }
        }
        accountingServiceClient.createListBankAccount(bankAccounts);

        return personMapper.toDto(personRepository.save(person));
    }

    public void getPersonFromTransportation() {
        List<DataComplexTypeGetDataNavganPymanSell> persons = transportationClient.getPersonFromTransportation();
        Location setad = locationRepository.findOneByLocationParentIsNull();
        Country iran = countryRepository.findFirstByCheckNationalCodeIsTrue();
        List<Person> people = new ArrayList<>();
        List<PersonTransport> personTransports = new ArrayList<>();
        persons.stream()
            .filter(p -> p.getFTypeID() != null && !p.getFTypeID().isEmpty())
            .forEach(p -> {
                try {
                    PersonTransport personTransport = personTransportRepository.findOneByCode(p.getContractId());
                    Person person = (personTransport == null) ? new Person() : personTransport.getPerson();

                    person.setPersonality(p.getFTypeID().equals("1") ? Personality.NATURAL : Personality.LEGAL);
                    if (person.getPersonality() == Personality.LEGAL) {
                        person.setCode((p.getNationalCode() == null || p.getNationalCode().isEmpty()) ? p.getMeliCode() : p.getNationalCode());
                        person.setName(LocalizationUtil.normalizePersianCharacters(p.getLastName()));
                        person.setEconomicCode(p.getEconomicCode().length() > 12 ?
                            LocalizationUtil.normalizePersianCharacters(p.getEconomicCode().substring(0, 12)) :
                            LocalizationUtil.normalizePersianCharacters(p.getEconomicCode()));
                        person.setRegisterNo(LocalizationUtil.normalizePersianCharacters(p.getParvaneNo()));
                        person.setCountry(iran);
                    } else {
                        person.setCode(LocalizationUtil.normalizePersianCharacters(p.getMeliCode()));
                        person.setFirstName(LocalizationUtil.normalizePersianCharacters(p.getName()));
                        person.setLastName(LocalizationUtil.normalizePersianCharacters(p.getLastName()));
                        person.setNationality(iran);
                        person.setCountry(iran);
                    }

                    person.setStatus(VerifyStatus.ACTIVE);
                    person.setTelephone(LocalizationUtil.normalizePersianCharacters((p.getTelephon())));
                    person.setCellphone(LocalizationUtil.normalizePersianCharacters(p.getMobile()));
                    person.setAddress(LocalizationUtil.normalizePersianCharacters(p.getAddress()));
                    person.setPersonGroup(PersonGroup.CONTRACTOR);
                    person.setLocations(new HashSet<Location>() {{
                        add(setad);
                    }});

                    if (personTransport == null)
                        personTransport = new PersonTransport();

                    personTransport.setPerson(person);
                    personTransport.setCode(p.getContractId());

                    personTransports.add(personTransport);
                    people.add(person);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        personRepository.save(people);
        personTransportRepository.save(personTransports);

    }

    public IdCodeLocationDTO getCodeLocation(Long personId) {

        IdCodeLocationDTO idCodeLocationDTO = new IdCodeLocationDTO();
        idCodeLocationDTO.setId(personId);
        Person person = personRepository.findOne(personId);
        idCodeLocationDTO.setCode(person.getCode());
        Set<Location> customerLocations = person.getLocations();
        String locationCode;
        locationCode = locationService.getStateLocationCode(customerLocations);
        idCodeLocationDTO.setLocationCode(locationCode);
        return idCodeLocationDTO;

    }

    public Page<PersonDTO> findAllByPersonGroup(String query, PersonGroup personGroup, Pageable pageable) {
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder(Person.class, "person"), null);
            booleanExpression = booleanExpression.and(QPerson.person.personGroup.eq(personGroup));
            return personRepository.findAll(booleanExpression, pageable).map(personMapper::toDto);
        } else {
            return personRepository.findAllByPersonGroup(personGroup, pageable).map(personMapper::toDto);
        }
    }


    public void updateFromExcel(MultipartFile file) {
        JAXBContext jaxbContext;
        try {
            jaxbContext = JAXBContext.newInstance(ContractItem.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            ContractItem contractItem = (ContractItem) jaxbUnmarshaller.unmarshal(file.getInputStream());
            List<Person> people = new ArrayList<>();
            Country country = countryRepository.findFirstByCheckNationalCodeIsTrue();
            for (NewContract newContract : contractItem.getNewContract()) {
                Person person = personRepository.findOneByCode(newContract.getCtcCode());
                if (person == null) {
                    person = new Person();
                    person.setCode(newContract.getCtcCode());
                }
                person.setName(newContract.getCtcTit());
                person.setFirstName(newContract.getCtcNam());
                person.setLastName(newContract.getCtcFam());
                person.setCellphone(newContract.getCtcMobNo());
                person.setTelephone(newContract.getCtcPhoNo());
                person.setAddress(newContract.getCtcAds());
                person.setPersonGroup(PersonGroup.CONTRACTOR);
                person.setCountry(country);
                person.setPersonality(Personality.LEGAL);
                person.setStatus(VerifyStatus.ACTIVE);
                person.setEconomicCode(newContract.getCtcEcoCod());
                Location setad = locationRepository.findOne(1L);
                Set<Location> locations = new HashSet<>();
                locations.add(setad);
                person.setLocations(locations);
                people.add(person);
            }
            personRepository.save(people);
            personRepository.flush();
            userDataAccessServiceAsync.refreshAccess();
        } catch (JAXBException | IOException e) {
            e.printStackTrace();
        }
    }

    public PersonDTO findByCode(String code) {
        return personMapper.toDto(personRepository.findFirstByCode(code));
    }


}
