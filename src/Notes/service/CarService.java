package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.*;
import ir.donyapardaz.niopdc.base.repository.*;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.CarBakDTO;
import ir.donyapardaz.niopdc.base.service.dto.CarDTO;
import ir.donyapardaz.niopdc.base.service.dto.CarInfoDTO;
import ir.donyapardaz.niopdc.base.service.dto.DriverDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Car.CarItem;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Car.NewCar;
import ir.donyapardaz.niopdc.base.service.mapper.*;
import ir.donyapardaz.niopdc.base.web.rest.util.DateUtil;
import ir.donyapardaz.niopdc.base.web.rest.util.YearMonthDay;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;


/**
 * Service Implementation for managing Car.
 */
@Service
@Transactional
public class CarService {

    private final Logger log = LoggerFactory.getLogger(CarService.class);

    private final CarRepository carRepository;

    private final CarMapper carMapper;

    private final CarBakRepository carBakRepository;
    private final CarBakMapper carBakMapper;

    private final CarInfoRepository carInfoRepository;
    private final CarInfoMapper carInfoMapper;

    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;


    public CarService(CarRepository carRepository, CarMapper carMapper, CarBakRepository carBakRepository, CarBakMapper carBakMapper, CarInfoRepository carInfoRepository, CarInfoMapper carInfoMapper, DriverRepository driverRepository, DriverMapper driverMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
        this.carBakRepository = carBakRepository;
        this.carBakMapper = carBakMapper;
        this.carInfoRepository = carInfoRepository;
        this.carInfoMapper = carInfoMapper;
        this.driverRepository = driverRepository;
        this.driverMapper = driverMapper;
    }

    /**
     * Save a car.
     *
     * @param carDTO the entity to save
     * @return the persisted entity
     */
    public CarDTO save(CarDTO carDTO) {
        log.debug("Request to save Car : {}", carDTO);
        Car car = carMapper.toEntity(carDTO);
        car = carRepository.save(car);
        return carMapper.toDto(car);
    }

    /**
     * Get all the cars.
     *
     * @param query
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CarDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all Cars");
        Page<Car> result;
        if (query != null)
            result = carRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(Car.class, "car"), null), pageable);
        else
            result = carRepository.findAll(pageable);
        return result.map(carMapper::toDto);
    }

    /**
     * Get one car by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CarDTO findOne(Long id) {
        log.debug("Request to get Car : {}", id);
        Car car = carRepository.findOne(id);
        return carMapper.toDto(car);
    }

    /**
     * Delete the car by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Car : {}", id);
        carRepository.delete(id);
    }

    public Page<DriverDTO> findAllDrivers(Long id, String query, Pageable pageable) {
        Page<Driver> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(Driver.class, "driver"), null);
            BooleanExpression customerExpression = QDriver.driver.car.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = driverRepository.findAll(booleanExpression, pageable);
        } else {
            result = driverRepository.findByCar_Id(id, pageable);

        }
        return result.map(driverMapper::toDto);
    }

    public Page<CarBakDTO> findAllCarBaks(Long id, String query, Pageable pageable) {
        Page<CarBak> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CarBak.class, "carBak"), null);
            BooleanExpression customerExpression = QCarBak.carBak.car.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = carBakRepository.findAll(booleanExpression, pageable);
        } else {
            result = carBakRepository.findByCar_Id(id, pageable);

        }
        return result.map(carBakMapper::toDto);
    }

    public Page<CarInfoDTO> findAllCarInfo(Long id, String query, Pageable pageable) {
        Page<CarInfo> result;
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder<>(CarInfo.class, "carInfo"), null);
            BooleanExpression customerExpression = QCarInfo.carInfo.car.id.eq(id);
            booleanExpression = booleanExpression != null ? booleanExpression.and(customerExpression) : customerExpression;
            result = carInfoRepository.findAll(booleanExpression, pageable);
        } else {
            result = carInfoRepository.findByCar_Id(id, pageable);

        }
        return result.map(carInfoMapper::toDto);
    }

    public List<DriverDTO> findAllDrivers(Long id) {
        return driverMapper.toDto(driverRepository.findAllByCar_Id(id));
    }


    public void updateFromExcel(MultipartFile file) {
        JAXBContext jaxbContext;
        try {
            jaxbContext = JAXBContext.newInstance(CarItem.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            CarItem contractItem = (CarItem) jaxbUnmarshaller.unmarshal(file.getInputStream());
            List<Car> cars = new ArrayList<>();
            List<CarInfo> carInfos = new ArrayList<>();
//            if (contractItem.getNewCars().size() < 2) {
//                throw new CustomParameterizedException("error.cars.length.small");
//            }
            for (NewCar newCar : contractItem.getNewCars()) {
                CarInfo carInfo = null;

                YearMonthDay yearMonthDay = new YearMonthDay();
                String[] dateSplit = newCar.getCarRegDte().split("/");
                yearMonthDay.setYear(Integer.valueOf(dateSplit[0]));
                yearMonthDay.setMonth(Integer.valueOf(dateSplit[1]) - 1);
                yearMonthDay.setDay(Integer.valueOf(dateSplit[2]));
                ZonedDateTime registerDate = DateUtil.convertToGeorgian(yearMonthDay);

                yearMonthDay = new YearMonthDay();
                String[] cardDateSplit = newCar.getCarRegDte().split("/");
                yearMonthDay.setYear(Integer.valueOf(cardDateSplit[0]));
                yearMonthDay.setMonth(Integer.valueOf(cardDateSplit[1]) - 1);
                yearMonthDay.setDay(Integer.valueOf(cardDateSplit[2]));
                ZonedDateTime cardDate = DateUtil.convertToGeorgian(yearMonthDay);

                Car car = carRepository.findFirstByChassisNumber(newCar.getCarShaNo());
                if (car == null) {
                    car = new Car();
                    car.setChassisNumber(newCar.getCarShaNo());
                    carInfo = new CarInfo();
                    carInfo.setSealNumber(1L);
                    carInfo.setCar(car);
                } else {
                    carInfo = carInfoRepository.findFirstByCar_Id(car.getId());
                }
                car.setBakNumber(newCar.getCarTnkNo());
                car.setIsBlock(newCar.getCarIsBlk());
                car.setBuildDate(newCar.getCarBulDte());
                car.setRegisterDate(registerDate);
                car.setPlaqueNumber(newCar.getCarPlq());
                car.setSerial(newCar.getCarSer());
                car.setSerialNumber(newCar.getCarSerNo());
                car.setTitle(newCar.getCarPlq());
                car.setCardDate(cardDate);
                car.setCardNo(newCar.getCarMtrCrdNo());


                carInfo.setCapacity(Long.valueOf(newCar.getCarVal0()));
                carInfos.add(carInfo);

                cars.add(car);
            }
            carRepository.save(cars);
            carInfoRepository.save(carInfos);
        } catch (JAXBException | IOException e) {
            e.printStackTrace();
        }
    }

    @Transactional(readOnly = true)
    public Page<CarDTO> findAllByHaveDriver(String title, Long personId, String query, Pageable pageable) {
        log.debug("Request to get all Cars");
        if (title != null && !title.equals("null")) {
            title = "%" + title + "%";
        } else {
            title = null;
        }
        Page<Car> result = carRepository.findAllByHaveDriver(title, personId, pageable);

        return result.map(carMapper::toDto);
    }
}
