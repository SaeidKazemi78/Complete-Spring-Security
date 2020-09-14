package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.CustomerType;
import ir.donyapardaz.niopdc.base.domain.QCustomerType;
import ir.donyapardaz.niopdc.base.domain.QCustomerTypeView;
import ir.donyapardaz.niopdc.base.repository.custom.CustomerTypeRepositoryCustom;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class CustomerTypeRepositoryImpl implements CustomerTypeRepositoryCustom {


    @PersistenceContext
    private EntityManager em;


    @Override
    public Page<CustomerType> findAll(String query, Pageable pageable) {

        JPAQuery<CustomerType> jpaQuery = new JPAQuery<>(em);
        jpaQuery.from(QCustomerType.customerType, QCustomerTypeView.customerTypeView);
        jpaQuery.select(QCustomerType.customerType);

        BooleanExpression where = QCustomerTypeView.customerTypeView.username.eq(SecurityContextHolder.getContext().getAuthentication().getName())
            .and(QCustomerType.customerType.id.eq(QCustomerTypeView.customerTypeView.id));

        PathBuilder<CustomerType> customerType = new PathBuilder<>(CustomerType.class, "customerType");
        BooleanExpression search = new PredicatesBuilder().build(query, customerType, null);

        if (search != null)
            where = where.and(search);

        jpaQuery.where(where);

        jpaQuery.offset(pageable.getPageNumber() * pageable.getPageSize()).limit(pageable.getPageSize());
        if (pageable.getSort() != null) {
            for (Sort.Order o : pageable.getSort()) {
                jpaQuery.orderBy(new OrderSpecifier(o.isAscending() ? Order.ASC
                    : Order.DESC, customerType.get(o.getProperty())));
            }
        }
        List<CustomerType> customerTypes = jpaQuery.fetch();

        long size = (customerTypes.size() < pageable.getPageSize() && pageable.getPageNumber() == 0) ?
            customerTypes.size() :
            jpaQuery.offset(0).fetchCount();

        return new PageImpl<>(customerTypes, pageable, size);
    }
}
