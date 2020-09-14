package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.ProductGroup;
import ir.donyapardaz.niopdc.base.repository.ProductGroupRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ProductGroupDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ProductGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing ProductGroup.
 */
@Service
@Transactional
public class ProductGroupService {

    private final Logger log = LoggerFactory.getLogger(ProductGroupService.class);

    private final ProductGroupRepository productGroupRepository;

    private final ProductGroupMapper productGroupMapper;

    public ProductGroupService(ProductGroupRepository productGroupRepository, ProductGroupMapper productGroupMapper) {
        this.productGroupRepository = productGroupRepository;
        this.productGroupMapper = productGroupMapper;
    }

    /**
     * Save a productGroup.
     *
     * @param productGroupDTO the entity to save
     * @return the persisted entity
     */
    public ProductGroupDTO save(ProductGroupDTO productGroupDTO) {
        log.debug("Request to save ProductGroup : {}", productGroupDTO);
        ProductGroup productGroup = productGroupMapper.toEntity(productGroupDTO);
        productGroup = productGroupRepository.save(productGroup);
        return productGroupMapper.toDto(productGroup);
    }

    /**
     *  Get all the productGroups.
     *
     *  @param pageable the pagination information
     *  @param query
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductGroupDTO> findAll(Pageable pageable, String query) {
        log.debug("Request to get all ProductGroups");
        Page<ProductGroup> result;
        if(query!=null)
            result= productGroupRepository.findAll(new PredicatesBuilder().build(query, new PathBuilder<>(ProductGroup.class, "productGroup"),null), pageable);
        else
         result = productGroupRepository.findAll(pageable);
        return result.map(productGroup -> productGroupMapper.toDto(productGroup));
    }

    /**
     *  Get one productGroup by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ProductGroupDTO findOne(Long id) {
        log.debug("Request to get ProductGroup : {}", id);
        ProductGroup productGroup = productGroupRepository.findOne(id);
        return productGroupMapper.toDto(productGroup);
    }

    /**
     *  Delete the  productGroup by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductGroup : {}", id);
        productGroupRepository.delete(id);
    }
}
