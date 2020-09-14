package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Route;
import ir.donyapardaz.niopdc.base.repository.RouteRepository;
import ir.donyapardaz.niopdc.base.service.dto.RouteDTO;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Route.NewRoute;
import ir.donyapardaz.niopdc.base.service.dto.custom.FileDTO.Route.RouteItem;
import ir.donyapardaz.niopdc.base.service.mapper.RouteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


/**
 * Service Implementation for managing Route.
 */
@Service
@Transactional
public class RouteService {

    private final Logger log = LoggerFactory.getLogger(RouteService.class);

    private final RouteRepository routeRepository;

    private final RouteMapper routeMapper;

    public RouteService(RouteRepository routeRepository, RouteMapper routeMapper) {
        this.routeRepository = routeRepository;
        this.routeMapper = routeMapper;
    }

    /**
     * Save a route.
     *
     * @param routeDTO the entity to save
     * @return the persisted entity
     */
    public RouteDTO save(RouteDTO routeDTO) {
        log.debug("Request to save Route : {}", routeDTO);
        Route route = routeMapper.toEntity(routeDTO);
        route = routeRepository.save(route);
        return routeMapper.toDto(route);
    }

    /**
     * Get all the routes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RouteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Routes");
        return routeRepository.findAll(pageable)
            .map(routeMapper::toDto);
    }

    /**
     * Get one route by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public RouteDTO findOne(Long id) {
        log.debug("Request to get Route : {}", id);
        Route route = routeRepository.findOne(id);
        return routeMapper.toDto(route);
    }

    /**
     * Delete the route by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Route : {}", id);
        routeRepository.delete(id);
    }

    public RouteDTO findOneBySourceAndTargetDepotCode(String sourceCode, String targetCode) {
        Route route = routeRepository.findFirstBySourceCodeAndDestCode(sourceCode, targetCode);
        return routeMapper.toDto(route);
    }


    public void updateFromExcel(MultipartFile file) {
        JAXBContext jaxbContext;
        try {
            jaxbContext = JAXBContext.newInstance(RouteItem.class);
            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            RouteItem contractItem = (RouteItem) jaxbUnmarshaller.unmarshal(file.getInputStream());
            List<Route> routes = new ArrayList<>();
            for (NewRoute newRoute : contractItem.getNewRoutes()) {
                Route route = routeRepository.findFirstBySourceCodeAndDestCode(newRoute.getSourceCode(), newRoute.getDestCode());
                if (route == null) {
                    route = new Route();
                    route.setSourceCode(newRoute.getSourceCode());
                    route.setDestCode(newRoute.getDestCode());
                }
                route.setCaption(newRoute.getCaption());
                route.setCode(newRoute.getCode());
                route.setCustomerCode(newRoute.getCustomerCode());
                route.setCustomerName(newRoute.getCustomerName());
                route.setCustomerStatus(newRoute.getCustomerStatus());
                route.setCustomerType(newRoute.getCustomerType());
                route.setDescription(newRoute.getDescription());
                route.setDestName(newRoute.getDestName());
                route.setDestOpCode(newRoute.getDestOpCode());
                route.setDistanceKm(newRoute.getDistanceKm());
                route.setHamlType(newRoute.getHamlType());
                route.setAddress(newRoute.getAddress());
                route.setIsActive(newRoute.getActice());
                route.setOldCode(newRoute.getOldCode());
                route.setRate(newRoute.getRate());
                route.setSourceName(newRoute.getSourceName());
                route.setTaCode(newRoute.getTaCode());
                route.setSourceTadaCode(newRoute.getSourceTadaCode());
                route.setVia(newRoute.getVia());

                routes.add(route);
            }
            routeRepository.save(routes);
        } catch (JAXBException | IOException e) {
            e.printStackTrace();
        }
    }
}
