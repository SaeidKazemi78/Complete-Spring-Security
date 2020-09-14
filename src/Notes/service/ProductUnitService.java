package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.ProductUnit;
import ir.donyapardaz.niopdc.base.repository.ContainerRepository;
import ir.donyapardaz.niopdc.base.repository.ProductUnitRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ContainerDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductUnitDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ContainerMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductUnitMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing ProductUnit.
 */
@Service
@Transactional
public class ProductUnitService {

    private final Logger log = LoggerFactory.getLogger(ProductUnitService.class);

    private final ProductUnitRepository productUnitRepository;

    private final ProductUnitMapper productUnitMapper;

    private ContainerRepository containerRepository;
    private ContainerMapper containerMapper;

    public ProductUnitService(ProductUnitRepository productUnitRepository, ProductUnitMapper productUnitMapper, ContainerRepository containerRepository, ContainerMapper containerMapper) {
        this.productUnitRepository = productUnitRepository;
        this.productUnitMapper = productUnitMapper;
        this.containerRepository = containerRepository;
        this.containerMapper = containerMapper;
    }

    /**
     * Save a productUnit.
     *
     * @param productUnitDTO the entity to save
     * @return the persisted entity
     */
    public ProductUnitDTO save(ProductUnitDTO productUnitDTO) {
        log.debug("Request to save ProductUnit : {}", productUnitDTO);
        ProductUnit productUnit = productUnitMapper.toEntity(productUnitDTO);
        productUnit = productUnitRepository.save(productUnit);
        return productUnitMapper.toDto(productUnit);
    }

    /**
     * Get all the productUnits.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductUnitDTO> findAll(String query, Pageable pageable) {
        log.debug("Request to get all ProductUnits");
        Page<ProductUnit> result;
        if (query != null)
            result = productUnitRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder(ProductUnit.class, "productUnit"),null), pageable);
        else
            result = productUnitRepository.findAll(pageable);
        return result.map(productUnit -> productUnitMapper.toDto(productUnit));
    }

    /**
     * Get one productUnit by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProductUnitDTO findOne(Long id) {
        log.debug("Request to get ProductUnit : {}", id);
        ProductUnit productUnit = productUnitRepository.findOne(id);
        return productUnitMapper.toDto(productUnit);
    }

    /**
     * Delete the productUnit by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductUnit : {}", id);
        productUnitRepository.delete(id);
    }
    /**
     * Get all the productUnitRates.
     *
     * @return the list of entities
     */
   @Transactional(readOnly = true)
    public List<ContainerDTO> findAllContainers(Long productUnitId) {
        log.debug("Request to get all ProductUnitRates");
       return containerMapper.toDto(containerRepository.findByProductUnit_Id(productUnitId));

    }


}
