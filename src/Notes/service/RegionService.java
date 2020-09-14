package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.Country;
import ir.donyapardaz.niopdc.base.domain.Region;
import ir.donyapardaz.niopdc.base.domain.UserDataAccess;
import ir.donyapardaz.niopdc.base.domain.enumeration.RegionLevel;
import ir.donyapardaz.niopdc.base.repository.CountryRepository;
import ir.donyapardaz.niopdc.base.repository.RegionRepository;
import ir.donyapardaz.niopdc.base.repository.UserDataAccessRepository;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import ir.donyapardaz.niopdc.base.service.dto.RegionDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionListDTO;
import ir.donyapardaz.niopdc.base.service.dto.RegionSelectorDTO;
import ir.donyapardaz.niopdc.base.service.feign.client.UaaServiceClient;
import ir.donyapardaz.niopdc.base.service.mapper.RegionListMapper;
import ir.donyapardaz.niopdc.base.service.mapper.RegionMapper;
import ir.donyapardaz.niopdc.base.service.mapper.RegionSelectorMapper;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Region.
 */
@Service
@Transactional
public class RegionService {

    private final Logger log = LoggerFactory.getLogger(RegionService.class);

    private final RegionRepository regionRepository;

    private final RegionMapper regionMapper;
    private UaaServiceClient uaaServiceClient;
    private UserDataAccessRepository userDataAccessRepository;
    private CountryRepository countryRepository;
    private UserDataAccessServiceAsync userDataAccessServiceAsync;
    private RegionSelectorMapper regionSelectorMapper;
    private RegionListMapper regionListMapper;

    public RegionService(RegionRepository regionRepository, RegionMapper regionMapper, UaaServiceClient uaaServiceClient, UserDataAccessRepository userDataAccessRepository, CountryRepository countryRepository, UserDataAccessServiceAsync userDataAccessServiceAsync, RegionSelectorMapper regionSelectorMapper, RegionListMapper regionListMapper) {
        this.regionRepository = regionRepository;
        this.regionMapper = regionMapper;
        this.uaaServiceClient = uaaServiceClient;
        this.userDataAccessRepository = userDataAccessRepository;
        this.countryRepository = countryRepository;
        this.userDataAccessServiceAsync = userDataAccessServiceAsync;
        this.regionSelectorMapper = regionSelectorMapper;
        this.regionListMapper = regionListMapper;
    }

    /**
     * Save a region.
     *
     * @param regionDTO the entity to save
     * @return the persisted entity
     */
    public RegionDTO save(RegionDTO regionDTO) {
        log.debug("Request to save Region : {}", regionDTO);
        Region region = regionMapper.toEntity(regionDTO);

        if (region.getId() == null && region.getParent() != null) {
            List<Region> regionUp = regionRepository.findAllRecursiveToUp(new ArrayList<Long>() {{
                add(region.getParent().getId());
            }});

            List<UserDataAccess> userDataAccesses = userDataAccessRepository.findAllByRegion(regionUp.stream()
                .map(Region::getId).collect(Collectors.toList()));

            userDataAccessServiceAsync.addUserRows(userDataAccesses, null, new ArrayList<Region>() {{
                add(region);
            }});

        }
        Region region1 = regionRepository.save(region);
        return regionMapper.toDto(region1);
    }


    /**
     * Get all the regions.
     *
     * @param pageable the pagination information
     * @param parentId the parent region id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RegionListDTO> findAllByParentId(Long parentId, String query, Pageable pageable) {
        log.debug("Request to get all Regions");
        Page<Region> result = regionRepository.findByParentId(parentId, query, pageable);

        return result.map(regionMapper::toListDto);
    }

    /**
     * Get all the regions.
     *
     * @param parentId the parent region id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RegionListDTO> findAllByParentId(Long parentId, boolean dataAccess, Long countryId, Set<Long> locations) {
        log.debug("Request to get all Regions");

        if (countryId == null && parentId == null) countryId = countryRepository.findFirstByCheckNationalCodeIsTrue().getId();

        List<Region> result = regionRepository.findAllForSelector(dataAccess ? SecurityUtils.getCurrentUserLogin().get() : "-1",
            parentId==null ? -1 : parentId,
            countryId== null? -1:countryId,
            locations == null ? 1 : 0,
            locations);

        return regionMapper.toListDto(result);
    }

    /**
     * Get all the regions.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Map<Long, List<RegionSelectorDTO>> findAllRecursiveToUp(List<Long> ids) {
        log.debug("Request to get all Regions");
        Map<Long, List<RegionSelectorDTO>> result = new HashMap<>();
        List<Region> regions = regionRepository.findAllRecursiveToUp(ids);
        regions = regionRepository.findAllWithEagerRelationships(regions, SecurityUtils.getCurrentUserLogin().get());


        for (Long id : ids) {
            Region region = regions.stream().filter(location1 -> location1.getId().equals(id)).findAny().get();
            List<Region> regionList = new ArrayList<>();
            do {
                regionList.add(0, region);
            } while ((region = region.getParent()) != null);

            result.put(id, regionSelectorMapper.toDto(regionList));
        }
        return result;
    }

    /**
     * Get all the regions.
     *
     * @param parentId the parent region id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<RegionDTO> findAllByParentId(Long parentId) {
        log.debug("Request to get all Regions");
        List<Region> result = regionRepository.findByParentId(parentId);
        return regionMapper.toDto(result);
    }

    /**
     * Get one region by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public RegionDTO findOne(Long id) {
        log.debug("Request to get Region : {}", id);
        Region region = regionRepository.findOne(id);
        return regionMapper.toDto(region);
    }

    /**
     * Delete the  region by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Region : {}", id);
        regionRepository.delete(id);
    }

    public Boolean isNational(Long regionId) {
        Region region = regionRepository.findOne(regionId);
        return (region.getParent() != null) ? region.getParent().getCountry().isCheckNationalCode() : region.getCountry().isCheckNationalCode();
    }

    @Async
    public void loadExcel(InputStream uploadfile) throws IOException {


        Workbook workbook = new XSSFWorkbook(uploadfile);
        Sheet datatypeSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = datatypeSheet.iterator();
        if (iterator.hasNext()) iterator.next();
        Map<String, Region> regionMap = new HashMap<>();
        ArrayList<Region> ignoreRegion = new ArrayList<>();
        Country country = countryRepository.findFirstByCheckNationalCodeIsTrue();
        if (country == null) return;

        log.debug("start load excel");
        int counter = 0;
        while (iterator.hasNext()) {
            Row currentRow = iterator.next();
            Cell cell = currentRow.getCell(0);
            if (cell == null) continue;
            String code = cell.getStringCellValue();
            String name = "", parentCode = null;
            int level = 0;
            if (code == null || code.trim().isEmpty()) continue;

            if (RegionLevel.get(code.length()) == RegionLevel.OSTAN) {
                name = currentRow.getCell(2).getStringCellValue();

            } else if (RegionLevel.get(code.length()) == RegionLevel.SHAHRESTAN) {
                name = currentRow.getCell(4).getStringCellValue();
                parentCode = currentRow.getCell(1).getStringCellValue();
                level = 1;
            } else if (RegionLevel.get(code.length()) == RegionLevel.BAKHSH) {
                name = currentRow.getCell(6).getStringCellValue();
                parentCode = currentRow.getCell(1).getStringCellValue() +
                    currentRow.getCell(3).getStringCellValue();
                level = 2;

            } else if (RegionLevel.get(code.length()) == RegionLevel.Dehestan) {
                name = currentRow.getCell(8).getStringCellValue();
                if (name == null || name.trim().isEmpty()) name = currentRow.getCell(10).getStringCellValue();
                parentCode = currentRow.getCell(1).getStringCellValue() +
                    currentRow.getCell(3).getStringCellValue() +
                    currentRow.getCell(5).getStringCellValue();
                level = 3;

            } else if (RegionLevel.get(code.length()) == RegionLevel.Abadi) {
                name = currentRow.getCell(12).getStringCellValue();
                parentCode = currentRow.getCell(1).getStringCellValue() +
                    currentRow.getCell(3).getStringCellValue() +
                    currentRow.getCell(5).getStringCellValue() +
                    currentRow.getCell(7).getStringCellValue();
                level = 4;

            }

            if (!regionMap.containsKey(code)) {
                Region region = regionRepository.findFirstByCode(code);

                if (region == null) region = new Region();

                region.setCode(code);
                region.setName(name);
                region.setLevel(level);

                if (parentCode != null) {
                    if (regionMap.containsKey(parentCode))
                        region.setParent(regionMap.get(parentCode));
                    else {
                        Region parent = regionRepository.findFirstByCode(code);
                        if (parent != null) {
                            region.setParent(parent);
                        } else {
                            ignoreRegion.add(region);
                            continue;
                        }
                    }
                } else
                    region.setCountry(country);

                log.debug("put : " + code);
                regionMap.put(code, region);


                regionRepository.save(region);

                if (++counter % 1000 == 0)
                    regionRepository.flush();

            }
//                System.out.println(String.format("{'code':'%s','name':'%s','parentCode':'%s'}", code, name, parentCode));

        }
        log.debug("end load excel");


        log.debug("save load excel");
    }

}
