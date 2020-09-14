package ir.donyapardaz.niopdc.base.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import ir.donyapardaz.niopdc.base.domain.CustomerDeactiveRule;
import ir.donyapardaz.niopdc.base.domain.QCustomerDeactiveRule;
import ir.donyapardaz.niopdc.base.domain.QLocationAccess;
import ir.donyapardaz.niopdc.base.repository.query.dsl.PredicatesBuilder;
import ir.donyapardaz.niopdc.base.repository.utils.PageableUtil;
import ir.donyapardaz.niopdc.base.security.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class CustomerDeactiveRuleRepositoryImpl implements CustomerDeactiveRuleRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    public Page<CustomerDeactiveRule> findAll(String query, Pageable pageable) {

        JPAQuery<CustomerDeactiveRule> jpaQuery = new JPAQuery<>(em);

        jpaQuery.from(QCustomerDeactiveRule.customerDeactiveRule, QLocationAccess.locationAccess)
            .innerJoin(QCustomerDeactiveRule.customerDeactiveRule.locations)
            .select(QCustomerDeactiveRule.customerDeactiveRule).distinct();

        BooleanExpression where = QLocationAccess.locationAccess.id.username.eq(SecurityUtils.getCurrentUserLogin().get())
            .and(QCustomerDeactiveRule.customerDeactiveRule.locations.any().id.eq(QLocationAccess.locationAccess.id.id));


        PathBuilder<CustomerDeactiveRule> deactiveRule = new PathBuilder<>(CustomerDeactiveRule.class, "customerDeactiveRule");
        BooleanExpression search = null;
        if (query != null)
            search = new PredicatesBuilder().build(query, deactiveRule, null);

        if (search != null)
            where = where.and(search);



        jpaQuery.where(where);

        return PageableUtil.fetchWithPageable(pageable, jpaQuery, deactiveRule);
    }
}
