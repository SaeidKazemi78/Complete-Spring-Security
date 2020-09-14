package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.QShiftWork;
import ir.donyapardaz.niopdc.base.domain.ShiftWork;
import ir.donyapardaz.niopdc.base.domain.enumeration.ShiftWorkRefuelCenterType;
import ir.donyapardaz.niopdc.base.repository.ShiftWorkRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ShiftWorkDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.OrderServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.ShiftWorkMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.ZonedDateTime;


/**
 * Service Implementation for managing ShiftWork.
 */
@Service
@Transactional
public class ShiftWorkService {

    private final Logger log = LoggerFactory.getLogger(ShiftWorkService.class);

    private final ShiftWorkRepository shiftWorkRepository;

    private final ShiftWorkMapper shiftWorkMapper;
    private OrderServiceClient orderServiceClient;

    public ShiftWorkService(ShiftWorkRepository shiftWorkRepository, ShiftWorkMapper shiftWorkMapper, OrderServiceClient orderServiceClient) {
        this.shiftWorkRepository = shiftWorkRepository;
        this.shiftWorkMapper = shiftWorkMapper;
        this.orderServiceClient = orderServiceClient;
    }

    /**
     * Save a shiftWork.
     *
     * @param shiftWorkDTO the entity to save
     * @return the persisted entity
     */
    public ShiftWorkDTO save(ShiftWorkDTO shiftWorkDTO) {
        log.debug("Request to save ShiftWork : {}", shiftWorkDTO);
        ShiftWork shiftWork = shiftWorkMapper.toEntity(shiftWorkDTO);
        shiftWork = shiftWorkRepository.save(shiftWork);
        return shiftWorkMapper.toDto(shiftWork);
    }

    /**
     * Get all the shiftWorks.
     *
     * @param query
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ShiftWorkDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all ShiftWorks");
        log.debug("Request to get all News");
        Page<ShiftWork> result;
        if (query != null)
            result = shiftWorkRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(ShiftWork.class, "shiftWork"), null), pageable);
        else
            result = shiftWorkRepository.findAll(pageable);
        return result.map(shiftWorkMapper::toDto);
    }

    /**
     * Get one shiftWork by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ShiftWorkDTO findOne(Long id) {
        log.debug("Request to get ShiftWork : {}", id);
        ShiftWork shiftWork = shiftWorkRepository.findOne(id);
        return shiftWorkMapper.toDto(shiftWork);
    }
        /**
     * Get one shiftWork by locationId.
     *
     * @param locationId the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ShiftWorkDTO firstByLocationId(Long locationId) {
        ShiftWork shiftWork = shiftWorkRepository.findFirstByLocationId(locationId);
        return shiftWorkMapper.toDto(shiftWork);
    }



    /**
     * Delete the shiftWork by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ShiftWork : {}", id);
        ShiftWork shiftWork = shiftWorkRepository.findOne(id);
        ZonedDateTime toDate = shiftWork.getToDate() == null ? shiftWork.getFromDate().plusDays(1) : shiftWork.getToDate();
        if (orderServiceClient.existOrderBetween(shiftWork.getLocation().getId(), shiftWork.getFromDate().toEpochSecond(), toDate.toEpochSecond()))
            throw new CustomParameterizedException("error.cantDeleteExistOrder");
        shiftWorkRepository.delete(id);
    }

    public void open(Long id) {
        ShiftWork shiftWork = shiftWorkRepository.findOne(id);
        if (shiftWork.getToDate() == null)
            throw new CustomParameterizedException("error.shiftWorkIsOpen");
        ShiftWork shiftWork1 = shiftWorkRepository.findFirstByLocationAndFromDateIsAfter(shiftWork.getLocation(), shiftWork.getToDate());
        if (shiftWork1 != null)
            throw new CustomParameterizedException("error.otherShiftWorkIsExist");

        shiftWork.toDate(null);
        shiftWorkRepository.save(shiftWork);
    }

    public void close(Long id) {
        ShiftWork shiftWork = shiftWorkRepository.findOne(id);
        if (shiftWork.getToDate() != null)
            throw new CustomParameterizedException("error.shiftWorkIsClose");

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Tehran"));

        if (shiftWork.getFromDate().isAfter(now)) {
            throw new CustomParameterizedException("error.fromDateIsBeforeNow");
        }

        shiftWork.toDate(now);
        shiftWorkRepository.save(shiftWork);
    }

    public Boolean isOpenShiftWork(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType) {
        ShiftWork shiftWork = shiftWorkRepository.findFirstByRefuelCenterIdAndShiftTypeAndToDateIsNull(refuelCenterId, shiftType);

        if (shiftWork == null) {
//            return shiftWorkRepository.countAllByRefuelCenterIdAndShiftType(refuelCenterId, shiftType) != 0;
            return true;
        } else {
            return false;
        }
    }

    public void automaticallyCloseAreaShiftWork(){
        shiftWorkRepository.closeAllOpenShiftOnArea();
    }

    public void automaticallyCloseShiftForBoundary(){
        shiftWorkRepository.closeAllOpenShiftForBoundary();
    }

    public Page<ShiftWorkDTO> findAllByRefuelCenterAndShiftType(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType, String query, Pageable pageable) {
        log.debug("Request to get all Shift Works");
        Page<ShiftWork> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(ShiftWork.class, "shiftWork"), null);
            BooleanExpression customerExpression = QShiftWork.shiftWork.refuelCenterId.eq(refuelCenterId).and(QShiftWork.shiftWork.shiftType.eq(shiftType));
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = shiftWorkRepository.findAll(booleanExpression, pageable);
        } else {
            result = shiftWorkRepository.findAllByRefuelCenterIdAndShiftType(refuelCenterId, shiftType, pageable);
        }
        Page<ShiftWorkDTO> shiftWorkDTOS = result.map(shiftWorkMapper::toDto);
        ShiftWork first = shiftWorkRepository.findFirstByRefuelCenterIdAndShiftTypeOrderByToDateDesc(refuelCenterId, shiftType);
        shiftWorkDTOS.forEach(shiftWork -> shiftWork.setCanOpen(shiftWork.getToDate() == null || shiftWork.getToDate().equals(first.getToDate())));
        return shiftWorkDTOS;
    }

    public void openByRefuelCenter(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType) {
        ShiftWork shiftWork = new ShiftWork();
        shiftWork.setFromDate(ZonedDateTime.now());
        shiftWork.setRefuelCenterId(refuelCenterId);
        shiftWork.setShiftType(shiftType);
        shiftWorkRepository.save(shiftWork);
    }

    public void closeByRefuelCenter(Long refuelCenterId, ShiftWorkRefuelCenterType shiftType) {
        ShiftWork shiftWork = shiftWorkRepository.findFirstByRefuelCenterIdAndShiftTypeAndToDateIsNull(refuelCenterId, shiftType);
        shiftWork.setToDate(ZonedDateTime.now());
        shiftWorkRepository.save(shiftWork);
    }
}
