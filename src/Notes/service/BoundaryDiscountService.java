package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.domain.enumeration.VehicleModelType;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.service.dto.BoundaryDiscountDTO;
import ir.donyapardaz.niopdc.base.service.dto.CountryDTO;
import ir.donyapardaz.niopdc.base.service.dto.InquiryCmrDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.BoundaryDiscountMapper;
import ir.donyapardaz.niopdc.base.service.mapper.CountryMapper;
import ir.donyapardaz.niopdc.base.service.mapper.LocationMapper;
import ir.donyapardaz.niopdc.base.service.remote.cmr.inquiry.InquiryServiceStub;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.apache.axis2.transport.http.HTTPConstants;
import org.datacontract.schemas._2004._07.cmr_web_services_dto.*;
import org.datacontract.schemas._2004._07.cmr_web_services_dto.Driver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.tempuri.GetCMRCategoryByReferenceNoDocument;
import org.tempuri.GetCMRCategoryByReferenceNoResponseDocument;

import javax.xml.rpc.ServiceException;
import java.rmi.RemoteException;
import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 * Service Implementation for managing BoundaryDiscount.
 */
@Transactional
@Service
public class BoundaryDiscountService {

    private final Logger log = LoggerFactory.getLogger(BoundaryDiscountService.class);

    private final BoundaryDiscountRepository boundaryDiscountRepository;

    private final BoundaryDiscountMapper boundaryDiscountMapper;

    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;
    private final CustomerRepository customerRepository;
    private final OrderServiceClient orderServiceClient;
    private final CmrLogRepository cmrLogRepository;

    public BoundaryDiscountService(BoundaryDiscountRepository boundaryDiscountRepository, BoundaryDiscountMapper boundaryDiscountMapper, LocationRepository locationRepository, LocationMapper locationMapper, CountryRepository countryRepository, CountryMapper countryMapper, CustomerRepository customerRepository, OrderServiceClient orderServiceClient, CmrLogRepository cmrLogRepository) {
        this.boundaryDiscountRepository = boundaryDiscountRepository;
        this.boundaryDiscountMapper = boundaryDiscountMapper;
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
        this.customerRepository = customerRepository;
        this.orderServiceClient = orderServiceClient;
        this.cmrLogRepository = cmrLogRepository;
    }

    /**
     * Save a boundaryDiscount.
     *
     * @param boundaryDiscountDTO the entity to save
     * @return the persisted entity
     */
    @Transactional
    public BoundaryDiscountDTO save(BoundaryDiscountDTO boundaryDiscountDTO) {
        log.debug("Request to save BoundaryDiscount : {}", boundaryDiscountDTO);
        BoundaryDiscount boundaryDiscount = boundaryDiscountMapper.toEntity(boundaryDiscountDTO);
        CountryDTO countryDTO = boundaryDiscountDTO.getCountry();
        if (countryDTO != null)
            boundaryDiscount.setCountry(countryRepository.findOne(countryDTO.getId()));

        //todo setTransitHourLimit
        if (boundaryDiscount.getCountry() == null) {
            boundaryDiscount.setTransitHourLimit(72L);
        } else
            boundaryDiscount.setTransitHourLimit(24L);

        BoundaryDiscountDTO discount = boundaryDiscountMapper.toDto(boundaryDiscountRepository.findByLocationAndCountryAndVehicleModelTypeAndDate(boundaryDiscountDTO.getLocation() == null ? null : boundaryDiscountDTO.getLocation().getId(), boundaryDiscountDTO.getCountry() == null ? null : boundaryDiscountDTO.getCountry().getId(), boundaryDiscountDTO.getVehicleModelType(), ZonedDateTime.now()));

        if ((discount != null && discount.getId() > 0) && boundaryDiscountDTO.getId() == null) {
            throw new CustomParameterizedException("error.discountIsExist");
        }
        boundaryDiscount = boundaryDiscountRepository.save(boundaryDiscount);
        return boundaryDiscountMapper.toDto(boundaryDiscount);
    }

    /**
     * Get all the boundaryDiscounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<BoundaryDiscountDTO> findAll(String location, String country, String vehicleModelType, String liter, Pageable pageable) {
        log.debug("Request to get all BoundaryDiscounts");
        Page<BoundaryDiscountDTO> result;
        result = boundaryDiscountRepository.findAll(location, country, vehicleModelType, liter, pageable);
        return result;
    }

    /**
     * Get one boundaryDiscount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public BoundaryDiscountDTO findOne(Long id) throws ServiceException, RemoteException {
        log.debug("Request to get BoundaryDiscount : {}", id);
        BoundaryDiscount boundaryDiscount = boundaryDiscountRepository.findOne(id);

        return boundaryDiscountMapper.toDto(boundaryDiscount);
    }

    /**
     * Delete the boundaryDiscount by id.
     *
     * @param id the id of the entity
     */
    @Transactional
    public void delete(Long id) {
        log.debug("Request to delete BoundaryDiscount : {}", id);
        boundaryDiscountRepository.delete(id);
    }

    @Transactional(readOnly = true)
    CmrLog findCmrLog(String cmr, Long orderLocationId, Long customerId) {
        List<CmrLog> cmrLogList = cmrLogRepository.findOneBy(cmr, orderLocationId, customerId, ZonedDateTime.now().minusMinutes(30).toInstant());
        if (cmrLogList.size() == 0) return null;
        return cmrLogList.get(0);
    }


    @Transactional(noRollbackFor = {CustomParameterizedException.class})
    public InquiryCmrDTO inquiryCmr(Long orderLocationId, Long customerId, String cmr, VehicleModelType vehicleModelType) {
        InquiryCmrDTO result;

        try {

            CmrLog cmrLog = null;
            if (vehicleModelType != null && vehicleModelType.equals(VehicleModelType.TRUCK)) {

                cmrLog = findCmrLog(cmr, orderLocationId, customerId);

                if (cmrLog == null) {

                    GetCMRCategoryByReferenceNoDocument document = GetCMRCategoryByReferenceNoDocument.Factory.newInstance();

                    GetCMRCategoryByReferenceNoDocument.GetCMRCategoryByReferenceNo getCMRCategoryByReferenceNo = document.addNewGetCMRCategoryByReferenceNo();
                    getCMRCategoryByReferenceNo.setReferenceNo(cmr);
                    getCMRCategoryByReferenceNo.setIncludeAllCMRs(true);

                    InquiryServiceStub inquiryServiceStub = new InquiryServiceStub();
                    inquiryServiceStub._getServiceClient().getOptions().setProperty(HTTPConstants.CONNECTION_TIMEOUT, 30000);
                    long t0 = System.currentTimeMillis();
                    GetCMRCategoryByReferenceNoResponseDocument inquiry = inquiryServiceStub.getCMRCategoryByReferenceNo(document);
                    long t1 = System.currentTimeMillis();
                    log.info("CMR {" + cmr + "} Time(s):" + ((t1 - t0) / 1000));

                    Message cmrCategoryByReferenceNo = inquiry.getGetCMRCategoryByReferenceNoResponse().getGetCMRCategoryByReferenceNoResult();

                    if (cmrCategoryByReferenceNo instanceof InquiryResultMessage) {


                        Set<Long> destinationCountryCodes = new HashSet<>();
                        Set<Long> sourceCountryCodes = new HashSet<>();

                        cmrLog = new CmrLog();
                        cmrLog.setOrderLocationId(orderLocationId);
                        cmrLog.setCustomerId(customerId);
                        cmrLog.setCmr(cmr);

                        CMRCategory cmrCategory = ((InquiryResultMessage) cmrCategoryByReferenceNo).getCMRCategory();
                        // بررسی صحت اطلاعات اولیه بارنامه
                        if (cmrCategory == null ||
                            cmrCategory.getCMRList() == null ||
                            cmrCategory.getCMRList().sizeOfCMRArray() == 0 ||
                            cmrCategory.getCMRList().isNilCMRArray(0) ||
                            cmrCategory.getFKOutputBorderID() == 0 ||
                            cmrCategory.getTruck() == null
                        ) throw new CustomParameterizedException("error.cmrNotFind");


                        cmrLog.setLocationRmtoCode((long) cmrCategory.getFKOutputBorderID());
                        cmrLog.setIranian(cmrCategory.getTruck().getIsIranian());
                        cmrLog.setTransitNo(cmrCategory.getTruck().getTransitNo());
                        cmrLog.setTruckNo(cmrCategory.getTruck().getTruckNo());

                        Driver driver = cmrCategory.getDriver();

                        if (driver != null) {
                            cmrLog.setDriverFirstName(driver.getNameP());
                            cmrLog.setDriverLastName(driver.getLastNameP());
                        }


                        for (CMR inCmr : cmrCategory.getCMRList().getCMRArray()) {

                            cmrLog.setIssueDate(inCmr.getIssueDate().toInstant());
                            //set source country code
                            if (inCmr.getPlaceOfLoading().isNil()) {
                                sourceCountryCodes.add(-1L);
                            } else {
                                sourceCountryCodes.add((long) inCmr.getPlaceOfLoading().getFKCountryID());
                            }

                            // set destination country code
                            if (inCmr.getPlaceOfDischarge().isNil()) {
                                destinationCountryCodes.add(-1L);
                            } else {
                                destinationCountryCodes.add((long) inCmr.getPlaceOfDischarge().getFKCountryID());
                            }
                        }

                        cmrLog.setDestinationCountryCodes(destinationCountryCodes);
                        cmrLog.setSourceCountryCodes(sourceCountryCodes);


                    } else if (cmrCategoryByReferenceNo instanceof ErrorMessage) {
                        throw new CustomParameterizedException("error.cmrIsInvalid");
                    }
                }

            }


            result = checkDiscount(orderLocationId, customerId, cmrLog);
            return result;
        } catch (CustomParameterizedException e2) {
            throw e2;
        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomParameterizedException("error.cmrServiceNoAccess");
        }

    }

    @Transactional(noRollbackFor = {CustomParameterizedException.class})
    InquiryCmrDTO checkDiscount(Long orderLocationId, Long customerId, CmrLog cmrLog) {
        InquiryCmrDTO result = new InquiryCmrDTO();
        Customer customer = customerRepository.findOneWithEagerRelationships(customerId);

        if (cmrLog != null) {

            if (cmrLog.getId() == null)
                cmrLogRepository.save(cmrLog);


            if (cmrLog.getIssueDate().isBefore(ZonedDateTime.now().minusDays(14).toInstant())) {
                throw new CustomParameterizedException("error.cmrExp");
            }

            result.setDriverFirstName(cmrLog.getDriverFirstName());
            result.setDriverLastName(cmrLog.getDriverLastName());
            // یافتن مرز خروجی بارنامه
            Location cmrLocation = locationRepository.findFirstByRmtoCode(Long.toString(cmrLog.getLocationRmtoCode()));

            if (cmrLocation == null || !cmrLocation.getId().equals(orderLocationId)) {
                throw new CustomParameterizedException("error.cmrLocationHasConflict");
            }

            // یافتن اطلاعات مشتری در صورتی که خارجی باشد به آن معافیت تعلق نمی گیرد
            customer = customerRepository.findOneWithEagerRelationships(customerId);

            if (!cmrLog.getIranian()) {
                String transitNo = cmrLog.getTransitNo();
                cmrLog.setTransitNo(transitNo);
                if (transitNo.length() > 6)
                    transitNo = transitNo.substring(0, 6);

                String plaque = customer.getPlaque();
                if (plaque != null && plaque.length() > 6)
                    plaque = plaque.substring(0, 6);

                String plaqueTwo = customer.getPlaqueTwo();
                if (plaqueTwo != null && plaqueTwo.length() > 6)
                    plaqueTwo = plaqueTwo.substring(0, 6);

                if ((plaque == null || !plaque.toLowerCase().equals(transitNo.toLowerCase())) &&
                    (plaqueTwo == null || !plaqueTwo.toLowerCase().equals(transitNo.toLowerCase()))) {

                    HashMap<String, Object> transitNo1 = new HashMap<>();
                    transitNo1.put("transitNo", transitNo);

                    throw new CustomParameterizedException("error.cmrPlaqueIsNotFind", transitNo1);
                }

                BoundaryDiscountDTO defaultDTO = new BoundaryDiscountDTO();
                defaultDTO.setLiter(0L);
                result.setBoundaryDiscount(defaultDTO);
                result.setCountry(countryMapper.toDto(cmrLocation.getCountry()));
                return result;
            }


            //check customer type in system
            if (customer.getType() == null) {
                throw new CustomParameterizedException("error.customerTypeIsnull");
            }

            if (customer.getType().isIranian() == null || !customer.getType().isIranian()) {
                throw new CustomParameterizedException("error.customerTypeIsNotIranianFixIt");
            }

            //ايران 91 466ع39
            // هماهنگ کردن شماره پلاک بانامه به فرمت سیستم
            String truckNo = cmrLog.getTruckNo();

            try {
                truckNo = truckNo.substring(13, 15) + truckNo.substring(12, 13) + truckNo.substring(9, 12) + truckNo.substring(6, 8);
            } catch (NullPointerException | StringIndexOutOfBoundsException e) {
                throw new CustomParameterizedException("error.cmrPlaqueIsNotFind", truckNo);
            }

            // بررسی صحت پلاک خودرو
            if ((customer.getPlaque() == null || !customer.getPlaque().toLowerCase().trim().equals(truckNo.toLowerCase())) &&
                (customer.getPlaqueTwo() == null || !customer.getPlaqueTwo().toLowerCase().trim().equals(truckNo.toLowerCase()))) {

                throw new CustomParameterizedException("error.cmrPlaqueIsNotFind", truckNo);
            }


            for (Long destinationCountyCode : cmrLog.getDestinationCountryCodes()) {
                // در صورتی که کشور مقصد بانامه خالی باشد معتبر نمی باشد
                if (destinationCountyCode < 1) {
                    throw new CustomParameterizedException("error.destinationLocationIsNull");
                }


                result.setDestinationCountryCode(destinationCountyCode);

                Country destinationCountry = countryRepository.findByRmtoCode(Long.toString(destinationCountyCode));

                if (destinationCountry == null) {
                    throw new CustomParameterizedException("error.destinationCountryCodeNotFount");
                }

                if (destinationCountry.isCheckNationalCode())
                    throw new CustomParameterizedException("error.iran.cannot.be.destination");

                result.setCountry(countryMapper.toDto(destinationCountry));

                Set<BoundaryDiscount> discounts = boundaryDiscountRepository
                    .findBoundaryDiscount(cmrLocation.getId(), (destinationCountry.getNeighbor() != null && destinationCountry.getNeighbor()) ? destinationCountry.getId() : null, customer.getType().getVehicleModelType(), ZonedDateTime.now());

                if (discounts.isEmpty()) continue;

                BoundaryDiscount boundaryDiscount = null;
                while (discounts.iterator().hasNext()) {
                    boundaryDiscount = discounts.iterator().next();


                    if (boundaryDiscount.getLocation() != null && !boundaryDiscount.getLocation().getId().equals(orderLocationId))
                        continue;
                    break;
                }


                if (boundaryDiscount == null) continue;

                result.setBoundaryDiscount(boundaryDiscountMapper.toDto(boundaryDiscount));


                if (result.getBoundaryDiscount() != null && result.getBoundaryDiscount().getLiter() < boundaryDiscount.getLiter()) {
                    result.setBoundaryDiscount(boundaryDiscountMapper.toDto(boundaryDiscount));
                    result.setCountry(countryMapper.toDto(destinationCountry));
                }
            }


            if (result.getBoundaryDiscount() != null) {
                ZonedDateTime date = ZonedDateTime.now().minusHours(result.getBoundaryDiscount().getTransitHourLimit());
                Boolean existOrder = orderServiceClient.existOrderAfterDateForCustomer(date.toEpochSecond(), customerId);
                if (existOrder) {
                    /* throw new CustomParameterizedException("error.existOrderAfterDateForCustomer");*/
                    BoundaryDiscountDTO defaultDTO = new BoundaryDiscountDTO();
                    defaultDTO.setLiter(0L);
                    defaultDTO.setMessage("error.existOrderAfterDateForCustomer");
                    defaultDTO.setTransitHourLimit(result.getBoundaryDiscount().getTransitHourLimit());
                    result.setBoundaryDiscount(defaultDTO);
                }
            }

            if (result.getBoundaryDiscount() == null) {
                BoundaryDiscountDTO defaultDTO = new BoundaryDiscountDTO();
                defaultDTO.setLiter(0L);
                defaultDTO.setMessage("error.dontFoundDiscount");
                result.setBoundaryDiscount(defaultDTO);
            }


            return result;

        } else {
            Location orderLocation = locationRepository.findOne(orderLocationId);
            Country country = orderLocation.getCountry();

            if (customer.getType() == null) {

                throw new CustomParameterizedException("error.customerTypeIsnull");
            }

            if (customer.getType().getVehicleModelType() == null) {
                throw new CustomParameterizedException("error.vehicleModeTypeIsnull");
            }


            if (!customer.getType().getVehicleModelType().equals(VehicleModelType.BUS)) {
                throw new CustomParameterizedException("vehicleModelTypeIsNotBUS");
            }


            if (customer.getType().isIranian() != null && customer.getType().isIranian()) {

                Set<BoundaryDiscount> discounts = boundaryDiscountRepository
                    .findBoundaryDiscount(orderLocation.getId(), country.getId(), customer.getType().getVehicleModelType(), ZonedDateTime.now());

                if (discounts != null && discounts.iterator().hasNext()) {
                    BoundaryDiscount boundaryDiscount = discounts.iterator().next();

                    while (discounts.iterator().hasNext()) {
                        BoundaryDiscount discount = discounts.iterator().next();
                        if (discount.getLiter() > boundaryDiscount.getLiter())
                            boundaryDiscount = discount;
                    }

                    result.setBoundaryDiscount(boundaryDiscountMapper.toDto(boundaryDiscount));
                    result.setCountry(countryMapper.toDto(country));
                    return result;
                }
            }
            if (result.getBoundaryDiscount() == null || result.getBoundaryDiscount().getLiter() == 0) {
                BoundaryDiscountDTO defaultDTO = new BoundaryDiscountDTO();
                defaultDTO.setLiter(0L);
                result.setBoundaryDiscount(defaultDTO);
                result.setCountry(countryMapper.toDto(country));
                return result;
            }


        }
        return new InquiryCmrDTO();
    }
}
