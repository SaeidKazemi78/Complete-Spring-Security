package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.Product;
import ir.donyapardaz.niopdc.base.domain.QProduct;
import ir.donyapardaz.niopdc.base.domain.enumeration.CustomerGroup;
import ir.donyapardaz.niopdc.base.domain.enumeration.ProductShowStatus;
import ir.donyapardaz.niopdc.base.repository.custom.ProductRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Spring Data JPA repository for the Depot entity.
 */
public class ProductRepositoryImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Product> findAll(String query, Pageable pageable, CustomerGroup customerGroup) {

        JPAQuery<Product> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QProduct.product);
        jpaQuery.select(QProduct.product);
        jpaQuery.leftJoin(QProduct.product.productUnit).fetchJoin();
        jpaQuery.leftJoin(QProduct.product.productGroup).fetchJoin();

        PathBuilder<Product> product = new PathBuilder<>(Product.class, "product");
        BooleanExpression where = customerGroup != null ? QProduct.product.customerGroups.contains(customerGroup) : null;
        BooleanExpression search = new PredicatesBuilder().build(query, product, null);

        if (search != null)
            where = where == null ? search : where.and(search);

        if (where != null)
            jpaQuery.where(where);

        return PageableUtil.fetchWithPageable(pageable, jpaQuery, product);
    }

    @Override
    public Page<Product> findAllByProductShowStatus(ProductShowStatus productShowStatus, String query, Pageable pageable) {
        JPAQuery<Product> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QProduct.product);
        jpaQuery.select(QProduct.product);
        jpaQuery.leftJoin(QProduct.product.productUnit).fetchJoin();
        jpaQuery.leftJoin(QProduct.product.productGroup).fetchJoin();

        PathBuilder<Product> product = new PathBuilder<>(Product.class, "product");
        BooleanExpression search = new PredicatesBuilder().build(query, product, null);

        BooleanExpression where;


        jpaQuery.where(search);
        if (pageable.getSort() != null)
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, product.get(o.getProperty())));
            }
        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        List<Product> products = jpaQuery.fetch();

        long size = (products.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            products.size() :
            jpaQuery.offset(0).fetchCount();


        return new PageImpl<>(products, pageable, size);
    }


}
