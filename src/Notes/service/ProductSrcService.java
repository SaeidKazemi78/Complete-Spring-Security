package ir.donyapardaz.niopdc.base.service;

import ir.donyapardaz.niopdc.base.domain.ProductSrc;
import ir.donyapardaz.niopdc.base.repository.ProductSrcRepository;
import ir.donyapardaz.niopdc.base.service.dto.ProductSrcDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ProductSrcMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ProductSrc.
 */
@Service
@Transactional
public class ProductSrcService {

    private final Logger log = LoggerFactory.getLogger(ProductSrcService.class);

    private final ProductSrcRepository productSrcRepository;

    private final ProductSrcMapper productSrcMapper;

    public ProductSrcService(ProductSrcRepository productSrcRepository, ProductSrcMapper productSrcMapper) {
        this.productSrcRepository = productSrcRepository;
        this.productSrcMapper = productSrcMapper;
    }

    /**
     * Save a productSrc.
     *
     * @param productSrcDTO the entity to save
     * @return the persisted entity
     */
    public ProductSrcDTO save(ProductSrcDTO productSrcDTO) {
        log.debug("Request to save ProductSrc : {}", productSrcDTO);

        ProductSrc productSrc = productSrcMapper.toEntity(productSrcDTO);
        productSrc = productSrcRepository.save(productSrc);
        return productSrcMapper.toDto(productSrc);
    }

    /**
     * Get all the productSrcs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductSrcDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProductSrcs");
        return productSrcRepository.findAll(pageable)
            .map(productSrcMapper::toDto);
    }


    /**
     * Get one productSrc by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProductSrcDTO findOne(Long id) {
        log.debug("Request to get ProductSrc : {}", id);
        ProductSrc productSrc = productSrcRepository.findOne(id);
        return productSrcMapper.toDto(productSrc);

    }

    /**
     * Delete the productSrc by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ProductSrc : {}", id);
        productSrcRepository.delete(id);
    }
}
