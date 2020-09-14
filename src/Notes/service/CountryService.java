package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Country;
import ir.donyapardaz.niopdc.base.domain.QRegion;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.repository.CountryRepository;
import ir.donyapardaz.niopdc.base.repository.RegionRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.CountryDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionListDTO;
import ir.donyapardaz.niopdc.base.service.dto.pda.CountryApiDTO;
import ir.donyapardaz.niopdc.base.service.mapper.CountryMapper;
import ir.donyapardaz.niopdc.base.service.mapper.RegionMapper;
import ir.donyapardaz.niopdc.base.service.mapper.pda.CountryApiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Country.
 */
@Service
@Transactional
public class CountryService {

    private final Logger log = LoggerFactory.getLogger(CountryService.class);

    private final CountryRepository countryRepository;

    private final CountryMapper countryMapper;

    private final RegionRepository regionRepository;
    private final RegionMapper regionMapper;
    private CountryApiMapper countryApiMapper;

    public CountryService(CountryRepository countryRepository, CountryMapper countryMapper, RegionRepository regionRepository, RegionMapper regionMapper, CountryApiMapper countryApiMapper) {
        this.countryRepository = countryRepository;
        this.countryMapper = countryMapper;
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
        this.countryApiMapper = countryApiMapper;
    }

    /**
     * Save a country.
     *
     * @param countryDTO the entity to save
     * @return the persisted entity
     */
    public CountryDTO save(CountryDTO countryDTO) {
        log.debug("Request to save Country : {}", countryDTO);
        Country country = countryMapper.toEntity(countryDTO);
        country = countryRepository.save(country);


        return countryMapper.toDto(country);
    }

    /**
     * Get all the countries.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<CountryDTO> findAllPageable(String query, Pageable pageable) {
        log.debug("Request to get all Countries");
        Page<Country> result;
        if (query != null)
            result = countryRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(Country.class, "country"), null), pageable);
        else
            result = countryRepository.findAll(pageable);
        return result.map(countryMapper::toDto);
    }

    /**
     * Get all the countries.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<CountryDTO> findAll() {
        log.debug("Request to get all Countries");
        List <Country> result = countryRepository.findAllByOrderByName();
        return countryMapper.toDto(result);
    }

    /**
     * Get one country by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public CountryDTO findOne(Long id) {
        log.debug("Request to get Country : {}", id);
        Country country = countryRepository.findOne(id);
        return countryMapper.toDto(country);
    }

    /**
     * Get one country by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public List<CountryApiDTO> findAllOrOne(Long id, Date startDate) {
        log.debug("Request to get Country : {}", id);
        List<Country> countries = countryRepository.findAllOrOne(id, startDate);
        return countryApiMapper.toDto(countries);
    }

    /**
     * Delete the country by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Country : {}", id);
        countryRepository.delete(id);
    }

    /**
     * Get all the regions.
     *
     * @param countryId
     * @param level
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RegionListDTO> findAllRegionByLevel(Long countryId, int level) {
        log.debug("Request to get all Regions");
        return regionMapper.toListDto(regionRepository.findAllByLevel(countryId, level));
    }

    /***
     *
     * @param countryId
     * @param query
     * @param pageable
     * @return page region by country id
     */
    public Page<RegionListDTO> findAllRegion(Long countryId, String query, Pageable pageable) {
        log.debug("Request to get all Region by country id.");
        Page<Region> result;
        result = regionRepository.findByCountryIdAndParentIsNull(countryId, query, pageable);
        return result.map(regionMapper::toListDto);
    }

}
