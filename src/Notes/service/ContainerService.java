package ir.donyapardaz.niopdc.base.service;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import ir.donyapardaz.niopdc.base.domain.Container;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.QProduct;
import ir.donyapardaz.niopdc.base.repository.ContainerRepository;
import ir.donyapardaz.niopdc.base.repository.ProductRepository;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.service.dto.ContainerDTO;
import ir.donyapardaz.niopdc.base.service.dto.ProductDTO;
import ir.donyapardaz.niopdc.base.service.mapper.ContainerMapper;
import ir.donyapardaz.niopdc.base.service.mapper.ProductMapper;
import ir.donyapardaz.niopdc.base.web.rest.errors.CustomParameterizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Container.
 */
@Service
@Transactional
public class ContainerService {

    private final Logger log = LoggerFactory.getLogger(ContainerService.class);

    private final ContainerRepository containerRepository;

    private final ContainerMapper containerMapper;
    private ProductRepository productRepository;
    private ProductMapper productMapper;

    public ContainerService(ContainerRepository containerRepository, ContainerMapper containerMapper, ProductRepository productRepository, ProductMapper productMapper) {
        this.containerRepository = containerRepository;
        this.containerMapper = containerMapper;
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    /**
     * Save a container.
     *
     * @param containerDTO the entity to save
     * @return the persisted entity
     */
    public ContainerDTO save(ContainerDTO containerDTO) {
        log.debug("Request to save Container : {}", containerDTO);
        Container container = containerMapper.toEntity(containerDTO);
        container = containerRepository.save(container);
        return containerMapper.toDto(container);
    }

    /**
     * Get all the containers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ContainerDTO> findAll(Pageable pageable,String query) {
        log.debug("Request to get all Containers");
        Page<Container> result = containerRepository.findAll(query, pageable);
        return result.map(containerMapper::toDto);

    }

    /**
     * Get all the containers.
     *
     * @param containerId
     * @param query
     * @param pageable    the pagination information  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllProducts(Long containerId, String query, Pageable pageable) {
        log.debug("Request to get all Containers");
        if (query != null) {
            BooleanExpression booleanExpression = new PredicatesBuilder().build(query, new PathBuilder(Product.class, "product"),null);
            BooleanExpression eq = QProduct.product.container.id.eq(containerId);
            booleanExpression = booleanExpression != null ? booleanExpression.and(eq) : eq;
            return productRepository.findAll(booleanExpression, pageable)
                .map(productMapper::toDto);


        }
        return productRepository.findAllByContainer_Id(containerId, pageable)
            .map(productMapper::toDto);

    }

    /**
     * Get one container by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ContainerDTO findOne(Long id) {
        log.debug("Request to get Container : {}", id);
        Container container = containerRepository.findOne(id);
        return containerMapper.toDto(container);
    }

    /**
     * Delete the container by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Container : {}", id);
        if (containerRepository.existsContainerRate(id).equals(0L))
            containerRepository.delete(id);
        else
            throw  new CustomParameterizedException("error.delete.statement.conflicted");
    }
}
