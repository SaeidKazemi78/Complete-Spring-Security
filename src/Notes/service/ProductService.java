package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Consumption;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.ProductSrc;
import ir.donyapardaz.niopdc.base.domain.QProductSrc;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ProductShowStatus;
import ir.donyapardaz.niopdc.base.repository.ConsumptionRepository;
import ir.donyapardaz.niopdc.base.repository.DepotRepository;
import ir.donyapardaz.niopdc.base.repository.ProductRepository;
import ir.donyapardaz.niopdc.base.repository.ProductSrcRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ConsumptionDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductListDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductSrcDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ConsumptionMapper;
import ir.donyapardaz.niopdc.base.service.mapper.DepotMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductSrcMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;
    private final ConsumptionRepository consumptionRepository;
    private final ConsumptionMapper consumptionMapper;
    private final DepotRepository depotRepository;
    private final DepotMapper depotMapper;
    private ProductSrcRepository productSrcRepository;
    private ProductSrcMapper productSrcMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper, ConsumptionRepository consumptionRepository, ConsumptionMapper consumptionMapper, DepotRepository depotRepository, DepotMapper depotMapper, ProductSrcRepository productSrcRepository, ProductSrcMapper productSrcMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.consumptionRepository = consumptionRepository;
        this.consumptionMapper = consumptionMapper;
        this.depotRepository = depotRepository;
        this.depotMapper = depotMapper;
        this.productSrcRepository = productSrcRepository;
        this.productSrcMapper = productSrcMapper;
    }

    /**
     * Save a product.
     *
     * @param productDTO the entity to save
     * @return the persisted entity
     */
    public ProductDTO save(ProductDTO productDTO) {
        log.debug("Request to save Product : {}", productDTO);
        Product product = productMapper.toEntity(productDTO);
        product = productRepository.save(product);
        return productMapper.toDto(product);
    }

    /**
     * Get all the products.
     *
     * @param pageable      the pagination information
     * @param customerGroup
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductListDTO> findAll(Pageable pageable, String query, CustomerGroup customerGroup) {
        log.debug("Request to get all Products");
        Page<Product> result = productRepository.findAll(query, pageable, customerGroup);

        return result.map(productMapper::toListDto);
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllByHasContainer(Boolean hasContainer, Pageable pageable) {
        log.debug("Request to get all Products");
        Page<Product> result;
        result = productRepository.findAllByHasContainer(hasContainer, pageable);
        return result.map(productMapper::toDto);
    }

    /**
     * Get all the products.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> findAllByRateGroupAndHasContainer(Long rateGroup, Boolean hasContainer) {
        log.debug("Request to get all Products");
        List<Product> result;
        result = productRepository.findAllByRateGroupIdAndHasContainer(rateGroup, hasContainer);
        return productMapper.toDto(result);
    }

    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ProductDTO findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Product product = productRepository.findOne(id);
        return productMapper.toDto(product);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        if (productRepository.existsProductRate(id).equals(0L))
            productRepository.delete(id);
        else
            throw new CustomParameterizedException("error.delete.statement.conflicted");
    }

    /**
     * Search for the product corresponding to the query.
     *
     * @param productId the product Id
     * @param pageable  the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ConsumptionDTO> getAllConsumptions(Pageable pageable, Long customerId, Long productId) {
        Page<Consumption> result = consumptionRepository.findByProduct(pageable, customerId, productId);
        return result.map(consumptionMapper::toDto);
    }


    public List<ProductDTO> findAllByIds(Set<Long> ids) {
        List<Product> list = productRepository.findAllByIdIn(ids);
        return productMapper.toDto(list);
    }

    public List<ProductDTO> findAllByCustomerGroup(CustomerGroup customerGroup) {
        return productMapper.toDto(productRepository.findAllByCustomerGroup(customerGroup));
    }

    public List<ProductDTO> findAllByCustomerId(Long customerId, ZonedDateTime date) {
        return productMapper.toDto(productRepository.findAllProductByCustomerId(customerId, date));
    }

    public Page<ProductListDTO> findAllByProductShowStatus(ProductShowStatus productShowStatus, Pageable pageable, String query) {
        log.debug("Request to get all Products");
        Page<Product> result = productRepository.findAllByProductShowStatus(productShowStatus, query, pageable);

        return result.map(productMapper::toListDto);
    }

    public Page<ProductSrcDTO> findAllProductSrcByProductId(Long id, Pageable pageable, String query) {

        Page<ProductSrc> result;
        if (query != null) {
            BooleanExpression productSrc = new PredicatesBuilder().build(query, new PathBuilder<>(ProductSrc.class, "productSrc"), null);
            productSrc.and(QProductSrc.productSrc.product.id.eq(id));
            result = productSrcRepository.findAll(productSrc, pageable);
        } else
            result = productSrcRepository.findAllByProduct_Id(id, pageable);

        return result.map(productSrcMapper::toDtoList);
    }

    public List<ProductSrcDTO> findAllProductSrcByProductId(Long id) {
        List<ProductSrc> productSrcs = productSrcRepository.findAllByProduct_IdAndActiveIsTrue(id);
        return productSrcs.stream().map(productSrcMapper::toDtoList).collect(Collectors.toList());
    }

    public List<ProductDTO> findAllProductByProductCode(List<String> codes) {
        if (codes != null && codes.size() > 0)
            return productRepository.findAllByCodes(codes).stream().map(productMapper::toDto).collect(Collectors.toList());
       return null;
    }
}
